import { Component, Prop, Element, h, Watch, Host} from '@stencil/core';
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
  @Prop({reflect: true}) clearable = false;

  @Prop() autocomplete: string = 'off';
  @Prop() autocorrect: string = 'off';
  @Prop() autocapitalize: string = 'off';
  @Prop() spellcheck: boolean = true;

  native: HTMLInputElement;
  clearButton: HTMLAzIconElement;

  @Inject({
    attrs: true,
    parse: false,
    sync: ['clear']
  })
  componentDidLoad() {
    this.autocapitalize
    this.native.addEventListener('change', () => {
      this.value = this.native.value;
    });
    this.native.addEventListener('keyup', () => {
      if (this.clearable) this.setClearButtonDisplay();
    });
  }

  @Watch('value')
  onValueChange(newValue, oldValue) {
    if (oldValue !== newValue) {
      this.native.value = newValue;
    }
  }

  clear() {
    this.value = '';
    this.setClearButtonDisplay();
  }

  setClearButtonDisplay () {
    this.clearButton.style.display = this.native.value && this.native.value.length > 0 ? '' : 'none';
  }

  render() {
    return (<Host>
      {this.caption && <span class="az-input-caption az-caption">{this.caption}</span>}
      <input ref={el => this.native = el} type={this.type} value={this.value}
        autocomplete={this.autocomplete}
        autocorrect={this.autocorrect}
        autocapitalize={this.autocapitalize}
        spellcheck={this.spellcheck}
      >
      </input>
      <az-icon ref={el => this.clearButton = el}
        style={{display: this.clearable && this.value && this.value.length > 0 ? '' : 'none'}}
        class="clear"
        icon="circle-cross"
        onClick={() => this.clear()}>
      </az-icon>
    </Host>);
  }
}