module.exports = (grunt) ->
    grunt.initConfig
        coffee:
            compile:
                files:
                    "build/script.js": ["src/**/*.coffee"]
        copy:
            main:
                src: "build/script.js"
                dest: "dist/app.js"

    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.registerTask 'default', ['coffee:compile', 'copy:main']
