import { Component, Prop, Element, h } from '@stencil/core';
import { ComponentStyleType} from '../../global/typing';
import { HostElement } from '@stencil/core/dist/declarations';
import { Inject } from '../../utils/utils';

@Component({
  tag: 'az-button',
  styleUrl: 'az-button.styl',
  shadow: false
})
export class AzButton {
  @Element() el: HostElement;
  /**
   * Button type
   */
  @Prop() type: ComponentStyleType = '';

  @Prop() caption: string = '';

  @Inject({
    attrs: true
  })
  componentDidLoad() {}

  render() {
    return (
      <button class={{
        [this.type]: true
      }}>
        <slot name="before"></slot>
        {this.caption && <span class="az-button-caption az-caption">{this.caption}</span>}
        <slot></slot>
        <slot name="after"></slot>
      </button>
    );
  }
}
