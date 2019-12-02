import { Component, Prop, Element, h, Method } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';
import { Inject } from '../../utils/utils';

export interface IFormItem {
  name: string;
  tag: string;
  caption?: string;
  props?: Record<string, any>;
  children?: IFormItem[]
}

@Component({
  tag: 'az-form',
  styleUrl: 'az-form.styl',
  shadow: false
})
export class AzForm {
  @Element() el: HostElement;

  @Prop({reflect: true}) caption: string = '';
  @Prop({reflect: true}) labelPosition: 'left' | 'right' | 'top' = 'left';
  @Prop() items: IFormItem[] = [];

  @Inject({
    parse: true,
    attrs: true,
    remove: true,
    keep: ['caption', 'label-position']
  })
  componentDidLoad() {}

  @Method()
  async fromJson(items: IFormItem[]) {
    this.items = items;
  }

  @Method()
  async toJson(detailed: boolean = false) {
    const items = this.el.querySelectorAll('az-form-item');
    const promises = Array.from(items).reduce((all: any[], child: HTMLElement) => {
      if (child.children.length && typeof child.children[0]['toJson'] === 'function') {
        const realFormItem = child.children[0];
        const json = realFormItem['toJson'](detailed);
        all.push(json);
      }
      return all;
    }, []);
    return Promise.all(promises);
  }

  render() {
    const cap = this.caption ? <legend class="az-form__caption az-caption">{this.caption}</legend> : null;
    return (
      <form class={{
        'az-form': true,
        [`label-${this.labelPosition}`]: true
      }}>
        <fieldset>
          {cap}
          {this.items.length > 0 ? tagize(this.items) : <slot></slot>}
        </fieldset>
        <div class="az-form__footer">
          <slot name="footer"></slot>
        </div>
      </form>
    )
  }
}

function tagize(items: IFormItem[]) {
  return items.map((it: IFormItem) => {
    return Array.isArray(it) ? tagize(it) : (<az-form-item class="az-form-item">
      <it.tag name={it.name} {...it.props}>{it.children && it.children.length ? tagize(it.children) : null}</it.tag>
    </az-form-item>)
  });
}