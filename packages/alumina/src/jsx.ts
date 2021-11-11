export { JSX } from "./jsxTypes";

export function jsx(tagName: string | Function, props: any) {
  // console.log({ tagName, props });

  if (tagName === Fragment) {
    return props.children;
  }

  const modProps = Array.isArray(props.children)
    ? { ...props, children: props.children.flat() }
    : { ...props, children: [props.children] };
  return { tagName, props: modProps };
}

export const jsxs = jsx;

export function Fragment() {
  throw new Error("dummy function never invoked");
}
