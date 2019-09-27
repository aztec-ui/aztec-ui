import { Component, Prop, Element, h } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { Inject } from '../../utils/utils';

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

  @Inject({
    sync: ['collapse', 'expand']
  })
  componentDidLoad() {
  }

  collapse() {
    this.collapsed = true;
  }

  expand() {
    this.collapsed = false;
  }

  render() {
    return (
      <section class={{
        'az-section': true,
        collapsable: this.collapsable,
        collapsed: this.collapsed
      }}>
        <div class="header">
          <span class="az-section-caption az-caption" onClick={() => this.collapsed = !this.collapsed}>
            <az-icon icon="arrow-right"></az-icon>
            {this.caption}
          </span>
          <slot name="header"></slot>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </section>
    );
  }
}
