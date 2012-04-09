!function (window) {

    "use strict";

    var document = window.document,
        isArray = Array.isArray,
        docuri = document.documentElement.namespaceURI,
        wat = { extend: extend };

    function attribute(element, name, value)
    {
        var nsuri = null,
            parts;

        if ( parts = parse(name) )
            nsuri = parts[0], name = parts[1];

        if ( nsuri === element.namespaceURI )
            nsuri = null;

        element.setAttributeNS(nsuri, name, value);
    }

    function convert(args)
    {
        return [].slice.call(args);
    }

    function element(nsuri, name, attributes, nodes)
    {
        var parts;
        if ( parts = parse(name) )
            nsuri = parts[0], name = parts[1];

        var element = document.createElementNS(nsuri, name);

        if ( isArray(attributes) || isLiteral(attributes) )
            nodes = attributes, attributes = {};

        if ( isLiteral(nodes) )
            nodes = [nodes];

        if ( attributes )
            for ( var key in attributes )
                attribute(element, key, attributes[key]);

        if ( nodes )
            for ( var l = nodes.length, i = 0; i < l; i++ )
                node(element, nodes[i]);

        return element;
    }

    function extend(namespace, nsuri, taglist)
    {
        if ( arguments.length < 2 || isArray(nsuri) )
            taglist = nsuri, nsuri = namespace, namespace = nsuri.split('/').pop();

        var obj = base;

        function augment(proxy, id)
        {
            if ( ! base[id] )
                base[id] = function () {
                    return element.apply(null, [nsuri, id].concat(convert(arguments)));
                }
            return base[id];
        }

        function base()
        {
            return element.apply(null, [nsuri].concat(convert(arguments)));
        }

        base.namespaceURI = nsuri;

        if ( window.Proxy )
            obj = Proxy.createFunction({
                get: augment,
                set: function (proxy, id, value) { base[id] = value; }
            }, base);
        else
            if ( isArray(taglist) )
                for ( var l = taglist.length, i = 0; i < l; i++ )
                    augment(null, taglist[i]);

        wat[namespace] = obj;

        if ( docuri === nsuri )
            wat.xml = obj;
    }

    function isLiteral(value)
    {
        return ! ({ object: 1, 'undefined': 1 })[typeof value];
    }

    function node(element, node)
    {
        if ( ! ( node instanceof Node ) )
            node = document.createTextNode(node);
        element.appendChild(node);
    }

    function parse(name)
    {
        if ( ~name.indexOf(':') )
        {
            var parts = name.split(':');
            if ( parts[0] in wat )
                return [wat[parts[0]].namespaceURI, parts[1]];
        }
        return false;
    }

    extend(docuri);
    window.Watson = wat;

}(window);
