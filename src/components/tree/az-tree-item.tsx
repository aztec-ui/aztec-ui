import { h } from '@stencil/core';
import { AzTree } from './az-tree';

interface IAzTreeItem extends HTMLDivElement {
  addItem(item: string);
  removeItemAt(index: number);
  removeItem(item: AzTreeItem);
  remove();
  toggle();
  items: AzTreeItem[];
}
export class AzTreeItem {
  parent: AzTreeItem;
  caption: string = '';
  icon: string = '';
  items: AzTreeItem[] = [];
  selected: false;
  tree: AzTree = null;
  level: number = 0;
  html: string = '';
  _expanded: boolean = true;

  get expanded() {
    return this._expanded;
  }
  set expanded(val) {
    this._expanded = val;
    if (this._expanded) {
      this.tree.expanded.emit(this);
    } else {
      this.tree.collapsed.emit(this);
    }
    this.tree.el.forceUpdate();
  }

  data: any = null;

  constructor(caption: string, level: number = 0) {
    this.caption = caption;
    this.level = level;
  }

  addItem(item: AzTreeItem | string) {
    if (!this.tree) {
      throw new Error(`No parent tree!`);
    }
    this.tree.addItem(item, this);
  }

  remove() {
    if (this.parent) {
      this.parent.removeItem(this);
    } else {
      const pos = this.tree.roots.findIndex(it => it === this);
      if (pos >= 0) this.tree.roots.splice(pos, 1);
      this.tree.el.forceUpdate();
    }
  }

  removeItem(item: AzTreeItem) {
    const pos = this.items.findIndex(it => it === item);
    if (pos >= 0) {
      this.removeItemAt(pos);
    }
  }

  removeItemAt(index: number) {
    this.items.splice(index, 1);
    this.tree.el.forceUpdate();
  }

  toggle() {
    this.expanded = !this.expanded
    this.tree.selected.emit(this)
  }

  render() {
    // styles
    const style: any = {};
    const cls = {
      'az-tree-item': true,
      expanded: this.expanded,
      collapsed: !this.expanded
    }
    if (this.level) style.paddingLeft = `${(this.level) * 12}px`;

    // methods
    const toggle = this.toggle.bind(this);
    const self = this;
    const inject = (el: IAzTreeItem) => {
      if (!el || el.items) return;
      el.addItem = this.addItem.bind(this);
      el.removeItemAt = this.removeItemAt.bind(this);
      el.removeItem = this.removeItem.bind(this);
      el.remove = this.remove.bind(this);
      el.toggle = toggle;
      el.items = self.items;
    }

    // parts
    const joint = <az-icon class={{joint: true, hide: this.items.length <= 0}} width="9" height="9" icon="triangle" onClick={toggle}></az-icon>;
    const icon = this.icon ? <az-icon icon={this.icon}></az-icon> : null;
    const checkbox = (this.tree && this.tree.selecting) ? <az-checkbox></az-checkbox> : null;
    const text = this.html
      ? <span innerHTML={this.html}></span>
      : <span>{this.caption}</span>
    // render
    return (
      <div class={cls} data-level={this.level} ref={inject}>
        <div class="az-tree-item-caption az-caption"style={style} onClick={toggle}>
          {joint}{checkbox}{icon}{text}
        </div>
        <div class="az-tree-item-children">
          {this.items.map((c: AzTreeItem) => c.render())}
        </div>
      </div>
    );
  }
}