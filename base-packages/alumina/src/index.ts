import './jsxTypes';
import { aluminaGlobal } from './aluminaGlobal';
import { createContext, useContext } from './contextApi';
import { Fragment, jsx, render as vdomCoreRender } from './core';
import { IVNode } from './core/types';
import {
  applyGlobalStyle,
  css,
  setJsxCreateElementFunction,
  styled,
} from './cssInJs';
import {
  useCallback,
  useEffect,
  useInlineEffect,
  useLocal,
  useMemo,
  useRef,
  useState,
} from './hookImpl';

export {
  jsx,
  css,
  styled,
  applyGlobalStyle,
  useState,
  useLocal,
  useMemo,
  useCallback,
  useEffect,
  useInlineEffect,
  useRef,
  createContext,
  useContext,
  Fragment,
};

export type FC<T extends {} = {}> = (props: T) => JSX.Element | null;
export type AluminaChild = JSX.Element | string;
export type AluminaChildren = AluminaChild | AluminaChild[];
export type AluminaNode = AluminaChild;

setJsxCreateElementFunction(jsx);

export function rerender() {
  aluminaGlobal.rerender();
}

export function asyncRerender() {
  aluminaGlobal.asyncRerenderFlag = true;
}

let asyncLoopInitialized = false;
function setupAsyncRenderLoop() {
  if (!asyncLoopInitialized) {
    const asyncRenderLoop = () => {
      if (aluminaGlobal.asyncRerenderFlag) {
        aluminaGlobal.rerender();
        aluminaGlobal.asyncRerenderFlag = false;
      }
      requestAnimationFrame(asyncRenderLoop);
    };
    asyncRenderLoop();
    asyncLoopInitialized = true;
  }
}

export function render(
  renderFn: () => JSX.Element,
  parentDomNode: HTMLElement | null,
) {
  const executeRender = () => {
    vdomCoreRender(renderFn() as IVNode, parentDomNode);
    aluminaGlobal.hookEffectFuncs.forEach((func) => func());
    aluminaGlobal.hookEffectFuncs = [];
  };
  aluminaGlobal.rerender = executeRender;
  executeRender();
  setupAsyncRenderLoop();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function render_debug(
  renderFn: () => JSX.Element,
  parentDomNode: HTMLElement | null,
) {
  const executeRender = () => {
    // console.log(`--------render start--------`);
    const d = aluminaGlobal.debug;
    d.nAll = 0;
    d.nUpdated = 0;
    d.nPatchCall = 0;
    const t0 = performance.now();

    // const options = { directives: { ref: domRefDirective } };
    // vdomCoreRender(renderFn() as VNode, parentDomNode!, options);
    vdomCoreRender(renderFn() as IVNode, parentDomNode);
    const t1 = performance.now();
    // eslint-disable-next-line no-constant-condition
    if (0) {
      const dur = t1 - t0;
      const nel = document.getElementsByTagName('*').length;
      console.log(
        `render c${d.nUpdated}/${d.nAll}, ` +
          `p${d.nPatchCall}, n${nel}, ${dur.toFixed(2)}ms`,
      );
      // render stats
      // c: component patched count,
      // p: component/element patch count
      // n: dom nodes count
      // ms: time elapsed
    }
    aluminaGlobal.hookEffectFuncs.forEach((func) => func());
    aluminaGlobal.hookEffectFuncs = [];
    // if (aluminaGlobal.hookRerenderFlag) {
    //   aluminaGlobal.hookRerenderFlag = false;
    //   requestAnimationFrame(executeRender);
    // }
  };

  aluminaGlobal.rerender = executeRender;
  executeRender();
  setupAsyncRenderLoop();
}
