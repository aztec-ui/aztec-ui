import { Component, Prop, Element, h } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';

@Component({
  tag: 'az-tooltip',
  styleUrl: 'az-tooltip.styl',
  shadow: false
})
export class AzTooltip {
  @Element() el: HostElement;

  @Prop() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Prop() caption: string = '';
  popover: HTMLElement;

  componentDidLoad() {
    this.popover.classList.add(this.placement);
    this.el.parentElement.append(this.popover);
    this.el.remove();
    this.popover.parentElement.style.position = 'relative';
  }

  render() {
    return <az-popover class="az-tooltip" ref={el => this.popover = el} inline={true}>{this.caption}</az-popover>;
  }
}