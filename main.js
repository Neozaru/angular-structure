require(['require-common'], function(common) {
  require.config({
    baseUrl: '/',
    paths: common.paths,
    shim: common.shim,

    deps: ['app']
  });
})
