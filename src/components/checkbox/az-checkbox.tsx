import { Component, Element, Prop, Method, h, Watch} from '@stencil/core';
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
  @Prop() indeterminate: boolean = false;

  @Method()
  toggle() {
    if (this.indeterminate) {
      this.checked = false;
      this.indeterminate = false;
      return;
    }
    this.checked = !this.checked;
  }

  render () {
    return [
      <i class={{
        'az-checkbox-box': true,
        'checked': this.checked
      }} onClick={() => this.toggle()}>
        {this.indeterminate && <az-icon class="minus" icon="minus"></az-icon>}
        {this.indeterminate || <az-icon class="check" icon="check"></az-icon>}
      </i>,
      <span class="az-checkbox-caption az-caption" onClick={() => this.toggle()}><slot></slot></span>
    ];
  }
}