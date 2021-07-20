//TO-DO: finish this

const manifest = require('../projects')
const c = require('./config')
const fs = require('fs');


    let prjs = {}
    for (let p in manifest){
      prjs[manifest[p]] = `./src/graphics/${manifest[p]}/index.js`
    }

    let projects = prjs
    console.log(projects)
    module.exports = projects