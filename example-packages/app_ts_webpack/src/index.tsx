/* eslint-disable @typescript-eslint/unbound-method */
import { render, jsx, rerender, useEffect, css, styled } from 'alumina';

namespace ns0 {
  let message = 'hello';

  const updateMessageAsync = () => {
    setTimeout(() => {
      message = 'world';
      rerender();
    }, 1000);
  };

  export const App = () => {
    useEffect(updateMessageAsync, []);
    return <div>hello {message}</div>;
  };
}

namespace ns1 {
  let text = '⭐';

  export const Dolphins = () => (
    <div onClick={() => (text += '🐬')}>{text}</div>
  );
}

namespace ns2 {
  class WhalesModel {
    text = '⭐';
    extend = () => (this.text += '🐳');
  }
  const model = new WhalesModel();

  export const Whales = () => {
    const { text, extend } = model;
    return <div onClick={extend}>{text}</div>;
  };
}

namespace ns3 {
  const state = {
    text: '⭐',
  };
  const getters = {
    get whalesDouble() {
      return state.text.replace(/🐬/g, '🐳🐳');
    },
  };
  const actions = {
    extend() {
      state.text += '🐬';
    },
    reset() {
      state.text = '⭐';
    },
  };

  export const App = () => {
    const { text } = state;
    const { whalesDouble } = getters;
    const { extend, reset } = actions;
    return (
      <div>
        <div>dolphins: {text}</div>
        <div>whales_x2: {whalesDouble}</div>
        <div>
          <button onClick={extend}>add</button>
          <button onClick={reset}>reset</button>
        </div>
      </div>
    );
  };
}

namespace ns4 {
  const CardFrame = styled.div`
    border: solid 1px blue;
    padding: 20px;
  `;

  export const App = () => {
    return (
      <div>
        <CardFrame>card content</CardFrame>
      </div>
    );
  };
}

const AppRoot = () => {
  const style = css`
    font-size: 30px;
    user-select: none;
  `;
  return (
    <div class={style}>
      <ns0.App />
      <ns1.Dolphins />
      <ns2.Whales />
      <ns3.App />
      <ns4.App />
    </div>
  );
};

window.addEventListener('load', () => {
  console.log('start');
  render(AppRoot, document.getElementById('app'));
});
