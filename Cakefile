cp = require 'child_process'
#cp = { exec: console.log }
fs = require 'fs'

project = 'watson'
build = 'uglifyjs -b -ns'
minify = 'uglifyjs -c -mt --no-dead-code --unsafe --lift-vars'

done = (err) ->
    if err
        console.log "\033[1;30m >\033[1;31m Remember that you need: uglifyjs installed\033[m"
        console.log err.stack
    else
        console.log "\033[1;30m >\033[1;32m Task complete\033[m"

tags = (lib) ->
    lib = lib.split('.').shift()
    "--define TAGS_#{lib.toUpperCase()}=\"$(cat lib/#{lib}.txt | tr \"\n\" ,)\""

option '-b', '--basic'
option '-i', '--include [module*]'
option '-n', '--no-minify'

task 'bake', (opts) ->

    invoke 'clean'

    defs = ''
    libs = ''

    if not opts.basic?
        if opts.include?
            defs = ' ' + opts.include.map(tags).join ' '
            libs = opts.include.map(
                (lib) -> "lib/#{lib}.js"
            ).join(' ')
        else
            libs = 'lib/*.js'

    out = project + '.build.js'
    pipe = "cat #{project}.js #{libs}"

    if not opts['no-minify']
        out = project + '.min.js'
        pipe += ' | ' + minify
    else
        pipe += ' | ' + build

    sink = ' > ' + out

    if not opts.basic? and not opts.include?
        fs.readdir 'lib', (err, files) ->
            if not err
                defs = ' ' + files.filter(
                    (file) -> /\.txt/.test file
                ).map(tags).join ' '
                cp.exec pipe + defs + sink, done
            else
                done err
    else
        cp.exec pipe + defs + sink, done

task 'clean', ->
    cp.exec 'rm -f *.build.js *.min.js', done

