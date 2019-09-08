import { Component, Prop, h} from '@stencil/core';
import builtinIcons from './builtin';
import { exportToGlobal } from '../../utils/utils';

@Component({
  tag: 'az-icon',
  styleUrl: 'az-icon.styl',
  shadow: false
})
export class AzIcon {
  static icons = Object.keys(builtinIcons).reduce((all, name: string) => {
    all[name] = svgIcon(builtinIcons[name] as string);
    return all;
  }, {});

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

function svgIcon(d: string | string[]) {
  return (width: number, height: number, fill: string) => {
    const paths = (Array.isArray(d) ? d : [d]).map(p => {
      return <path fill={fill} d={p}></path>
    });
    return (
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 1024 1024">
        {paths}
      </svg>
    );
  };
}

exportToGlobal('registerIcon', function (name: string, dOrFn: string | Function) {
  AzIcon.icons[name] = typeof dOrFn === 'string' ? svgIcon(dOrFn) : dOrFn;
});