
import { Component, Prop, Element, h } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { Inject } from '../../utils/utils';

@Component({
  tag: 'az-slider',
  styleUrl: 'az-slider.styl',
  shadow: false
})
export class AzSlider {
  @Element() el: HostElement;

  @Prop() caption: string = '';

  @Inject({
    attrs: true,
    remove: true
  })
  componentDidLoad() {}

  render() {
    const vdom = [
      <slot name="before"></slot>,
      <input type="range"></input>,
      <slot name="after"></slot>,
    ];
    if (this.caption) {
      vdom.unshift(<span class="az-slider-caption az-caption">{this.caption}</span>);
    }
    return vdom;
  }
}