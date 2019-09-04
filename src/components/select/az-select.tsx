import { Component, Element, h } from '@stencil/core';
import { Inject } from '../../utils/utils';
import { HostElement } from "@stencil/core/dist/declarations";

@Component({
  tag: 'az-select',
  styleUrl: 'az-select.styl',
  shadow: false
})
export class AzSelect {
  @Element() el: HostElement;
  @Inject({children: [HTMLOptionElement, HTMLSelectElement]})
  componentDidLoad() {
  }
  render() {
    return (
      <select>
      </select>
    );
  }
}
