import { Component, Prop, Element, Host, h } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { draggable } from '../../utils/draggable';
@Component({
  tag: 'az-splitter',
  styleUrl: 'az-splitter.styl',
  shadow: false
})
export class AzSpliter {
  @Element() el: HostElement;

  @Prop() direction: 'horizontal' | 'vertical' = 'vertical';
  @Prop() disabled: boolean = false;
  @Prop() gap: number = 4;

  childrenEles: Element[] = [];
  dragging: boolean = false;
  childBefore: HTMLElement;
  childAfter: HTMLElement;

  componentDidLoad() {
    // this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDownHandle = this.onMouseDownHandle.bind(this);

    this.childrenEles = Array.from(this.el.children);
    const r = (100 / this.childrenEles.length).toFixed(6) + '%';
    const prop = this.direction === 'vertical' ? 'height' : 'width';
    this.childrenEles.forEach((child: HTMLElement, index: number) => {
      const w = child.style[prop] || child.style.flexBasis;
      child.style.flex = `0 0 ${w || r}`;
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

    if (this.direction === 'vertical' && this.el.style.height === '') {
      this.el.style.height = `${this.el.getBoundingClientRect().height}px`;
    }
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
    window.setTimeout(() => {
      const prop = this.direction === 'vertical' ? 'top' : 'left';
      const pos = Array.from(this.el.querySelectorAll('.handle')).map((h: HTMLDivElement) => parseFloat(h.style[prop]));
      if (pos.some(isNaN)) return;
      const lastIndex = this.childrenEles.length - 1;
      this.childrenEles.forEach((child: HTMLElement, index: number) => {
        let r;
        if (index === 0) r = pos[0];
        else if (index === lastIndex) r = 100 - pos[lastIndex - 1];
        else r = pos[index] - pos[index - 1];
        child.style.flex = `0 0 ${r}%`;
      });
    }, 0);
  }

  onMouseDownHandle(e: MouseEvent) {
    (e.target as HTMLElement).classList.add('active');
    this.dragging = true;
  }

  render() {
    return (
      <Host class={{"az-splitter": true, [this.direction]: true}}>
        <slot></slot>
      </Host>
    );
  }
}