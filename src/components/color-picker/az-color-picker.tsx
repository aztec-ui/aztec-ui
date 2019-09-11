
import { Component, Prop, Element, Host, h, State } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';

@Component({
  tag: 'az-color-picker',
  styleUrl: 'az-color-picker.styl',
  shadow: false
})
export class AzColorPicker {
  @Element() el: HostElement;

  @Prop() caption: string = '';
  @Prop() color: string = '#f00';

  @State() left: number = 0;
  @State() top: number = 0;
  @State() dragging: boolean = false;
  @State() transparency: number = 100;
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
    this.left = e.offsetX;
    this.top = e.offsetY;
    this.el.forceUpdate();
  }

  render() {
    return (
      <Host>
        <div class="az-color-picker_panel"
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          style={{backgroundColor: this.color}}>
          <div class="az-color-picker_straw" style={{left: `${this.left}px`, top: `${this.top}px`}}></div>
        </div>
        <div>
          <az-slider class="spectrum-h"></az-slider>
          <az-slider class="checkerboard" value={this.transparency}></az-slider>
          <div class="az-color-picker_value">
            <span class="az-color-picker_current-color" style={{backgroundColor: this.color}}></span>
            <az-input class="az-color-picker_color-value" type="text" value={this.color}></az-input>
          </div>
        </div>
      </Host>
    );
  }
}