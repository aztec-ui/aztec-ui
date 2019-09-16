import { Component, Prop, Element, h, Host, Method } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { exportToGlobal } from '../../utils/utils';

const Popovers = {
  containerId: `az-popovers`,
  create() {
    const popover = document.createElement('az-popover');
    this.append(popover);
    return popover;
  },
  append(popover: HTMLElement) {
    let ctn = document.getElementById(Popovers.containerId);
    if (!ctn) {
      ctn = document.createElement('div');
      ctn.id = Popovers.containerId;
      ctn.style.width = ctn.style.height = '0';
      document.body.prepend(ctn);
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

  componentDidLoad() {
    Popovers.append(this.el);
  }

  @Method()
  async close() {
    this.el.parentNode.removeChild(this.el);
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