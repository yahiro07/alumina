import { css, FC, jsx, render } from 'alumina';

let count = 0;
const Counter: FC = () => {
  return (
    <div onClick={() => count++} class={style}>
      <h1>ap ts estrella</h1>
      <h3>counter</h3>
      <p>{count}</p>
    </div>
  );
};
const style = css`
  > h1 {
    color: blue;
  }
`;

window.addEventListener('load', () => {
  render(() => <Counter />, document.getElementById('app'));
});
