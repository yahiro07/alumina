import { render, rerender } from "alumina";

const state = {
  message: "hello",
};

const TestComponent = () => {
  return <div id="tc-1-1">test test</div>;
};

const TestComponent2 = () => {
  return (
    <>
      <div id="tc-2-1">foo</div>
      <div id="tc-2-2">bar</div>
    </>
  );
};

const TestComponent3 = () => {
  return (
    <>
      <div id="tc-3-1">foo</div>
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
      <div id="approot-flagment-1">hoge</div>
    </>
    <TestComponent />
    <TestComponent2 />
    <TestComponent4 />
  </div>
);

render(AppRoot, document.getElementById("app"));

setTimeout(() => {
  state.message = "world";
  // rerender();
}, 1000);
