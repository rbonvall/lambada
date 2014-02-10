# Lambada

Lambada is just the lambda-string part
of [Functional Javascript](https://github.com/osteele/functional-javascript).

Lambada allow you to create simple functions easily,
so instead of this:

    circles
        .attr('cx', function (d, i) {
            return 50 * d + 10;
        })
        .attr('cy', function (d, i) {
            return 50 * i;
        })
        .attr('r', function (x) {
            return 5 * Math.sqrt(x);
        });

you can write this:

    λ = require('lambada');

    circles
        .attr('cx', λ('50 * d + 10'))
        .attr('cy', λ('d, i -> 50 * i'))
        .attr('r',  λ('5 * Math.sqrt(x)'));

