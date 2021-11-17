/* eslint-disable @typescript-eslint/no-unused-vars */
import { interposeProps } from '../propsInterposer';
import { getFunctionComponentWrapperCached } from './functionComponentWrapper';
import {
  IProps,
  IVBlank,
  IVComponent,
  IVComponentWrapper,
  IVElement,
  IVNode,
  IVText,
} from './types';

export function createVBlank(value: null | undefined | false): IVBlank {
  return { vtype: 'vBlank', debugSig: `blank__${value}` };
}

function createVText(text: string): IVText {
  return { vtype: 'vText', text, debugSig: `text__${text}` };
}

function createVElement(
  tagName: string,
  props: IProps,
  children: IVNode[],
): IVElement {
  return {
    vtype: 'vElement',
    tagName,
    props,
    children,
    debugSig: `${tagName}__${children.length}`,
  };
}

function createVComponent(
  componentWrapper: IVComponentWrapper,
  props: IProps,
  children: IVNode[],
): IVComponent {
  return {
    vtype: 'vComponent',
    componentWrapper,
    props,
    children,
    debugSig: `${componentWrapper.name}`,
    state: {},
  };
}

type ISourceChild = IVNode | string | number | boolean | null | undefined;
type ISourceChildren = ISourceChild | ISourceChild[];

function flattenArrayIfNested<T>(arr: (T | T[])[]): T[] {
  const nested = arr.some((a) => Array.isArray(a));
  if (nested) {
    const res: T[] = [];
    for (const a of arr) {
      if (Array.isArray(a)) {
        res.push(...a);
      } else {
        res.push(a);
      }
    }
    return res;
  }
  return arr as T[];
}

function convertChildren(sourceChildren: ISourceChildren): IVNode[] {
  const children = Array.isArray(sourceChildren)
    ? flattenArrayIfNested(sourceChildren)
    : [sourceChildren];
  return children.map((child) => {
    if (child === null || child === undefined || child === false) {
      return createVBlank(child);
    } else if (
      typeof child === 'string' ||
      typeof child === 'number' ||
      typeof child === 'boolean'
    ) {
      return createVText(child.toString());
    } else {
      return child;
    }
  });
}

export function jsxImpl(
  tagType: string | IVComponentWrapper,
  propsWithoutChildren: IProps,
  sourceChildren: ISourceChildren,
): IVNode {
  let props = propsWithoutChildren;

  const skip = props && 'if' in props && !props.if;
  if (skip) {
    return createVBlank(null);
  }

  if (tagType === (Fragment as any)) {
    const children = convertChildren(sourceChildren);
    return { vtype: 'vFragment', children };
  }

  interposeProps(props, tagType);

  if (typeof tagType === 'function') {
    tagType = getFunctionComponentWrapperCached(tagType);
  }

  const children = convertChildren(sourceChildren);
  props = { ...props, children };
  const vnode =
    typeof tagType === 'object'
      ? createVComponent(tagType, props, children)
      : createVElement(tagType, props, children);
  return vnode;
}

export function jsx(
  vtag: string | IVComponentWrapper,
  _props: IProps | null,
  ...restArguments: any[]
): IVNode {
  const props = _props || {};
  if ('children' in props) {
    // jsx-runtime
    const { children, ...restProps } = props;
    const key = restArguments[0];
    const propsWithKey = key !== undefined ? { ...restProps, key } : restProps;
    return jsxImpl(vtag, propsWithKey, children);
  } else {
    // classic
    const children = restArguments;
    return jsxImpl(vtag, props, children);
  }
}

export const jsxs = jsx;

export function Fragment() {}
