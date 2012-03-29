{exec} = require 'child_process'

project = 'watson'

minify = "uglifyjs -c -mt --no-dead-code --unsafe --lift-vars"

err = (e) ->
    if e
        console.log "\n\033[1;36m=>\033[1;37m Remember that you need: uglifyjs installed\033[0;37m\n"
        console.log e.stack

option '-b', '--basic', 'build without any addition modules'
option '-i', '--include [module*]', 'include a module when building'
option '-n', '--no-minify', 'build but don\'t minify the output'

task 'build', 'Collect and minify source files', (opts) ->
    clean()
    mods = opts.include?.map((i) -> "lib/#{i}.js").join(' ') ? if opts.basic then '' else 'lib/*.js'
    file = project + '.build.js'
    pipe = "cat #{project}.js #{mods}"
    if not opts['no-minify']
        file = project + '.min.js'
        pipe += ' | ' + minify
    exec pipe + ' > ' + file, err

task 'clean', 'Remove builds', clean = ->
    exec 'rm -f *.build.js *.min.js', err
