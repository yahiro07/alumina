import { jsx } from '../core/jsx';
import { jsx as jsxr } from '../core/jsxRuntime';
import { IVElement } from '../core/types';

describe('jsx classic', () => {
  test('create vnode, blank props, no children', () => {
    const vnode = jsx('h2', {}) as IVElement;
    expect(vnode.vtype).toBe('vElement');
    expect(vnode.tagName).toBe('h2');
    expect(vnode.children.length).toBe(0);
  });

  test('create vnode, with props, no children', () => {
    const vnode = jsx('h2', { foo: 'bar', key: 'kk' }) as IVElement;
    expect(vnode.vtype).toBe('vElement');
    expect(vnode.tagName).toBe('h2');
    expect(vnode.props.foo).toBe('bar');
    expect(vnode.props.key).toBe('kk');
    expect(vnode.children.length).toBe(0);
  });

  test('create vnode, with props, with children', () => {
    const vnode = jsx(
      'h2',
      { foo: 'bar', key: 'kk' },
      'aaa',
      'bbb',
    ) as IVElement;
    expect(vnode.vtype).toBe('vElement');
    expect(vnode.tagName).toBe('h2');
    expect(vnode.props.foo).toBe('bar');
    expect(vnode.props.key).toBe('kk');
    expect(vnode.children.length).toBe(2);
  });
});

describe('jsx runtime', () => {
  test('create vnode, blank props, no children', () => {
    const vnode = jsxr('h2', {}, undefined) as IVElement;
    expect(vnode.vtype).toBe('vElement');
    expect(vnode.tagName).toBe('h2');
    expect(vnode.children.length).toBe(0);
  });

  test('create vnode, with props, no children, with key', () => {
    const vnode = jsxr('h2', { foo: 'bar' }, 'kk') as IVElement;
    expect(vnode.vtype).toBe('vElement');
    expect(vnode.tagName).toBe('h2');
    expect(vnode.props.foo).toBe('bar');
    expect(vnode.props.key).toBe('kk');
    expect(vnode.children.length).toBe(0);
  });

  test('create vnode, with props, with children', () => {
    const vnode = jsxr(
      'h2',
      {
        foo: 'bar',
        children: ['aaa', 'bbb'],
      },
      undefined,
    ) as IVElement;
    // console.log(JSON.stringify(vnode, null, ' '));
    expect(vnode.vtype).toBe('vElement');
    expect(vnode.tagName).toBe('h2');
    expect(vnode.props.foo).toBe('bar');
    expect(vnode.children.length).toBe(2);
  });
});
