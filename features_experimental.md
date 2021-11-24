Following features are implemented experimentally. They might be moved to separate packages in future.


## Hooks

Alumina provides hook functions listed below that compatible to React Hooks. 

- useState
- useMemo
- useCallback
- useEffect
- useRef



## Hooks examples

<!-- 
<details>
  <summary>Extract</summary><div>
---
---
</div>
</details> 
-->

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


## Context API

React-compatible context API is provided.

- createContext
- useContext


## CSS in JS

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

