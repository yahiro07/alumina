export default {
  mount: {
    public: { url: '/', static: true },
    src: '/js',
  },
  devOptions: {
    port: 3000,
  },
  buildOptions: {
    out: 'dist',
    jsxFactory: 'jsx',
    jsxFragment: 'Fragment',
  },
  workspaceRoot: '../../',
};
