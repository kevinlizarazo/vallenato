const c = require("./config")
const colors = require('colors')
const inquirer = require('inquirer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const createHTML = require ('create-html');
var cp = require('child_process')
var os = require('os')
const html = (n) => `<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</head>
<div id='${n}'></div>`
const package_template = (n, s, d) => `{
  "name": "${n}",
  "private": true,
  "version": "1.0.0",
  "description": "data visualization",
  "main": "index.js",
  "scripts": ${s},
  "author": "",
  "license": "ISC",
  "dependencies": ${d}
}`;
let project, dependencies, template, scripts;
let projectArray = [];
let stage;

const arg = process.argv.length > 2 ? process.argv[process.argv.length-1] : null

async function create() {
  try {
    console.clear()
    const message = console.log('Welcome to the Vallenato project creation tool.'.red.bold)

    stage = c.SELECTED_APPS;

    project = await inquirer.prompt([
      {
        type: 'input',
        name: 'gfx_name',
        default: arg||'project',
        message: 'What should we call the project directory?'.white},
      {
        type: 'list',
        name: 'gfx_type',
        choices: ['Chart', 'Custom'],
        default: 'Interactive',
        message: 'What kind of graphic is it?'.white},
    ]);

    if (project.gfx_type === "Custom"){
      template = c.custom_template
      dependencies = `""`
      scripts = `""`;
    } else if (project.gfx_type === "Chart") {
      template = c.interactive_template
      dependencies = c.interactive_dependencies
      scripts = c.interactive_scripts
    }

    scaffold(project, template, dependencies, scripts);

  } catch (err) {
    console.error(err);
  }
}

function scaffold(prj, templ, dep, script) {

    stage.push(prj.gfx_name)
    fs.writeFileSync(c.BUILD_MANIFEST, JSON.stringify(stage))

    var npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm'

    //create project dir
    let project_directory = `${c.APP_DIR}/${prj.gfx_name}`;
    mkdirp.sync(project_directory);
    console.log("\nDirectory created...".yellow)

     //create index.html
    fs.writeFileSync(`${project_directory}/index.html`, html(prj.gfx_name), function (err) {
      if (err) console.log(err)
    })
    console.log("index.html created...".yellow)

    //create index.js
    fs.writeFileSync(`${project_directory}/index.js`, templ, function (err) {
      if (err) console.log(err)
    })
    console.log("index.js created...".yellow)

    //create package.json
    fs.writeFileSync(`${project_directory}/package.json`, package_template(prj.gfx_name, script, dep), function (err) {
      if (err) console.log(err)
    })
    console.log("package.json created...\n".yellow)
    console.log("Scaffolding complete.\n".green)

    setTimeout( function(){
      console.log('>> INSTALL PROJECT'.red.bold)
      cp.spawn(npmCmd, ['i'], { env: process.env, cwd: project_directory, stdio: 'inherit' })
    },1000);
    setTimeout( function(){ 
      if (prj.gfx_type === 'Chart') {
        console.log('>> RUN BILLBOARD CLI'.red.bold)
        cp.spawn(npmCmd, ['run', 'bb'], { env: process.env, cwd: project_directory, stdio: 'inherit' })
      }
    },6000);
    setTimeout( function(){ 
      console.log('>> OPEN DEV SERVER'.red.bold)
      cp.spawn(npmCmd, ['run', 'dev', prj.gfx_name], { env: process.env, cwd: './', stdio: 'inherit' })
    },10000);
}

create();
