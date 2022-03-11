import { jsxCore } from './jsx';
import { IProps, IVComponentWrapper, IVNode } from './types';

export function jsx(
  vtag: string | IVComponentWrapper,
  props: IProps | null,
  key: string | undefined,
): IVNode {
  props ||= {};
  if (key) {
    return jsxCore(vtag, { ...props, key });
  } else {
    return jsxCore(vtag, props);
  }
}

export const jsxs = jsx;
