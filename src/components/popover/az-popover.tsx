import { Component, Prop, Element, h, Host, Method, Event, EventEmitter } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { exportToGlobal, migrateAttributes } from '../../utils/utils';

const Popovers = {
  container: `body`,
  popoverContainerTags: ['AZ-DIALOG'],
  append(popover: HTMLElement) {
    if (Popovers.popoverContainerTags.includes(popover.parentElement.tagName)) {
      migrateAttributes(popover.parentElement);
      popover.parentElement.remove();
    }
    document.body.appendChild(popover);
    return popover;
  }
};

@Component({
  tag: 'az-popover',
  styleUrl: 'az-popover.styl',
  shadow: false
})
export class AzPopover {
  @Element() el: HostElement;

  @Prop() caption: string = '';
  @Prop() inline: boolean = false;
  @Event() closed: EventEmitter;


  componentDidLoad() {
    if (!this.inline) {
      Popovers.append(this.el);
    } else {
      this.el.style.position = 'absolute';
      this.el.parentElement.style.position = 'relative';
    }
  }

  @Method()
  async close(reason: string = 'close') {
    this.el.parentNode.removeChild(this.el);
    this.closed.emit(reason);
  }

  @Method()
  async hide() {
    this.el.style.display = 'none';
  }

  @Method()
  async show() {
    this.el.style.display = '';
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}

exportToGlobal('popovers', {
  get () {
    return Popovers;
  }
})