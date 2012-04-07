# It's elementary, my dear &mdash; _Watson!_
---

_Watson_ is an extensible nano framework for quickly building DOM trees; all while keeping you clear of all the typical `createElement`, `setAttribute` and namespace related hassle! It supports the default (HTML5) out of the box, and others can be added very easily at runtime.

# Examples

#### HTML

_Assumes XHTML support is baked in. **HTML5 uses the XHTML namespace.**_

```js
var xml = Watson.xhtml,
    div = xml.div({ 'class': 'box' }, [
        xml.h1('Box Title'),
        'This is box number ',
        xml.span({ id: 'index' }, 1)
    ]);

document.body.appendChild(div);
```

```html
<div class="box">
    <h1>Box Title</h1>
    This is box number
    <span id="index">1</span>
</div>
```

#### HTML + SVG + XLink

_Assumes XHTML and SVG support is baked in._

```js
// add support for xlink attributes, no need for a tagList as we're not using Watson.xlink
Watson.extend('http://www.w3.org/1999/xlink');

var xml = Watson.xhtml,
    svg = Watson.svg,
    div = xml.div({ 'class': 'container' }, [
        svg.svg({ version: 1.1, width: 300, height: 300 }, [
            svg.desc('This graphic links to an external image'),
            svg.image({
                x: 50,
                y: 50,
                width: 200,
                height: 200,
                'xlink:href': 'myimage.png'
            }, [
                svg.title('My image')
            ])
        ])
    ]);

document.body.appendChild(div);
```

_Namespaces don't show up in the resulting markup, but the DOM knows they're there._

```html
<div class="container">
    <svg version="1.1" width="300" height="300">
        <desc>This graphic links to an external image</desc>
        <image x="50" y="50" width="200" height="200" href="myimage.png">
            <title>My image</title>
        </image>
    </svg>
</div>
```

#### HTML + MathML

_MathML isn't given a `tagList` and so uses the long form (`Watson._('m:math', *)` rather than `Watson.m.math(*)`). Short form can used with proxy supporting browsers, but for cross browser compatability a `tagList` must be provided._

```js
Watson.extend('m', 'http://www.w3.org/1998/Math/MathML');

// Assuming we're working in a HTML5 doc; Watson._ is a shortcut to Watson.xhtml
var xml = Watson._,
    div = xml.div([
        xml('m:math', [
            xml('m:mrow', [
                xml('m:mi', 'x')
            ])
        ])
    ]);

document.body.appendChild(div);
```

_Namespaces don't show up in the resulting markup, but the DOM knows they're there._

```html
<div>
    <math>
        <mrow>
            <mi>x</mi>
        </mrow>
    </math>
</div>
```

# Custom Builds

Not everyone needs SVG support, and if that's you, why download bytes you don't need? The `Cakefile` provided allows you to customise your version by picking which modules you want to include. **The default is to bake in all modules and minify using UglifyJS (required).**

#### All tags

_bakes in all available namespaces_

```sh
$ cake build
```

#### Proxy support only

```sh
$ cake --no-tags build
```

#### SVG + MathML

_note that `math` is not a real module yet, it's for illustrative purposes only_

```sh
$ cake --tags svg --tags math build
```

# API

##### Watson._

The out of the box namespace support using the `namespaceURI` of the current document. _See the "HTML + MathML" example for usage._

##### Watson.extend([nsID,] nsURI [, tagList])

The `extend` function is used to add support for additional namespaces; accessed by `Watson.<nsID>`. If no `nsID` is supplied _Watson_ will infer it from the `nsURI`. i.e. `http://www.w3.org/1999/xlink` will get the `nsID` of `xlink`.

In addition a `tagList` is required to support browsers that **do not** implement [Harmony Proxies](http://wiki.ecmascript.org/doku.php?id=harmony:proxies). At present the only browsers with proxy support are Firefox and Chrome (with the experimental JavaScript flag set).

# Future

Once [Direct Proxies](http://wiki.ecmascript.org/doku.php?id=harmony:direct_proxies) (or Harmony Proxies) are widely supported `tagLists` can be dropped reducing the library size.

# License

Copyright (C) 2012 Mal Graty &lt;mal.graty@googlemail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.