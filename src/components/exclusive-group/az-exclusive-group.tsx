import { Component, Prop, Element, Host, h, Method } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { Inject } from '../../utils/utils';

@Component({
  tag: 'az-exclusive-group',
  styleUrl: 'az-exclusive-group.styl',
  shadow: false
})
export class AzExclusiveGroup {
  @Element() el: HostElement;

  @Prop() caption: string = '';
  @Prop() itemSelector: string = 'az-radio';
  @Prop() itemEvent: string = 'changed';
  @Prop() itemProp: string = 'checked';
  @Prop() itemValue: any = false;

  @Inject({
    sync: ['items']
  })
  componentDidLoad() {
    this.onItemChanged = this.onItemChanged.bind(this);
    this.el.addEventListener(this.itemEvent, this.onItemChanged);
  }

  items(): HTMLElement[] {
    return Array.from(this.el.querySelectorAll(this.itemSelector)) as HTMLElement[] || [];
  }

  @Method()
  async clear() {
    this.items().forEach((item) => {
      item.setAttribute(this.itemProp, this.itemValue);
    });
  }

  onItemChanged(e: UIEvent) {
    this.items().forEach((item) => {
      if (e.target !== item) item.setAttribute(this.itemProp, this.itemValue);
    });
  }

  render() {
    return (
      <Host class="az-exclusive-group">
        <slot></slot>
      </Host>
    );
  }
}