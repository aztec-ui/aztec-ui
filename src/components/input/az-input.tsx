import { Component, Prop, Element, h, Watch} from '@stencil/core';
import { Inject } from '../../utils/utils';
import { HostElement } from '@stencil/core/dist/declarations';

@Component({
  tag: 'az-input',
  styleUrl: 'az-input.styl',
  shadow: false
})
export class AzInput {
  @Element() el: HostElement;
  @Prop() caption: string = '';
  @Prop() type: string = '';
  @Prop() value: string = '';
  @Prop() native: HTMLInputElement;

  @Prop() autocomplete: 'on' | 'off' = 'on';
  @Prop() autocorrect: 'on' | 'off' = 'on';
  @Prop() autocapitalize: 'on' | 'off' = 'on';
  @Prop() spellcheck: boolean = true;

  @Inject({
    attrs: true,
    parse: false
  })
  componentDidLoad() {
    this.native.addEventListener('change', () => {
      this.value = this.native.value;
    });
  }

  @Watch('value')
  onValueChange(newValue, oldValue) {
    if (oldValue !== newValue) {
      this.native.value = newValue;
    }
  }

  render() {
    return [
      (this.caption && <span class="az-input-caption az-caption">{this.caption}</span>),
      <input ref={el => this.native = el} type={this.type} value={this.value}></input>
    ];
  }
}