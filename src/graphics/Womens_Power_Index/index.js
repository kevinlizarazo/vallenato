import '../../common/styles/styles.scss';
import '../../common/styles/fonts.scss';
import './styles.scss';

import 'lodash'
import textures from 'textures'
import Geostats from 'geostats'
import { bb } from 'billboard.js'
import $ from 'jquery';

import * as datacountries from './geojson/world.json'
import * as datalakes from './geojson/lakes.json'

const d3 = Object.assign({}, require('d3'), require('d3-format'), require('d3-geo'), require('d3-geo-projection'), require('d3-svg-legend'));

window.$ = window.jQuery = require('jquery')

require('select2')
require('select2/dist/css/select2.min.css')
require('datatables/media/css/jquery.dataTables.min.css')
require('webpack-jquery-ui')
require('jquery-ui-touch-punch')
require('jquery-touchswipe')
require('datatables')
require('datatables.net-fixedcolumns')

const topojson = require('topojson-client')

var mydata = require('./data/WFP - GWLT - Tracker - Export.csv');

// this needs to be here for webpack to package the file used for download
// replace data values when UPDATING No data replace as -1 and N/A as -2
var downloadCSV = require('./export/WFP - GWLT - Tracker - Export.csv') // eslint-disable-line no-unused-vars

// if using an image or svg use this website https://www.base64-image.de/ to convert to base64

var rects, scale, Xaxis

var mapWidth, mapHeight, mapZoom, mapSvg, group, serieScore, serieHos, serieWc, serieWml, serieWcnl, serieWlg, serieHoh, minScore, minHos, minHoh, minWc, minWml, minWcnl, minWlg, maxScore, maxHos, maxHoh, maxWc, maxWml, maxWcnl, maxWlg, colors1, colors4, colors5, colors5a, table

var scoreData = {}
var hosData = {}
var hohData = {}
var wcData = {}
var wmlData = {}
var wcnlData = {}
var wlgData = {}
var cfrName = {}
var womenNames = {}
var above50cabinet = {}
var above50legislature = {}
var scoreBelow50 = {}
var scoreAbove50 = {}

var noWomenPower = {}
var yesWomenPower = {}

var wcAbove50 = {}
var wcBelow50 = {}
var wmlAbove50 = {}
var wmlBelow50 = {}
var wcnlAbove50 = {}
var wcnlBelow50 = {}
var wlgAbove50 = {}
var wlgBelow50 = {}

var above50l = {}
var above50c = {}

var above50score = {}
var below50score = {}

var above50wc = {}
var below50wc = {}

var noWomenHOS = {}
var yesWomenHOS = {}

var above50wml = {}
var below50wml = {}

var above50wcnl = {}
var below50wcnl = {}

var above50wlg = {}
var below50wlg = {}

var lookup = {}

colors1 = ['#d8e2e4', '#00676b']
colors4 = ['#d8e2e4', '#c0d8d8', '#9bc6cc', '#66acb3', '#3a888e']
colors5 = ['#d8e2e4', '#c0d8d8', '#9bc6cc', '#66acb3', '#3a888e', '#00676b']
colors5a = ['#d8e2e4', '#c0d8d8', '#9bc6cc', '#66acb3', '#3a888e', '#00676b']

mydata = mydata.filter(function (d, i) {
  if (d.iso !== 'XKO') {
    return d
  }
})

let yearUpdated = '2021'

let graphic = `<div class='font-l' style='width: 100%;
    background-color: white;'>
<div id='Womens_Power_Index-chartDiv' style='margin-top: -32px'>
<div class='dataviz' style='min-height: 320px;margin-bottom:50px;border-bottom: 1px solid #dddddd;'>
<div style='width:80%;margin:0 auto;padding-bottom:30px'>
<div class='chartcontainer'>
<div id='gaugeChart1' class='gaugeChart' style='display:none'></div>
<div id='gaugeChart1text'></div>
</div>
<div class='chartcontainer'>
<div id='gaugeChart2' class='gaugeChart' style='display:none'></div>
<div id='gaugeChart2text'></div>
</div>
<div class='chartcontainer'>
<div id='gaugeChart3' class='gaugeChart' style='display:none'></div>
<div id='gaugeChart3text'></div>
</div>
</div>
</div>
<div id='mobile_select'>
<a class='alink' name='maplink'></a>
<div style='width:100%;position:relative'>
  <div id='select_container'>
  <div style='position:relative'>
  <div class='dd-orange placeholder'></div>
  <div class='toolbar'>
    <select id='select1' class='myselect' autocomplete='false' style='width:342px;height:53px;padding-bottom: 20px;'>
    <option value='index'>Political parity score</option>
    <option value='hos'>Head of state (current)</option>
    <option value='hoh'>Heads of state (since 1946)</option>
    <option value='wc'>Cabinet</option>
    <option value='wml'>National legislature</option>
    <option value='wcnl'>National legislature candidates</option>
    <option value='wlg'>Local legislature</option>
    </select>
  </div>
  </div>
  <div id='description'></div>
  </div>
<div id='infocontainer' class='font-li block sm:block md:flex lg:flex xl:flex w-full' style='float:left'>
<div id='info1' class='takeaway flex-inital pb-5 w-7/20'></div>
<div id='info2' class='takeaway flex-inital pb-5 w-7/20'></div>
<div id='info3' class='takeaway flex-inital pb-5 w-full'></div>
</div>
</div>

<div class='dataviz' id='scalechart' style='padding-top:17px;'><div class='quad'></div>
</div>
</div>

<div class='dataviz' id='mapchart' style='position:relative'>
<div class='quad'></div>
<div>
<div id='map'></div>
<div class='legend_container'></div>
<div class='mlegend_container'></div>
<div class='controls'><button id='zoom_in'>+</button><button id='zoom_out'>-</button></div></div>
</div>
<div class='dataviz' style='padding-top: 60px;padding-bottom: 25px !important;'>
<div>
<div style='position:relative;float:left;z-index:50;position:relative;max-width:342px;min-height:53px;width:100%;display:table-cell;'>
  <div class='dd-orange placeholder'>
    <span id='placeholder_text'>Filter by region or country</span>
  </div>
  <select autocomplete='false' class='tracker_search' name='country[]' multiple='multiple' style='width: 342px'>
  </select>
  <div id='desktopreset' class='removeAll left' href='#'>Clear all</div>
  <div id='mobilereset' class='removeAll left' href='#'>Clear all</div>
</div>
<a class='alink' name='tablelink'></a>
<table id='tracker_table' class='nowrap' style='width:100%;max-width:1024px'></table><div style='padding-top:25px;padding-bottom:60px;border-top:1px solid #dddddd'><div id='table_note'>Data as of ${yearUpdated} unless otherwise noted.</div><div id='table_link'><a href='https://vallenato-cfr.netlify.com/womens_power_index/export/WFP%20-%20GWLT%20-%20Tracker%20-%20Export.csv'>Download the data (csv)</a></div></div></div>

</div>
</div>`

$('#Womens_Power_Index').append(graphic)

// table tooltip information
const mydataInfo = [['The political parity score is an aggregate measure of the representation of women in a country\'s government. A score of 100 represents women having at least 50 percent representation in all levels of government with available data.'], ['Number of elected and appointed female heads of state or government between 1946 and March 19, 2021.'], ['Gender of current head of state, as of March 19, 2021. See a list of current female heads of state and government below the table.'], ['Percentage of ministerial positions held by women, as of January 1, 2021.'], ['Percentage of seats held by women in lower and upper houses of the national legislature, as of January 1, 2021.'], ['Percentage of registered female candidates in the most recent elections to lower and upper houses of the national legislature, as of January 1, 2021. '], ['Percentage of elected seats held by women in local government bodies, as of September 2020.']]

/*
Sept 2020
[['The political parity score is an aggregate measure of the representation of women in a country\'s government. A score of 100 represents women having at least 50 percent representation in all levels of government with available data.'], ['Number of elected and appointed female heads of state or government between 1946 and September 16, 2020.'], ['Gender of current head of state, as of September 16, 2020. See a list of current female heads of state and government below the table.'], ['Percentage of ministerial positions held by women, as of January 1, 2020.'], ['Percentage of seats held by women in lower and upper houses of the national legislature, as of August 1, 2020.'], ['Percentage of registered female candidates in the most recent elections to lower and upper houses of the national legislature, as of September 16, 2020.'], ['Percentage of elected seats held by women in local government bodies, as of September 2020.']]
 Jan 2020
 [['The political parity score is an aggregate measure of the representation of women in a country\'s government. A score of 100 represents women having at least 50 percent representation in all levels of government with available data.'], ['Number of elected and appointed female heads of state or government between 1946 and 2019.'], ['Gender of current head of state, as of January 28, 2020. See a list of current female heads of state and government below the table.'], ['Percentage of ministerial positions held by women, as of January 1, 2019.'], ['Percentage of seats held by women in lower and upper houses of the national legislature, as of November 1, 2019.'], ['Percentage of registered female candidates in the most recent elections to lower and upper houses of the national legislature, as of January 29, 2020.'], ['Percentage of elected seats held by women in local government bodies, as of December 20, 2019.']]
 May 2020
 [['The political parity score is an aggregate measure of the representation of women in a country\'s government. A score of 100 represents women having at least 50 percent representation in all levels of government with available data.'], ['Number of elected and appointed female heads of state or government between 1946 and May 21, 2020.'], ['Gender of current head of state, as of May 21, 2020. See a list of current female heads of state and government below the table.'], ['Percentage of ministerial positions held by women, as of January 1, 2020.'], ['Percentage of seats held by women in lower and upper houses of the national legislature, as of May 1, 2020.'], ['Percentage of registered female candidates in the most recent elections to lower and upper houses of the national legislature, as of May 1, 2020.'], ['Percentage of elected seats held by women in local government bodies, as of April 23, 2020.']]
*/

