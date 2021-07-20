const c = require('./config')
const colors = require('colors') // eslint-disable-line
const inquirer = require('inquirer');
const fs = require('fs');

let projectArray = [];

async function stage () {
  console.log('\n>> RUN STAGE\n'.red.bold)
  // prepare the stage
  fs.readdirSync(c.APP_DIR).forEach(file => {
      if (file != '.DS_Store'){
        projectArray.push(file);
      }
  })

  try {
    const manifest = projectArray;
    const deflt = c.SELECTED_APPS;
    let answer = await inquirer.prompt({
      type: 'checkbox',
      name: 'stage',
      pageSize: 20,
      choices: manifest,
      default: deflt,
      message: 'Select projects for the build manifest.'.yellow
    });

    fs.writeFileSync(c.BUILD_MANIFEST, JSON.stringify(answer.stage))
    console.log('Staging complete. Launch development server!'.green.bold)
    projectArray = [];

  } catch (err) {
    console.error(err);
  }
}

stage();
