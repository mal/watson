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

    libs = ''

    if not opts.basic?
        if opts.include?
            libs = opts.include.map(
                (lib) -> "lib/#{lib}.js"
            ).join(' ')
        else
            libs = 'lib/*.js'

    libs = "cat #{project}.js #{libs} | "
    out = project + '.build.js'

    cp.exec 'mkdir -p build/lib'

    if not opts['no-minify']
        out = project + '.min.js'
        pipe = minify
    else
        pipe = build

    fs.readdir 'lib', (err, files) ->
        if not err
            files = files.filter (file) -> /\.js/.test file
            pipe += ' ' + files.map(tags).join ' '
            cp.exec libs + pipe + ' > build/' + out, done
            files.forEach (file) -> cp.exec "cat lib/#{file} | " + pipe + " > build/lib/#{file}", done
        else
            done err

task 'clean', ->
    cp.exec 'rm -r build', done

