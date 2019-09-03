import { Component, Element, h } from '@stencil/core';
import { migrateAttributes, moveChildren } from '../../utils/utils';
import { HostElement } from "@stencil/core/dist/declarations";

@Component({
  tag: 'az-select',
  styleUrl: 'az-select.styl',
  shadow: true
})
export class AzSelect {
  @Element() el: HostElement;
  componentDidLoad() {
    migrateAttributes(this.el);
    moveChildren(this.el, [HTMLOptionElement, HTMLSelectElement]);
  }
  render() {
    return (
      <select>
      </select>
    );
  }
}
