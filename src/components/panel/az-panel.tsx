import {Component, Prop, h} from '@stencil/core';

@Component({
  tag: 'az-panel',
  styleUrl: 'az-panel.styl',
  shadow: true
})
export class AzPanel {
  @Prop() caption: string;

  render () {
    return (
      <div class="az-panel">
        <legend>{this.caption}</legend>
        <slot></slot>
      </div>
    );
  }
}