const infoIcon = `<img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI0LjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQgMjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojNjA2NjZCO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTEyLDIyLjFDNi40LDIyLjEsMS45LDE3LjYsMS45LDEyUzYuNCwxLjksMTIsMS45UzIyLjEsNi40LDIyLjEsMTJTMTcuNiwyMi4xLDEyLDIyLjF6IE0xMiwzLjQKCWMtNC43LDAtOC42LDMuOC04LjYsOC42czMuOCw4LjYsOC42LDguNnM4LjYtMy44LDguNi04LjZTMTYuNywzLjQsMTIsMy40eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTIuOSw3LjhjMCwwLjUtMC40LDAuOS0wLjksMC45cy0wLjktMC40LTAuOS0wLjlzMC40LTAuOSwwLjktMC45QzEyLjQsNi45LDEyLjksNy4zLDEyLjksNy44eiBNMTIuNywxNS43CgloLTEuNlY5LjZoMS42VjE1Ljd6Ii8+Cjwvc3ZnPgo=' style='width:14px'/>`

// default sort
var color1 = '#c0d8d8' // women
var color2 = '#f2f2f2' // men

var myColumns = [
  { title: 'Country' },
  { title: 'Region' },
  { title: 'Subregion' },
  { title: '<div><div>Political<br>parity<br>score<div class="absolute float-right infoIcon" data-content="' + mydataInfo[0] + '"">' + infoIcon + '</div></div></div>', type: 'num' },
  { title: '<div><div>Head of state<br> (current)<div class="absolute float-right infoIcon" data-content="' + mydataInfo[2] + '"">' + infoIcon + '</div></div></div>' },
  { title: '<div><div>Heads of state<br>(since 1946)<div class="absolute float-right infoIcon" data-content="' + mydataInfo[1] + '"">' + infoIcon + '</div></div></div>' },
  { title: '<div><div>Cabinet<div class="absolute float-right infoIcon" data-content="' + mydataInfo[3] + '"">' + infoIcon + '</div></div></div>', type: 'num' },
  { title: '<div><div>National <br>legislature<div class="absolute float-right infoIcon" data-content="' + mydataInfo[4] + '"">' + infoIcon + '</div></div></div>', type: 'num' },
  { title: '<div><div>National <br>legislature<br> candidates<div class="absolute float-right infoIcon" data-content="' + mydataInfo[5] + '"">' + infoIcon + '</div></div></div>', type: 'num' },
  { title: '<div><div>Local <br>legislature<div class="absolute float-right infoIcon" data-content="' + mydataInfo[6] + '"">' + infoIcon + '</div></div></div>', type: 'num' }
]

// formating info callouts above map

// above below 50 points, percentage, units
function bFormat (num, unit) {
  if (num !== 1) {
    return '<b>' + +num + '</b> countries have a ' + unit + ' lower than 50'
  } else {
    return '<b>' + +num + '</b> country has a ' + unit + ' of lower than 50'
  }
}

function aFormat (num, unit) {
  if (num !== 1) {
    return '<b>' + +num + '</b> countries have a ' + unit + ' of 50 or greater'
  } else {
    return '<b>' + +num + '</b> country has a ' + unit + ' of 50 or greater'
  }
}

// heads of state
function cFormat (num, unit) {
  return '<b>' + +num + '</b> countries have had no female head of state or government'
}

function dFormat (num, unit) {
  return '<b>' + +num + '</b> countries have had at least one female head of state or government'
}

function eFormat (num) {
  return '<b>' + +num + '</b> countries have a female head of state or government'
}

function fFormat (num) {
  if (num !== 1) {
    return '<b>' + +num + '</b> countries have at least 50 percent female representation'
  } else {
    return '<b>' + +num + '</b> country has at least 50 percent female representation'
  }
}

function gFormat (num) {
  if (num !== 1) {
    return '<b>' + +num + '</b> countries have less than 50 percent female representation'
  } else {
    return '<b>' + +num + '</b> country has less than 50 percent female representation'
  }
}

function gethosmax () {
  var count = []
  mydata.forEach(function (item, index, object) {
    if (!isNaN(+item['Number of elected and appointed female heads of state or governments since 1946'])) {
      count.push(+item['Number of elected and appointed female heads of state or governments since 1946'])
    }
  })

  var hosMax = Math.max.apply(Math, count);
  return +hosMax
}

// DataTables values to help with sorting alpha and numerical changing No data and NA data to numerical
function customData (x) {
  if (x >= 0) {
    return +x
  }
  if (x === -1) {
    return 'No data'
  }
  if (x === -2) {
    return 'N/A'
  }
}

var th = ''

if ($(window).width() < 767) {
  th = '200px'
} else { th = '400px' }

var tableOptions = {
  asStripeClasses: [],
  order: [[3, 'desc']],
  columns: myColumns,
  paging: false,
  scrollY: th,
  scrollX: true,
  scrollCollapse: false,
  autoWidth: true,
  colReorder: true,
  deferRender: true,
  fixedColumns: true,
  columnDefs: [
    {
      targets: '_all',
      className: 'font-lr text-13',
      width: '120px'
    },
    {
      'targets': [1, 2],
      'visible': false,
      'searchable': true
    },
    {
      'targets': [0],
      render: function (data, type, row) {
        return type === 'display' && data.length > 16
          ? data.substr(0, 16) + '…'
          : data;
      },
      className: 'font-lr text-13',
      orderSequence: ['asc', 'desc']
    },
    {
      'targets': [3, 4, 5, 6, 7, 8, 9],
      orderSequence: ['desc', 'asc']
    }
  ]
}

table = $('#tracker_table').on('processing.dt', function (e, settings, processing) {
  $('.spinner').css('display', processing ? 'block' : 'none');
}).DataTable(tableOptions)

var data2 = []
var dict2 = {}
var group0 = []
var group1 = []
var group2 = []

group1.text = 'Region'
group1.children = [
  { 'text': 'Europe', 'id': 'Europe', 'values': 'Europe' },
  { 'text': 'Middle East and North Africa', 'id': 'Middle East and North Africa', 'values': 'Middle East and North Africa' },
  { 'text': 'Sub-Saharan Africa', 'id': 'Sub-Saharan Africa', 'values': 'Sub-Saharan Africa' },
  { 'text': 'Americas', 'id': 'Americas', 'values': 'Americas' },
  { 'text': 'Asia and the Pacific', 'id': 'Asia and the Pacific', 'values': 'Asia and the Pacific' },
  { 'text': 'Russia and Central Asia', 'id': 'Russia and Central Asia', 'values': 'Russia and Central Asia' }
]

group2.text = 'Country'

