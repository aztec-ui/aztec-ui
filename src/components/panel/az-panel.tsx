import {Component, Prop, h} from '@stencil/core';

@Component({
  tag: 'az-panel',
  styleUrl: 'az-panel.styl',
  shadow: false
})
export class AzPanel {
  @Prop() caption: string;

  render () {
    return (
      <div class="az-panel">
        {this.caption && <legend>{this.caption}</legend>}
        <slot></slot>
      </div>
    );
  }
}