import { render } from "alumina";

const AppRoot = () => (
  <div id="foo" class="bar">
    <h1>hello</h1>
    <p>world</p>
    <>
      <div>hoge</div>
      <div>piyo</div>
    </>
    <>
      <p>poyo</p>
    </>
  </div>
);

render(AppRoot, document.getElementById("app"));