function populateTable () {
  $.each(mydata, function (key, value) {
    if (value['Country code'] !== 'XKO') {
      lookup[value['Country code']] = {}
      lookup[value['Country code']].name = value['Country name']
      lookup[value['Country code']].score = Math.round(+value['Political parity score'])
      lookup[value['Country code']].hoscurrent = value['Current female head of state']
      lookup[value['Country code']].hostotal = value['Number of elected and appointed female heads of state or governments since 1946']
      lookup[value['Country code']].names = value['Names of elected and appointed female heads of state or governments since 1946']
      lookup[value['Country code']].wcpercent = Math.round(+value['Percentage of ministerial positions held by women'])
      lookup[value['Country code']].wmlpercent = Math.round(+value['Percentage of seats held by women in the national legislature'])
      lookup[value['Country code']].wcnlpercent = Math.round(+value['Percentage of female candidates in the most recent elections to the national legislature'])
      lookup[value['Country code']].wlgpercent = Math.round(+value['Percentage of elected seats held by women in local government bodies'])

      lookup[value['Country code']].wcrank = value['Rank of ministerial positions held by women']
      lookup[value['Country code']].wnlrank = value['Rank of seats held by women in the national legislature']
      lookup[value['Country code']].wcnlrank = value['Rank of female candidates in the most recent elections to the national legislature']
      lookup[value['Country code']].wlgrank = value['Rank of elected seats held by women in local government bodies']
      lookup[value['Country code']].overallrank = value['Political parity score rank']

      cfrName[value['Country code']] = value['Country name']

      if (+value['Political parity score'] >= 0) {
        scoreData[value['Country code']] = +value['Political parity score']
        if (+value['Political parity score'] >= 50) {
          scoreAbove50[value['Country code']] = 1
        } else {
          scoreBelow50[value['Country code']] = 1
        }
      }
      if (+value['Percentage of ministerial positions held by women'] >= 0) {
        wcData[value['Country code']] = +value['Percentage of ministerial positions held by women']
        if (+value['Percentage of ministerial positions held by women'] >= 50) {
          above50cabinet[value['Country code']] = 1
          wcAbove50[value['Country code']] = 1
        } else {
          wcBelow50[value['Country code']] = 1
        }
      }

      if (+value['Current female head of state'].length > 0) {
        hosData[value['Country code']] = 1
        womenNames[value['Country code']] = 1
      } else {
        hosData[value['Country code']] = 0
      }
      if (+value['Number of elected and appointed female heads of state or governments since 1946'] >= 0) {
        if (+value['Number of elected and appointed female heads of state or governments since 1946'] > 0) {
          hohData[value['Country code']] = +value['Number of elected and appointed female heads of state or governments since 1946']
          yesWomenPower[value['Country code']] = 1
        } else {
          noWomenPower[value['Country code']] = 1
          if (+value['Number of elected and appointed female heads of state or governments since 1946'] < 1) {
            hohData[value['Country code']] = 0
          }
        }
      }
      if (+value['Percentage of seats held by women in the national legislature'] >= 0) {
        wmlData[value['Country code']] = +value['Percentage of seats held by women in the national legislature']
        if (+value['Percentage of seats held by women in the national legislature'] >= 50) {
          above50legislature[value['Country code']] = 1
          wmlAbove50[value['Country code']] = 1
        } else {
          wmlBelow50[value['Country code']] = 1
        }
      }
      if (+value['Percentage of female candidates in the most recent elections to the national legislature'] >= 0) {
        wcnlData[value['Country code']] = +value['Percentage of female candidates in the most recent elections to the national legislature']
        if (+value['Percentage of female candidates in the most recent elections to the national legislature'] >= 50) {
          wcnlAbove50[value['Country code']] = 1
        } else {
          wcnlBelow50[value['Country code']] = 1
        }
      }
      if (+value['Percentage of elected seats held by women in local government bodies'] >= 0) {
        wlgData[value['Country code']] = +value['Percentage of elected seats held by women in local government bodies']
        if (+value['Percentage of elected seats held by women in local government bodies'] >= 50) {
          wlgAbove50[value['Country code']] = 1
        } else {
          wlgBelow50[value['Country code']] = 1
        }
      }

      // dict0 = {}
      // dict1 = {}
      dict2 = {}
      table.row.add([
        value['Country name'],
        value['Region'],
        value['Subregion'],
        value['Political parity score'],
        value['Current female head of state'],
        value['Number of elected and appointed female heads of state or governments since 1946'],
        value['Percentage of ministerial positions held by women'],
        value['Percentage of seats held by women in the national legislature'],
        value['Percentage of female candidates in the most recent elections to the national legislature'],
        value['Percentage of elected seats held by women in local government bodies']
      ])

      dict2.id = value['Country name']
      dict2.text = value['Country name']
      dict2.values = value['Country name']
      data2.push(dict2)
    }
  })
}

group2.children = data2

var dropdownSearch = [group0, group1, group2];

var texture = textures.lines()
  .size(8)
  .orientation('diagonal')
  .strokeWidth(1)
  .stroke('white')
  .background('#dddddd');

var nodata = textures.lines()
  .size(8)
  .orientation('diagonal')
  .strokeWidth(1)
  .stroke('white')
  .background('#dddddd')

var myfeatures = topojson.feature(datacountries, datacountries.objects.World_ADMIN0).features
var mylakes = topojson.feature(datalakes, datalakes.objects.lakes).features

mapWidth = 680 // 680
mapHeight = 340 // 400

var mtooltip = d3.select('#map')
  .append('div')
  .style('display', 'none')
  .attr('class', 'mtooltip')

var ttooltip = d3.select('#tracker_table_wrapper')
  .append('div')
  .style('display', 'none')
  .attr('class', 'ttooltip')

function zoomFunction () {
  mtooltip.style('display', 'none')
  var transform = d3.zoomTransform(this);
  var h = 0

  transform[0] = Math.min((mapWidth / mapHeight) * (transform.k - 1), Math.max(mapWidth * (1 - transform.k), transform[0]));

  transform[1] = Math.min(h * (transform.k - 1) + h * transform.k, Math.max(mapHeight * (1 - transform.k) - h * transform.k, transform[1]));

  group.attr('transform', 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')')
  group.attr('transform', 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')')

  d3.selectAll('.legend').selectAll('defs').filter(function (d) { d3.select(this).select('pattern').attr('patternTransform', 'scale(1.35)'); return d })

  mapSvg.selectAll('defs').filter(function (d) { d3.select(this).select('pattern').attr('patternTransform', 'scale(' + (1 / transform.k) + ')'); return d })
}

function getColor (d) {
  if ($('#select1').val() === 'index') {
    // console.log(d.properties.GID_0)
    if (Object.keys(scoreData).indexOf(d.properties.GID_0) >= 0) {
      return colors4[serieScore.getRangeNum(scoreData[d.properties.GID_0])]
    } else {
      setTimeout(function () { d3.select('#hover_' + d.properties.GID_0).style('pointer-events', 'none') }, 200)
      return texture.url()
    }
  }
  if ($('#select1').val() === 'hos') {
    if (Object.keys(hosData).indexOf(d.properties.GID_0) >= 0) {
      if (hosData[d.properties.GID_0] === 1) {
        return colors1[1]
      } else {
        return colors1[0]
      }
    } else {
      return texture.url()
    }
  }
  if ($('#select1').val() === 'hoh') {
    if (Object.keys(hohData).indexOf(d.properties.GID_0) > -1) {
      if (hohData[d.properties.GID_0] >= 0) {
        // console.log(d.properties.GID_0, serieHoh.getRangeNum(hohData[d.properties.GID_0]))
        return colors5a[serieHoh.getRangeNum(hohData[d.properties.GID_0])]
      } else {
        return '#f2f2f2'
      }
    } else {
      return texture.url()
    }
  }

  if ($('#select1').val() === 'wc') {
    if (Object.keys(wcData).indexOf(d.properties.GID_0) >= 0) {
      return colors5[serieWc.getRangeNum(wcData[d.properties.GID_0])]
    } else {
      return texture.url()
    }
  }
  if ($('#select1').val() === 'wml') {
    if (Object.keys(wmlData).indexOf(d.properties.GID_0) >= 0) {
      return colors5[serieWml.getRangeNum(wmlData[d.properties.GID_0])]
    } else {
      return texture.url()
    }
  }
  if ($('#select1').val() === 'wcnl') {
    if (Object.keys(wcnlData).indexOf(d.properties.GID_0) >= 0) {
      return colors5[serieWcnl.getRangeNum(wcnlData[d.properties.GID_0])]
    } else {
      return texture.url()
    }
  }
  if ($('#select1').val() === 'wlg') {
    if (Object.keys(wlgData).indexOf(d.properties.GID_0) >= 0) {
      return colors5[serieWlg.getRangeNum(wlgData[d.properties.GID_0])]
    } else {
      return texture.url()
    }
  }
}

// rect colors
function getColor2 (d) {
  var newColor = ''
  if ($('#select1').val() === 'index') {
    if (Object.keys(scoreData).indexOf(d) >= 0) {
      newColor = colors4[serieScore.getRangeNum(scoreData[d])]
    }
  }
  if ($('#select1').val() === 'hos') {
    if (Object.keys(hosData).indexOf(d) >= 0) {
      if (hosData[d] === 1) {
        newColor = colors1[1]
      } else {
        newColor = colors1[0]
      }
    }
  }
  if ($('#select1').val() === 'hoh') {
    if (Object.keys(hohData).indexOf(d) >= 0) {
      newColor = colors5a[serieHoh.getRangeNum(hohData[d])]
    } else {
      newColor = '#f2f2f2'
    }
  }
  if ($('#select1').val() === 'wc') {
    if (Object.keys(wcData).indexOf(d) >= 0) {
      newColor = colors5[serieWc.getRangeNum(wcData[d])]
    }
  }
  if ($('#select1').val() === 'wml') {
    if (Object.keys(wmlData).indexOf(d) >= 0) {
      newColor = colors5[serieWml.getRangeNum(wmlData[d])]
    }
  }

  if ($('#select1').val() === 'wcnl') {
    if (Object.keys(wcnlData).indexOf(d) >= 0) {
      newColor = colors5[serieWcnl.getRangeNum(wcnlData[d])]
    }
  }
  if ($('#select1').val() === 'wlg') {
    // rects.selectAll('rect').attr('x', function(d){ return scale(wlgData[d])})
    if (Object.keys(wlgData).indexOf(d) >= 0) {
      newColor = colors5[serieWlg.getRangeNum(wlgData[d])]
    }
  }

  return newColor
}

