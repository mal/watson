cp = require 'child_process'
fs = require 'fs'

project = 'watson'
library = 'tags'
minify = 'uglifyjs -mt --unsafe'

done = (err, stdout, stderr) ->
    if err
        console.log "\033[1;30m >\033[0;31m task failed\033[m"
        if stderr
            echo stderr
    else
        if stdout
            echo stdout, '0;32'

echo = (text, colour) ->
    colour ?= '1;30'
    text.trim().split('\n').forEach (line) ->
        console.log "\033[1;30m >\033[#{colour}m #{line}\033[m"

tags = (ns) ->
    ns = ns.split('.').shift()
    "--define TAGS_#{ns.toUpperCase()}=\"$(cat #{library}/#{ns}.txt | tr \"\n\" ,)\""

option '-n', '--no-tags', 'build without taglists; will require proxy support in browser'
option '-t', '--tags [module*]', 'build with these taglists only'

task 'build', 'compile and minify watson', (opts) ->

    invoke 'clean'

    defs = ''
    libs = ''

    if 'no-tags' not of opts
        if 'tags' of opts
            defs = ' ' + opts.tags.map(tags).join ' '
            libs = opts.tags.map(
                (lib) -> library + "/#{lib}.js"
            ).join(' ')
        else
            libs = library + '/*.js'

    pipe = "cat #{project}.js #{libs} | #{minify}"
    sink = " > #{project}.min.js && echo built successfully"

    if 'no-tags' not of opts and 'tags' not of opts
        fs.readdir 'tags', (err, files) ->
            if not err
                defs = ' ' + files.filter(
                    (file) -> /\.txt$/.test file
                ).map(tags).join ' '
                cp.exec pipe + defs + sink, done
            else
                done err
    else
        cp.exec pipe + defs + sink, done

task 'clean', 'remove any files created by the build task', ->
    cp.exec "rm -fv #{project}.min.js", done

