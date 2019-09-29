import { Component, Prop, Element, Host, h } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { draggable } from '../../utils/draggable';
@Component({
  tag: 'az-spliter',
  styleUrl: 'az-splitter.styl',
  shadow: false
})
export class AzSpliter {
  @Element() el: HostElement;

  @Prop() direction: 'horizontal' | 'vertical' = 'vertical';
  @Prop() disabled: boolean = false;
  @Prop() gap: number = 4;

  handle: HTMLDivElement;
  childrenEles: Element[] = [];
  dragging: boolean = false;
  childBefore: HTMLElement;
  childAfter: HTMLElement;

  componentDidLoad() {
    // this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDownHandle = this.onMouseDownHandle.bind(this);

    this.childrenEles = Array.from(this.el.children);
    const r = (1 / this.childrenEles.length).toFixed(6);
    this.childrenEles.forEach((child: HTMLElement, index: number) => {
      child.style.flex = `${r} ${r} 0`;
      if (index === this.childrenEles.length - 1) return;
      const handle = document.createElement('div');
      handle.classList.add('handle');
      handle.removeEventListener('mousedown', this.onMouseDownHandle);
      handle.addEventListener('mousedown', this.onMouseDownHandle);
      this.el.addEventListener('mouseup', () => handle.classList.remove('active'));
      child.after(handle);
      this.calculateHandlePosition(handle);
      draggable(handle, handle, {direction: this.direction, initFromStyle: false, onRelease: () => {
        this.calculateHandlePosition(handle, true);
      }});
    });

    // this.childrenEles.forEach((child: HTMLElement) => {
    //   child.addEventListener('mousemove', this.onMouseMove);
    //   child.style.flex = `${r} ${r} 0`;
    // });
  }

  calculateHandlePosition(handle: HTMLElement, usePx = false) {
    const styl = handle.style;
    const prev = handle.previousElementSibling as HTMLElement;
    Promise.resolve().then(() => {
      if (this.direction === 'vertical') {
        const total = this.el.offsetHeight;
        const pos = usePx ? handle.offsetTop : prev.offsetTop + prev.offsetHeight - this.gap / 2;
        styl.height = `${this.gap}px`;
        const percent = pos / total * 100;
        styl.top = `${percent.toFixed(6)}%`;
      } else {
        const total = this.el.offsetWidth;
        const pos = usePx ? handle.offsetLeft : prev.offsetLeft + prev.offsetWidth - this.gap / 2;
        styl.width = `${this.gap}px`;
        const percent = pos / total * 100;
        styl.left = `${percent.toFixed(6)}%`;
      }
    });
  }

  onMouseDownHandle(e: MouseEvent) {
    (e.target as HTMLElement).classList.add('active');
    this.dragging = true;
  }

  onMouseMove1(e: MouseEvent) {
    if (this.disabled) return;
    const child = e.target as HTMLElement;
    const sty = this.handle.style;
    const isFirstEle = child.previousElementSibling === this.handle;
    const isLastEle = child.nextElementSibling === null;

    if (this.dragging) {

    } else {
      let isPassHalf;
      sty.display = 'none';
      if (this.direction === 'vertical') {
        isPassHalf = e.offsetY > (child.offsetHeight / 2);
        if ((isFirstEle && !isPassHalf) || (isLastEle && isPassHalf)) return;
        sty.cursor = 'row-resize';
        sty.display = '';
        sty.left = sty.right = '0';
        sty.width = `${child.offsetWidth}px`;
        sty.height = `${this.gap}px`;
        sty.top = `${child.offsetTop + (isPassHalf ? child.offsetHeight : 0) - this.gap / 2}px`;
      } else {
        isPassHalf = e.offsetX > (child.offsetWidth / 2);
        if ((isFirstEle && !isPassHalf) || (isLastEle && isPassHalf)) return;
        sty.cursor = 'col-resize';
        sty.display = '';
        sty.top = sty.bottom = '0';
        sty.height = `${child.offsetHeight}px`;
        sty.width = `${this.gap}px`;
        sty.left = `${child.offsetLeft + (isPassHalf ? child.offsetWidth : 0) - this.gap / 2}px`;
      }
      if (isPassHalf) {
        this.childBefore = e.target as HTMLElement;
        this.childAfter = (e.target as HTMLElement).nextElementSibling as HTMLElement;
      } else {
        this.childBefore = (e.target as HTMLElement).previousElementSibling as HTMLElement;
        this.childAfter = e.target as HTMLElement;
      }
    }
  }

  render() {
    return (
      <Host class={{"az-spliter": true, [this.direction]: true}}>
        <slot></slot>
      </Host>
    );
  }
}