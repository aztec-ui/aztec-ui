import { Component, Prop, Element, Host, h } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { Inject } from '../../utils/utils';

@Component({
  tag: 'az-context-menu',
  styleUrl: 'az-context-menu.styl',
  shadow: false
})
export class AzContextMenu {
  @Element() el: HostElement;

  @Prop() caption: string = '';

  @Inject({
    sync: ['show', 'hide', 'items',  'insertItem', 'removeItem']
  })
  componentDidLoad() {
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    const parent = this.el.parentElement;
    parent.style.position = 'relative';
    parent.addEventListener('contextmenu', this.show);
    document.addEventListener('mouseup', (e: MouseEvent) => {
      const parent = (e.target as HTMLElement).closest('az-context-menu');
    if (parent == null) this.el.style.display = 'none';
    });
    this.el.addEventListener('selected', this.hide);
  }

  show(e: MouseEvent) {
    const styl = this.el.style;
    styl.display = 'flex';
    styl.left = e.offsetX + 'px';
    styl.top = e.offsetY + 'px';
    e.preventDefault();
  }

  hide() {
    this.el.style.display = 'none';
  }

  items(includeSeparator: boolean = true) {
    return includeSeparator ? this.el.querySelectorAll('az-menu-item') : this.el.querySelectorAll('az-menu-item:not(.separator)');
  }

  insertItem(index: number, caption: string, icon?: string, action?: string, includeSeparator?: boolean) {
    const item = document.createElement('az-menu-item');
    item.caption = caption;
    item.icon = icon;
    item.action = action;

    const items = this.items(includeSeparator);
    if (index < 0) index = 0;
    if (index >= items.length) index = items.length - 1;
    return items[index].insertAdjacentElement('afterend', item);
  }

  removeItem(index: number, includeSeparator?: boolean) {
    const items = this.items(includeSeparator);
    if (index < 0) throw new RangeError('index must be greater than or equal to zero');
    if (index >= items.length) throw new RangeError('index must be less than or equal to items length');
    const item = items[index];
    item.parentNode.removeChild(item);
  }

  render() {
    return (
      <Host class="az-context-menu">
        <slot></slot>
      </Host>
    );
  }
}