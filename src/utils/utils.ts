import { HostElement } from "@stencil/core/dist/declarations";

export function copyAttributes(src: HTMLElement, dest: HTMLElement, excludes?: string[], remove?: boolean) {
  const attrs = Array.prototype.slice.call(src.attributes, 0);
  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    if (excludes && excludes.includes(attr.name)) continue;
    dest.setAttribute(attr.name, attr.value);
    if (remove) src.removeAttribute(attr.name);
  }
}

export function migrateAttributes(host: HostElement) {
  // @ts-ignore
  return copyAttributes(host, host.shadowRoot.lastElementChild, ['class', 'slot'], true);
}

export function moveChildren(host: HostElement, filters?: Function[]) {
  const ele = host.shadowRoot.lastElementChild;
  while (host.childNodes.length > 0) {
    const opt = host.childNodes[0];
    if (filters.find(Ctor => opt instanceof Ctor)) {
      ele.appendChild(opt);
    } else {
      opt.parentNode.removeChild(opt);
    }
  }
}
