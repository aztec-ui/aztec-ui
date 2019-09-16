import { Component, Prop, Element, h, Host, Method, Event, EventEmitter } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { exportToGlobal, migrateAttributes } from '../../utils/utils';

const Popovers = {
  containerId: `az-popovers`,
  popoverContainerTags: ['AZ-DIALOG'],
  append(popover: HTMLElement) {
    let ctn = document.getElementById(Popovers.containerId);
    if (!ctn) {
      ctn = document.createElement('div');
      ctn.id = Popovers.containerId;
      ctn.style.width = ctn.style.height = '0';
      document.body.prepend(ctn);
    }
    if (Popovers.popoverContainerTags.includes(popover.parentElement.tagName)) {
      migrateAttributes(popover.parentElement);
    }
    ctn.appendChild(popover);
    return popover;
  },
  hide() {
    let ctn = document.getElementById(Popovers.containerId);
    if (ctn) {
      ctn.style.display = 'none';
    }
  },
  show() {
    let ctn = document.getElementById(Popovers.containerId);
    if (ctn) {
      ctn.style.display = '';
    }
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

  @Event() closed: EventEmitter;

  componentDidLoad() {
    Popovers.append(this.el);
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