function updateRects () {
  rects.selectAll('rect').style('stroke-width', '0px')
  var margin = { top: 0, right: 18, bottom: 0, left: 18 }
  var width = $('#Womens_Power_Index-chartDiv').width() - margin.left - margin.right
  var height = 50 - margin.top - margin.bottom

  /*
  rects = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  rects.attr('id', 'chartscale').call(Xaxis);
  */

  d3.select('#scalechart svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

  var scale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width]);

  // Add scales to axis
  Xaxis.scale(scale);

  var newData;
  if ($('#select1').val() === 'index') {
    newData = scoreData
    Xaxis.tickFormat(x => /\b(0)\b|50|100/.test(x) ? x : '')
  }
  if ($('#select1').val() === 'hos') {
    newData = hosData
  }
  if ($('#select1').val() === 'hoh') {
    newData = hohData
  }
  if ($('#select1').val() === 'wc') {
    newData = wcData
    Xaxis.tickFormat(x => /\b(0)\b|50|100/.test(x) ? x + '%' : '')
  }
  if ($('#select1').val() === 'wml') {
    newData = wmlData
    Xaxis.tickFormat(x => /\b(0)\b|50|100/.test(x) ? x + '%' : '')
  }
  if ($('#select1').val() === 'wcnl') {
    newData = wcnlData
    Xaxis.tickFormat(x => /\b(0)\b|50|100/.test(x) ? x + '%' : '')
  }
  if ($('#select1').val() === 'wlg') {
    newData = wlgData
    Xaxis.tickFormat(x => /\b(0)\b|50|100/.test(x) ? x + '%' : '')
  }

  var update = rects.selectAll('rect').data(Object.keys(newData))
  var enter = update.enter().append('rect')
  var exit = update.exit()
  exit.remove()

  update.merge(enter)
    .attr('id', function (d) { return 'rect_' + d })
    .attr('y', 7)
    .attr('x', function (d) { return scale(newData[d]) })
    .attr('fill', function (d) { return getColor2(d) })
    .attr('class', 'info_rect')
    .on('mouseover', function (d) { d3.select('#hover_' + d).dispatch('mouseover') })
    .on('mouseout', function (d) { d3.select('#hover_' + d).dispatch('mouseout') })

  d3.select('#chartscale').call(Xaxis);
}

function updateColor () {
  mapSvg.transition().duration(500).call(mapZoom.transform, d3.zoomIdentity)
  toggleLegend('#legend1', 'none')
  toggleLegend('#legend2', 'none')
  toggleLegend('#legend2a', 'none')
  toggleLegend('#legend3', 'none')
  toggleLegend('#legend4', 'none')
  toggleLegend('#legend5', 'none')
  toggleLegend('#legend6', 'none')

  toggleLegend('#mlegend1', 'none')
  toggleLegend('#mlegend2', 'none')
  toggleLegend('#mlegend2a', 'none')
  toggleLegend('#mlegend3', 'none')
  toggleLegend('#mlegend4', 'none')
  toggleLegend('#mlegend5', 'none')
  toggleLegend('#mlegend6', 'none')
  $('#info3').hide()

  $('#scalechart').show()
  $('#infocontainer').show()

  mapSvg.selectAll('.country').each(function (d, i) {
    d3.select(this).style('fill', function (d, i) {
      return getColor(d)
    })
  })

  if ($('#select1').val() === 'index') {
    $('#info1').show()
    $('#info2').show()
    toggleLegend('#legend1', 'inline')
    toggleLegend('#mlegend1', 'inline')
    $('#info1').html(bFormat(below50score, 'score'))
    $('#info2').html(aFormat(above50score, 'score'))
    $('#description').html(mydataInfo[0] + ' For details, see <a href="#chapter-title-0-5" onclick="(function(){$(\'.chapters__nav a span\').eq(4).trigger(\'click\')})()"> About the Data.</a>')
  }
  if ($('#select1').val() === 'hos') {
    $('#scalechart').hide()
    // $('#infocontainer').hide()
    $('#info1').hide()
    $('#info2').hide()
    $('#info3').show()
    $('#info3').html(eFormat(Object.keys(womenNames).length))
    toggleLegend('#legend2', 'inline')
    toggleLegend('#mlegend2', 'inline')
    $('#description').html(mydataInfo[2] + ' For details, see <a href="#chapter-title-0-5" onclick="(function(){$(\'.chapters__nav a span\').eq(4).trigger(\'click\')})()"> About the Data.</a>')
  }
  if ($('#select1').val() === 'hoh') {
    $('#info1').show()
    $('#info2').show()
    $('#info3').hide()
    $('#scalechart').hide()
    toggleLegend('#legend2a', 'inline')
    toggleLegend('#mlegend2a', 'inline')
    $('#description').html(mydataInfo[1] + ' For details, see <a href="#chapter-title-0-5" onclick="(function(){$(\'.chapters__nav a span\').eq(4).trigger(\'click\')})()"> About the Data.</a>')
    $('#info1').html(cFormat(noWomenHOS))
    $('#info2').html(dFormat(yesWomenHOS))
  }
  if ($('#select1').val() === 'wc') {
    $('#info1').show()
    $('#info2').show()
    $('#info3').hide()
    toggleLegend('#legend3', 'inline')
    toggleLegend('#mlegend3', 'inline')
    $('#info1').html(gFormat(below50wc, 'percent'))
    $('#info2').html(fFormat(above50wc, 'percent'))
    $('#description').html(mydataInfo[3] + ' For details, see <a href="#chapter-title-0-5" onclick="(function(){$(\'.chapters__nav a span\').eq(4).trigger(\'click\')})()"> About the Data.</a>')
  }
  if ($('#select1').val() === 'wml') {
    $('#info1').show()
    $('#info2').show()
    $('#info3').hide()
    toggleLegend('#legend4', 'inline')
    toggleLegend('#mlegend4', 'inline')

    $('#info1').html(gFormat(below50wml, 'percent'))
    $('#info2').html(fFormat(above50wml, 'percent'))
    $('#description').html(mydataInfo[4] + ' For details, see <a href="#chapter-title-0-5" onclick="(function(){$(\'.chapters__nav a span\').eq(4).trigger(\'click\')})()"> About the Data.</a>')
  }
  if ($('#select1').val() === 'wcnl') {
    $('#info1').show()
    $('#info2').show()
    $('#info3').hide()
    toggleLegend('#legend5', 'inline')
    toggleLegend('#mlegend5', 'inline')
    $('#info1').html(gFormat(below50wcnl, 'percent'))
    $('#info2').html(fFormat(above50wcnl, 'percent'))

    $('#description').html(mydataInfo[5] + ' For details, see <a href="#chapter-title-0-5" onclick="(function(){$(\'.chapters__nav a span\').eq(4).trigger(\'click\')})()"> About the Data.</a>')
  }
  if ($('#select1').val() === 'wlg') {
    $('#info1').show()
    $('#info2').show()
    $('#info3').hide()
    toggleLegend('#legend6', 'inline')
    toggleLegend('#mlegend6', 'inline')
    $('#info1').html(gFormat(below50wlg, 'percent'))
    $('#info2').html(fFormat(above50wlg, 'percent'))
    $('#description').html(mydataInfo[6] + ' For details, see <a href="#chapter-title-0-5" onclick="(function(){$(\'.chapters__nav a span\').eq(4).trigger(\'click\')})()"> About the Data.</a>')
  }
}

