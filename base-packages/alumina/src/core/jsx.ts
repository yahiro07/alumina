/* eslint-disable @typescript-eslint/no-unused-vars */
import { qxInterposeProps } from '../qxInterposeProps';
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
  const props = propsWithoutChildren;

  const skip = props && 'qxIf' in props && !props.qxIf;
  if (skip) {
    return createVBlank(null);
  }

  if (tagType === (Fragment as any)) {
    const children = convertChildren(sourceChildren);
    return { vtype: 'vFragment', children };
  }

  qxInterposeProps(props, tagType);

  if (typeof tagType === 'function') {
    tagType = getFunctionComponentWrapperCached(tagType);
  }

  const children = convertChildren(sourceChildren);
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

export function Fragment() {}
