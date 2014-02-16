/* global describe */
/* global it */
/* global expect */

var λ = require('./lambada');

var numbers = [[-1], [0], [1], [Math.PI], [0.1], [142857], [Infinity]];
var pairs = [[0, 0], [Math.PI, -Math.SQRT2], [1, 1], [-1, 0], [100/7, -200/13]];

function compareFunctions(f, g, domain) {
    domain.forEach(function (args) {
        expect(f.apply(null, args)).toBe(g.apply(null, args));
    });
}

describe('lambada', function () {
    it('should be a function', function () {
        expect(typeof λ).toBe('function');
    });

    it("passes Functional Javascript's tests", function () {
        expect(λ('x -> x + 1')(1)).toBe(2);
        expect(λ('x y -> x + 2*y')(1, 2)).toBe(5);
        expect(λ('x, y -> x + 2*y')(1, 2)).toBe(5);
        expect(λ('_ + 1')(1)).toBe(2);
        expect(λ('/2')(4)).toBe(2);
        expect(λ('2/')(4)).toBe(0.5);
        expect(λ('/')(2,4)).toBe(0.5);
        expect(λ('x + 1')(1)).toBe(2);
        expect(λ('x + 2*y')(1, 2)).toBe(5);
        expect(λ('y + 2*x')(1, 2)).toBe(5);
        expect(λ('x -> y -> x + 2*y')(1)(2)).toBe(5);
    });

    it('creates a unary function for a simple expression', function () {
        var f = λ('3 + x');
        expect(typeof f).toBe('function');
        compareFunctions(f, function (x) { return 3 + x; }, numbers);
    });

    it('creates a binary function for a simple expression', function () {
        var f = λ('x + 2 * y');
        expect(typeof f).toBe('function');
        compareFunctions(f, function (x, y) { return x + 2 * y; }, pairs);
    });

    it('creates a function for a binary operator', function () {
        var f = λ('+');
        expect(typeof f).toBe('function');
        compareFunctions(f, function (x, y) { return x + y; }, pairs);
    });

    it('creates a function for a partially applied binary operator', function () {
        var f = λ('+3');
        expect(typeof f).toBe('function');
        compareFunctions(f, function (x) { return x + 3; }, numbers);
    });

    it('caches functions', function () {
        var f = λ('x -> 2 * x + 5');
        var g = λ('x -> 2 * x + 5');
        expect(typeof f).toBe('function');
        expect(typeof g).toBe('function');
        expect(f).toBe(g);
    });
});

describe('lambada.sequence', function () {
    it('exists and is a function', function () {
        expect(λ.sequence).toBeDefined();
        expect(typeof λ.sequence).toBe('function');
    });
});

describe('lambada.compose', function () {
    it('exists and is a function', function () {
        expect(λ.compose).toBeDefined();
        expect(typeof λ.compose).toBe('function');
    });
});
