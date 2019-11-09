import { Component, Prop, Element, Host, Event, EventEmitter, h } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { Inject, exportToGlobal } from '../../utils/utils';
import { ComponentStyle, CornerPlacement } from '../../global/typing';

interface INotificationOptions {
  type: ComponentStyle;
  caption: string;
  message: string;
  placement: CornerPlacement;
  timeout: number;
}

@Component({
  tag: 'az-notification',
  styleUrl: 'az-notification.styl',
  shadow: false
})
export class AzNotification {
  static success(caption: string, message: string, placement: CornerPlacement = 'top-left', timeout: number = 3000) {
    return AzNotification.create({type: 'success', caption, message, placement, timeout});
  }
  static info(caption: string, message: string, placement: CornerPlacement = 'top-left', timeout: number = 3000) {
    return AzNotification.create({type: 'info', caption, message, placement, timeout});
  }
  static warning(caption: string, message: string, placement: CornerPlacement = 'top-left', timeout: number = 3000) {
    return AzNotification.create({type: 'warning', caption, message, placement, timeout});
  }
  static danger(caption: string, message: string, placement: CornerPlacement = 'top-left', timeout: number = 3000) {
    return AzNotification.create({type: 'danger', caption, message, placement, timeout});
  }
  static error(caption: string, message: string, placement: CornerPlacement = 'top-left', timeout: number = 3000) {
    return AzNotification.create({type: 'danger', caption, message, placement, timeout});
  }
  static create(opts: INotificationOptions) {
    const noti = document.createElement(`az-notification`) as HTMLAzNotificationElement;
    Object.assign(noti, opts);
    return appendToPlacmentContainer(opts.placement, noti);
  }
  @Element() el: HostElement;

  @Prop({reflect: true}) caption: string = '';
  @Prop() message: string = '';
  @Prop({reflect: true}) type: ComponentStyle = 'primary';
  @Prop({reflect: true}) icon: string = '';
  @Prop({reflect: true}) placement: CornerPlacement = 'top-right';
  @Prop({reflect: true}) timeout: number = 3000;

  @Event() showed: EventEmitter;
  @Event() closed: EventEmitter;

  @Inject({
    sync: ['close']
  })
  componentDidLoad() {
    this.setIcon();
    this.close = this.close.bind(this);
    if (!isNaN(this.timeout) && this.timeout !== Infinity) {
      window.setTimeout(this.close, this.timeout);
    }
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

  public close(reason: string = 'close') {
    this.closed.emit(reason);
    this.el.style.animationName = 'az-up-fade-out';
    this.el.style.animationPlayState = 'running';
    this.el.addEventListener('animationend', () => {
      const parentNode = this.el.parentNode as HTMLElement;
      parentNode.removeChild(this.el);
      if (!parentNode.children.length) {
        parentNode.remove();
      }
    });
  }

  render() {
    return (
      <Host class={`az-notification ${this.type}`}>
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

function appendToPlacmentContainer(placement: CornerPlacement = 'top-right', noti: HTMLAzNotificationElement) {
  const selector = `.az-notification-container.az-notification__${placement}`;
  let ctn = document.querySelector(selector) as HTMLDivElement;
  if (!ctn) {
    ctn = document.createElement('div');
    ctn.classList.add('az-notification-container', `az-notification__${placement}`);
    document.body.appendChild(ctn);
  }
  let anim = 'left-fade-in';
  switch (placement) {
    case 'top-left':
    case 'bottom-left':
      anim = 'az-right-fade-in'
      break;
    default:
      anim = 'az-left-fade-in';
  }
  noti.style.animationName = anim;
  ctn.appendChild(noti);
  return noti;
}

exportToGlobal('Notification', AzNotification);