import { Component, Method, Prop, Element, h } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';

@Component({
  tag: 'az-section',
  styleUrl: 'az-section.styl',
  shadow: false
})
export class AzSection {
  @Element() el: HostElement;
  @Prop() caption: string = '';
  @Prop() collapsed: boolean = false;
  @Prop() collapsable: boolean = true;

  componentDidLoad() {
    this.el.querySelector('.bugfix').remove();
  }

  render() {
    return (
      <section class={{
        'az-section': true,
        collapsable: this.collapsable,
        collapsed: this.collapsed
      }}>
        <div class="header">
          <span class="caption" onClick={() => this.collapsed = !this.collapsed}>
            <az-icon icon="arrow-right"></az-icon>
            {this.caption}
          </span>
          <slot name="header"></slot>
        </div>
        <div class="content">
          <slot></slot>
          <svg class="bugfix" width="0" height="0"></svg>
        </div>
      </section>
    );
  }

  @Method()
  collapse() {
    this.collapsed = true;
  }

  @Method()
  expand() {
    this.collapsed = false;
  }
}
