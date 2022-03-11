import { IHookInstance } from '../hookImpl';

export type IElementProps = {
  id?: string;
  className?: string;
  [key: string]: any;
};

export type IVBlank = {
  vtype: 'vBlank';
  debugSig: string;
  dom?: Comment;
};

export type IVText = {
  vtype: 'vText';
  text: string;
  debugSig: string;
  dom?: Text;
};

export type IVElement = {
  vtype: 'vElement';
  tagName: string;
  props: IElementProps;
  children: IVNode[];
  debugSig: string;
  marker?: string;
  dom?: Element;
};

export type IVFragment = {
  vtype: 'vFragment';
  children: IVNode[];
  dom?: Element;
};

export type IProps = {
  [key: string]: any;
};

export type IComponentState = {
  fcsig: string;
  hook: IHookInstance;
  renderWithHook: (props: IProps) => IVNode;
};

export type IVComponentWrapper = {
  name: string;
  mount: (self: IComponentState, props: IProps) => IVNode | null;
  update: (self: IComponentState, props: IProps) => IVNode | null;
  unmount: (self: IComponentState) => void;
};

export type IVComponent = {
  vtype: 'vComponent';
  componentWrapper: IVComponentWrapper;
  // renderFunc: IRenderFunc;
  props: IProps;
  children: IVNode[];
  debugSig: string;
  state: {
    componentState?: IComponentState;
    renderRes?: IVNode;
  };
  dom?: Node;
  // vnode for function component hold the reference of dom element.
  // and the root vnode of the function result also points the same dom element.
  parentDom?: Node;
};

export type IVNode = IVBlank | IVText | IVElement | IVComponent | IVFragment;
