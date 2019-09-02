import { Component, Prop, h } from '@stencil/core';
import { ComponentStyleType} from '../../global/typing';

@Component({
  tag: 'az-button',
  styleUrl: 'az-button.styl',
  shadow: true
})
export class AzButton {
  /**
   * Button type
   */
  @Prop() type: ComponentStyleType = ComponentStyleType.Plain;

  render() {
    return (
      <button class={this.type}>
        <slot name="before"></slot>
        <span class="caption">
          <slot></slot>
        </span>
        <slot name="after"></slot>
      </button>
    );
  }
}
