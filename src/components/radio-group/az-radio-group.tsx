import { Component, Prop, Element, Host, h } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';

@Component({
  tag: 'az-radio-group',
  styleUrl: 'az-radio-group.styl',
  shadow: false
})
export class AzRadioGroup {
  @Element() el: HostElement;

  @Prop() caption: string = '';

  componentDidLoad() {
    this.onItemChanged = this.onItemChanged.bind(this);
    this.el.addEventListener('changed', this.onItemChanged);
  }

  onItemChanged(e: UIEvent) {
    const items = Array.from(this.el.querySelectorAll('az-radio')) as HTMLAzRadioElement[];
    if (!items || !items.length) return;
    items.forEach((radio) => {
      if (e.target !== radio) radio.checked = false;
    });
  }

  render() {
    return (
      <Host class="radio-group">
        <slot></slot>
      </Host>
    );
  }
}