function initMap () {
  var options = [
    { name: 'Miller', projection: d3.geoMiller() },
    { name: 'Albert', projection: d3.geoConicEquidistant().parallels([-4, -15]) },
    { name: 'Larrivee', projection: d3.geoLarrivee() },
    { name: 'VanDerGrinten', projection: d3.geoVanDerGrinten3() },
    { name: 'Platte', projection: d3.geoEquirectangular() },
    { name: 'Robinson', projection: d3.geoRobinson() },
    { name: 'Globe', projection: d3.geoOrthographic() }
  ]

  var i = 0
  // [-10,0,0]
  var projection = options[i].projection.rotate([0, 0, 0]).translate([+mapWidth / 2, +mapHeight / 1.5])

  var path = d3.geoPath(projection)
  // var graticule = d3.geoGraticule();

  mapSvg = d3.select('div#map')
    .append('svg')
    .raise()
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', '0 0 ' + mapWidth + ' ' + mapHeight)
    .classed('svg-content', true).call(mapZoom).on('wheel.zoom', null).on('dblclick.zoom', null);

  mapSvg.call(texture);

  d3.selection.prototype.moveToFront = function () {
    return this.each(function () {
      this.parentNode.appendChild(this);
    });
  }

  d3.selection.prototype.first = function () { return d3.select(this.nodes()[0]); };

  d3.selection.prototype.last = function () { return d3.select(this.nodes()[this.size() - 1]); };

  group = mapSvg.append('g')

  path = d3.geoPath().projection(projection)

  group.append('path')
    .datum({ type: 'Sphere' })
    .attr('class', 'sphere')
    .attr('d', path)
    .attr('fill', '#ffffff')
    .attr('stroke', 'none');

  myfeatures = myfeatures.filter(function (d, i) {
    if (d.properties.GID_0 !== 'ATA') { return d }
  })

  group.append('g')
    .attr('class', 'country-fill')
    .selectAll('path')
    .data(myfeatures)
    .enter().append('path')
    .attr('d', path)
    .attr('vector-effect', 'non-scaling-stroke')
    .attr('stroke-linejoin', 'round')
    .attr('class', 'country')
    .attr('id', function (d, i) {
      return d.properties.GID_0
    })

  group.append('g')
    .attr('class', 'country-borders')
    .selectAll('path')
    .data(myfeatures)
    .enter().append('path')
    .attr('d', path)
    .attr('stroke-linejoin', 'round')
    .attr('vector-effect', 'non-scaling-stroke')

  group.append('g')
    .attr('class', 'lakes-borders')
    .selectAll('path')
    .data(mylakes)
    .enter().append('path')
    .attr('stroke-linejoin', 'round')
    .attr('d', path);

  group.append('g')
    .attr('class', 'country-hover')
    .selectAll('path')
    .data(myfeatures)
    .enter().append('path')
    .attr('d', path)
    .attr('class', 'hover')
    .attr('id', function (d, i) { return 'hover_' + d.properties.GID_0 })
    .attr('vector-effect', 'non-scaling-stroke')
    .attr('stroke-linejoin', 'round')
    // could move interaction to touchswipe in the future ?
    .on('mouseover', handleMouseOver)
    .on('mouseout', handleMouseOut)
    .on('mousemove', function (event) { handleMouseMove(event) })
}

// zoom control
mapZoom = d3.zoom()
  .scaleExtent([1, 5])
  .on('zoom', zoomFunction)
  .translateExtent([[0, 0], [680, 340]])

d3.select('#reset').on('click', function () {
  mapSvg.transition().duration(500).call(mapZoom.transform, d3.zoomIdentity);
});

d3.selectAll('.infoIcon img')
  .on('mousemove', function (event) { handleMouseMove2(event) })
  .on('mouseover', handleMouseOver2)
  .on('mouseout', handleMouseOut2)

d3.select('#zoom_in').on('click', function () {
  mapZoom.scaleBy(mapSvg.transition().duration(400), 2);
});

d3.select('#zoom_out').on('click', function () {
  mapZoom.scaleBy(mapSvg.transition().duration(400), 0.5);
});

function handleMouseOver (d, i) {
  d3.select('#rect_' + d.properties.GID_0).style('stroke', 'black').style('stroke-width', '1px')
    .attr('width', 10).attr('height', 25).attr('transform', 'translate(-2.5,-5)').moveToFront()

  d3.select(this).classed('highlight', true).moveToFront()
  mtooltip.style('display', 'inline');

  var tooltipTable = ''

  var g = d.properties.GID_0

  var s = '<span>' + lookup[g].score + '</span>'
  var sr = nth(lookup[g].overallrank)

  var hosc = 'Male'
  var names = ''
  var wcp = ''
  var wml = ''
  var wcnl = ''
  var wlg = ''

  if (lookup[g].hoscurrent.length > 0) {
    hosc = 'Female'
  } else {
    hosc = 'Male'
  }

  if (lookup[g].hostotal > 0) {
    names = lookup[g].hostotal + ' - ' + lookup[g].names
  } else { names = lookup[g].hostotal }

  if (lookup[g].wcpercent === -1) {
    wcp = '<div style="float:right;width:90px;padding-left:5px"><div style="float:left">No data</div></div>'
  } else if (lookup[g].wcpercent === -2) {
    wcp = '<div style="float:right;width:90px;padding-left:5px"><div style="float:left">N/A</div></div>'
  } else {
    wcp = '<div style="float:right;width:90px;padding-left:5px"><div style="float:left"><span style="font-weight:bold">' + lookup[g].wcpercent + '%</span>&nbsp;(' + nth(lookup[g].wcrank) + ')</div></div>'
  }

  if (lookup[g].wmlpercent === -1) {
    wml = '<div style="float:right;width:90px;padding-left:5px"><div style="float:left">No data</div></div>'
  } else if (lookup[g].wmlpercent === -2) {
    wml = '<div style="float:right;width:90px;padding-left:5px"><div style="float:left">N/A</div></div>'
  } else {
    wml = '<div style="float:right;width:90px;padding-left:5px"><div style="float:left;"><span style="font-weight:bold">' + lookup[g].wmlpercent + '%</span>&nbsp;(' + nth(lookup[g].wnlrank) + ')</div></div>'
  }

  if (lookup[g].wcnlpercent === -1) {
    wcnl = '<div style="float:right;width:90px;padding-left:5px"><div style="float:left">No data</div></div>'
  } else if (lookup[g].wcnlpercent === -2) {
    wcnl = '<div style="float:right;width:90px;padding-left:5px"><div style="float:left">N/A</div></div>'
  } else {
    wcnl = '<div style="float:right;width:90px;padding-left:5px"><div style="float:left;"><span style="font-weight:bold">' + lookup[g].wcnlpercent + '%</span>&nbsp;(' + nth(lookup[g].wcnlrank) + ')</div></div>'
  }

  if (lookup[g].wlgpercent === -1) {
    wlg = '<div style="float:right;width:90px;padding-left:5px"><div style="float:left">No data</div></div>'
  } else if (lookup[g].wlgpercent === -2) {
    wlg = '<div style="float:right;width:90px;padding-left:5px"><div style="float:left">N/A</div></div>'
  } else {
    wlg = '<div style="float:right;width:90px;padding-left:5px"><div style="float:left"><span style="font-weight:bold">' + lookup[g].wlgpercent + '%</span>&nbsp;(' + nth(lookup[g].wlgrank) + ')</div></div>'
  }

  tooltipTable = '<div style="line-height:20px"><div class="tt_title">' + lookup[g].name + '</div><div class="tt_subject">Political parity score: ' + s.bold() + ' (' + sr + ')</div><div class="tt_subject">Head of state (current): ' + hosc.bold() + '</div><div class="tt_subject" style="line-height:18px">Heads of state since 1946: ' + names.bold() + '</div><div class="tt_subject">Representation of women:</div><div class="tt_subject indent">Cabinet' + wcp + '</div><div class="tt_subject indent">National legislature' + wml + '</div><div class="tt_subject indent">National legislature candidates' + wcnl + '</div><div class="tt_subject indent">Local legislature' + wlg + `</div><div class="tt_note">Data for ${yearUpdated} unless otherwise noted.</div></div>`

  mtooltip.html(tooltipTable)
}

function handleMouseOut (d, i) {
  d3.select(this).classed('highlight', false)
  d3.select('#rect_' + d.properties.GID_0).style('stroke', 'none').attr('transform', 'translate(0,0)')
    .attr('width', 3).attr('height', 15)
  mtooltip.style('display', 'none');
}

function handleMouseOver2 (d, i) {
  ttooltip.html('<div class="tooltiptext">' + $(event.target).parent().attr('data-content') + '</div>')
}

function handleMouseOut2 (d, i) {
  ttooltip.style('display', 'none');
}

function findRectangularQuadrant (x, y, width, height) {
  var vertical = '';
  var horizontal = '';
  if (y < height / 2) {
    vertical = 't';
  } else {
    vertical = 'b';
  }
  if (x < width / 2) {
    horizontal = 'l';
  } else {
    horizontal = 'r';
  }
  return vertical + horizontal;
}

function handleMouseMove (d) {
  // console.log(event)
  var rect = $('#map')[0].getBoundingClientRect();
  var cursorX = event.clientX - rect.left;
  var cursorY = event.clientY - rect.top;

  var px = event.pageX
  var py = event.pageY

  var pos = findRectangularQuadrant(cursorX, cursorY, rect.width, rect.height)
  switch (pos) {
    // if tl -> br
    case 'tl':
      mtooltip
        .style('left', px + 25 - $('#map').offset().left + 'px')
        .style('top', (py + 25) - $('#map').offset().top + 'px')
        .style('display', 'inline-block')
      break;
    // tr -> bl
    case 'tr':
      mtooltip
        .style('left', px - $('#map').offset().left - (333 + 25) + 'px')
        .style('top', (py + 25) - $('#map').offset().top + 'px')
        .style('display', 'inline-block')
      break;
    // bl -> tr
    case 'bl':
      mtooltip
        .style('left', px + 25 - $('#map').offset().left + 'px')
        .style('top', py - $('#map').offset().top - 350 + 'px')
        .style('display', 'inline-block')
      break;
    // br -> tl
    case 'br':
      mtooltip
        .style('left', px - $('#map').offset().left - (333 + 25) + 'px')
        .style('top', py - $('#map').offset().top - 350 + 'px')
        .style('display', 'inline-block')
      break;
  }
}

