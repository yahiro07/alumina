export { jsx } from "./jsx-runtime";

export function render(fn: () => any, el: HTMLElement | undefined) {
  if (el) {
    const vdom = fn();
    el.innerHTML = JSON.stringify(vdom);
  }
}
