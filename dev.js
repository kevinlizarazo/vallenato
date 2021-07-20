const webpack = require('webpack');
const express = require('express');
const app = express();
let config = require('./webpack.config.js');

// load project filter if arg exists. project MUST be staged
const project = process.argv.length > 2 ? process.argv[process.argv.length-1] : null
let projectConfig;

if (project) {
  let filter = config.findIndex((obj) => {
    return obj.name === project
  })
  projectConfig = config.slice(filter, filter + 1)[0]
  console.log(`Loading the following project: \n\n${project}\n\n`)
}

const compiler = project ? webpack(projectConfig) : webpack(config);

compiler.watch({}, (err, stats) => {
  console.log('Recompiling...', err, stats.hasErrors())

  console.log(stats.toString({
    all: false,
    colors: true,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    moduleTrace: true,
    errorDetails: true
  }))
})

app.use(express.static('dist'))
app.listen(4000, "0.0.0.0", () => console.log('Example app listening on port 4000!'))
