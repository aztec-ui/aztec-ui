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
  @Prop() type: ComponentStyleType = 'plain';

  @Inject({
    attrs: true
  })
  componentDidLoad() {}

  render() {
    return (
      <button class={{
        'az-button': true,
        [this.type]: true
      }}>
        <slot name="before"></slot>
        <span class="caption">
          <slot></slot>
        </span>
        <slot name="after"></slot>
      </button>
    );
  }
}
