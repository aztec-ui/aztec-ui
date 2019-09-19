import { Component, Prop, Element, h, Event, EventEmitter } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { ComponentStyle, ComponentSize } from '../../global/typing';

@Component({
  tag: 'az-switch',
  styleUrl: 'az-switch.styl',
  shadow: false
})
export class AzSwitch {
  @Element() el: HostElement;

  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) type: ComponentStyle = 'primary';
  @Prop({reflect: true}) value: boolean = false;
  @Prop({reflect: true}) size: ComponentSize = 'normal';

  @Event() changed: EventEmitter;

  componentDidLoad() {
    this.bind();
  }

  bind() {
    this.el.addEventListener('click', () => this.onClick());
  }

  onClick() {
    this.changed.emit(this.value = !this.value);
  }

  render() {
    const cap = this.caption ? <span class="az-switch__caption az-caption">{this.caption}</span> : null;
    const vdom = [<span class={{[this.type]: true, [this.size]: true, button: true, on: this.value, off: !this.value}}></span>];
    if (cap) vdom.unshift(cap);
    return vdom;
  }
}