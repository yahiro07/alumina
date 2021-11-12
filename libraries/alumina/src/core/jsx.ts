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

type ISourceChild = IVNode | string | number | boolean | undefined;

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

function convertChildren(
  sourceChildren: ISourceChild | ISourceChild[],
): IVNode[] {
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

export function jsx(
  tagType: string | IVComponentWrapper,
  props: IProps | undefined,
): IVNode | null {
  props ||= {};

  const skip = props && 'qxIf' in props && !props.qxIf;
  if (skip) {
    return null;
  }

  if (tagType === (Fragment as any)) {
    const children = convertChildren(props.children);
    return { vtype: 'vFragment', children };
  }

  qxInterposeProps(props, tagType);

  if (typeof tagType === 'function') {
    tagType = getFunctionComponentWrapperCached(tagType);
  }

  const children = convertChildren(props.children);
  props = { ...props, children };
  const vnode =
    typeof tagType === 'object'
      ? createVComponent(tagType, props, children)
      : createVElement(tagType, props, children);
  return vnode;
}

export const jsxs = jsx;

export function Fragment() {}
