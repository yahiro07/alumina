## About

alumina is a yet another react-like small ui framework. It aims to rapid and easy development for small applications.
In order to make the state management easier, it adopts whole ui re-rendering scheme after each user interaction.
Due to that approach, you can write the store or model without complex state management libraries.
## Usage 

```
  npm install alumina
```

### Hello world
```tsx
import { render } from 'alumina';

const AppRoot = () => (
  <div>
    hello world
  </div>
);
render(AppRoot, document.getElementById('app'));

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
render(Counter, document.getElementById('app'));
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

render(Counter, document.getElementById('app'));
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

  render(Counter, document.getElementById('app'));
```

The state management part doesn't depends on how the view updated.
You can design your store with free ideas!

## Repository structure

<pre>
.
├── package.json
├── packages
│   ├── alumina
│   ├── app
│   └── app_js_webpack
├── readme.md
├── tsconfig.json
└── yarn.lock
</pre>

This repository contains core implementation of alumina and use-case example setup project. 

| sub package | detail |
| ---- | ---- |
| alumina | package published to npm |
| app | example setup with typescript and parcel |
| app_js_webpack | example setup javascript and webpack | 


## License

alumina is provided under MIT License.
