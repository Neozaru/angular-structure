require(['/base/require-common.js'], function(common) {

    /* Tells Karma to use only .mocha.js files as test files */
  var tests = [];
  for (var file in window.__karma__.files) {
      if (window.__karma__.files.hasOwnProperty(file)) {
          if (/.*\.mocha\.js$/i.test(file)) {
              tests.push(file);
          }
      }
  }

  require.config({
    baseUrl: '/base/',
    paths: common.paths,
    shim: common.shim,

    deps: tests,
    callback: window.__karma__.start
  });


    /* Ugly hack to make "chai-as-promised" working */
  require(['chai', 'chai-as-promised'], function(chai, chap) {

    if ( ! Function.prototype.bind) {
        Function.prototype.bind = function bind(that) { // .length is 1
            var target = this;
            if (typeof target !== "function") {
                throw new TypeError("Function.prototype.bind called on incompatible " + target);
            }
            var args = Array.prototype.slice.call(arguments, 1); // for normal call
            var bound = function () {
        
                if (this instanceof bound) {
        
                    var result = target.apply(
                        this,
                        args.concat(Array.prototype.slice.call(arguments))
                    );
                    if (Object(result) === result) {
                        return result;
                    }
                    return this;
        
                } else {
                    return target.apply(
                        that,
                        args.concat(Array.prototype.slice.call(arguments))
                    );
        
                }
        
            };
            if(target.prototype) {
                var Empty = function() {};
                Empty.prototype = target.prototype;
                bound.prototype = new Empty();
            }
            return bound;
        };
    }
    chai.use(chap);
  });

});