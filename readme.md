# It's elementary, my dear &mdash; _Watson!_
---

_Watson_ is a nano framework for quickly building DOM trees; all while keeping you clear of all the typical `createElement`, `setAttribute` and namespace related hassle! It supports the default (usually HTML) and SVG namespaces out of the box, and others can be added very easily at runtime.

# Examples

#### HTML

```js
var xml = Watson,
    div = xml.div({ 'class': 'box' }, [
        xml.h1('Box Title'),
        'Box related ',
        xml.span({ id: 'keyword' }, 'content')
    ]);

document.body.appendChild(div);
```

```html
<div class="box">
    <h1>Box Title</h1>
    Box related
    <span id="keyword">content</span>
</div>
```

#### HTML + SVG + XLINK

```js
Watson.__registerNamespace__('xlink', 'http://www.w3.org/1999/xlink');

var xml = Watson,
    svg = xml.svg,
    div = xml.div({ 'class': 'container' }, [
        svg({ version: 1.1, width: 300, height: 300 }, [
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

_Namespaces don't show up in the resulting markup, but the DOM knows they're there_

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

#### HTML + MATHML

_MathML does not have a module yet, this syntax could be cleaned up similar to the SVG example_

```js
Watson.__registerNamespace__('mathml', 'http://www.w3.org/1998/Math/MathML');

var xml = Watson,
    div = xml.div([
        xml('mathml:math', [
            xml('mathml:mrow', [
                xml('mathml:mi', 'x')
            ])
        ])
    ]);

document.body.appendChild(div);
```

_Namespaces don't show up in the resulting markup, but the DOM knows they're there_

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

Not everyone needs SVG support, and if that's you, why download bytes you don't need? The `Cakefile` provided allows you to customise your version by picking which modules you want to include. **The default is to bake in all modules and minify using uglifyjs (required).**

#### HTML only

```sh
$ cake --basic build
```

#### SVG + MATHML

_note that `math` is not a real module yet, it's for illustrative purposes only_

```sh
$ cake -i svg -i math build
```

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
