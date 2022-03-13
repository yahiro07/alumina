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
  IHookRefObject,
  useCallback,
  useEffect,
  useInlineEffect,
  useLocal,
  useMemo,
  useRef,
  useState,
} from './hookImpl';
import { domStyled, effectOnMount, useMemoWithArgs } from './extensions';

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
  IHookRefObject,
  domStyled,
  useMemoWithArgs,
  effectOnMount,
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

function setupAsyncRenderLoop() {
  if (!aluminaGlobal.asyncLoopInitialized) {
    const asyncRenderLoop = () => {
      if (aluminaGlobal.asyncRerenderFlag) {
        aluminaGlobal.rerender();
        aluminaGlobal.asyncRerenderFlag = false;
      }
      requestAnimationFrame(asyncRenderLoop);
    };
    asyncRenderLoop();
    aluminaGlobal.asyncLoopInitialized = true;
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
