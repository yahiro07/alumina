/* eslint-disable */
const fs = require('fs');
const { build, cliopts } = require('estrella');
const servor = require('servor');

const [opts] = cliopts.parse(['start', 'debug app'], ['build', 'build app']);
const reqStart = opts['start'];
const reqBuild = opts['build'];

function launchDebugServer(distDir) {
  servor({
    root: distDir,
    fallback: 'index.html',
    reload: true,
    browse: true,
    port: 3000,
  });
  console.log('server listening on http://localhost:3000');
}

function startWatchPage() {
  const srcDir = `./src`;
  const distDir = `./dist`;
  fs.mkdirSync(distDir, { recursive: true });
  fs.copyFileSync(`${srcDir}/index.html`, `${distDir}/index.html`);

  build({
    entry: `${srcDir}/index.tsx`,
    outfile: `${distDir}/index.js`,
    define: {
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    },
    bundle: true,
    minify: false,
    watch: true,
    clear: false,
    tslint: false,
    sourcemap: true,
    sourcesContent: true,
  });

  launchDebugServer(distDir);
}

function buildPage() {
  const srcDir = `./src`;
  const distDir = `./dist`;
  fs.mkdirSync(distDir, { recursive: true });
  fs.copyFileSync(`${srcDir}/index.html`, `${distDir}/index.html`);

  build({
    entry: `${srcDir}/index.tsx`,
    outfile: `${distDir}/index.js`,
    define: {
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    },
    bundle: true,
    minify: true,
    watch: false,
    clear: false,
    tslint: false,
    sourcemap: false,
    sourcesContent: false,
  });
}

function entry() {
  if (reqStart) {
    startWatchPage();
  }
  if (reqBuild) {
    buildPage();
  }
}

entry();
