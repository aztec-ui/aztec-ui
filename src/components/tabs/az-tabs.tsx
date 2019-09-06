import { Component, Prop, Method, Element, Watch, h} from '@stencil/core';
import { Inject } from '../../utils/utils';
import { HostElement } from '@stencil/core/dist/declarations';

@Component({
  tag: 'az-tabs',
  styleUrl: 'az-tabs.styl',
  shadow: false
})
export class AzTabs {
  @Element() el: HostElement;

  @Prop() items: any[] = [];

  @Prop({
    attribute: 'active-index'
  })
  activeIndex: number = -1;

  @Watch('activeIndex')
  onActiveIndexChanged(newIndex: number, oldIndex: number) {
    const slot = this.el.querySelector('content') as HTMLElement;
    const children = slot.children;
    if (!children || children.length === 0) return;
    if (children[oldIndex]) children[oldIndex].classList.remove('visible');
    if (children[newIndex]) children[newIndex].classList.add('visible');
  }

  @Inject({
    style: false,
    attrs: false,
    parse: true
  })
  componentDidLoad(){
    this.onActiveIndexChanged(this.activeIndex, null);
  }

  @Method()
  addItem(it: any) {
    this.items = [...this.items, it];
    this.el.forceUpdate();
  }

  @Method()
  removeItem(it: any) {
    const pos = this.items.findIndex(item => item === it);
    this.items.splice(pos, 1);
  }

  @Method()
  removeItemAt(index: number) {
    this.items.splice(index, 1);
  }

  render() {
    const tabs = this.items.map((it: any, i: number) => {
      return (
        <li
          class={{active: this.activeIndex === i}}
          onClick={() => this.activeIndex = i}>
          {it}
        </li>
      );
    });
    return [
      <div class="tabs">
        <ul>{tabs}</ul>
      </div>,
      <content>
        <slot></slot>
      </content>
    ];
  }
}