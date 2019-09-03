import { Component, Prop, Element, h } from '@stencil/core';
import { ComponentStyleType} from '../../global/typing';
import { migrateAttributes } from '../../utils/utils';
import { HostElement } from '@stencil/core/dist/declarations';

@Component({
  tag: 'az-button',
  styleUrl: 'az-button.styl',
  shadow: true
})
export class AzButton {
  @Element() el: HostElement;
  /**
   * Button type
   */
  @Prop() type: ComponentStyleType = 'plain';

  componentDidLoad() {
    migrateAttributes(this.el);
  }

  render() {
    return (
      <button class={{
        'az-button': true,
        [this.type]: true
      }} {...this.el.attributes}>
        <slot name="before"></slot>
        <span class="caption">
          <slot></slot>
        </span>
        <slot name="after"></slot>
      </button>
    );
  }
}
