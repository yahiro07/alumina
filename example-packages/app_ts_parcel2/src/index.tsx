/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */
import {
  render,
  jsx,
  FC,
  css,
  useState,
  rerender,
  useLocal,
  styled,
  applyGlobalStyle,
} from 'alumina';

namespace ns0 {
  let count = 0;
  export const Counter: FC = () => {
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
}

namespace ns1 {
  class CounterModel {
    count: number = 0;
    increment = () => {
      this.count++;
    };
  }
  const counterModel = new CounterModel();

  export const Counter: FC = () => {
    const { count, increment } = counterModel;
    return (
      <div onClick={increment}>
        <h3>counter1</h3>
        <p>{count}</p>
      </div>
    );
  };
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

  export const Counter: FC = () => {
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
}

namespace ns3 {
  export const Counter: FC = () => {
    const [count, setCount] = useState(0);
    const increment = () => setCount((prev) => prev + 1);
    return (
      <div onClick={increment}>
        <h3>counter3</h3>
        <p>{count}</p>
      </div>
    );
  };
}

namespace ns4 {
  const store = {
    message: 'hello',
  };

  const changeMessageAsync = () => {
    setTimeout(() => {
      store.message = 'world';
      rerender(); // manually trigger rendering
    }, 1000);
  };
  export const App = () => {
    return (
      <div onClick={changeMessageAsync}>
        <p>{store.message}</p>
      </div>
    );
  };
}

namespace ns5 {
  export const Counter: FC = () => {
    const state = useLocal({ count: 0 });
    const increment = () => state.count++;
    const reset = () => (state.count = 0);
    return (
      <div>
        <h3>counter5</h3>
        <div>{state.count}</div>
        <button onClick={increment}>add</button>
        <button onClick={reset}>reset</button>
      </div>
    );
  };
}

namespace ns6 {
  const createClosureModel = () => {
    const state = { count: 0 };
    const increment = () => state.count++;
    const reset = () => (state.count = 0);
    return { state, increment, reset };
  };
  export const Counter: FC = () => {
    const { state, increment, reset } = useLocal(createClosureModel);
    return (
      <div>
        <h3>counter6</h3>
        <div>{state.count}</div>
        <button onClick={increment}>add</button>
        <button onClick={reset}>reset</button>
      </div>
    );
  };
}

namespace ns7 {
  applyGlobalStyle(css`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html,
    body,
    #app {
      height: 100%;
    }
  `);
  const Hello = () => (
    <div
      class={css`
        border: solid 1px red;
        font-size: 20px;
        font-weight: bold;
      `}
    >
      hello inline css
    </div>
  );

  const StyledCard = styled.div`
    border: solid 1px blue;
    border-radius: 10px;
    width: 100px;
    height: 100px;
  `;

  export const App = () => (
    <div>
      <Hello />
      <StyledCard>hello styled</StyledCard>
    </div>
  );
}

namespace ns8 {
  export const App = () => (
    <div>
      <div>shown</div>
      <div if={false}>hidden</div>
    </div>
  );
}

namespace ns9 {
  const PageHeader: FC<{ text: string }> = ({ text }) => {
    const headerStyle = css`
      color: orange; //this is applied to h1
    `;
    return <h1 class={headerStyle}>{text}</h1>;
  };

  export const Page = () => {
    const pageStyle = css`
      > .header-text {
        border: solid 1px violet; //this is also applied to h1
      }
      > .body-text {
        color: blue;
      }
    `;
    return (
      <div class={pageStyle}>
        <PageHeader text="hello1" class="header-text" />
        <div class="body-text">page content</div>
      </div>
    );
  };
}

namespace ns10 {
  const Foo = () => <div class="foo" />;
  export const App = () => <Foo class="bar" />;
  // renders the DOM <div class="foo bar"></div>
}

const AppRoot = () => (
  <div>
    <ns0.Counter />
    <ns1.Counter />
    <ns2.Counter />
    <ns3.Counter />
    <ns4.App />
    <ns5.Counter />
    <ns6.Counter />
    <ns7.App />
    <ns8.App />
    <ns9.Page />
    <ns10.App />
  </div>
);

window.addEventListener('load', () => {
  render(() => <AppRoot />, document.getElementById('app'));
});
