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
  @Prop({reflect: true}) direction: 'vertical' | 'horizontal' = 'vertical';

  render () {
    const styl = {};
    if (this.basis) styl['flex-basis'] = this.basis;
    if (this.direction) styl['flex-direction'] = this.direction === 'vertical' ? 'column' : 'row';
    const cls = {
      'az-panel': true,
      [this.direction]: true
    };
    return (
      <Host class={cls} style={styl}>
        {this.caption && <legend>{this.caption}</legend>}
        <slot></slot>
      </Host>
    );
  }
}