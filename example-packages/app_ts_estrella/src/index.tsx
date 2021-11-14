import { css, FC, jsx, AluminaNode, render, useState } from 'alumina';

const Counter: FC = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const style = css`
    > h1 {
      color: blue;
    }
  `;
  return (
    <div onClick={increment} class={style}>
      <h3>counter</h3>
      <p>{count}</p>
    </div>
  );
};

const BoxFrame: FC<{ children: AluminaNode }> = ({ children }) => {
  const style = css`
    border: solid 1px blue;
  `;
  return <div class={style}>{children}</div>;
};

const App: FC = () => {
  return (
    <div>
      <h1>app ts estrella</h1>
      <BoxFrame>hello</BoxFrame>
      <Counter />
    </div>
  );
};

window.addEventListener('load', () => {
  render(() => <App />, document.getElementById('app'));
});
