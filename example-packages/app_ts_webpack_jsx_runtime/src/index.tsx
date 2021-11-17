import { css, FC, AluminaNode, render, rerender } from 'alumina';

let message = 'hello';

const BoxFrame: FC<{ children: AluminaNode }> = ({ children }) => {
  const style = css`
    border: solid 1px blue;
  `;
  return <div class={style}>{children}</div>;
};

const App: FC = () => {
  return (
    <div>
      <h1>app ts webpack jsx runtime</h1>
      <div>hello {message}</div>
      <BoxFrame>foo</BoxFrame>
      <input type="number" key="input1"></input>
    </div>
  );
};

window.addEventListener('load', () => {
  console.log('start');
  render(() => <App />, document.getElementById('app'));
  setTimeout(() => {
    message = 'world';
    rerender();
  }, 1000);
});
