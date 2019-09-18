import { Component, Prop, Element, h, Host } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';

@Component({
  tag: 'az-progress-bar',
  styleUrl: 'az-progress-bar.styl',
  shadow: false
})
export class AzProgressBar {
  @Element() el: HostElement;

  @Prop() caption: string = '';
  @Prop({reflect: true}) value: number = 50;
  @Prop({reflect: true}) max: number = 100;

  componentDidLoad() {}

  render() {
    return (
      <Host>
        {this.caption && <span class="az-progress-bar__caption az-caption">{this.caption}</span>}
        <progress max={this.max} value={this.value}></progress>
      </Host>
    )
  }
}