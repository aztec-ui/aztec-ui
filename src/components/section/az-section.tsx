import { Component, Method, Prop, h } from '@stencil/core';

@Component({
  tag: 'az-section',
  styleUrl: 'az-section.styl',
  shadow: false
})
export class AzSection {
  @Prop() caption: string = '';
  @Prop() collapsed: boolean = false;
  @Prop() collapsable: boolean = true;

  render() {
    return (
      <section class={{
        'az-section': true,
        collapsable: this.collapsable,
        collapsed: this.collapsed
      }}>
        <div class="header">
          <span class="caption" onClick={() => this.collapsed = !this.collapsed}>{this.caption}</span>
          <slot name="header"></slot>
        </div>
        <div class="content">
          <slot></slot>
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
