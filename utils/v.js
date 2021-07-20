const c = require("./config")
const colors = require('colors')
const inquirer = require('inquirer');
inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'))
const fs = require('fs');
const path = require("path");
const mkdirp = require('mkdirp');
const createHTML = require ('create-html');
var cp = require('child_process')
const ncp = require('ncp').ncp;
var os = require('os')
const V_DIR = process.cwd()
const DBX_DIR = os.homedir() + '/Dropbox (CFR)/Design Group Share'
const html = (n) => `<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</head>
<div id='${n}'></div>`
const package_template = (n) => `{
  "name": "${n}",
  "private": true,
  "version": "1.0.0",
  "description": "data visualization",
  "main": "index.js",
  "scripts": {"convert": "node ../../../utils/ai2htmlconvert.js"},
  "author": "",
  "license": "ISC",
  "dependencies": ""
}`;
let template = `/* eslint-disable */`
let project;
let stage;

async function create() {
  try {
    console.clear()
    
    const message = console.log('Welcome to the Vallenato static graphic tool.'.magenta.bold)
    const message2 = console.log('Which graphic will you be working on?'.magenta.bold)

    stage = c.SELECTED_APPS;

    project = await inquirer.prompt([
      {
        type: 'fuzzypath',
        name: 'path',
        excludePath: nodePath => nodePath.match('ai2html-output'),
          // excludePath :: (String) -> Bool
          // excludePath to exclude some paths from the file-system scan
        excludeFilter: __filename => __filename.match(!'.ai'),
          // excludeFilter :: (String) -> Bool
          // excludeFilter to exclude some paths from the final list, e.g. '.'
        itemType: 'file',
          // itemType :: 'any' | 'directory' | 'file'
          // specify the type of nodes to display
          // default value: 'any'
          // example: itemType: 'file' - hides directories from the item list
        rootPath: DBX_DIR,
          // rootPath :: String
          // Root search directory
        message: '>>',
        default: '',
        suggestOnly: false,
          // suggestOnly :: Bool
          // Restrict prompt answer to available choices or use them as suggestions
        depthLimit: 6,
          // depthLimit :: integer >= 0
          // Limit the depth of sub-folders to scan
          // Defaults to infinite depth if undefined
      }
    ]);

    scaffold(project);

  } catch (err) {
    console.error(err);
  }
}

function scaffold(project) {

    let projectName = path.basename(project.path).slice(0, -3)
    stage.push(projectName)
    fs.writeFileSync(c.BUILD_MANIFEST, JSON.stringify(stage))
    let project_directory = `${c.APP_DIR}/${projectName}`;
    var npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm'

    console.log(`\nPROJECT:       ${projectName}.ai`.red.bold)
    console.log(`PROJECT PATH:  ${project.path}`.red.bold)

    //create project dir
    mkdirp.sync(project_directory);
    console.log("\nDirectory created...".yellow)

    //create index.html
    fs.writeFileSync(`${project_directory}/index.html`, html(projectName), function (err) {
      if (err) console.log(err)
    })
    console.log("index.html created...".yellow)

    //create index.js
    fs.writeFileSync(`${project_directory}/index.js`, template, function (err) {
      if (err) console.log(err)
    })
    console.log("index.js created...".yellow)

    //create package.json
    fs.writeFileSync(`${project_directory}/package.json`, package_template(projectName), function (err) {
      if (err) console.log(err)
    })
    console.log("package.json created...".yellow)

    //copy over ai2html-output
    ncp(`${path.dirname(project.path)}/ai2html-output`, `${project_directory}/ai2html-output`, function (err) {
      if (err) {
        return console.error(err);
      }
     });
    console.log("ai2html-output copied...\n".yellow)
    console.log("Initialization complete.\n".green.bold)

    setTimeout( function(){
      console.log('>> INSTALLING PROJECT'.red.bold)
      cp.spawn(npmCmd, ['i'], { env: process.env, cwd: project_directory, stdio: 'inherit' })
    },1000);
    setTimeout( function(){ 
      if (true) {
        console.log('>> CONVERTING PROJECT'.red.bold)
        cp.spawn(npmCmd, ['run', 'convert'], { env: process.env, cwd: project_directory, stdio: 'inherit' })
      }
    },6000);
    setTimeout( function(){ 
      console.log('>> OPENING DEV SERVER'.red.bold)
      cp.spawn(npmCmd, ['run', 'dev', projectName], { env: process.env, cwd: './', stdio: 'inherit' })
    },10000);
    
    
}

create();
