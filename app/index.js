'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var PyModuleGenerator = module.exports = function PyModuleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || path.basename(process.cwd());
  }
};

util.inherits(PyModuleGenerator, yeoman.generators.Base);

PyModuleGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
        {
            name: 'moduleName',
            message: 'module name : ',
            default: this.env.options.appPath
        }, {
            name: 'description',
            message: 'module description : '
        }, {
            type: 'confirm',
            name: 'createREADME',
            message: 'Create a basic README.md?',
            default: true
        }, {
            type: 'confirm',
            name: 'createLICENSE',
            message: 'Create a basic LICENSE.txt?',
            default: true
        }
    ];

    this.prompt(prompts, function (props) {
        
        // bind our prompt results to the generator
        this.moduleName = props.moduleName;
        this.description = props.description;
        this.createREADME = props.createREADME;
        this.createLICENSE = props.createLICENSE;
        
        cb();
    }.bind(this));
};

PyModuleGenerator.prototype.app = function app() {
  
    this.template('_setup.py', 'setup.py');

    if (this.createREADME) {
        this.template('_README.md', 'README.md');
    }
    if (this.createLICENSE) {
        this.write('LICENSE.txt', '');
    }

    this.mkdir(this.appPath)
    this.write(path.join(this.modulePath, '__init__.py'), '');
    this.copy('main.py', path.join(this.appPath, '__main__.py'));
};

PyModuleGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
};
