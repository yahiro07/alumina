import { Fragment } from "./jsx";
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

function mount(element: Element, vnode: VNode) {
  const elementVNodes = vnode.children
    .map((vnode) => {
      if (vnode.vtype === "vFragment") {
        return vnode.children;
      } else if (vnode.vtype === "vComponent") {
        const res = vnode.vtag();
        if (res.vtype === "vFragment") {
          return res.children;
        }
        return res;
      }
      return vnode;
    })
    .flat();
  console.log({ elementVNodes });
}

export function rerender() {
  const { rootElement, rootRenderFn } = state;
  if (rootElement && rootRenderFn) {
    const vnode = rootRenderFn();
    console.log({ vnode });
    mount(rootElement, vnode);
    // el.style.whiteSpace = "pre-wrap";
    // el.style.fontSize = "14px";
    // el.innerHTML = JSON.stringify(vdom, null, "    ");
  }
}

export function render(fn: () => any, el: HTMLElement | undefined) {
  if (el) {
    state.rootRenderFn = fn;
    state.rootElement = el;
    rerender();
  }
}
