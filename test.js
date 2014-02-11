/* global describe */
/* global it */
/* global expect */

var λ = require('./lambada');

describe('lambada', function () {
    it('should return a function', function () {
        expect(typeof λ).toBe('function');
    });

    it('creates a unary function for a simple expression', function () {
        var f = λ('3 + x');
        expect(typeof f).toBe('function');
        expect(f(-10)).toBe(-7);
        expect(f(0)).toBe(3);
        expect(f(10)).toBe(13);
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

    it('creates a binary function for a simple expression', function () {
        var f = λ('x + 2 * y');
        expect(typeof f).toBe('function');
        expect(f(3, 4)).toBe(11);
        expect(f(4, 3)).toBe(10);
        expect(f(2, 7)).toBe(16);
    });

    it('creates a function for a binary operator', function () {
        var f = λ('+');
        expect(typeof f).toBe('function');
        expect(f(3, 2)).toBe(5);
        expect(f(-3, 4)).toBe(1);
        expect(f(8, 8)).toBe(16);
    });

    it('creates a function for a partially applied binary operator', function () {
        var f = λ('+3');
        expect(typeof f).toBe('function');
        expect(f(-10)).toBe(-7);
        expect(f(0)).toBe(3);
        expect(f(10)).toBe(13);
    });
});
