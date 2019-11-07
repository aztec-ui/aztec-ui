import { Component, Prop, Element, Host, Watch, State, Event, EventEmitter, h } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';

@Component({
  tag: 'az-toolbar',
  styleUrl: 'az-toolbar.styl',
  shadow: false
})
export class AzToolbar {
  @Element() el: HostElement;

  @Prop() caption: string = '';
  @Prop() direction: string = 'horizontal';

  componentDidLoad() {}

  render() {
    return (
      <Host class={`az-toolbar ${this.direction}`}>
      </Host>
    );
  }
}