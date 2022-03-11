/**
 * @jest-environment jsdom
 */

import { styled, jsx } from '..';
import { IVComponent, IVText } from '../core/types';

describe('styled', () => {
  test('check children', () => {
    const Tag = styled.p`
      color: blue;
    `;
    const vnode = (<Tag>hello</Tag>) as IVComponent;
    // console.log(JSON.stringify(vnode, null, ' '));
    expect(vnode.vtype).toBe('vComponent');
    expect(vnode.children.length).toBe(1);
    const child = vnode.children[0] as IVText;
    expect(child.vtype).toBe('vText');
    expect(child.text).toBe('hello');
  });
});
