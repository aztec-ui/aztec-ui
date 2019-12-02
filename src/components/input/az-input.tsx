import { Component, Prop, Element, h, Watch, Host, Method} from '@stencil/core';
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
  @Prop({reflect: true}) popupalign = 'left top';

  @Prop() autocomplete: string = 'off';
  @Prop() autocorrect: string = 'off';
  @Prop() autocapitalize: string = 'off';
  @Prop() spellcheck: boolean = true;
  @Prop() readonly: boolean = false;

  native: HTMLInputElement;
  clearButton: HTMLAzIconElement;
  nativeType: string;
  colorPicker: HTMLAzColorPickerElement;

  @Inject({
    attrs: true,
    parse: false,
    sync: ['clear', 'native']
  })
  componentDidLoad() {
    this.native.addEventListener('change', () => {
      this.value = this.native.value;
    });
    this.native.addEventListener('keyup', () => {
      if (this.clearable) this.setClearButtonDisplay();
    });
    this.native.addEventListener('mousedown', () => {
      if (this.type !== 'color-picker' || !this.colorPicker) return;
      if (this.colorPicker.color != this.value) {
        this.colorPicker.color = this.value;
      }
      this.colorPicker.style.display = 'inline-block';
    });
    document.addEventListener('click', (e: MouseEvent) => {
      if (this.type !== 'color-picker' || !this.colorPicker) return;
      if ((e.target as HTMLElement).closest('az-input')) return;
      this.colorPicker.style.display = 'none';
    });
    if (this.colorPicker) {
      this.colorPicker.addEventListener('changed', (e: any) => {
        this.value = e.detail;
      });
    }
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
    if (this.type === 'color-picker' && this.colorPicker) {
      this.colorPicker.style.display = 'none';
    }
  }

  @Method()
  async toJson(detailed: boolean = false) {
    return Object.assign({
      tag: 'az-input',
      caption: this.caption,
      value: this.value
    }, detailed ? {
      type: this.type,
      clearable: this.clearable
    } : null);
  }

  render() {
    this.nativeType = this.type === 'color-picker' ? 'text' : this.type;
    const colorPicker = this.type === 'color-picker'
      && <az-color-picker showinput={false} ref={el => this.colorPicker = el} class={`color-picker ${this.popupalign}`}></az-color-picker>
    return (<Host>
      {colorPicker}
      {this.caption && <span class="az-input-caption az-caption">{this.caption}</span>}
      <input ref={el => this.native = el} type={this.nativeType} value={this.value}
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