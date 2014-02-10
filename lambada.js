(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.lambada = factory();
  }
}(this, function () {

    var lambada = function () {

    };

    return lambada;
}));
