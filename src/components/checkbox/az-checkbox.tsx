import { Component, Element, Prop, Host, h, Event, EventEmitter, Method} from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { Inject } from '../../utils/utils';

@Component({
  tag: 'az-checkbox',
  styleUrl: 'az-checkbox.styl',
  shadow: false
})
export class AzCheckbox {
  @Element() el: HostElement;
  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) checked: boolean = false;
  @Prop({reflect: true}) indeterminate: boolean = false;

  @Event() changed: EventEmitter;

  @Inject({})
  componentDidLoad () {}

  @Method()
  async toggle() {
    if (this.indeterminate) {
      this.checked = false;
      this.indeterminate = false;
      return;
    }
    this.checked = !this.checked;
    this.changed.emit(this.checked);
  }

  @Method()
  async toJson(detailed: boolean = false) {
    return Object.assign({
      tag: 'az-checkbox',
      caption: this.caption,
      checked: this.checked
    }, detailed ? {
      indeterminate: this.indeterminate
    } : null);
  }

  render () {
    return <Host onClick={() => this.toggle()}>
      <i class={{
        'az-checkbox__box': true,
        'checked': this.checked
      }}>
        {this.indeterminate && <az-icon class="minus" icon="minus"></az-icon>}
        {this.indeterminate || <az-icon class="check" icon="check"></az-icon>}
      </i>
      <slot>
        <span class="az-checkbox-caption az-caption">
          {this.caption}
        </span>
      </slot>
    </Host>;
  }
}