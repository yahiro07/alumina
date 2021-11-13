import { css, FC, QxNode, render, rerender } from 'alumina';

let message = 'hello';

const BoxFrame: FC<{ children: QxNode }> = ({ children }) => {
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
