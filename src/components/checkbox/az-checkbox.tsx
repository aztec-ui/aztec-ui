import { Component, Element, Prop, Method, h} from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';

@Component({
  tag: 'az-checkbox',
  styleUrl: 'az-checkbox.styl',
  shadow: false
})
export class AzCheckbox {
  @Element() el: HostElement;
  @Prop() caption: string = '';
  @Prop() checked: boolean = false;

  render () {
    return [
      <i class={{
        'az-checkbox-box': true,
        'checked': this.checked
      }} onClick={() => this.toggle()}>
        <az-icon icon="check"></az-icon>
      </i>,
      <span class="az-checkbox-label" onClick={() => this.toggle()}><slot></slot></span>
    ];
  }
  toggle() {
    this.checked = !this.checked;
  }
}