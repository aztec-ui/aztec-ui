
import { Component, Prop, Element, h, Method, Host, Event, EventEmitter } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { AzTreeItem } from './az-tree-item';

@Component({
  tag: 'az-tree',
  styleUrl: 'az-tree.styl',
  shadow: false
})
export class AzTree {
  @Element() el: HostElement;
  @Prop() caption: string = '';
  @Prop() selecting: boolean = false;
  @Prop() roots: AzTreeItem[] = [];

  @Event() selected: EventEmitter;
  @Event() expanded: EventEmitter;
  @Event() collapsed: EventEmitter;
  @Event() inserted: EventEmitter;

  @Method()
  async addItem(itemOrCaption: AzTreeItem | string, parent: AzTreeItem | number = null, attrs: any = {}) {
    let item: AzTreeItem;
    if (typeof itemOrCaption === 'string') {
      item = new AzTreeItem(itemOrCaption);
    } else if (itemOrCaption instanceof AzTreeItem){
      item = itemOrCaption;
    }
    if (!item) return;
    item.tree = this;
    Object.assign(item, attrs);
    if (parent === null) {
      this.roots = [...this.roots, item];
      this.inserted.emit(item);
      return;
    } else if (typeof parent === 'number') {
      parent = this.roots[parent];;
    }
    item.parent = parent;
    item.level = parent.level + 1;
    parent.items = [...parent.items, item];
    this.el.forceUpdate();
    this.inserted.emit(item);
    return item;
  }

  render() {
    return <Host>
      {this.roots.map((c: AzTreeItem) => c.render())}
    </Host>
  }
}