
import { Component, Prop, Element, Host, h, State } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
// import { ColorConvert } from 'color-convert';

@Component({
  tag: 'az-color-picker',
  styleUrl: 'az-color-picker.styl',
  shadow: false
})
export class AzColorPicker {
  @Element() el: HostElement;

  @Prop() caption: string = '';
  @Prop() color: string = '#f00';

  @State() strawLeft: number = 0;
  @State() strawTop: number = 0;
  @State() dragging: boolean = false;
  @State() transparency: number = 100;

  @State() hue: number = 0;
  @State() saturation: number = 1
  @State() value: number = 1;

  panel: HTMLDivElement;

  constructor() {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }
  componentDidLoad() {}

  onMouseDown() {
    this.dragging = true;
  }

  onMouseMove(e: MouseEvent) {
    if (this.dragging) {
      this.update(e);
    }
  }

  onMouseUp(e: MouseEvent) {
    this.update(e);
    this.dragging = false;
  }
  update(e: MouseEvent) {
    const rect = this.panel.getBoundingClientRect();
    this.saturation = confine(Math.ceil(e.offsetX / rect.width * 100), 0, 100);
    this.value = confine(Math.floor(100 - e.offsetY / rect.height * 100), 0, 100);
    
    this.strawLeft = e.offsetX;
    this.strawTop = e.offsetY;
    this.el.forceUpdate();
  }

  onHueChange(e) {
    this.hue = parseInt(e.target.value, 10);
  }

  onTransparentcyChange(e) {
    this.transparency = parseInt(e.target.value, 10);
  }

  render() {
    return (
      <Host>
        <div class="az-color-picker_panel"
          ref={(el) => this.panel = el}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          style={{backgroundColor: this.color}}>
          <div class="az-color-picker_straw" style={{left: `${this.strawLeft}px`, top: `${this.strawTop}px`}}></div>
        </div>
        <div>
          <az-slider class="spectrum-h" min="0" max="360" onChange={(e) => this.onHueChange(e)}></az-slider>
          <az-slider class="checkerboard" min="0" max="100" value={this.transparency} onChange={(e) => this.onTransparentcyChange(e)}></az-slider>
          <div class="az-color-picker_value">
            <span class="az-color-picker_current-color" style={{backgroundColor: this.color}}></span>
            <az-input class="az-color-picker_color-value" type="text" value={this.color}></az-input>
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