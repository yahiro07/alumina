import { aluminaGlobal } from './aluminaGlobal';
import { css } from './cssInJs';
import { extractShortCss } from './shortCss';

function camelCaseToHyphenCase(str: string) {
  return str.replace(/[A-Z]/g, (s) => '-' + s.charAt(0).toLowerCase());
}
function styleObjectToString(obj: { [key: string]: any }) {
  return Object.keys(obj)
    .map((key) => {
      const value = obj[key];
      const key1 = camelCaseToHyphenCase(key);
      return `${key1}:${value};`;
    })
    .join(' ');
}

export function interposeProps(props: any, vtype: string | object | Function) {
  if (typeof vtype !== 'string') {
    return;
  }
  if (props) {
    for (const key in props) {
      if (key.startsWith('on')) {
        const originalProc = props[key];
        delete props[key];
        const key1 = key.toLowerCase();

        props[key1] = originalProc
          ? (...a: any) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              originalProc?.(...a);
              aluminaGlobal.rerender();
            }
          : undefined;
      }
    }
    if (props.css || props.class || props.className || props.xs) {
      const xsClassName =
        props.xs &&
        css`
          ${extractShortCss(props.xs)}
        `;
      const classes = [
        props.css,
        ...(Array.isArray(props.class) ? props.class : [props.class]),
        props.className,
        xsClassName,
      ]
        .filter((a) => !!a)
        .join(' ');
      delete props.css;
      delete props.className;
      delete props.xs;
      props.class = classes;
    }
    if (props.style && typeof props.style === 'object') {
      props.style = styleObjectToString(props.style);
    }
  }
}
