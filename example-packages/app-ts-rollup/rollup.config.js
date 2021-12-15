import resolve from "@rollup/plugin-node-resolve";
import htmlTemplate from "rollup-plugin-generate-html-template";
import serve from "rollup-plugin-serve";
import typescript from "rollup-plugin-typescript2";
import livereload from "rollup-plugin-livereload";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "./src/index.tsx",
  output: {
    file: "dist/bundle.js",
    format: "iife",
  },
  plugins: [
    resolve(),
    typescript(),
    htmlTemplate({
      template: "./template.html",
      target: "index.html",
    }),
    !production &&
      (serve({
        contentBase: "./dist",
        open: true,
        host: "localhost",
        port: 3000,
      }),
      livereload({
        watch: "dist",
      })),
  ],
};
