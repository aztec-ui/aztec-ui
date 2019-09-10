import { Component, Prop, h } from '@stencil/core';
import { ComponentStyleType } from '../../global/typing';

@Component({
  tag: 'az-toolbar-button',
  styleUrl: './az-toolbar-button.styl'
})
export class AzToolbarButton {
  @Prop() caption: string = '';
  @Prop() type: ComponentStyleType = '';
  @Prop() icon: string = '';
  render() {
    return (
      <az-button class="mini" caption={this.caption} type={this.type}>
        <az-icon icon={this.icon} slot="before"></az-icon>
      </az-button>
    );
  }
}
