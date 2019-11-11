import { Component, Prop, Element, Host, Event, EventEmitter, h } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';

@Component({
  tag: 'az-menu-item',
  styleUrl: 'az-menu-item.styl',
  shadow: false
})
export class AzMenuItem {
  @Element() el: HostElement;

  @Prop() caption: string = '';
  @Prop() icon: string = '';
  @Prop() action: string = '';

  @Event() selected: EventEmitter;

  componentDidLoad() {}

  onClick() {
    this.selected.emit(this.action);
  }

  render() {
    if (this.caption === '-') {
      return <Host class="az-menu-item az-menu-item__separator separator"></Host>
    } else {
      return (
        <Host class="az-menu-item" onClick={() => this.onClick()}>
          {this.icon && <az-icon icon={this.icon} />}
          <span class="az-caption">{this.caption}</span>
        </Host>
      );
    }
  }
}