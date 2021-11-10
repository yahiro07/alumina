export { JSX } from "./jsxTypes";

export function jsx(tagName: string, props: any, children: any[]) {
  return { tagName, props, children };
}

export const jsxs = jsx;

export default jsx;
