import { Component, Prop, Element, h } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { draggable } from '../../utils/draggable';

@Component({
  tag: 'az-dialog',
  styleUrl: 'az-dialog.styl',
  shadow: false
})
export class AzDialog {
  @Element() el: HostElement;

  @Prop() caption: string = '';
  @Prop() fixed: boolean = false;

  popover: HTMLAzPopoverElement;
  head: HTMLElement;

  componentDidLoad() {
    if (!this.fixed) draggable(this.popover, this.head);
  }

  render() {
    return (
      <az-popover class="az-dialog center" ref={el => this.popover = el}>
        <div ref={el => this.head = el} class="az-dialog__header">
          <span class="az-dialog__title">{this.caption}</span>
          <span class="az-dialog__icons">
            <az-icon icon="close" onclick={() => this.popover.close()}></az-icon>
          </span>
        </div>
        <div class="az-dialog__body">
          <slot></slot>
        </div>
        <div class="az-dialog__footer">
          <slot name="footer">
            <az-button class="mini" caption="OK" onclick={() => this.popover.close('ok')}>
              <az-icon icon="check"></az-icon>
            </az-button>
            <az-button class="mini" caption="Cancel" onclick={() => this.popover.close('cancel')}>
              <az-icon icon="close"></az-icon>
            </az-button>
            </slot>
        </div>
      </az-popover>
    );
  }
}