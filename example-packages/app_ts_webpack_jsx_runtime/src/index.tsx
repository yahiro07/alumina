import { render, rerender } from 'alumina';

let message = 'hello';

const AppRoot = () => {
  return <div>hello {message}</div>;
};

window.addEventListener('load', () => {
  console.log('start');
  render(AppRoot, document.getElementById('app'));
  setTimeout(() => {
    message = 'world';
    rerender();
  }, 1000);
});
