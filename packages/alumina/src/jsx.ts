export { JSX } from "./jsxTypes";

function extractPropsChildren(props: any): any {
  if (Array.isArray(props.children)) {
    return { ...props, children: props.children.flat() };
  } else if ("children" in props) {
    return { ...props, children: [props.children] };
  } else {
    return { ...props, children: [] };
  }
}

export function jsx(tagName: string | Function, props: any) {
  console.log({ tagName, props });

  if (tagName === Fragment) {
    return props.children;
  }

  const vtype = typeof tagName === "string" ? tagName : tagName.name;

  const modProps = extractPropsChildren(props);
  return { vtype, props: modProps };
}

export const jsxs = jsx;

export function Fragment() {
  throw new Error("dummy function never invoked");
}
