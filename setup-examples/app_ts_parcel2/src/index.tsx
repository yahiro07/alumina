/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */
import { render, jsx, FC, css } from 'alumina';

namespace ns0 {
  let count = 0;
  const Counter: FC = () => {
    return (
      <div onClick={() => count++} class={style}>
        <h3>counter0</h3>
        <p>{count}</p>
      </div>
    );
  };
  const style = css`
    border: solid 1px blue;
  `;

  export function run() {
    render(() => <Counter />, document.getElementById('app'));
  }
}

namespace ns1 {
  class CounterModel {
    count: number = 0;
    increment = () => {
      this.count++;
    };
  }
  const counterModel = new CounterModel();

  const Counter: FC = () => {
    const { count, increment } = counterModel;
    return (
      <div onClick={increment}>
        <h3>counter1</h3>
        <p>{count}</p>
      </div>
    );
  };

  export function run() {
    render(() => <Counter />, document.getElementById('app'));
  }
}

namespace ns2 {
  const state = {
    count: 0,
  };
  const getters = {
    get countDouble() {
      return state.count * 2;
    },
  };
  const actions = {
    increment() {
      state.count++;
    },
    reset() {
      state.count = 0;
    },
  };

  const Counter: FC = () => {
    const { count } = state;
    const { countDouble } = getters;
    const { increment, reset } = actions;
    return (
      <div>
        <h3>counter2</h3>
        <div>count: {count}</div>
        <div>x2: {countDouble}</div>
        <div>
          <button onClick={increment}>add</button>
          <button onClick={reset}>reset</button>
        </div>
      </div>
    );
  };

  export function run() {
    render(() => <Counter />, document.getElementById('app'));
  }
}

window.addEventListener('load', () => {
  ns0.run();
  // ns1.run();
  // ns2.run();
});
