import { css, jsx, render } from "alumina";

let count = 0;
const App = () => (
  <div class={style} onClick={() => count++}>
    hello world {count}
  </div>
);

const style = css`
  border: solid 2px #f08;
  cursor: pointer;
  user-select: none;
`;

window.addEventListener("load", () => {
  render(() => <App />, document.getElementById("app"));
});
