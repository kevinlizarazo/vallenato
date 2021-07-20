const c = require("./config")
const colors = require('colors')
const inquirer = require('inquirer');
const fs = require('fs');
let template;
let choice;
let choices = [];
let fileList = {};
let chart_data, chart_template, chart_options;

fs.readdirSync(c.BB_CHARTS).forEach(file => {
    if (file != ".DS_Store"){

      choice = file.replace(/([A-Z])/g, ' $1').trim()
      choice = file.substring(0, file.length-3)
      fileList[choice] = file;
      choices.push(choice);
    }
  });

async function create() {
  try {

    selection = await inquirer.prompt([
     {
        type: 'list',
        name: 'gfx_type',
        pageSize: 20,
        choices: choices,
        default: 'Area',
        message: 'Select your chart template.'.yellow
     },
    ]);


    inject_template(selection);
    console.log('Installation complete.\n'.green)
    

  } catch (err) {
    console.error(err);
  }
 }

function inject_template(select) {
  let path = process.cwd().toString();
  let directory = path.substring((path.lastIndexOf('/')+1));
  chart_options =
`  size: {
    height: 480
  },
  axis: {
    rotated: false
  },
  legend: {
    contents: {
      bindto: '#legendContainer',
      template: "<div style='display:inline-block;margin-right:8px'><span style='height: 12px;width: 12px;border-radius: 50%;display: inline-block;background-color:{=COLOR};margin-right:4px'></span><span class='font-l text-gray-50 text-13'>{=TITLE}</span></div>"
    }
  },
  color: {
    pattern: ['#d16b00', '#406E6B', '#0E2849', '#99B882', '#215e99', '#E2B260', '#7ab2e5', '#99b782', '#66afad']
  },
  tooltip: {
    order: 'desc',
    format: {
      value: function (value) { return (value); }
    }
  },
  bindto: '${directory}-chartDiv'`
chart_data = indent(fs.readFileSync(`${c.BB_CHARTS}/${fileList[select.gfx_type]}`).toString(), 1);
chart_template =
`
graphic = bb.generate({
${chart_data},
${chart_options}
});
`
  fs.appendFile('index.js', chart_template, function (err) {
      if (err) console.log(err)
    })
}

create();


function indent(str, numOfIndents, opt_spacesPerIndent) {
  str = str.replace(/^(?=.)/gm, new Array(numOfIndents + 1).join('  '));
  numOfIndents = new Array(opt_spacesPerIndent + 1 || 0).join(' '); // re-use
  return opt_spacesPerIndent
    ? str.replace(/^\t+/g, function(tabs) {
        return tabs.replace(/./g, numOfIndents);
    })
    : str;
}
