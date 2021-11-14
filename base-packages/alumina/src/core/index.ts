import { IVNode } from './types';
import { mount, patch } from './vdom';

export { IVNode as VNode } from './types';
export { jsx, Fragment } from './jsx';

let prevVDom: IVNode;

export function render(vnode: IVNode, rootDom: Element | null) {
  if (!prevVDom) {
    mount(rootDom!, vnode);
  } else {
    patch(rootDom!, vnode, prevVDom);
  }
  prevVDom = vnode;
}
