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
## Code Examples
### Hello world
```tsx
import { render } from 'alumina';

const App = () => (
  <div>
    hello world
  </div>
);
render(() => <App />), document.getElementById('app'));

```

### Counter

```tsx
import { render } from 'alumina';

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
import { render } from 'alumina';

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
