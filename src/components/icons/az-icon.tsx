import { Component, Prop} from '@stencil/core';
import icons from './builtin';

@Component({
  tag: 'az-icon',
  styleUrl: 'az-icon.styl',
  shadow: false
})
export class AzIcon {
  static icons = icons;
  static registerIcon(name, fn) {
    AzIcon.icons[name] = fn;
  };
  @Prop() icon: string = '';
  @Prop() width: number = 12;
  @Prop() height: number = 12;
  @Prop() color: string = 'white';

  render () {
    const icon = AzIcon.icons[this.icon];
    if (typeof icon === 'undefined') {
      throw new Error('Can not find icon `${this.icon}`');
    }
    return icon(this.width, this.height, this.color);
  }
}