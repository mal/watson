!function (xml) {

    var svgns = 'http://www.w3.org/2000/svg';

    function svg(id, args)
    {
        return xml.__noSuchMethod__([svgns, id], args);
    }

    xml.__registerNamespace__('svg', svgns);

    xml.svg = function (attrs, nodes)
    {
        return svg('svg', arguments);
    }

    xml.svg.__noSuchMethod__ = svg;

}(Watson);
