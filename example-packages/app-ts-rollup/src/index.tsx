import { css, jsx, render } from "alumina";

let stars = "⭐";
const App = () => (
  <div class={style} onClick={() => (stars += "⭐")}>
    hello {stars}
  </div>
);

const style = css`
  cursor: pointer;
  user-select: none;
`;
window.addEventListener("load", () => {
  render(() => <App />, document.getElementById("app"));
});
