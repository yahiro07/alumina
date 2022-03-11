import { jsx } from '..';
import { IVElement } from '../core/types';

describe('jsx with transform', () => {
  test('create vnode', () => {
    const vnode = (<h2 />) as IVElement;
    expect(vnode.vtype).toBe('vElement');
    expect(vnode.tagName).toBe('h2');
    expect(vnode.children.length).toBe(0);
  });

  test('create vnode with props', () => {
    const vnode = (<h2 id="bar" key="kk" />) as IVElement;
    expect(vnode.vtype).toBe('vElement');
    expect(vnode.tagName).toBe('h2');
    expect(vnode.props.id).toBe('bar');
    expect(vnode.props.key).toBe('kk');
    expect(vnode.children.length).toBe(0);
  });

  test('create vnode with children', () => {
    const vnode = (
      <h2>
        <span>aaa</span>
        <span>bbb</span>
      </h2>
    ) as IVElement;
    expect(vnode.vtype).toBe('vElement');
    expect(vnode.tagName).toBe('h2');
    expect(vnode.children.length).toBe(2);
  });
});
