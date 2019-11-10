import { Component, Prop, Element, h, Host, Event, EventEmitter } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { draggable } from '../../utils/draggable';
import { Inject, exportToGlobal } from '../../utils/utils';

type ButtonConfig = {
  caption: string;
  action ?: string;
  icon ?: string
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
  static show(opts, dialog?: HTMLAzDialogElement) {
    if (!dialog) dialog = document.createElement(`az-dialog`) as HTMLAzDialogElement;
    if (!opts.buttons) opts.buttons = getDefaultButtons();
    Object.assign(dialog, opts);
    return appendToDialogContainer(dialog, opts);
  }
  static getDefaultButtonConfig = getDefaultButtons;
  @Element() el: HostElement;

  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) content: string = '';
  @Prop({reflect: true}) buttons: ButtonConfig[] = getDefaultButtons();
  @Prop({reflect: true}) fixed: boolean = false;
  @Prop({reflect: true}) closable: boolean = true;
  @Prop({reflect: true}) clickmaskclose: boolean = true;

  @Event() closed: EventEmitter;

  head: HTMLElement;

  @Inject({
    sync: ['close', 'show', 'hide']
  })
  componentDidLoad() {
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
    const cls = {
      'az-dialog center': true,
      'fixed': this.fixed
    };
    const buttons = this.buttons.forEach((config: ButtonConfig) => {
      return (
        <az-button class="mini"
          onClick={() => this.close(config.action)}
          caption={config.caption}
          icon={config.icon}>
        </az-button>
      )
    })
    return (
      <Host class={cls}>
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

function appendToDialogContainer(dialog: HTMLAzDialogElement, opts: any) {
  const selector = `.az-dialog-container`;
  let ctn = document.querySelector(selector) as HTMLDivElement;
  if (!ctn) {
    ctn = document.createElement('div');
    ctn.classList.add('az-dialog-container');
    document.body.appendChild(ctn);
  }
  ctn.style.display = '';
  ctn.classList.toggle('mask', !!opts.mask);

  if (opts.clickmaskclose) {
    dialog.addEventListener('synced', () => {
      // @ts-ignore
      ctn.addEventListener('click', dialog.close);
    });
  }

  ctn.appendChild(dialog);
  dialog.addEventListener('closed', () => {
    ctn.classList.remove('mask');
    ctn.style.display = 'none';
    // @ts-ignore
    ctn.removeEventListener('click', dialog.close);
  });
  return dialog;
}

exportToGlobal('Dialog', AzDialog);