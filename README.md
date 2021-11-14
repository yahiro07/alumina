## About

Alumina is a react-like small UI framework. It aims to rapid and easy development for small applications.
In order to make the state management easier, it adopts the scheme whole virtual dom tree reconciled after each user interaction.
Due to that approach, you can write the store or model without complex state management libraries.
## Usage 

### Install
```
  npm install alumina
```
### Configurations
There are configuration example projects for typescript and well-used bundlers under `./example-packages` in this repository. Please check them for the reference.
## Basic Examples
### Hello world
```tsx
import { render, jsx } from 'alumina';

const App = () => (
  <div>
    hello world
  </div>
);
render(() => <App />), document.getElementById('app'));

```
### Counter

```tsx
import { render, jsx } from 'alumina';

let count = 0;
const Counter = () => (
  <div onClick={() => count++}>
    {count}
  </div>
)
render(() => <Counter />, document.getElementById('app'));
```

### Counter (with class model)

```tsx
import { render, jsx } from 'alumina';

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

render(() => <Counter />, document.getElementById('app'));
```

### Counter (with vuex like state management)
```tsx
import { render, jsx } from 'alumina';

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

render(() => <Counter />, document.getElementById('app'));
```

The state management part doesn't depend on how the view updated.
You can design your store with free ideas!

## More examples with Hooks

<details>
  <summary>Extract</summary><div>

---

### Counter (with useState)


```tsx
import { jsx, useState } from 'alumina';

const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((prev) => prev + 1);
  return (
    <div onClick={increment}>
      <p>{count}</p>
    </div>
  );
};
```

Make a local state by useState, same as of React.


### Counter (with useLocal)

```tsx
import { jsx, useLocal } from 'alumina';

const Counter = () => {
  const state = useLocal({ count: 0 });
  const increment = () => state.count++;
  const reset = () => (state.count = 0);
  return (
    <div>
      <div>{state.count}</div>
      <button onClick={increment}>add</button>
      <button onClick={reset}>reset</button>
    </div>
  );
};
```

`useLocal()` is an original hook function introduced to alumina.
It takes an initial value object as an argument.
You can mutate it's member directly.

```tsx
import { jsx, useLocal } from 'alumina';

const createClosureModel = () => {
  const state = { count: 0 };
  const increment = () => state.count++;
  const reset = () => (state.count = 0);
  return { state, increment, reset };
};
export const Counter = () => {
  const { state, increment, reset } = useLocal(createClosureModel);
  return (
    <div>
      <div>{state.count}</div>
      <button onClick={increment}>add</button>
      <button onClick={reset}>reset</button>
    </div>
  );
};
```

`useLocal()` also accepts object initializer functions. Closures can be used as local state management store.



---
</div>
</details>


## Usage Notes

### Async Update

Alumina automatically updates the view after every DOM callback functions (such like onClick, onMouseMove, ...etc). However for other cases, especially for async function call, `rerender()` function should be invoked explicitly to update the view.

```tsx
import { jsx, rerender } from 'alumina';

const store = {
  message: 'hello',
};

const changeMessageAsync = () => {
  setTimeout(() => {
    store.message = 'world';
    rerender(); // manually trigger rendering
  }, 1000);
};
const App = () => {
  return (
    <div onClick={changeMessageAsync}>
      <p>{store.message}</p>
    </div>
  );
};
```

### If prop

```tsx
const App = () => (
  <div>
    <div>shown</div>
    <div if={true}>shown</div>
    <div if={false}>hidden</div>
    <SomeComponent if={false} />
  </div>
);
```

There is if prop. When falsy value passed, the element is not rendered. It also applicable to function components.


### Hooks

Alumina provides following hook functions compatible to React Hooks. 

- useState
- useMemo
- useCallback
- useEffect
- useRef

### CSS in JS

There is a built-in simple css-in-js implementation.

`css()` function takes css styling string literal and return a className.

```tsx
import { css, jsx } from 'alumina';

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
```

`styled()` decorates an element with attached style.

```tsx
import { styled } from 'alumina';

const StyledCard = styled.div`
  border: solid 1px blue;
  border-radius: 10px;
  width: 100px;
  height: 100px;
`;
```

`applyGlobalStyle()` is used to declare page global styles.

```tsx
import { applyGlobalStyle } from 'alumina';

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
```

### Class props propagation

```tsx
  const Foo = () => <div class="foo" />;
  const App = () => <Foo class="bar" />;
  // --> renders the DOM <div class="foo bar"></div>
```

Function component accepts class prop and it is added to the class attribute of the root element of returned dom tree. Useful for decorating child components in parent context.

## Repository structure

<pre>
.
├── base-packages
│   ├── alumina
│   └── alumina-remake
├── example-packages
│   ├── app_js_webpack
│   ├── app_ts_estrella
│   ├── app_ts_parcel2
│   ├── app_ts_webpack
│   └── app_ts_webpack_jsx_runtime
├── package.json
├── readme.md
├── tsconfig.json
└── yarn.lock

</pre>

This repository contains the core implementation of alumina and minimum example projects for various front-end development environments.

| package | detail |
| ---- | ---- |
| ./base-packages/alumina | package published to npm |
| ./example-packages/* | example project setup projects |

## Background
Alumina is originally developed for the insourcing UI framework for [Kermite](https://kermite.org).

## License

MIT license.
