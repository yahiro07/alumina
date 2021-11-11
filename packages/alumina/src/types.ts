export type JsxContent = VNode | string | number | null | undefined;

export type JsxProps = {
  children: JsxContent[];
};

export type VProps = {};

export type VElement = {
  vtype: "vElement";
  tagName: string;
  props: VProps;
  children: VNode[];
};

export type VComponentFn = (props: VProps) => VNode;

export type VComponent = {
  vtype: "vComponent";
  componentFn: VComponentFn;
  props: VProps;
  children: VNode[];
  debugSig: string;
};

export type VFragment = {
  vtype: "vFragment";
  children: VNode[];
};

export type VText = {
  vtype: "vText";
  text: string;
};

export type VBlank = {
  vtype: "vBlank";
};

export type VNode = VElement | VComponent | VFragment | VText | VBlank;