function handleMouseMove2 (d) {
  var rect = $('table.dataTable')[0].getBoundingClientRect();
  var cursorX = event.clientX - rect.left;
  var cursorY = event.clientY - rect.top;

  var px = event.pageX
  var py = event.pageY

  var offy = $('.dataviz').eq(3).height()

  var pos = findRectangularQuadrant(cursorX, cursorY, rect.width, rect.height)
  switch (pos) {
    // if tl -> br
    case 'tl':
      ttooltip
        .style('left', px + 25 - $('#map').offset().left + 'px')
        .style('top', (py + 25) - $('#map').offset().top + 'px')
        .style('display', 'inline-block')
      break;
    // tr -> bl
    case 'tr':
      ttooltip
        .style('left', px - $('#map').offset().left - (333 + 25) + 'px')
        .style('top', (py + 25) - $('#map').offset().top + 'px')
        .style('display', 'inline-block')
      break;
    // bl -> tr
    case 'bl':
      ttooltip
        .style('left', px + 25 - $('#map').offset().left + 'px')
        .style('top', py - $('#map').offset().top - offy + 'px')
        .style('display', 'inline-block')
      break;
    // br -> tl
    case 'br':
      ttooltip
        .style('left', px - $('#map').offset().left - (245) + 'px')
        .style('top', py - $('#map').offset().top - offy + 'px')
        .style('display', 'inline-block')
      break;
  }
}

// for muliple hide/show legend instead of updating existing.
var legend1 = {
  name: 'legend1',
  num: 8,
  size: 25,
  percision: d3.precisionFixed(1),
  width: 125,
  scale: d3.scaleOrdinal,
  labels: ['No data', '', 0, 20, 40, 60, 80, 100],
  colors: ['red', 'rgba(0, 0, 0, 0)', '#d8e2e4', '#c0d8d8', '#9bc6cc', '#66acb3', '#3a888e', 'rgba(0, 0, 0, 0)']
}

var legend2 = {
  name: 'legend2',
  num: 1,
  size: 25,
  percision: d3.precisionFixed(1),
  width: 200,
  scale: d3.scaleOrdinal,
  labels: [''],
  colors: ['rgba(0, 0, 0, 0)']
}

var legend2a = {
  name: 'legend2a',
  num: 8,
  size: 25,
  percision: d3.precisionFixed(1),
  width: 125,
  scale: d3.scaleOrdinal,
  labels: ['No data', '', 0, 1, 2, 3, 4, 5],
  colors: ['red', 'rgba(0, 0, 0, 0)', '#d8e2e4', '#c0d8d8', '#9bc6cc', '#66acb3', '#3a888e', '#00676b']
}

var legend3 = {
  name: 'legend3',
  num: 8,
  size: 25,
  percision: d3.precisionFixed(1),
  width: 125,
  scale: d3.scaleOrdinal,
  labels: ['No data', '', 0, '10%', '20%', '30%', '40%', '50%+'],
  colors: ['red', 'rgba(0, 0, 0, 0)', '#d8e2e4', '#c0d8d8', '#9bc6cc', '#66acb3', '#3a888e', '#00676b']
}

var legend4 = {
  name: 'legend4',
  num: 8,
  size: 25,
  percision: d3.precisionFixed(1),
  width: 125,
  scale: d3.scaleOrdinal,
  labels: ['No data', '', 0, '10%', '20%', '30%', '40%', '50%+'],
  colors: ['red', 'rgba(0, 0, 0, 0)', '#d8e2e4', '#c0d8d8', '#9bc6cc', '#66acb3', '#3a888e', '#00676b']
}

var legend5 = {
  name: 'legend5',
  num: 8,
  size: 25,
  percision: d3.precisionFixed(1),
  width: 125,
  scale: d3.scaleOrdinal,
  labels: ['No data', '', 0, '10%', '20%', '30%', '40%', '50%+'],
  colors: ['red', 'rgba(0, 0, 0, 0)', '#d8e2e4', '#c0d8d8', '#9bc6cc', '#66acb3', '#3a888e', '#00676b']
}

var legend6 = {
  name: 'legend6',
  num: 8,
  size: 25,
  percision: d3.precisionFixed(1),
  width: 125,
  scale: d3.scaleOrdinal,
  labels: ['No data', '', 0, '10%', '20%', '30%', '40%', '50%+'],
  colors: ['red', 'rgba(0, 0, 0, 0)', '#d8e2e4', '#c0d8d8', '#9bc6cc', '#66acb3', '#3a888e', '#00676b']
}

// mobile legends
var mlegend1 = {
  name: 'mlegend1',
  num: 8,
  size: 25,
  percision: d3.precisionFixed(1),
  width: 125,
  scale: d3.scaleOrdinal,
  labels: [0, 20, 40, 60, 80, '100', '', 'No data'],
  colors: ['#d8e2e4', '#c0d8d8', '#9bc6cc', '#66acb3', '#3a888e', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'red']
}

var mlegend2 = {
  name: 'mlegend2',
  num: 1,
  size: 25,
  percision: d3.precisionFixed(1),
  width: 200,
  scale: d3.scaleOrdinal,
  labels: [''],
  colors: ['rgba(0, 0, 0, 0)']
}

var mlegend2a = {
  name: 'mlegend2a',
  num: 8,
  size: 25,
  percision: d3.precisionFixed(1),
  width: 125,
  scale: d3.scaleOrdinal,
  labels: [0, 1, 2, 3, 4, 5, '', 'No data'],
  colors: ['#d8e2e4', '#c0d8d8', '#9bc6cc', '#66acb3', '#3a888e', '#00676b', 'rgba(0, 0, 0, 0)', 'red']
}

var mlegend3 = {
  name: 'mlegend3',
  num: 8,
  size: 25,
  percision: d3.precisionFixed(1),
  width: 125,
  scale: d3.scaleOrdinal,
  labels: [0, '10%', '20%', '30%', '40%', '50%+', '', 'No data'],
  colors: ['#d8e2e4', '#c0d8d8', '#9bc6cc', '#66acb3', '#3a888e', '#00676b', 'rgba(0, 0, 0, 0)', 'red']
}

var mlegend4 = {
  name: 'mlegend4',
  num: 8,
  size: 25,
  percision: d3.precisionFixed(1),
  width: 125,
  scale: d3.scaleOrdinal,
  labels: [0, '10%', '20%', '30%', '40%', '50%+', '', 'No data'],
  colors: ['#d8e2e4', '#c0d8d8', '#9bc6cc', '#66acb3', '#3a888e', '#00676b', 'rgba(0, 0, 0, 0)', 'red']
}

var mlegend5 = {
  name: 'mlegend5',
  num: 8,
  size: 25,
  percision: d3.precisionFixed(1),
  width: 125,
  scale: d3.scaleOrdinal,
  labels: [0, '10%', '20%', '30%', '40%', '50%+', '', 'No data'],
  colors: ['#d8e2e4', '#c0d8d8', '#9bc6cc', '#66acb3', '#3a888e', '#00676b', 'rgba(0, 0, 0, 0)', 'red']
}

var mlegend6 = {
  name: 'mlegend6',
  num: 8,
  size: 25,
  percision: d3.precisionFixed(1),
  width: 125,
  scale: d3.scaleOrdinal,
  labels: [0, '10%', '20%', '30%', '40%', '50%+', '', 'No data'],
  colors: ['#d8e2e4', '#c0d8d8', '#9bc6cc', '#66acb3', '#3a888e', '#00676b', 'rgba(0, 0, 0, 0)', 'red']
}

function addLegend (param, layout) {
  var leg = ''
  var cellsize = param.size
  var num = param.num
  var w = ''
  var h = ''
  var svg = ''
  // var p = param.percision
  if (layout === 'h') {
    // w = (num * (cellsize * 2)) + (2 * num) + 100
    w = $('#Womens_Power_Index-chartDiv').width()
    h = 50
    svg = d3.select('.mlegend_container').append('svg').attr('width', w).attr('height', h).attr('id', param.name).attr('class', 'mlegend')
    svg.append('g').attr('class', 'mobilelegend')
  } else {
    w = param.width
    h = (num * cellsize) + (2 * num)
    svg = d3.select('.legend_container').append('svg').attr('width', w).attr('height', h).attr('id', param.name).attr('class', 'legend')
    svg.append('g').attr('class', 'maplegend')
  }
  var linear = param.scale(param.labels, param.colors)

  svg.call(nodata);

  if (layout === 'h') {
    // var cw = cellsize * 2
    var ch = cellsize / 2
    leg = d3.legendColor()
      .cells(param.labels)
      .shapeWidth(32)
      .shapeHeight(ch)
      .orient('horizontal')
      .shapePadding(2)
      .labelOffset(5)
      .ascending(false)
      .useClass(false)
      .scale(linear);
    svg.select('.mobilelegend')
      .call(leg);
  } else {
    leg = d3.legendColor()
      .cells(param.labels)
      .shapeWidth(cellsize)
      .shapeHeight(cellsize)
      .shapePadding(2)
      .labelOffset(5)
      .ascending(true)
      .useClass(false)
      .scale(linear);
    svg.select('.maplegend')
      .call(leg);
  }

  var legendSwatch = d3.selectAll('#' + param.name + ' .swatch').last();

  var nofill = textures.lines()
    .size(9)
    .orientation('diagonal')
    .strokeWidth(1.25)
    .stroke('white')
    .background('#dddddd');

  svg.call(nofill)

  if (legendSwatch.style('fill') === 'red') {
    legendSwatch.style('fill', function () { return nofill.url() })
  }
}

