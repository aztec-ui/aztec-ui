import { Component, Prop, Element, Watch, Host, h} from '@stencil/core';
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
  @Prop({reflect: true}) indicator: boolean = true;

  indicatorEl: HTMLDivElement;

  @Watch('activeIndex')
  onActiveIndexChanged(newIndex: number, oldIndex: number) {
    const slot = this.el.querySelector('content') as HTMLElement;
    const children = slot.children;
    if (!children || children.length === 0) return;
    if (children[oldIndex]) children[oldIndex].classList.remove('visible');
    if (children[newIndex]) children[newIndex].classList.add('visible');
    
    const activeTab = this.el.querySelectorAll('li')[newIndex] as HTMLLIElement;
    if (activeTab) {
      const left = activeTab.offsetLeft;
      const width = activeTab.getBoundingClientRect().width;
      this.indicatorEl.style.left = `${left}px`;
      this.indicatorEl.style.width = `${width}px`;
    }
  }

  @Inject({
    style: false,
    attrs: false,
    parse: true,
    sync: ['addItem', 'removeItem', 'removeItemAt']
  })
  connectedCallback(){
    this.el.componentOnReady().then(() => this.onActiveIndexChanged(this.activeIndex, 0));
  }

  addItem(it: any) {
    this.items = [...this.items, it];
    this.el.forceUpdate();
  }

  removeItem(it: any) {
    const pos = this.items.findIndex(item => item === it);
    this.items.splice(pos, 1);
  }

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
    return <Host>
      <div class="az-tabs__tabs">
        <ul>
          {tabs}
          <div ref={el => this.indicatorEl = el} class="az-tabs__indicator"></div>
        </ul>
      </div>
      <content>
        <slot></slot>
      </content>
    </Host>;
  }
}