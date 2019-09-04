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
  const ele = (host.shadowRoot || host).lastElementChild;
  while (host.children.length > 0) {
    const opt = host.childNodes[0];
    if (filters.find(Ctor => opt instanceof Ctor)) {
      ele.appendChild(opt);
    } else {
      opt.parentNode.removeChild(opt);
    }
  }
}

function isPlainObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
}

function safeEval(json) {
  const f = new Function(`return ${json}`);
  return f();
}

function decamelize(str){
	const separator = '_';
	return str
        .replace(/([a-z\d])([A-Z])/g, '$1' +  + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
        .toLowerCase();
}

export function parseArrayObjectAttr(ctx: any, host: HostElement) {
  const keys = Object.keys(ctx.constructor.prototype);
  keys.forEach(k => {
    const hypenized = decamelize(k);
    if (!host.hasAttribute(hypenized)) return;
    if (Array.isArray(ctx[k]) || isPlainObject(ctx[k])) {
      ctx[k] = safeEval(host.getAttribute(hypenized));
    }
  });
}

export function injectCustomStyleFor(host: HostElement) {
  if (!host || !host.shadowRoot) return;
  const tag = host.tagName.toLowerCase();
  const selector = `#${tag}-custom-style`;
  if (host.shadowRoot.querySelector(selector)) return;
  const style = document.querySelector(selector);
  if (!style) return;
  host.shadowRoot.prepend(style.cloneNode(true));
}

export function Inject (opts: {
  style?: boolean,
  attrs?: boolean,
  parse?: boolean,
  children?: any[]} = {
  style: false,
  attrs: false,
  parse: true,
  children: []
}) {
  opts = Object.assign({
    style: false,
    attrs: false,
    parse: true,
    children: []
  }, opts);
  return function inject(target: any, key: string, descriptor: any) {
    let fn = descriptor.value;

    if (typeof fn !== 'function') {
      throw new TypeError(`this decorator can only be applied to methods not: ${typeof fn}`);
    }

    // In IE11 calling Object.defineProperty has a side-effect of evaluating the
    // getter for the property which is being replaced. This causes infinite
    // recursion and an "Out of stack space" error.
    let definingProperty = false;

    return {
      configurable: true,
      get() {
        if (definingProperty || this === target.prototype || this.hasOwnProperty(key) || typeof fn !== 'function') {
          return fn;
        }
        const boundFn = function (...args) {
          if (opts.style) injectCustomStyleFor(this.el);
          if (opts.parse) parseArrayObjectAttr(this, this.el);
          if (opts.attrs) migrateAttributes(this.el);
          if (opts.children && opts.children.length) moveChildren(this.el, opts.children);
          fn.apply(this, args);
        };
        definingProperty = true;
        Object.defineProperty(this, key, {
          configurable: true,
          get() {
            return boundFn;
          },
          set(value) {
            fn = value;
            delete this[key];
          }
        });
        definingProperty = false;
        return boundFn;
      },
      set(value: any) {
        fn = value;
      }
    };
  }
}
