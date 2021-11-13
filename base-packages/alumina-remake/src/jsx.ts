import {
  JsxContent,
  JsxProps,
  JsxSourceChildren,
  VComponentFn,
  VNode,
} from './types';

function mapJsxContentToVNode(item: JsxContent): VNode {
  if (item === null || item === undefined) {
    return { vtype: 'vBlank' };
  } else if (typeof item === 'string' || typeof item === 'number') {
    return { vtype: 'vText', text: item.toString() };
  } else {
    return item;
  }
}

function extractJsxSourceChildren(children: JsxSourceChildren): VNode[] {
  if (Array.isArray(children)) {
    return children.flat().map(mapJsxContentToVNode);
  } else {
    return [children].map(mapJsxContentToVNode);
  }
}

function jsxImpl(
  vtag: string | VComponentFn,
  propsWithoutChildren: JsxProps,
  jsxSourceChildren: JsxSourceChildren,
): VNode {
  const debugSig = typeof vtag === 'function' ? vtag.name : vtag;

  const props = propsWithoutChildren;
  const children = extractJsxSourceChildren(jsxSourceChildren);
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

export function jsx(
  vtag: string | VComponentFn,
  _props: JsxProps | null,
  ...restArguments: any[]
): VNode {
  console.log({ vtag, _props, restArguments });
  const props = _props || {};
  if (!('children' in props) && Array.isArray(restArguments)) {
    // classic
    const children = restArguments;
    return jsxImpl(vtag, props, children);
  } else {
    // jsx-runtime
    const { children, ...restProps } = props;
    return jsxImpl(vtag, restProps, children);
  }
}

export const jsxs = jsx;

export function Fragment(): never {
  throw new Error('dummy function never invoked');
}

export namespace jsx {
  export namespace JSX {
    export interface IntrinsicElements {
      div: { class?: string; id?: string };
      h1: any;
      p: any;
    }
  }
}
