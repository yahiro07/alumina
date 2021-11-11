import { render } from "alumina";

const AppRoot = () => (
  <div id="foo" class="bar">
    <h1>hello</h1>
    <p>world</p>
  </div>
);

render(AppRoot, document.getElementById("app"));
