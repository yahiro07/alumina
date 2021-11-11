export { jsx } from "./jsx";

export function render(fn: () => any, el: HTMLElement | undefined) {
  if (el) {
    const vdom = fn();
    el.innerHTML = JSON.stringify(vdom);
  }
}
