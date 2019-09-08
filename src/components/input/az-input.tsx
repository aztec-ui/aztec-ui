import { Component, Prop, Element, h} from '@stencil/core';
import { Inject } from '../../utils/utils';
import { HostElement } from '@stencil/core/dist/declarations';

@Component({
  tag: 'az-input',
  styleUrl: 'az-input.styl',
  shadow: false
})
export class AzInput {
  @Element() el: HostElement;
  @Prop() caption: string = '';
  @Prop() type: string = '';
  @Prop() value: string = '';

  @Inject({
    attrs: true,
    parse: false
  })
  componentDidLoad() {}

  render() {
    return [
      (this.caption && <span class="az-input-caption az-caption">{this.caption}</span>),
      <input type={this.type} value={this.value}></input>
    ];
  }
}