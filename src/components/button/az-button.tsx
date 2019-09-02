import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'az-button',
  styleUrl: 'az-button.styl',
  shadow: true
})
export class AzButton {
  /**
   * Button caption
   */
  @Prop() caption: string;
  @Prop() iconPosition: string = 'left';
  render() {
    return (
      <button>
        {this.iconPosition === 'left' && <slot name="icon"></slot>}
        {this.caption}
        {this.iconPosition === 'right' && <slot name="icon"></slot>}
      </button>
    );
  }
}
