import { useEffect, useMemo } from './hookImpl';

export function domStyled(vdom: any, className?: string): JSX.Element {
  if (className) {
    if (vdom.props.class) {
      vdom.props.class += ' ' + className;
    } else {
      vdom.props.class = className;
    }
  }
  return vdom;
}

export function useMemoWithArgs<T extends (...args: any[]) => any>(
  func: T,
  args: Parameters<T>,
): ReturnType<T> {
  return useMemo(() => func(...args), args);
}

export function effectOnMount(fn: () => void | Promise<void>) {
  useEffect(fn, []);
}
