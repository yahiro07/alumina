// based on goober
// https://github.com/cristianbote/goober
/*
MIT License
Copyright (c) 2019 Cristian Bote

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { aluminaGlobal } from './aluminaGlobal';

const newRule = /(?:([A-Z0-9-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/gi;
const ruleClean = /\/\*[\s\S]*?\*\/|\s{2,}|\n/gm;

// Convert a css style string into a object
const astish = (val: string): any => {
  const tree: any = [{}];
  let block;

  while ((block = newRule.exec(val.replace(ruleClean, '')))) {
    // Remove the current entry
    if (block[4]) tree.shift();

    if (block[3]) {
      tree.unshift((tree[0][block[3]] = tree[0][block[3]] || {}));
    } else if (!block[4]) {
      tree[0][block[1]] = block[2];
    }
  }

  return tree[0];
};

// Parses the object into css, scoped, blocks
const parse = (obj: any, selector: string) => {
  let outer = '';
  let blocks = '';
  let current = '';
  let next;

  for (const key in obj) {
    const val = obj[key];

    // If this is a 'block'
    if (typeof val === 'object') {
      next = selector
        ? // Go over the selector and replace the matching multiple selectors if any
          selector.replace(/([^,])+/g, (sel) => {
            // Return the current selector with the key matching multiple selectors if any
            return key.replace(/([^,])+/g, (k) => {
              // If the current `k`(key) has a nested selector replace it
              if (/&/g.test(k)) return k.replace(/&/g, sel);

              // If there's a current selector concat it
              return sel ? sel + ' ' + k : k;
            });
          })
        : key;

      // If these are the `@` rule
      if (key[0] === '@') {
        // Handling the `@font-face` where the
        // block doesn't need the brackets wrapped
        if (key[1] === 'f') {
          blocks += parse(val, key);
        } else {
          // Regular rule block
          blocks +=
            key + '{' + parse(val, key[1] === 'k' ? '' : selector) + '}';
        }
      } else {
        // Call the parse for this block
        blocks += parse(val, next);
      }
    } else {
      if (key[0] === '@' && key[1] === 'i') {
        outer = key + ' ' + val + ';';
      } else {
        const parse_p = (parse as any).p;
        // Push the line for this property
        current += parse_p
          ? // We have a prefixer and we need to run this through that
            parse_p(key.replace(/[A-Z]/g, '-$&').toLowerCase(), val)
          : // Nope no prefixer just append it
            key.replace(/[A-Z]/g, '-$&').toLowerCase() + ':' + val + ';';
      }
    }
  }

  // If we have properties
  if (current[0]) {
    // Standard rule composition
    next = selector ? selector + '{' + current + '}' : current;

    // Else just push the rule
    return outer + next + blocks;
  }

  return outer + blocks;
};

// ----------------------------------------------------------------------

const getUniqueClassName = (cssText: string, label?: string) => {
  const { classNameIndexTable } = aluminaGlobal;
  let index = classNameIndexTable[cssText];
  if (index === undefined) {
    index = classNameIndexTable[cssText] = aluminaGlobal.seqClassNameIndex++;
  }
  const prefix = 'cs';
  return label ? `${prefix}${index}_${label}` : `${prefix}${index}`;
};

interface ILocalSheet {
  data: string;
}

function getLocalSheet(): ILocalSheet {
  let { gSheet } = aluminaGlobal;
  if (!gSheet) {
    gSheet = document.createElement('style');
    gSheet.innerHTML = ' ';
    gSheet.id = 'alumina_css_in_js';
    document.head.appendChild(gSheet);
    aluminaGlobal.gSheet = gSheet;
  }
  return gSheet.firstChild as any;
}

function updateLocalSheet(cssText0: string) {
  const sheet = getLocalSheet();
  const cssText = cssText0.replace(/label:.+?;/g, '');
  if (!sheet.data.includes(cssText)) {
    sheet.data = sheet.data + cssText;
  }
}

function extractLabel(cssText: string): string | undefined {
  const m = cssText.match(/label: (.+);/);
  return m?.[1];
}

function extractCssTemplate(
  template: TemplateStringsArray,
  values: (string | number)[],
): string {
  let text = '';
  let i = 0;
  const { cssClassNameToTextMap } = aluminaGlobal;
  for (i = 0; i < values.length; i++) {
    text += template[i];
    let value = values[i].toString();
    if (cssClassNameToTextMap[value]) {
      value = cssClassNameToTextMap[value];
    }
    text += value;
  }
  text += template[i];
  return text;
}

export function css(
  template: TemplateStringsArray,
  ...templateParameters: (string | number)[]
): string {
  const { cssTextToClassNameMap, cssClassNameToTextMap } = aluminaGlobal;
  const cssText = extractCssTemplate(template, templateParameters);
  if (cssTextToClassNameMap[cssText]) {
    return cssTextToClassNameMap[cssText];
  }
  const label = extractLabel(cssText);
  const className = getUniqueClassName(cssText, label);
  const ast = astish(cssText);
  const parsed = parse(ast, `.${className}`);
  updateLocalSheet(parsed);

  cssTextToClassNameMap[cssText] = className;
  cssClassNameToTextMap[className] = cssText;
  return className;
}

export function applyGlobalStyle(className: string) {
  const { cssClassNameToTextMap } = aluminaGlobal;
  const cssText = cssClassNameToTextMap[className];
  if (cssText) {
    const ast = astish(cssText);
    const parsed = parse(ast, '');
    updateLocalSheet(parsed);
  }
}

export function setJsxCreateElementFunction(pragma: Function): void {
  aluminaGlobal.jsxCreateElementFunction = pragma;
}

type IntrinsicElements = JSX.IntrinsicElements;
type JsxElement = JSX.Element;

type IStyledComponentGenerator<T extends keyof IntrinsicElements> = (
  template: TemplateStringsArray,
  ...templateParameters: (string | number)[]
) => (props: IntrinsicElements[T]) => JsxElement;

export const styled: {
  [K in keyof IntrinsicElements]: IStyledComponentGenerator<K>;
} = new Proxy(
  {},
  {
    get: <K extends keyof IntrinsicElements>(_target: any, tag: K) => {
      return (...args: Parameters<typeof css>) => {
        const classNameBase = css(...args);
        return (props: IntrinsicElements[K]) => {
          const className = [classNameBase, props.className || ''].join(' ');
          const { jsxCreateElementFunction } = aluminaGlobal;
          return jsxCreateElementFunction!(tag, { ...props, className });
        };
      };
    },
  },
) as any;
