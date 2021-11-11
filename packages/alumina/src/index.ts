import { Fragment } from "./jsx";

export { jsx } from "./jsx";

type IState = {
  rootElement: any;
  rootRenderFn: () => any;
};

const state: IState = {
  rootElement: undefined,
  rootRenderFn: undefined,
};

export function rerender() {
  const { rootElement: el, rootRenderFn } = state;
  const vdom = rootRenderFn();
  console.log({ vdom });

  const elementVNodes = vdom.props.children
    .map((vnode) => {
      if (vnode.vtype === "vFragment") {
        return vnode.props.children;
      } else if (vnode.vtype === "vComponent") {
        const res = vnode.vtag();
        if (res.vtype === "vFragment") {
          return res.props.children;
        }
        return res;
      }
      return vnode;
    })
    .flat();
  console.log({ elementVNodes });
  el.style.whiteSpace = "pre-wrap";
  el.style.fontSize = "14px";
  el.innerHTML = JSON.stringify(vdom, null, "    ");
}

export function render(fn: () => any, el: HTMLElement | undefined) {
  if (el) {
    state.rootRenderFn = fn;
    state.rootElement = el;
    rerender();
  }
}
