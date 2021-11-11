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

export function jsx(vtag: string | Function, props: any): any {
  console.log({ vtag: (vtag as any).name || vtag, props });

  const modProps = extractPropsChildren(props);
  if (vtag === Fragment) {
    return { vtype: "vFragment", props: modProps };
  }

  const vtype = typeof vtag === "function" ? "vComponent" : "vElement";
  const debugSig = typeof vtag === "function" ? vtag.name : vtag;

  return { vtype, vtag, debugSig, props: modProps };
}

export const jsxs = jsx;

export function Fragment() {
  throw new Error("dummy function never invoked");
}
