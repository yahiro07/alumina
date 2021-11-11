export { jsx } from "./jsx";

export function render(fn: () => any, el: HTMLElement | undefined) {
  if (el) {
    const vdom = fn();
    el.style.whiteSpace = "pre-wrap";
    el.style.fontSize = "14px";
    el.innerHTML = JSON.stringify(vdom, null, "    ");
  }
}