function toggleLegend (target, visibility) {
  d3.select(target).style('display', visibility)
}

function loadStats () {
  serieScore = new Geostats(Object.values(scoreData))
  serieHos = new Geostats(Object.values(hosData))
  serieHoh = new Geostats(Object.values(hohData))
  serieWc = new Geostats(Object.values(wcData))
  serieWml = new Geostats(Object.values(wmlData))
  serieWcnl = new Geostats(Object.values(wcnlData))
  serieWlg = new Geostats(Object.values(wlgData))

  maxScore = d3.max(Object.values(scoreData))
  maxHos = d3.max(Object.values(hosData))
  maxHoh = d3.max(Object.values(hohData))
  maxWc = d3.max(Object.values(wcData))
  maxWml = d3.max(Object.values(wmlData))
  maxWcnl = d3.max(Object.values(wcnlData))
  maxWlg = d3.max(Object.values(wlgData))

  minScore = d3.min(Object.values(scoreData))
  minHos = d3.min(Object.values(hosData))
  minHoh = d3.min(Object.values(hohData))
  minWc = d3.min(Object.values(wcData))
  minWml = d3.min(Object.values(wmlData))
  minWcnl = d3.min(Object.values(wcnlData))
  minWlg = d3.min(Object.values(wlgData))

  serieScore.setClassManually([minScore, 19.999, 39.999, 59.999, maxScore])
  serieHos.setClassManually([minHos, maxHos])
  // this will need to be updated see line 1117, 1125 once a new election happens
  serieHoh.setClassManually([minHoh, 0.9, 1.9, 2.9, 3.9, 4.9, maxHoh])
  serieWc.setClassManually([minWc, 9.999, 19.999, 29.999, 39.999, 49.999, maxWc])
  serieWml.setClassManually([minWml, 9.999, 19.999, 29.999, 39.999, 49.999, maxWml])
  serieWcnl.setClassManually([minWcnl, 9.999, 19.999, 29.999, 39.999, 49.999, maxWcnl])
  serieWlg.setClassManually([minWlg, 9.999, 19.999, 29.999, 39.999, 49.999, maxWlg])

  serieScore.setColors(colors4)
  serieHos.setColors(colors1)
  serieHoh.setColors(colors5a)
  serieWc.setColors(colors5)
  serieWml.setColors(colors5)
  serieWcnl.setColors(colors5)
  serieWlg.setColors(colors5)
}

function nth (n) { return String(n) + String(['st', 'nd', 'rd'][((+n + 90) % 100 - 10) % 10 - 1] || 'th') }

function addScaleChart () {
  var margin = { top: 0, right: 18, bottom: 0, left: 18 }
  var width = $('#Womens_Power_Index-chartDiv').width() - margin.left - margin.right
  var height = 55 - margin.top - margin.bottom

  // var data = [0, 100];

  // Append SVG
  var svg = d3.select('#scalechart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .classed('svg-content', true)

  // Create scale
  scale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width]);

  // Add scales to axis
  Xaxis = d3.axisBottom()
    .tickValues(['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'])
    .tickFormat(x => /\b(0)\b|50|100/.test(x) ? x : '')
    .tickSizeInner(30)
    .scale(scale)

  // Append group and insert axis
  rects = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  rects.attr('id', 'chartscale').call(Xaxis);

  rects.selectAll('rect')
    .data(Object.keys(scoreData))
    .enter()
    .append('rect')
    .attr('class', 'info_rect')
    .attr('id', function (d) { return 'rect_' + d })
    .attr('x', function (d) { return scale(scoreData[d]) })
    .attr('y', 7)
    .attr('width', 3)
    .attr('height', 15)
    .attr('fill', function (d) { return getColor2(d) })
    .attr('class', 'info_rect')
    .on('mouseover', function (d) {
      d3.select('#hover_' + d).dispatch('mouseover')
      d3.select('#hover_' + d).dispatch('nomousetooltip')
    })
    .on('mousemove', function (event) { handleMouseMove(event) })
    .on('mouseout', function (d) { d3.select('#hover_' + d).dispatch('mouseout') })

  d3.selectAll('.tick')
    .filter(function (d) {
      if (['0', '50', '100'].indexOf(d) < 0) {
        return d + '%'
      }
    }).select('line')
    .style('stroke', '#dddddd');
}

populateTable()

function addStyleChart () {
  table.cells().every(function () {
    var data = this.data();
    var index = this.index().columnVisible
    // var row = this.selector.rows
    // var cols = this.selector.cols
    switch (index) {
      case 1:
        if (+data >= 0) {
          $(this.node()).html('<p class="wm_cell text-indent" style="position:relative;height:26px;float:left;width:' + (+data) + '%;">' + Math.round(parseFloat((+data))) + '</p><p style="height:26px;position:relative;float:left;width:' + (100 - (data)) + '%; background-color:' + color2 + '"></p>')
        } else { $(this.node()).html('<p style="position:relative;height:26px;float:left;width:100%;">' + customData(+data) + '</p>') }
        break;
      case 2:
        if (data.length > 0) {
          $(this.node()).html('<p class="wm_cell text-indent" style="position:relative;height:26px;float:left;width:100%; background-color:' + color1 + '">Female</p>');
        } else {
          $(this.node()).html('<p class="text-indent" style="position:relative;height:26px;float:left;width:100%; background-color:' + color2 + '">Male</p>');
        }
        break;
      case 3:
        if (data >= 1) {
          var hos = ((+data / gethosmax()))
          $(this.node()).html('<p class="wm_cell text-indent" style="position:relative;height:26px;float:left;width:' + hos * 100 + '%; background-color:' + color1 + '">' + data + '</p>')
        } else {
          $(this.node()).html('<p class="text-indent" style="position:relative;height:26px;float:left;width:100%;">' + (+data) + '</p>');
        }
        break;
      case 4:
        if (+data >= 0) {
          $(this.node()).html('<p class="wm_cell text-indent" style="position:relative;height:26px;float:left;width:' + (+data) + '%; background-color:' + color1 + '">' + Math.round(parseFloat((+data))) + '%</p><p style="height:26px;position:relative;float:left;width:' + (100 - (+data)) + '%; background-color:' + color2 + '"></p>');
        } else {
          $(this.node()).html('<p class="text-indent" style="position:relative;height:26px;float:left;width:100%;">' + customData(+data) + '</p>');
        }
        break;
      case 5:
        if (+data >= 0) {
          $(this.node()).html('<p class="wm_cell text-indent" style="position:relative;height:26px;float:left;width:' + (+data) + '%; background-color:' + color1 + '">' + Math.round(parseFloat((+data))) + '%</p><p style="position:relative;float:left;height:26px; width:' + (100 - (+data)) + '%; background-color:' + color2 + '"></p>');
        } else {
          $(this.node()).html('<p class="text-indent" style="position:relative;height:26px;float:left;width:100%;">' + customData(+data) + '</p>');
        }
        break;
      case 6:
        if (+data >= 0) {
          $(this.node()).html('<p class="wm_cell text-indent" style="position:relative;height:26px;float:left;width:' + (+data) + '%; background-color:' + color1 + '">' + Math.round(parseFloat((+data))) + '%</p><p style="position:relative;float:left;height:26px; width:' + (100 - (+data)) + '%; background-color:' + color2 + '"></p>');
        } else {
          $(this.node()).html('<p class="text-indent" style="position:relative;height:26px;float:left;width:100%;">' + customData(+data) + '</p>');
        }
        break;
      case 7:
        if (+data >= 0) {
          $(this.node()).html('<p class="wm_cell text-indent" style="position:relative;height:26px;float:left;width:' + (+data) + '%; background-color:' + color1 + '">' + Math.round(parseFloat((+data))) + '%</p><p style="position:relative;float:left;height:26px; width:' + (100 - (+data)) + '%; background-color:' + color2 + '"></p>');
        } else {
          $(this.node()).html('<p class="text-indent" style="position:relative;height:26px;float:left;width:100%;">' + customData(+data) + '</p>');
        }
        break;
    }
  });
}

function clearAll () {
  $('.tracker_search').val([]).trigger('change')
  $('.tracker_search').hide()
  setTimeout(function () {
    $('.tracker_search').select2('destroy');
  }, 15)

  setTimeout(function () {
    $('.tracker_search').show()
    $('.tracker_search').select2({
      allowClear: true,
      data: dropdownSearch
    }).on('change', function (e) {
      setTimeout(function () {
        $('#tracker_table').DataTable().search($('.tracker_search').select2().val().join('|'), true, false).draw()
      }, 50)
    }).on('select2:opening', function (e) {
      $('#placeholder_text').css('display', 'none')
    }).on('select2:clear', function (e) {
      $('#placeholder_text').css('display', 'inline')
    })
  }, 50)
}

