import { Component, Prop, Element, h, Host, Event, EventEmitter, Method } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { draggable } from '../../utils/draggable';
import { exportToGlobal } from '../../utils/utils';

export type ButtonConfig = {
  caption: string;
  action ?: string;
  icon ?: string
};

export type DialogCreateOptions = {
  caption?: string;
  content?: string;
  buttons?: ButtonConfig[];
  fixed: boolean;
  closable: boolean;
  clickmaskclose: boolean;
  mask: boolean;
};

function getDefaultButtons(): ButtonConfig[] {
  return [
    { caption: 'OK', icon: 'check' },
    { caption: 'Cancel', icon: 'close' }
  ];
}

@Component({
  tag: 'az-dialog',
  styleUrl: 'az-dialog.styl',
  shadow: false
})
export class AzDialog {
  static create(opts: DialogCreateOptions) {
    const dialog = document.createElement(`az-dialog`) as HTMLAzDialogElement;
    if (!opts.buttons) opts.buttons = getDefaultButtons();
    Object.assign(dialog, opts);
    return appendToDialogContainer(dialog);
  }
  static getDefaultButtonConfig = getDefaultButtons;
  @Element() el: HostElement;

  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) content: string = '';
  @Prop({reflect: true}) buttons: ButtonConfig[] = getDefaultButtons();
  @Prop({reflect: true}) fixed: boolean = false;
  @Prop({reflect: true}) closable: boolean = true;
  @Prop({reflect: true}) clickmaskclose: boolean = true;
  @Prop({reflect: true}) mask: boolean = false;
  @Prop({reflect: true}) modal: boolean = true;
  @Prop() canclose: (reason: string) => boolean;

  @Event() closed: EventEmitter;
  @Event() hid: EventEmitter;

  head: HTMLElement;

  componentDidLoad() {
    if (!this.fixed) draggable(this.el, this.head);
  }

  @Method()
  public close(reason: string = 'close') {
    if (typeof this.canclose === 'function' && this.canclose(reason) === false) return;
    this.el.parentNode.removeChild(this.el);
    this.closed.emit(reason);
  }

  @Method()
  public hide() {
    this.el.style.display = 'none';
    this.hid.emit();
  }

  @Method()
  public show() {
    appendToDialogContainer(this.el as unknown as HTMLAzDialogElement);
  }

  render() {
    const cls = {
      'az-dialog center': true,
      'fixed': this.fixed
    };
    const buttons = this.buttons.map((config: ButtonConfig) => {
      return (
        <az-button class="mini"
          onClick={() => this.close(config.action)}
          caption={config.caption}
          icon={config.icon}>
        </az-button>
      )
    })
    return (
      <Host class={cls} style={{display: 'none'}}>
        <div ref={el => this.head = el} class="az-dialog__header">
          <span class="az-dialog__title">{this.caption}</span>
          <span class="az-dialog__icons">
            <slot name="icons">
              {this.closable && <az-button icon="close" type="plain" onClick={() => this.close()}></az-button>}
            </slot>
          </span>
        </div>
        <div class="az-dialog__body">
          <slot>{this.content}</slot>
        </div>
        <div class="az-dialog__footer">
          <slot name="footer">{buttons}</slot>
        </div>
      </Host>
    );
  }
}

function appendToDialogContainer(dialog: HTMLAzDialogElement) {
  dialog.style.display = '';

  // create, show mask
  const selector = `.az-dialog-container`;
  let ctn = document.querySelector(selector) as HTMLDivElement;
  if (!ctn) {
    ctn = document.createElement('div');
    ctn.classList.add('az-dialog-container');
    document.body.appendChild(ctn);
  }

  // ensure only append(bind event handlers) once
  if (dialog.modal) {
    ctn.style.display = '';
    ctn.classList.toggle('mask', !!dialog.mask);
    if (ctn === dialog.parentNode) return;
    ctn.appendChild(dialog);
  } else {
    if (document.body === dialog.parentNode) return;
    document.body.appendChild(dialog);
  }

  // bind event handlers
  dialog.addEventListener('click', (e: MouseEvent) => {
    if (dialog.clickmaskclose && dialog.mask) e.stopPropagation();
  });
  dialog.addEventListener('synced', () => {
    // @ts-ignore
    if (dialog.clickmaskclose) ctn.addEventListener('click', dialog.close);
    if (dialog.modal) ctn.style.display = 'none';
  });

  const clearup = () => {
    ctn.classList.remove('mask');
    ctn.style.display = 'none';
    // @ts-ignore
    ctn.removeEventListener('click', dialog.close);
  };
  dialog.addEventListener('closed', clearup);
  dialog.addEventListener('hid', clearup);
  return dialog;
}

exportToGlobal('Dialog', AzDialog);