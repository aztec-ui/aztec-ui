import { HostElement } from "@stencil/core/dist/declarations";

const HTMLInputElementSpecialAttrs = ['value', 'autocomplete', 'autocorrect', 'autocapitalize', 'spellcheck'];

export function copyAttributes(src: HTMLElement, dest: HTMLElement, excludes?: string[], remove?: boolean) {
  const attrs = Array.prototype.slice.call(src.attributes, 0);
  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    if (excludes && excludes.includes(attr.name)) continue;
    dest.setAttribute(attr.name, attr.value);
    if (remove) src.removeAttribute(attr.name);
  }
  if (dest instanceof HTMLInputElement) {
    HTMLInputElementSpecialAttrs.forEach((key: string) => {
      if (key in src) dest[key] = src[key];
      if (remove) delete src[key];
    });
  }
}

const IgnoredAttrsWhenMigrateAttributes = ['id', 'class', 'slot'];
exportToGlobal('IgnoredAttrsWhenMigrateAttributes', {
  get() {
    return IgnoredAttrsWhenMigrateAttributes;
  }
});

export function migrateAttributes(host: HostElement, remove = false, keepAttrs: string[] = null) {
  if (!keepAttrs) {
    keepAttrs = IgnoredAttrsWhenMigrateAttributes.slice(0);
  } else {
    keepAttrs = keepAttrs.concat(IgnoredAttrsWhenMigrateAttributes);
  }
  // @ts-ignore
  return copyAttributes(host, (host.shadowRoot || host).lastElementChild, keepAttrs, remove);
}

export function moveChildren(host: HostElement, filters?: Function[]) {
  const ele = (host.shadowRoot || host).lastElementChild;
  for (let i = host.children.length; i >= 0; i--) {
    const opt = host.children[i];
    if (filters.find(Ctor => opt instanceof Ctor)) {
      ele.appendChild(opt);
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

export function remount(host: HostElement, destSelector: string) {
  const dest = document.querySelector(destSelector);
  if (!dest) throw new Error(`Can not find '${destSelector}'`);
  dest.appendChild(host);
}

interface IInjectOptions {
  style?: boolean, // inject custom style for shaow dowm
  attrs?: boolean, // copy wrapper's attributes to last HTMLElement
  parse?: boolean, // parse array/object string to JS object
  remove?: boolean, // remove attributes after copy
  after?: boolean, // do inject after calling constructor
  keep?: string[], // array of attributes which will not be remove during removing
  sync?: string[], // copy private method to HostElement
  remount?: false | string, // remount component to another
  children?: any[] // move children to last HTMLElement, see az-select
}

const makeInjectOpts = (opts: IInjectOptions = {}) => {
  return Object.assign({
    style: false,
    attrs: false,
    remove: false,
    parse: true,
    after: false,
    keep: null,
    sync: [],
    remount: false,
    children: []
  }, opts);
};

export function Inject (opts: IInjectOptions = makeInjectOpts()) {
  opts = makeInjectOpts(opts);
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
          if (opts.after) fn.apply(this, args); // inject after constructor

          // do injection
          if (opts.style) injectCustomStyleFor(this.el);
          if (opts.parse) parseArrayObjectAttr(this, this.el);
          if (opts.attrs) migrateAttributes(this.el, opts.remove, opts.keep);
          if (opts.children && opts.children.length) moveChildren(this.el, opts.children);
          if (opts.remount) remount(this.el, opts.remount);

          // for debugging
          this.el.__$stencil = this;

          if (!opts.after) fn.apply(this, args); // inject before constructor

          //
          if (opts.sync && opts.sync.length > 0) {
            opts.sync.forEach((name: string) => {
              if (typeof this[name] === 'function') {
                this.el[name] = this[name].bind(this);
              } else {
                this.el[name] = this[name];
              }
            });
            this.el.dispatchEvent(new CustomEvent('synced'));
          }
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

declare global {
  interface Window {
    aztec: object;
  }
}

export function exportToGlobal(name: string, desc: object | Function) {
  if (typeof window.aztec === 'undefined') window.aztec = {};
  if (typeof desc === 'function') {
    window.aztec[name] = desc;
  } else {
    Object.defineProperty(window.aztec, name, {
      ...desc,
      configurable: false,
      enumerable: false
    });
  }
}

import version from '../version';
exportToGlobal('version', {
  get() {
    return version;
  }
});
exportToGlobal('HTMLInputElementSpecialAttrs', {
  get() {
    return HTMLInputElementSpecialAttrs;
  }
});