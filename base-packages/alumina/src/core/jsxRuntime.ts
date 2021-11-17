import { jsx as jsxClassic } from './jsx';
import { IProps, IVComponentWrapper, IVNode } from './types';

export function jsx(
  vtag: string | IVComponentWrapper,
  _props: IProps | null,
  key: string | undefined,
): IVNode {
  const props = _props || {};
  const { children, ...restProps } = props;
  const propsWithKey = key !== undefined ? { ...restProps, key } : restProps;
  if (children) {
    return jsxClassic(vtag, propsWithKey, ...children);
  } else {
    return jsxClassic(vtag, propsWithKey);
  }
}

export const jsxs = jsx;
