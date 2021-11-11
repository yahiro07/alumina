import { render } from "alumina";

const TestComponent = () => {
  return <div>test test</div>;
};

const TestComponent2 = () => {
  return (
    <>
      <div>foo</div>
      <div>bar</div>
    </>
  );
};

const AppRoot = () => (
  <div id="foo" class="bar">
    <h1>hello</h1>
    <>
      <div>hoge</div>
    </>
    <TestComponent />
    <TestComponent2 />
  </div>
);

render(AppRoot, document.getElementById("app"));
