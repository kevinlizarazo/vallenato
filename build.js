var path = require('path')
var rm = require('rimraf')
var run = require('parallel-webpack').run
var configPath = require.resolve('./webpack.config.js')

rm(path.join(__dirname, 'dist'), err => {
  if (err) throw err

  run(configPath, {
    watch: false,
    maxRetries: 1,
    stats: true, // defaults to false
    maxConcurrentWorkers: 1 // use 1 workers
  });
})
