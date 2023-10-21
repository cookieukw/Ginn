module.exports = (grunt) ->

	grunt.initConfig
		pkg: grunt.file.readJSON "package.json"
		watch:
			default:
				files: ["BinaryTree.coffee","Tests.coffee"]
				tasks: ["coffee:default"]
		coffee:
			default:
				files:
					"BinaryTree.js":"BinaryTree.coffee"
					"Tests.js":"Tests.coffee"
		uglify:
			default:
				files:
					"BinaryTree.js":"BinaryTree.coffee"
					"Tests.js":"Tests.coffee"

	grunt.loadNpmTasks "grunt-contrib-watch"
	grunt.loadNpmTasks "grunt-contrib-coffee"
	grunt.loadNpmTasks "grunt-contrib-uglify"

	grunt.registerTask "default", ["watch:default"]
