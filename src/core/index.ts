import { aluminaGlobal } from '../aluminaGlobal';
import { IVNode } from './types';
import { mount, patch } from './vdom';

export { IVNode as VNode } from './types';
export { jsx, Fragment } from './jsx';

export function render(vnode: IVNode, rootDom: Element | null) {
  const prevVDom = aluminaGlobal.prevRootVdom;
  if (!prevVDom) {
    mount(rootDom!, vnode);
  } else {
    patch(rootDom!, vnode, prevVDom);
  }
  aluminaGlobal.prevRootVdom = vnode;
}
