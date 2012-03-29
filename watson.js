!function (doc) {

    var namespaces = {},

        arr = Array.prototype,
        isArray = Array.isArray,
        slice = arr.slice,
        unshift = arr.unshift,

        createElement = namespace(doc.__proto__, 'createElement'),
        setAttribute = namespace(Element.prototype, 'setAttribute');

    function isLiteral(value)
    {
        return ! ({ object: 1, 'undefined': 1 })[typeof value];
    }

    function parse(key, value)
    {
        var args = [];

        if ( isArray(key) )
            args.push(key.shift());
        else
            if ( key = key.split(':'), key.length > 1 )
                args.push(namespaces[key.shift()]);

        args.push(key.shift());

        if ( arguments.length > 1 )
            args.push(value);

        return args;
    }

    function namespace(obj, func, limit)
    {
        return function (el, key, value)
        {
            var args = parse.apply(null, slice.call(arguments, 1)),
                method = func;
            if ( args.length > obj[method].length )
                method += 'NS';
            return obj[method].apply(el, args);
        };
    }

    function xml(name, opts, nodes)
    {
        var el = createElement(doc, name);

        if ( isArray(opts) || isLiteral(opts) )
            nodes = opts, opts = {};
        if ( isLiteral(nodes) )
            nodes = [nodes];

        if ( opts )
            for ( var key in opts )
                setAttribute(el, key, opts[key]);

        if ( nodes )
            for ( var l = nodes.length, i = 0; i < l; i++ )
            {
                var node = nodes[i];
                if ( ! ( node instanceof Node ) )
                    node = doc.createTextNode(node);
                el.appendChild(node);
            }

        return el;
    }

    xml.__registerNamespace__ = function (abbr, url)
    {
        if ( abbr in namespaces )
            throw abbr + ' namespace already registered';
        namespaces[abbr] = url;
    }

    xml.__noSuchMethod__ = function (id, args)
    {
        unshift.call(args, id);
        return xml.apply(this, args);
    }

    Watson = xml;

}(document);
