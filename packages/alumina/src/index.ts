import { VNode } from "./types";

export { jsx } from "./jsx";

type IState = {
  rootElement: HTMLElement | undefined;
  rootRenderFn: (() => VNode) | undefined;
};

const state: IState = {
  rootElement: undefined,
  rootRenderFn: undefined,
};

function mount(parentDom: Element, vnode: VNode) {
  // const elementVNodes = vnode.children
  //   .map((vnode) => {
  //     if (vnode.vtype === "vFragment") {
  //       return vnode.children;
  //     } else if (vnode.vtype === "vComponent") {
  //       const res = vnode.vtag();
  //       if (res.vtype === "vFragment") {
  //         return res.children;
  //       }
  //       return res;
  //     }
  //     return vnode;
  //   })
  //   .flat();
  // console.log({ elementVNodes });
  if (vnode.vtype === "vText") {
    const dom = document.createTextNode(vnode.text);
    parentDom.appendChild(dom);
  } else if (vnode.vtype === "vElement") {
    const dom = document.createElement(vnode.tagName);
    vnode.children.forEach((vnode) => mount(dom, vnode));
    parentDom.appendChild(dom);
  } else if (vnode.vtype === "vFragment") {
    vnode.children.forEach((vnode) => mount(parentDom, vnode));
  } else if (vnode.vtype === "vComponent") {
    const res = vnode.componentFn(vnode.props);
    if (res.vtype === "vFragment") {
      res.children.forEach((vnode) => mount(parentDom, vnode));
    } else {
      mount(parentDom, res);
    }
  }
}

export function rerender() {
  const { rootElement, rootRenderFn } = state;
  if (rootElement && rootRenderFn) {
    const vnode = rootRenderFn();
    console.log({ vnode });
    while (rootElement.firstChild) {
      rootElement.removeChild(rootElement.firstChild);
    }
    mount(rootElement, vnode);
  }
}

export function render(fn: () => any, el: HTMLElement | undefined) {
  if (el) {
    state.rootRenderFn = fn;
    state.rootElement = el;
    rerender();
  }
}
