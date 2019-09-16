
import { Component, Prop, Element, Host, h, State } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import parseColor from 'parse-color';
import colorConvert from 'color-convert';

@Component({
  tag: 'az-color-picker',
  styleUrl: 'az-color-picker.styl',
  shadow: false
})
export class AzColorPicker {
  @Element() el: HostElement;

  @Prop() caption: string = '';
  @Prop() color: string = '#f00';
  @State() curColor: string = '#ff0000';
  @State() strawLeft: number = 0;
  @State() strawTop: number = 0;
  @State() dragging: boolean = false;
  @State() transparency: number = 100;

  @State() hue: number = 0;
  @State() saturation: number = 1
  @State() value: number = 1;

  panel: HTMLDivElement;
  input: HTMLInputElement;

  constructor() {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }
  componentDidLoad() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    // @ts-ignore
    this.el.format = this.format.bind(this);
    this.parseCssString(this.color);
  }

  onMouseDown() {
    this.dragging = true;
  }

  onMouseMove(e: MouseEvent) {
    if (this.dragging) {
      this.update(e);
    }
  }

  onMouseUp(e: MouseEvent) {
    if (!this.dragging) return;
    this.update(e);
    this.dragging = false;
  }
  update(e: MouseEvent) {
    const rect = this.panel.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.saturation = confine(Math.ceil(x / rect.width * 100), 0, 100);
    this.value = confine(Math.floor(100 - y / rect.height * 100), 0, 100);

    this.strawLeft = confine(x, 0, rect.width);
    this.strawTop = confine(y, 0, rect.height);
    this.el.forceUpdate();
    this.calcColorString();
  }
  calcColorString() {
    const str = this.color;
    if (str.indexOf('rgb') === 0) {
      const c = colorConvert.hsv.rgb(this.hue, this.saturation, this.value);
      this.color = `rgba(${c[0]},${c[1]},${c[2]},${this.transparency / 100})`;
    } else if (str.indexOf('hsl') === 0) {
      const c = colorConvert.hsv.hsl(this.hue, this.saturation, this.value);
      const aa = this.transparency / 100;
      this.color = `hsla(${c[0]},${c[1]}%,${c[2]}%,${aa})`
    } else {
      this.color = this.getColorHex(true);
    }
  }

  onHueChange(e: Event) {
    this.hue = parseInt((e.target as HTMLInputElement).value, 10);
    this.curColor = this.getColorHex(false, this.hue, 100, 100);
    this.calcColorString();
  }

  onTransparentcyChange(e: Event) {
    this.transparency = parseInt((e.target as HTMLInputElement).value, 10);
    this.calcColorString();
  }

  onCssStringChange(e: Event): void {
    const str = (e.target as HTMLInputElement).value.trim();
    this.parseCssString(str);
  }

  getColorHex(withTransparentcy = false, hue = this.hue, sat = this.saturation, val = this.value) {
    const a = withTransparentcy ? (Math.floor(255 * this.transparency / 100)).toString(16) : '';
    const aa = (a.length > 1 ) ? a : `0${a}`;
    return '#' + colorConvert.hsv.hex(hue, sat, val).toLowerCase() + ((aa === '0' || aa === 'ff') ? '' : aa);
  }

  parseCssString(str: string) {
    const result = parseColor(str);
    if (!result.hsv) {
      // @ts-ignore
      this.input.native.value = this.color;
      return;
    }
    this.hue = result.hsv[0];
    this.saturation = result.hsv[1];
    this.value = result.hsv[2];
    this.transparency = Math.floor(result.rgba[3] * 100);
    this.curColor = result.hex;
    const rect = this.panel.getBoundingClientRect();
    this.strawLeft = Math.floor((this.saturation / 100) * rect.width);
    this.strawTop = Math.floor((1 - this.value / 100) * rect.height);
  }

  format(e: MouseEvent | string) {
    let result: string;
    if (typeof e === 'string' || (e instanceof MouseEvent && e.shiftKey)) {
      const str = this.color;
      if (e == 'hsl' || e === 'hsla' || str.indexOf('rgb') === 0) {
        const c = colorConvert.hsv.hsl(this.hue, this.saturation, this.value);
        const aa = this.transparency / 100;
        result = `hsla(${c[0]},${c[1]}%,${c[2]}%,${aa})`
      } else if (e === 'hex' || str.indexOf('hsl') === 0) {
        result = this.getColorHex(true);
      } else {
        const c = colorConvert.hsv.rgb(this.hue, this.saturation, this.value);
        result = `rgba(${c[0]},${c[1]},${c[2]},${this.transparency / 100})`;
      }
      if (typeof e === 'string') {
        return result;
      } else {
        this.color = result;
      }
    }
  }

  selectAll(e: MouseEvent) {
    // @ts-ignore
    this.input.native.select();
    if (e.metaKey || e.ctrlKey) {
      document.execCommand('copy');
    }
  }

  render() {
    return (
      <Host>
        <div class="az-color-picker_panel"
          ref={(el) => this.panel = el}
          onMouseDown={this.onMouseDown}
          style={{backgroundColor: this.curColor}}>
          <div class="az-color-picker_straw" style={{left: `${this.strawLeft}px`, top: `${this.strawTop}px`}}></div>
        </div>
        <div>
          <az-slider class="spectrum-h" min="0" max="360" value={this.hue} onInput={(e) => this.onHueChange(e)}></az-slider>
          <az-slider class="checkerboard" min="0" max="100" value={this.transparency} onInput={(e) => this.onTransparentcyChange(e)}></az-slider>
          <div class="az-color-picker_value">
            <span class="az-color-picker_current-color"
              onClick={() => this.format(new MouseEvent('click',{shiftKey: true}))}>
              <i style={{backgroundColor: this.color, opacity: `${this.transparency / 100}`}}></i>
            </span>
            <az-input class="az-color-picker_color-value" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck={false}
              ref={(el: any) => this.input = el}
              type="text"
              value={this.color}
              onDblClick={(e) => this.selectAll(e)}
              onClick={(e) => this.format(e)}
              onChange={(e) => this.onCssStringChange(e)}></az-input>
          </div>
        </div>
      </Host>
    );
  }
}

const confine = (value: number, min:number, max: number) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};