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

And so instead of dancing like this:

    \o
     |\
    /\

you can dance like this:

![Lambada](http://31.media.tumblr.com/4c9669b5138ff14cffa81d0b0f0e0e4e/tumblr_mijb4m6nkZ1rqbnt0o1_500.gif)
