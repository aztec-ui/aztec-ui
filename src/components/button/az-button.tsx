import { Component, Prop, Element, Host, h } from '@stencil/core';
import { ComponentStyle, ComponentSize} from '../../global/typing';
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
  @Prop({reflect: true}) type: ComponentStyle = 'primary';
  @Prop({reflect: true}) icon: string = '';
  @Prop({reflect: true}) size: ComponentSize = 'normal';
  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) iconPosition: string = 'left';
  @Prop({reflect: true}) disabled: boolean = false;

  @Inject({
    attrs: true,
    remove: true,
    keep: ['caption', 'type', 'size', 'icon', 'icon-position']
  })
  componentDidLoad() {
    if (!this.type) this.type = 'primary';
    if (!this.size) this.size = 'normal';
    if (!this.iconPosition) this.iconPosition = 'left';
    if (this.disabled == null) this.disabled = false;
  }

  render() {
    let iconLeft = this.icon && this.iconPosition === 'left' ? <az-icon class="left" icon={this.icon}></az-icon> : null;
    let iconRight = this.icon && this.iconPosition === 'right' ? <az-icon class="right" icon={this.icon}></az-icon> : null;
    if (this.size === 'extra-small') {
      iconLeft = iconRight = null;
      console.warn(`<az-button size="extra-small" /> can not have icon`);
    }
    return (
      <Host>
        <button class={{
          [this.type]: true,
          [this.size]: true
        }}>
          <slot name="before">{iconLeft}</slot>
          {this.caption && <span class="az-button-caption az-caption">{this.caption}</span>}
          <slot></slot>
          <slot name="after">{iconRight}</slot>
        </button>
      </Host>
    );
  }
}
