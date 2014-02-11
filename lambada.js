(function (root, factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.lambada = factory();
    }
}(this, function () {

    var lambada = function (expr) {
        var params = [],
            sections = expr.split(/\s*->\s*/m);
        if (sections.length > 1) {
            while (sections.length) {
                expr = sections.pop();
                params = sections.pop().replace(/^\s*(.*)\s*$/, '$1').split(/\s*,\s*|\s+/m);
                if (sections.length) {
                    sections.push('(function(' + params + '){ return (' + expr + ')}; )');
                }
            }
        } else if (expr.match(/\b_\b/)) {
            params = '_';
        } else {
            // test whether an operator appears on the left (or right), respectively
            var leftSection = expr.match(/^\s*(?:[+*\/%&|\^\.=<>]|!=)/m),
                rightSection = expr.match(/[+\-*\/%&|\^\.=<>!]\s*$/m);
            if (leftSection || rightSection) {
                if (leftSection) {
                    params.push('$1');
                    expr = '$1' + expr;
                }
                if (rightSection) {
                    params.push('$2');
                    expr = expr + '$2';
                }
            } else {
                // `replace` removes symbols that are capitalized, follow '.',
                // precede ':', are 'true', 'false', 'null', 'undefined', 'this'
                // or 'arguments'; and also the insides of strings (by a crude test).
                // `match` extracts the remaining symbols.
                var vars = expr.replace(/(?:\b[A-Z]|\.[a-zA-Z_$])[a-zA-Z_$\d]*|[a-zA-Z_$][a-zA-Z_$\d]*\s*:|true|false|null|undefined|this|arguments|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g, '').match(/([a-z_$][a-z_$\d]*)/gi) || []; // '
                for (var i = 0, v; !!(v = vars[i]); i += 1) {
                    if (params.indexOf(v) < 0) {
                        params.push(v);
                    }
                }
            }
        }
        /* jshint -W054 */
        return new Function(params, 'return (' + expr + ')');
    };

    return lambada;
}));
