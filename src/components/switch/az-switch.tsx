import { Component, Prop, Element, h, Event, EventEmitter } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';

@Component({
  tag: 'az-switch',
  styleUrl: 'az-switch.styl',
  shadow: false
})
export class AzSwitch {
  @Element() el: HostElement;

  @Prop() caption: string = '';
  @Prop({reflect: true}) value: boolean = false;

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
    const vdom = [<span class={{button: true, on: this.value, off: !this.value}}></span>];
    if (cap) vdom.unshift(cap);
    return vdom;
  }
}