above50l = Object.keys(above50legislature).length
above50c = Object.keys(above50cabinet).length

above50score = Object.keys(scoreAbove50).length
below50score = Object.keys(scoreBelow50).length

noWomenHOS = Object.keys(noWomenPower).length
yesWomenHOS = Object.keys(yesWomenPower).length

above50wc = Object.keys(wcAbove50).length
below50wc = Object.keys(wcBelow50).length

above50wml = Object.keys(wmlAbove50).length
below50wml = Object.keys(wmlBelow50).length

above50wcnl = Object.keys(wcnlAbove50).length
below50wcnl = Object.keys(wcnlBelow50).length

above50wlg = Object.keys(wlgAbove50).length
below50wlg = Object.keys(wlgBelow50).length

function loadCharts () {
  var leaders = Object.keys(womenNames).length
  var total = Object.keys(scoreData).length

  // greater than 50 in cabinet

  // greater than 50 in legislative
  // chart1
  bb.generate({
    render: {
      lazy: true,
      observe: true
    },
    data: {
      columns: [
        ['data1', +leaders]
      ],
      type: 'gauge'
    },
    gauge: {
      expand: false,
      min: 0,
      max: +total,
      width: 15,
      title: String(leaders),
      label: {
        show: false,
        format: function (value, ratio) {
          return value;
        }
      },
      extents: function (value, isMax) {
        return ''
      },
      units: ''
    },
    color: {
      pattern: [
        '#00676b',
        '#00676b',
        '#00676b',
        '#00676b'
      ],
      threshold: {
        values: [
          30,
          60,
          90,
          100
        ]
      }
    },
    interaction: {
      enabled: false
    },
    legend: {
      hide: true
    },
    size: {
      width: 170
    },
    bindto: '#gaugeChart1'
  });

  // chart2
  bb.generate({
    render: {
      lazy: true,
      observe: true
    },
    data: {
      columns: [
        ['data1', +above50c]
      ],
      type: 'gauge'
    },
    gauge: {
      expand: false,
      min: 0,
      max: +total,
      width: 15,
      title: String(above50c),
      label: {
        show: false,
        format: function (value, ratio) {
          return value;
        }
      },
      extents: function (value, isMax) {
        return ''
      },
      units: ''
    },
    color: {
      pattern: [
        '#00676b',
        '#00676b',
        '#00676b',
        '#00676b'
      ],
      threshold: {
        values: [
          30,
          60,
          90,
          100
        ]
      }
    },
    interaction: {
      enabled: false
    },
    legend: {
      hide: true
    },
    size: {
      width: 170
    },
    bindto: '#gaugeChart2'
  });

  // chart3
  bb.generate({
    render: {
      lazy: true,
      observe: true
    },
    data: {
      columns: [
        ['data1', +above50l]
      ],
      type: 'gauge'
    },
    gauge: {
      expand: false,
      min: 0,
      max: +total,
      width: 15,
      title: String(above50l),
      label: {
        show: false,
        format: function (value, ratio) {
          return value;
        }
      },
      extents: function (value, isMax) {
        return ''
      },
      units: ''
    },
    color: {
      pattern: [
        '#00676b',
        '#00676b',
        '#00676b',
        '#00676b'
      ],
      threshold: {
        values: [
          30,
          60,
          90,
          100
        ]
      }
    },
    interaction: {
      enabled: false
    },
    legend: {
      hide: true
    },
    size: {
      width: 170
    },
    bindto: '#gaugeChart3'
  });

  $('#gaugeChart1text').html('out of ' + total + ' countries have a <b>female head of state or government</b><br><a class="cool-grey" href="#chapter-title-0-2" onclick="(function(){$(\'.chapters__nav a span\').eq(1).trigger(\'click\')})()">See the list</a>')
  $('#gaugeChart2text').html('out of ' + total + ' countries have at least <b>50 percent women in the national cabinet</b>')
  $('#gaugeChart3text').html('out of ' + total + ' countries have at least <b>50 percent women in the national legislature</b>')

  $('#description').html('The political parity score is an aggregate measure of the representation of women in a country\'s government. A score of 100 represents women having at least 50 percent representation in all levels of government with available data.  For details, see <a href="#chapter-title-0-5" onclick="(function(){$(\'.chapters__nav a span\').eq(4).trigger(\'click\')})()"> About the Data.</a>')

  $('#info1').html(bFormat(below50score, 'score'))
  $('#info2').html(aFormat(above50score, 'score'))
}

function redraw () {
  if ($(window).width() < 768) {
    if ($('.tracker_search').val().length > 0) {
      $('#desktopreset').css('display', 'none')
      $('#mobilereset').css('display', 'inline')
    }
  }
  if ($(window).width() >= 768) {
    if ($('.tracker_search').val().length > 0) {
      $('#mobilereset').css('display', 'none')
      $('#desktopreset').css('display', 'inline')
    }
  }
  updateRects()
}

function addInteractive () {
  $('.drag_track').swipe({
    swipeStatus: function (event, phase, direction, distance, duration, fingers, fingerData, currentDirection) {
      // console.log(phase)
      if (phase === 'move') {
        mtooltip.style('display', 'none')
      }
    }
  })
}

function cleanUp () {
  $('b[role="presentation"]').hide();
  // $('.selection').addClass('dd-orange')
  setTimeout(function () { $(window).trigger('resize'); }, 1500);
  setTimeout(function () { addStyleChart() }, 250);
  $('.removeAll').on('click touchstart', function (e) { e.preventDefault(); clearAll() })
  d3.selectAll('.legend:not(#legend2a) .legendCells text.label').each(function (d, i) {
    if ((d3.select(this).text() !== 'No data') && (d3.select(this).text() !== 'Female head of state')) {
      d3.select(this).attr('transform', 'translate(30,30)')
    }
  })
  d3.selectAll('.mlegend:not(#mlegend2a) .legendCells text.label').each(function (d, i) {
    if ((d3.select(this).text() !== 'Female head of state')) {
      d3.select(this).attr('transform', 'translate(0,30)')
    } else { d3.select(this).attr('transform', 'translate(15,30)') }
    if (d3.select(this).text() === 'No data') {
      d3.select(this).attr('transform', 'translate(23,30)')
      d3.select(d3.select(this).node().parentNode).attr('transform', 'translate(227,0)')
    }
  })
  table.fixedColumns().relayout().draw();
}

$(document).ready(function () {
  $('.tracker_search').select2({
    allowClear: true,
    data: dropdownSearch
  })
    .on('change', function (e) {
      if ($(':selected', this).length > 0) {
        if ($(window).width() < 768) {
          $('#desktopreset').css('display', 'none')
          $('#mobilereset').css('display', 'inline')
        } else {
          $('#mobilereset').css('display', 'none')
          $('#desktopreset').css('display', 'inline')
        }
        $('#placeholder_text').css('display', 'none')
        setTimeout(function () { $('#tracker_table').DataTable().search($('.tracker_search').select2().val().join('|'), true, false).draw() }, 50)
      } else {
        $('#mobilereset').css('display', 'none')
        $('#desktopreset').css('display', 'none')
        $('#placeholder_text').css('display', 'inline')
        $('#tracker_table').DataTable().search('', true, false).draw()
      }
    }).on('select2:opening', function (e) {
      $('#placeholder_text').css('display', 'none')
    }).on('select2:clear', function (e) {
      $('#placeholder_text').css('display', 'inline')
    })
  $('#select1').select2({
    minimumResultsForSearch: -1,
    placeholder: 'placeholder'
  })
    .on('change', function (e) {
      updateColor()
      updateRects()
    })

  $('thead div').removeClass('absolute float-right')
  $('.dataTables_scrollBody thead tr').css({ visibility: 'collapse' });
  // console.log( table.row(':eq(0)').data() )
  // load map
  initMap()
  loadStats()
  addLegend(legend1)
  addLegend(legend2)
  addLegend(legend2a)
  addLegend(legend3)
  addLegend(legend4)
  addLegend(legend5)
  addLegend(legend6)

  addLegend(mlegend1, 'h')
  addLegend(mlegend2, 'h')
  addLegend(mlegend2a, 'h')
  addLegend(mlegend3, 'h')
  addLegend(mlegend4, 'h')
  addLegend(mlegend5, 'h')
  addLegend(mlegend6, 'h')
  addScaleChart()
  updateColor()
  loadCharts()
  window.addEventListener('resize', redraw);
  cleanUp()
  addInteractive()
  setTimeout(function () {
    document.getElementById('gaugeChart1').style.display = 'block';
    document.getElementById('gaugeChart2').style.display = 'block';
    document.getElementById('gaugeChart3').style.display = 'block';
  }, 500);
})
