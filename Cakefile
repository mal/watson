{exec} = require 'child_process'

err = (err) ->
    if err
        console.log "\n\033[1;36m=>\033[1;37m Remember that you need: uglifyjs installed\033[0;37m\n"
        console.log err.stack

option '-b', '--basic', 'build without any addition modules'
option '-i', '--include [module*]', 'include a module when building'

task 'build', 'Minify source files', (opts) ->
    clean()
    modules = opts.include?.map((i) -> "lib/#{i}.js").join(' ') ? if opts.basic then '' else 'lib/*.js'
    exec "cat watson.js #{modules} | uglifyjs > watson.min.js", err

task 'clean', 'Remove minified javascript', clean = ->
    exec 'rm -f *.min.js', err
