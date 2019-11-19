import {Component, Prop, Host, h} from '@stencil/core';

@Component({
  tag: 'az-panel',
  styleUrl: 'az-panel.styl',
  shadow: false
})
export class AzPanel {
  @Prop({reflect: true}) caption: string;
  @Prop({reflect: true}) basis: string = '';
  @Prop({reflect: true}) maxWidth: string = '';
  @Prop({reflect: true}) minWidth: string = '';
  @Prop({reflect: true}) maxHeight: string = '';
  @Prop({reflect: true}) minHeight: string = '';

  render () {
    const styl = {};
    if (this.basis) styl['flex-basis'] = this.basis;
    return (
      <Host class="az-panel" style={styl}>
        {this.caption && <legend>{this.caption}</legend>}
        <slot></slot>
      </Host>
    );
  }
}