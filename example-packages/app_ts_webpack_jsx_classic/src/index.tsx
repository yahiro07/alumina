import { render, jsx, rerender, Fragment } from 'alumina';

let message = 'hello';

const AppRoot = () => {
  return (
    <div>
      hello {message}
      <>
        <p>123</p>
      </>
    </div>
  );
};

window.addEventListener('load', () => {
  console.log('start');
  render(AppRoot, document.getElementById('app'));
  setTimeout(() => {
    message = 'world';
    rerender();
  }, 1000);
});
