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
