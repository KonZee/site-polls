module.exports = function (grunt){

	grunt.initConfig({

		pckg: grunt.file.readJSON('package.json'),

		clean: {
			dist: ["dist"]
		},

		stylus: {
			bootstrap: {
				options: {
					compress: false,
					paths: ['src/styles']
				},
				files: {
					'dist/css/bootstrap.css': 'src/styles/bootstrap/bootstrap.styl'
				}
			},
			main: {
				options: {
					compress: false,
					paths: ['src/styles']
				},
				files: {
					'dist/css/main.css': 'src/styles/custom/main.styl'
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: [
				'Android 2.3',
				'Android >= 4',
				'Chrome >= 20',
				'Firefox >= 24', // Firefox 24 is the latest ESR
				'Explorer >= 8',
				'iOS >= 6',
				'Opera >= 12',
				'Safari >= 6'
				]
			},
			dist: {
				src: 'dist/css/**/*.css'
			},
		},

		cmq: {
			dist: {
				files: [{
					'dist/css/bootstrap.css': ['dist/css/bootstrap.css'],
					'dist/css/main.css': ['dist/css/main.css']
				}]
			}
		},

		csscomb: {
			dist: {
				options: {
					config: '.csscomb.json'
				},
				files: [{
					expand: true,
					cwd: 'dist/css',
					src: '**/*.css',
					dest: 'dist/css'
				}]
			}
		},

		jade: {
			dist: {
				options: {
					pretty: '\t', // Not work correctly, probably yet. In Jade API doc it can be Boolean|String type, in fact only Boolean and non-empty string converted to true.
				},
				files: {
					'dist/index.html': 'src/templates/index.jade'
				}
			}
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				force: true,
				globals: {
					jQuery: true
				}
			},
			all: [
			'src/scripts/**/*.js',
			'!src/scripts/libs/**/*'
			],
			configFiles: [
			'.csscomb.json',
			'Gruntfile.js',
			'package.json'
			]
		},

		copy: {
			scripts: {
				files: [{
					expand: true,
					cwd: 'src/scripts',
					src: ['**/*.js'],
					dest: 'dist/js',
					filter: 'isFile'
				}]
			},
			images: {
				files: [{
					expand: true,
					cwd: 'src/images',
					src: ['**/*.{png,jpg,jpeg,gif,svg}'],
					dest: 'dist/images',
					filter: 'isFile'
				}]
			},
		},

		// imagemin: {
		// 	files: {
		// 		expand: true,
		// 		cwd: 'src/images',
		// 		src: ['**/*.{png,jpg,gif}'],
		// 		dest: 'result/images'
		// 	}
		// },

		browserSync: {
			dist: {
				bsFiles: {
					src: 'dist/**/*'
				},
				options: {
					open: false,
					server: {
						baseDir: 'dist'
					},
					watchTask: true
				}
			}
		},

		watch: {
			options: {
				dateFormat: function (ms) {
					var now = new Date(),
					time = now.toLocaleTimeString(),
					day = now.getDate(),
					month = now.getMonth() + 1,
					year = now.getFullYear();

					if (day < 10) {
						day = '0' + day;
					}

					if (month < 10) {
						month = '0' + month;
					}

					grunt.log.subhead(
						'Completed in ' + Math.round(ms) + 'ms at ' + time + ' ' +
						day + '.' + month + '.' + year + '.\n' +
						'Waiting for more changes...'
					);
				},
			},
			configFiles: {
				options: {
					reload: true
				},
				files: ['.csscomb.json', 'Gruntfile.js', 'package.json'],
				// tasks: ['newer:jshint:configFiles']
			},
			livereload: {
				options: {
					livereload: true
				},
				files: ['dist/**/*']
			},
			stylus: {
				files: ['src/styles/**/*.styl'],
				tasks: ['stylus', 'autoprefixer', 'cmq', 'csscomb']
			},
			jade: {
				files: ['src/templates/**/*.jade'],
				tasks: ['jade']
			},
			jshint: {
				files: ['src/scripts/**/*.js'],
				tasks: ['newer:jshint']
			},
			scripts: {
				files: ['src/scripts/**/*'],
				tasks: ['newer:copy:scripts']
			},
			images: {
				files: ['src/images/**/*'],
				tasks: ['newer:copy:images']
			},

		}

	});

	require('load-grunt-tasks')(grunt);

	// grunt.loadNpmTasks('grunt-contrib-clean');
	// grunt.loadNpmTasks('grunt-contrib-stylus');
	// grunt.loadNpmTasks('grunt-autoprefixer');
	// grunt.loadNpmTasks('grunt-combine-media-queries');
	// grunt.loadNpmTasks('grunt-csscomb');
	// grunt.loadNpmTasks('grunt-contrib-jade');

	grunt.registerTask('default', ['clean', 'stylus', 'autoprefixer', 'cmq', 'csscomb', 'jade', 'jshint', 'copy', 'browserSync', 'watch']);

};
