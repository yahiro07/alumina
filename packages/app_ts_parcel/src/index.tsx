/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-namespace */
import { render } from 'alumina';

namespace ns0 {
  let count = 0;
  const Counter = () => {
    return <div onClick={() => count++}>{count}</div>;
  };
  export function run() {
    render(Counter, document.getElementById('app'));
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

  const Counter = () => {
    const { count, increment } = counterModel;
    return <div onClick={increment}>{count}</div>;
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
      state.count *= 2;
    },
    reset() {
      state.count = 0;
    },
  };

  const Counter = () => {
    const { count } = state;
    const { countDouble } = getters;
    const { increment, reset } = actions;
    return (
      <div>
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
