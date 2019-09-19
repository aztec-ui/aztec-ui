import { Component, Element, Prop, h, Event, EventEmitter} from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { Inject } from '../../utils/utils';

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

  @Event() changed: EventEmitter;

  @Inject({
    sync: ['toggle']
  })
  componentDidLoad () {}

  toggle() {
    if (this.indeterminate) {
      this.checked = false;
      this.indeterminate = false;
      return;
    }
    this.checked = !this.checked;
    this.changed.emit(this.checked);
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
      <slot>
        <span class="az-checkbox-caption az-caption" onClick={() => this.toggle()}>
          {this.caption}
        </span>
      </slot>
    ];
  }
}