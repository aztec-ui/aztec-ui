import { Component, Prop, Element, Host, Watch, State, Event, EventEmitter, h } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { Inject } from '../../utils/utils';
import { ComponentStyle, CornerPlacement } from '../../global/typing';

@Component({
  tag: 'az-notification',
  styleUrl: 'az-notification.styl',
  shadow: false
})
export class AzNotification {
  @Element() el: HostElement;

  @Prop() caption: string = '';
  @Prop() message: string = '';
  @Prop() type: ComponentStyle = 'primary';
  @Prop() icon: string = '';
  @Prop() placement: CornerPlacement = 'top-right';

  @Event() showed: EventEmitter;
  @Event() closed: EventEmitter;

  @Inject({
    sync: ['close', 'show']
  })
  componentDidLoad() {
    this.setIcon();
    // createPlacmentContainer(this.placement);
  }

  setIcon() {
    if (this.icon) return;
    switch(this.type) {
      case "success":
        this.icon = 'circle-check';
        break;
      case "info":
      case "warning":
        this.icon = 'circle-exclamation';
          break;
      case "danger":
        this.icon = 'circle-cross';
        break;
      default:
        this.icon = '';
    }
  }

  public show(type: ComponentStyle, caption: string, message: string) {
    this.type = type;
    this.caption = caption;
    this.message = message;
  }

  public close(reason: string = 'close') {
    this.el.parentNode.removeChild(this.el);
    this.closed.emit(reason);
  }

  render() {
    return (
      <Host class={`az-notification ${this.type}`} style1={{display: 'none'}}>
        <slot name="caption">
          <div class="az-notification__head">
            {this.icon && <az-icon class="icon" icon={this.icon} width={24} height={24}></az-icon>}
            <span class="az-caption az-notification__caption">{this.caption}</span>
            <az-icon icon="close" onClick={() => this.close()}></az-icon>
          </div>
        </slot>
        <div class="az-notification__message">
          <slot>
            <div>{this.message}</div>
          </slot>
        </div>
        <div class="az-notification__indicator"></div>
      </Host>
    );
  }
}

function createPlacmentContainer(where: CornerPlacement = 'top-right') {
  const selector = `az-notification az-notification__${where}`;
  if (document.querySelector(selector)) return;
  const ctn = document.createElement('div');
  ctn.classList.add('az-notification', `az-notification__${where}`);
  document.body.appendChild(ctn);
  return ctn;
}