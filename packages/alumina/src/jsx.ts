import { JsxContent, JsxProps, VComponentFn, VNode } from './types';

export { JSX } from './jsxTypes';

function mapJsxContentToVNode(item: JsxContent): VNode {
  if (item === null || item === undefined) {
    return { vtype: 'vBlank' };
  } else if (typeof item === 'string' || typeof item === 'number') {
    return { vtype: 'vText', text: item.toString() };
  } else {
    return item;
  }
}

function extractPropsChildren(props: JsxProps): VNode[] {
  if (Array.isArray(props.children)) {
    return props.children.flat().map(mapJsxContentToVNode);
  } else if ('children' in props) {
    return [props.children].map(mapJsxContentToVNode);
  } else {
    return [];
  }
}

export function jsx(vtag: string | VComponentFn, _props: JsxProps): VNode {
  const debugSig = typeof vtag === 'function' ? vtag.name : vtag;

  const { children: _children, ...props } = _props;

  console.log({ vtag: (vtag as any).name || vtag, props });

  const children = extractPropsChildren(_props);
  if (vtag === Fragment) {
    return { vtype: 'vFragment', children };
  } else if (typeof vtag === 'function') {
    return {
      vtype: 'vComponent',
      componentFn: vtag,
      props,
      children,
      debugSig,
    };
  } else {
    return { vtype: 'vElement', tagName: vtag, props, children };
  }
  throw new Error('invalid condition');
}

export const jsxs = jsx;

export function Fragment(): never {
  throw new Error('dummy function never invoked');
}
