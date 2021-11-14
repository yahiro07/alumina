interface IAluminaGlobal {
  rerender: () => void;
  asyncRerenderFlag: boolean;
  hookEffectFuncs: (() => void)[];
  debug: {
    nAll: number;
    nUpdated: number;
    nPatchCall: number;
  };
}

export const aluminaGlobal: IAluminaGlobal = {
  rerender: () => {},
  asyncRerenderFlag: false,
  hookEffectFuncs: [],

  debug: {
    nAll: 0,
    nUpdated: 0,
    nPatchCall: 0,
  },
};
