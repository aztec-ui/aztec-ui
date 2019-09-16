const $fs = require('fs');
const $path = require('path');
const $readline = require('readline');
const rl = $readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const capitalize = (str) => `${str[0].toUpperCase()}${str.substr(1)}`;
const camelize = (str) => str.split('-').map(capitalize).join('');

rl.question('Component name:', name => {
  const dir = $path.join(__dirname, `../src/components/${name}`);
  $fs.mkdirSync(dir);
  const compName = `az-${name}`;
  const camelizedName = camelize(compName);
  const code = ts.replace(/{{name}}/g, name).replace(/{{camelizedName}}/g, camelizedName);
  const style = styl.replace(/{{name}}/g, name).replace(/{{camelizedName}}/g, camelizedName);
  $fs.writeFileSync($path.join(dir, compName) + '.tsx', code);
  $fs.writeFileSync($path.join(dir, compName) + '.styl', style);
  rl.close();
});

const ts = `
import { Component, Prop, Element, h } from '@stencil/core';
import { HostElement } from '@stencil/core/dist/declarations';

@Component({
  tag: 'az-{{name}}',
  styleUrl: 'az-{{name}}.styl',
  shadow: false
})
export class {{camelizedName}} {
  @Element() el: HostElement;

  @Prop() caption: string = '';

  componentDidLoad() {}

  render() {
    return (
      <div>
      </div>
    );
  }
}`.trim();

const styl = `
az-{{name}} {

}`.trim();