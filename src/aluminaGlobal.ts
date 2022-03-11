interface IAluminaGlobal {
  rerender: () => void;
  asyncRerenderFlag: boolean;
  hookEffectFuncs: (() => void)[];
  debug: {
    nAll: number;
    nUpdated: number;
    nPatchCall: number;
  };
  prevRootVdom: any;
  jsxCreateElementFunction: Function | undefined;
  asyncLoopInitialized: boolean;
  gHookInstance: any;
  gSheet: HTMLStyleElement | undefined;
  cssTextToClassNameMap: { [sourceCssText: string]: string };
  cssClassNameToTextMap: { [className: string]: string };
  seqClassNameIndex: number;
  classNameIndexTable: { [key: string]: number };
}

function makeAluminaGlobal(): IAluminaGlobal {
  const __window = window as any as { __aluminaGlobal: IAluminaGlobal };
  if (!__window.__aluminaGlobal) {
    __window.__aluminaGlobal = {
      rerender: () => {},
      asyncRerenderFlag: false,
      hookEffectFuncs: [],
      debug: {
        nAll: 0,
        nUpdated: 0,
        nPatchCall: 0,
      },
      prevRootVdom: undefined,
      jsxCreateElementFunction: undefined,
      asyncLoopInitialized: false,
      gHookInstance: undefined,
      gSheet: undefined,
      cssTextToClassNameMap: {},
      seqClassNameIndex: 0,
      classNameIndexTable: {},
      cssClassNameToTextMap: {},
    };
  }
  return __window.__aluminaGlobal;
}

export const aluminaGlobal: IAluminaGlobal = makeAluminaGlobal();
