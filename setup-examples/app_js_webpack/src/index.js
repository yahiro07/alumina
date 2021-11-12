import { render, jsx } from 'alumina';

const AppRoot = () => {
  return (
    <div>
      <h1>foo</h1>
      <p>bar</p>
      buzz
    </div>
  );
};
render(AppRoot, document.getElementById('app'));
