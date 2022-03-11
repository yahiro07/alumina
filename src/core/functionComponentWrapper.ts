import {
  createHookInstance,
  endHooks,
  flushHookEffects,
  startHooks,
} from '../hookImpl';
import { IComponentState, IProps, IVComponentWrapper } from './types';

const promise = Promise.resolve();
function doLater(fn: () => void) {
  promise.then(fn);
}

function stringifyClasses(classes: string[] | string): string {
  if (Array.isArray(classes)) {
    return classes.filter((a) => !!a).join(' ');
  } else {
    return classes;
  }
}

function createFunctionComponentWrapper(
  renderFunction: Function,
): IVComponentWrapper {
  const fcName = renderFunction.name;
  return {
    name: fcName,
    mount(self: IComponentState, props: IProps) {
      // console.log('mount', fcName);
      self.fcsig = fcName;
      self.hook = createHookInstance();
      self.renderWithHook = (props: IProps) => {
        startHooks(self.hook);
        const vnode = renderFunction(props);
        if (vnode) {
          vnode.marker = `${fcName}`;
        }
        if (
          props.class &&
          vnode &&
          (vnode.vtype === 'vElement' || vnode.vtype === 'vComponent')
        ) {
          const fcClasses = stringifyClasses(props.class);
          vnode.props.class = vnode.props.class
            ? `${vnode.props.class} ${fcClasses}`
            : fcClasses;
        }
        endHooks();
        doLater(() => flushHookEffects(self.hook));
        return vnode;
      };
      return self.renderWithHook(props);
    },
    update(self: IComponentState, props: IProps) {
      return self.renderWithHook(props);
    },
    unmount(self: IComponentState) {
      // console.log('unmount', fcName);
      flushHookEffects(self.hook, true);
    },
  };
}

type IRenderFunction = Function & {
  __AluminaFunctionComponentWrapper?: any;
};

export function getFunctionComponentWrapperCached(
  renderFunction: IRenderFunction,
) {
  if (!renderFunction.__AluminaFunctionComponentWrapper) {
    renderFunction.__AluminaFunctionComponentWrapper =
      createFunctionComponentWrapper(renderFunction);
  }
  return renderFunction.__AluminaFunctionComponentWrapper;
}
