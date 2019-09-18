import { Component, Prop, Element, h, Host, Event, EventEmitter } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { draggable } from '../../utils/draggable';
import { Inject } from '../../utils/utils';

@Component({
  tag: 'az-dialog',
  styleUrl: 'az-dialog.styl',
  shadow: false
})
export class AzDialog {
  @Element() el: HostElement;

  @Prop() caption: string = '';
  @Prop() fixed: boolean = false;

  @Event() closed: EventEmitter;

  head: HTMLElement;

  @Inject({
    remount: 'body',
    sync: ['close', 'show', 'hide']
  })
  componentDidLoad() {
    document.body.append(this.el);
    if (!this.fixed) draggable(this.el, this.head);
  }

  public close(reason: string = 'close') {
    this.el.parentNode.removeChild(this.el);
    this.closed.emit(reason);
  }

  public hide() {
    this.el.style.display = 'none';
  }

  public show() {
    this.el.style.display = '';
  }

  render() {
    return (
      <Host class="az-dialog center">
        <div ref={el => this.head = el} class="az-dialog__header">
          <span class="az-dialog__title">{this.caption}</span>
          <span class="az-dialog__icons">
            <slot name="icons">
              <az-icon icon="close" onClick={() => this.close()}></az-icon>
            </slot>
          </span>
        </div>
        <div class="az-dialog__body">
          <slot></slot>
        </div>
        <div class="az-dialog__footer">
          <slot name="footer">
            <az-button class="mini" caption="OK" onClick={() => this.close('ok')}>
              <az-icon icon="check"></az-icon>
            </az-button>
            <az-button class="mini" caption="Cancel" onClick={() => this.close('cancel')}>
              <az-icon icon="close"></az-icon>
            </az-button>
            </slot>
        </div>
      </Host>
    );
  }
}