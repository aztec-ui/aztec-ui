
import { Component, Prop, Element, h, Method } from '@stencil/core';
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

  @Method()
  async addItem(itemOrCaption: AzTreeItem | string, parent: AzTreeItem = null) {
    let item: AzTreeItem;
    if (typeof itemOrCaption === 'string') {
      item = new AzTreeItem(itemOrCaption);
    } else if (itemOrCaption instanceof AzTreeItem){
      item = itemOrCaption;
    }
    if (!item) return;
    item.tree = this;
    if (!parent) {
      if (!this.roots.length) {
        this.roots = [...this.roots, item];
        return;
      }
      parent = this.roots[this.roots.length - 1];
    }
    item.level = parent.level + 1;
    parent.items = [...parent.items, item];
    this.el.forceUpdate();
    return item;
  }

  componentDidLoad() {}

  render() {
    return this.roots.map((c: AzTreeItem) => <az-tree-item data-id="0">{c.render()}</az-tree-item>);
  }
}