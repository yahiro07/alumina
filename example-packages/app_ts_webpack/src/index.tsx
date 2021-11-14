import { render, jsx, rerender, Fragment, useEffect } from 'alumina';

namespace ns0 {
  let message = 'hello';

  const updateMessageAsync = () => {
    setTimeout(() => {
      message = 'world';
      rerender();
    }, 1000);
  };

  export const App = () => {
    useEffect(updateMessageAsync, []);
    return (
      <div>
        hello {message}
        <>
          <p>123</p>
        </>
      </div>
    );
  };
}

const AppRoot = () => {
  return (
    <div>
      <ns0.App />
    </div>
  );
};

window.addEventListener('load', () => {
  console.log('start');
  render(AppRoot, document.getElementById('app'));
});
