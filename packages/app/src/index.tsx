import { render } from 'alumina';

const state = {
  message: 'hello',
};

const TestComponent = () => {
  return <div id="tc-1-1">tc11</div>;
};

const TestComponent2 = () => {
  return (
    <>
      <div id="tc-2-1">tc21</div>
      <div id="tc-2-2">tc22</div>
    </>
  );
};

const TestComponent3 = () => {
  return (
    <>
      <div id="tc-3-1">tc31</div>
    </>
  );
};

const TestComponent4 = () => {
  return (
    <>
      <TestComponent3 />
    </>
  );
};

const AppRoot = () => (
  <div id="foo" class="bar">
    <h1>{state.message}</h1>
    <>
      <div id="approot-fragment-1">approot-fragment-1</div>
    </>
    <TestComponent />
    <TestComponent2 />
    <TestComponent4 />
  </div>
);

render(AppRoot, document.getElementById('app'));

setTimeout(() => {
  state.message = 'world';
  // rerender();
}, 1000);
