import { render, jsx } from 'alumina';

let count = 0;

const AppRoot = () => {
  return (
    <div onClick={() => count++}>
      <h1>foo</h1>
      <div>{count}</div>
      <p>bar</p>
      buzz
    </div>
  );
};
render(AppRoot, document.getElementById('app'));
