import { render, jsx, css } from "alumina";

let count = 0;
const App = () => (
  <div class={style} onClick={() => count++}>
    {count}
  </div>
);

const style = css`
  width: 50px;
  height: 50px;
  border: solid 2px #08f;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

window.addEventListener("load", () => {
  render(() => <App />, document.getElementById("app"));
});
