import { css, FC, jsx, render } from 'alumina';

let count = 0;
const Counter: FC = () => (
  <div class={style} onClick={() => count++}>
    hello world {count}
  </div>
);

const TitleWithButton: FC<{ text: string; handler?: () => void }> = ({
  text,
  handler,
}) => (
  <div style="display:flex">
    <div>{text}</div>
    <button onClick={handler} if={handler}>
      callback
    </button>
  </div>
);

const user = {
  name: 'yamada',
  age: 20,
};

const App: FC = () => {
  return (
    <div>
      <Counter />
      <div if={user}>{user.name}</div>
      <TitleWithButton text="foo" />
      <TitleWithButton text="bar" handler={() => alert('hello')} />
    </div>
  );
};

const style = css`
  border: solid 2px #f08;
  cursor: pointer;
  user-select: none;
`;

window.addEventListener('load', () => {
  render(() => <App />, document.getElementById('app'));
});
