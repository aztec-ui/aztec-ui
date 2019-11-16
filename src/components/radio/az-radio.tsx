import { Component, Prop, Element, Host, Event, EventEmitter, h, Method } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { Inject } from '../../utils/utils';
import { ComponentStyle } from '../../global/typing';

@Component({
  tag: 'az-radio',
  styleUrl: 'az-radio.styl',
  shadow: false
})
export class AzRadio {
  @Element() el: HostElement;

  @Prop() caption: string = '';
  @Prop() type: ComponentStyle = 'plain';
  @Prop() checked: boolean = false;

  @Event() changed: EventEmitter;  

  @Inject({})
  componentDidLoad () {}

  @Method()
  async toggle() {
    this.checked = !this.checked;
    this.changed.emit(this.checked);
  }

  render() {
    return <Host class="radio" onClick={() => this.toggle()}>
      <i class={{
        'az-radio__box': true,
        [this.type]: true,
        'checked': this.checked
      }}>
      </i>
      <slot>
        <span class="az-radio-caption az-caption">
          {this.caption}
        </span>
      </slot>
    </Host>;
  }
}