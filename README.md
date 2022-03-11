# Alumina

Alumina is a react-like small UI framework. It aims to rapid and easy development for small applications. In order to make the state management easier, it adopts the scheme whole virtual dom tree reconciled after each user interaction. Due to that approach, you can write the store or model without complex state management libraries.


## Usage 

### Install
```
  npm install alumina
```

### Configurations
There are configuration example projects for typescript and well-used bundlers in [alumina-setup-examples](https://github.com/yahiro07/alumina-setup-examples
) repo. Please check them for the reference.


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

function createStore() {
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
  return { state, getters, actions };
}

const store = createStore();

const Counter = () => {
  const {
    state: { count },
    getters: { countDouble },
    actions: { increment, reset },
  } = store;
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



### Class props propagation

```tsx
  const Foo = () => <div class="foo" />;
  const App = () => <Foo class="bar" />;
  // --> renders the DOM <div class="foo bar"></div>
```

Function component accepts class prop and it is added to the class attribute of the root element of returned dom tree. Useful for decorating child components in parent context.

## Background
Alumina is originally developed for the insourcing UI framework for [Kermite](https://kermite.org).

## License

MIT license.
