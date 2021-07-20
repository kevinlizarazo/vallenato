import '../../common/styles/styles.scss';
import '../../common/styles/fonts.scss';
import './styles.scss'
import $ from 'jquery';
import { bb } from 'billboard.js';
import * as datacountries from './geojson/world_simple.json'
// add coastline shape to display styled ourline with Moracco and Western Sahara style removed.
import * as datacoastline from './geojson/coastline.json'
// import * as datalakes from './geojson/lakes.json'
const d3 = Object.assign({}, require('d3'), require('d3-format'), require('d3-geo'), require('d3-geo-projection'), require('d3-svg-legend'));
window.$ = window.jQuery = require('jquery')
require('select2')
require('select2/dist/css/select2.min.css')
require('webpack-jquery-ui')
require('jquery-ui-touch-punch')
// require('jquery-touchswipe')
const topojson = require('topojson-client')
var mydata = require('./data/data-061521.csv')
var downloadCSV = require('./export/data-061521.csv') // eslint-disable-line no-unused-vars

window.addEventListener('load', (event) => {
  let html1 = `<div class='v max-w-1024 v-container vc1' style='padding-right: 0;padding-bottom: 0;padding-left: 0px;padding-top: 15px;'>
                  <div class='v-header relative pr-15px' style="margin-bottom: 40px;">
                    <div class='v-subhead mt-5px' style="font-size: 16px; line-height: 20px;">GDP growth is the percentage increase in gross domestic product over the prior twelve months. For details, see <a href="#about">Data Notes</a>.</div>
                    <div class="tool2"><div id="dsliderposition"><div id="dslider1"><div id="custom-handle" class="ui-slider-handle"><p id="slider-text"></p></div></div></div></div>
                  </div>
                  <div class='font-l' style='width: 100%;background-color: white;'>
                    <div class='dataviz' id='mapchart' style='position:relative'>
                        <div class='quad'>
                        </div>
                        <div>
                          <div id='map'></div>
                          <div class='legend_container'></div>
                          <div class='mlegend_container'></div>
                            <div class='controls'><button id='zoom_in'>+</button>
                            <button id='zoom_out'>-</button>
                        </div>
                    </div>
                  </div>
                  <div class="map-dropdown"></div>
                  <div class='v-header relative pr-15px'>
                    <div class='v-title'>GDP Growth</div>
                  </div>
                  <!--where the graphic is placed, id should be folder name-->
                  <div id='global_growth_tracker_gdp' class='relative' style='overflow: hidden;'>
                  </div>
                </div>`
  let html2 = `<div class='v max-w-1024 v-container vc2 style='padding-right: 0;padding-bottom: 0;padding-left: 0px;padding-top: 0px;'>
                  <div class="country-data"></div>
                  <div class='v-header relative pr-15px'>
                    <div class='v-title'>Actual and Potential GDP Growth</div>
                    <div class='v-subhead mt-5px'>Potential GDP growth is the estimated noninflationary level of growth. For details, see <a href="#about">Data Notes</a>.</div>
                    <div class='v-legend mt-15px mb-15px' id='legendContainer1'></div>
                  </div>
                  <!--where the graphic is placed, id should be folder name-->
                  <div id='global_growth_tracker_ap' class='relative' style='overflow: hidden;'>
                  </div>
                  <div class='v-header relative pr-15px'>
                    <div class='v-title'>GDP Growth Gap</div>
                    <div class='v-subhead mt-5px'>The GDP growth gap is the percentage point difference between a country's actual and potential growth.</div>
                    <div class='v-legend mt-15px mb-15px' id='legendContainer2'></div>
                  </div>
                  <!--where the graphic is placed, id should be folder name-->
                  <div id='global_growth_tracker_gap' class='relative' style='overflow: hidden;'>
                  </div>
              </div>`
  $('#global_growth_tracker_map').append(html1)
  $('#global_growth_tracker_charts').append(html2)
  $('.vc1').append(`<div class="download-wrapper" style='padding-top:15px;padding-bottom:40px;padding-left:15px;'><a class="font-l" href='https://vallenato.cfr.org/global_growth_tracker/export/data-061521.csv' download="data-061521.csv">Download the data (csv)</a></div>`)
  $('.vc2').append(`<div class="download-wrapper" id="about" style='padding-top:15px;padding-bottom:40px;padding-left:15px;'><a class="font-l" href='https://vallenato.cfr.org/global_growth_tracker/export/data-061521.csv' download="data-061521.csv">Download the data (csv)</a></div>`)

  // TOOLS AND GLOBAL VARIABLES
  var dateParser = d3.timeParse('%m/%d/%y')
  var tickParser = d3.timeParse('%Y-%b')
  var quarterFormatter = d3.timeFormat('%Y-%b')
  // var dateFormatter = d3.timeFormat('%-m/%-d/%y')
  let gapGrowth, actualPotential, actualGDP;
  let countryFilter
  let years = ['2000-Dec', '2005-Dec', '2010-Dec', '2015-Dec', '2020-Dec'].map(e => tickParser(e))
  let countries = []
  let actualPotentialCountries = []
  let quarters = []
  for (let o in mydata) {
    if (o) {
      if (mydata[o]['Actual Growth'] !== '#N/A') {
        countries.push(mydata[o].Country)
      }
      quarters.push(mydata[o].Date)
      if (mydata[o]['Actual Growth'] !== '#N/A' && mydata[o]['Potential Growth'] !== '#N/A') {
        actualPotentialCountries.push(mydata[o].Country)
      }
    }
  }

  countries = [...new Set(countries)]
  actualPotentialCountries = [...new Set(actualPotentialCountries)]
  quarters = [...new Set(quarters)]
  quarters.pop()
  let quartersFormatted = quarters.map(e => monthToQuarter(quarterFormatter(dateParser(e))))
  // quartersFormatted.pop()
  // quartersFormatted.reverse()

  // Replacing '-Mar', '-Jun' to ' Q1', ' Q2'...
  function monthToQuarter (month) {
    if (month.includes('-Mar')) {
      month = month.replace('-Mar', ' Q1')
      return month;
    }
    if (month.includes('-Jun')) {
      month = month.replace('-Jun', ' Q2')
      return month;
    }
    if (month.includes('-Sep')) {
      month = month.replace('-Sep', ' Q3')
      return month;
    }
    if (month.includes('-Dec')) {
      month = month.replace('-Dec', ' Q4')
      return month;
    }
  }

  /* eslint no-extend-native: ["error", { "exceptions": ["Array"] }] */
  Array.prototype.hasMax = function (attrib) {
    return (this.length && this.reduce(function (prev, curr) {
      return prev[attrib] > curr[attrib] ? prev : curr;
    })) || null;
  }
  Array.prototype.hasMin = function (attrib) {
    return (this.length && this.reduce(function (prev, curr) {
      return prev[attrib] < curr[attrib] ? prev : curr;
    })) || null;
  }

  // ////// DATA MANIPULATION ////////

  console.log(mydata)

  // tools and filters for table and charts
  function round (value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }
  const graphData = function (countrySelection, criteriaParameter, criteriaParameter2) {
    countryFilter = mydata.filter(a => a.Country === countrySelection);
    var nestedData = d3.nest().key(function (d) { return d.Date; }).entries(countryFilter);
    var formattedData = nestedData.map(function (entry) {
      var values = entry.values;
      var obj = {};
      values.forEach(function (value) {
        if (criteriaParameter2) {
          let val = round(parseFloat(value[criteriaParameter]), 7)
          let val2 = round(parseFloat(value[criteriaParameter2]), 7)
          if (isNaN(value[criteriaParameter])) {
            obj[criteriaParameter] = NaN
          } else {
            obj[criteriaParameter] = val
          }
          if (isNaN(value[criteriaParameter2])) {
            obj[criteriaParameter2] = NaN
          } else {
            obj[criteriaParameter2] = val2
          }
        } else {
          let val = round(parseFloat(value[criteriaParameter]), 7)
          if (isNaN(value[criteriaParameter])) {
            obj[criteriaParameter] = NaN
          } else if (criteriaParameter === 'Actual Growth') {
            obj[criteriaParameter] = val
          } else {
            obj[criteriaParameter] = val
          }
        }
      })
      obj.Date = dateParser(entry.key);
      return obj;
    });
    return formattedData;
  }

  function getValues (min, max) {
    let maxValue = max > 10 ? max : 10
    let minValue = min < 10 ? min : -10
    return [minValue, 0, maxValue]
  }

  // GRAPH DROPDOWNS
  let graphDropdown = `<div class='select_container country-dropdown margin-left'>
    <div style='position:relative'>
    <div class='dd-orange placeholder'></div>
    <div class='toolbar'>
      <select id='select1' class='myselect' autocomplete='false' style='width:275px;height:53px;padding-bottom: 20px;'>
      <option></option>
      </select>
    </div>
    </div>
    <div id='description'></div>
    </div>`
  $('.country-data').prepend(graphDropdown)
  $('#select1').select2({
    minimumResultsForSearch: Infinity,
    data: actualPotentialCountries,
    placeholder: 'United States',
    sorter: data => data.sort((a, b) => a.text.localeCompare(b.text))
  })
  let graphDropdownMap = `<div class='select_container country-dropdown margin-left'>
    <div style='position:relative'>
    <div class='dd-orange placeholder'></div>
    <div class='toolbar'>
      <select id='select2' class='myselect' autocomplete='false' style='width:275px;height:53px;padding-bottom: 20px;'>
      <option></option>
      </select>
    </div>
    </div>
    <div id='description'></div>
    </div>`
  $('.map-dropdown').prepend(graphDropdownMap)
  $('#select2').select2({
    minimumResultsForSearch: Infinity,
    data: countries,
    placeholder: 'United States',
    sorter: data => data.sort((a, b) => a.text.localeCompare(b.text))
  })

  // ////// BILLBOARD CHARTS ///////

  // GRAPHIC GENERATOR
  function generateGraph (graphic, graphType, heightParameter, countryParameter, criteriaParameter, criteriaParameter2, legendBind) {
    let graphicBind, data, keyValues, max, min, format, values
    if (criteriaParameter === 'Actual Growth' && criteriaParameter2 === 'Potential Growth') {
      legendBind = '#legendContainer1'
      data = graphData(countryParameter, 'Actual Growth', 'Potential Growth')
      keyValues = [criteriaParameter, criteriaParameter2]
      graphicBind = '#global_growth_tracker_ap'
      format = d3.format('+')
      max = Math.max.apply(Math, data.map(function (o) { return o['Actual Growth'] > 10 ? o['Actual Growth'].toFixed(0) : 10 }))
      min = Math.min.apply(Math, data.map(function (o) { return o['Actual Growth'] < -10 ? o['Actual Growth'].toFixed(0) : -10 }))
      values = getValues(min, max)
    }
    if (criteriaParameter === 'Actual Growth' && !criteriaParameter2) {
      legendBind = '#disable'
      data = graphData(countryParameter, 'Actual Growth')
      keyValues = [criteriaParameter]
      graphicBind = '#global_growth_tracker_gdp'
      format = d3.format('+')
      max = Math.max.apply(Math, data.map(function (o) { return o['Actual Growth'] > 10 ? o['Actual Growth'].toFixed(0) : 10 }))
      min = Math.min.apply(Math, data.map(function (o) { return o['Actual Growth'] < -10 ? o['Actual Growth'].toFixed(0) : -10 }))
      values = getValues(min, max)
    }
    if (criteriaParameter === 'Gap Between Actual and Potential Growth') {
      legendBind = '#legendContainer2'
      data = graphData(countryParameter, 'Gap Between Actual and Potential Growth')
      keyValues = [criteriaParameter]
      graphicBind = '#global_growth_tracker_gap'
      format = d3.format('+')
      max = Math.max.apply(Math, data.map(function (o) { return o['Gap Between Actual and Potential Growth'] > 10 ? o['Gap Between Actual and Potential Growth'].toFixed(0) : 10 }))
      min = Math.min.apply(Math, data.map(function (o) { return o['Gap Between Actual and Potential Growth'] < -10 ? o['Gap Between Actual and Potential Growth'].toFixed(0) : -10 }))
      values = getValues(min, max)
    }

    graphic = bb.generate({
      data: {
        json: data,
        keys: {
          x: 'Date',
          xFormat: '%m/%d/%y',
          value: keyValues
        },
        type: graphType,
        colors: {
          'Gap Between Actual and Potential Growth': function (d) {
            if (d.value > 0) {
              return '#3B8991'
            } else if (d.value < 0) {
              return '#E68A17'
            } else { return 'black' }
          },
          'Actual Growth': '#60666B',
          'Potential Growth': '#9EA3A5'
        }
      },
      bar: {
        padding: 1,
        width: { ratio: 1 }
      },
      line: {
        connectNull: false,
        point: false,
        classes: ['actual-line', 'potential-line']
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: { format: '%Y', culling: false, values: years },
          show: true
        },
        y: {
          max: max,
          min: min,
          tick: {
            format: function (d) { return format(d) },
            values: values
          }
        }
      },
      grid: {
        lines: {
          front: false
        },
        y: {
          lines: [
            {
              value: 0,
              axis: 'y',
              class: 'zero-line',
              position: 'start',
              front: false
            }
          ]
        }
      },
      size: {
        height: heightParameter
      },
      padding: {
        right: 6
      },
      legend: {
        item: {
          onclick: function (id) { return '' },
          onover: function (id) { return '' },
          onout: function (id) { return '' }
        },
        contents: {
          bindto: legendBind,
          template: function (title) {
            if (legendBind === '#disable') { return '' }
            var legend = '<div style="display:inline-block;margin-right:8px">'
            if (title === 'Actual Growth') {
              legend += '<svg height="5" width="17"><line x1="0" y1="0" x2="100" y2="0" style="stroke:#60666B;stroke-width:4px;" /></svg><span style="margin-left: 10px; margin-right: 10px;" class="font-l text-gray3 text-13">Actual growth</span>';
            }
            if (title === 'Potential Growth') {
              legend += '<svg height="5" width="20"><line x1="0" y1="0" x2="100" y2="0" style="stroke:#9ea3a5;stroke-width:4px;stroke-dasharray:6px" /></svg><span style="margin-left: 5px;" class="font-l text-gray3 text-13">Potential growth</span>';
            }
            if (title === 'Gap Between Actual and Potential Growth') {
              legend += '<span style="height: 12px;width: 12px;border-radius: 50%;display: inline-block;background-color:#3B8991;margin-right:4px"></span><span class="font-l text-gray3 text-13" style="vertical-align: text-bottom;">Above potential</span>';
              legend += '<span style="height: 12px;width: 12px;border-radius: 50%;display: inline-block;background-color:#E68A17;margin-right:4px; margin-left:12px;"></span><span class="font-l text-gray3 text-13" style="vertical-align: text-bottom;">Below potential</span>';
            }
            legend += '</div>'
            return legend
          }
        }
      },
      tooltip: {
        contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
          if (graphicBind === '#global_growth_tracker_ap') {
            if (d[0]['value'] && d[1]['value']) { // if both actual growth and potential growth exist
              return `<table class="bb-tooltip">
                <tbody>
                  <tr><th colspan="2">${monthToQuarter(quarterFormatter(d[0]['x']))}</th></tr>
                  <tr>
                    <td class="name">${capitalizeFirstLetter(d[0]['name'])}: ${d[0]['value'].toFixed(1)}%</td>
                  </tr>
                  <tr class="bb-tooltip-name-Potential-Growth">
                    <td class="name"><span style="background-color:#9EA3A5"></span>${capitalizeFirstLetter(d[1]['name'])}: ${d[1]['value'].toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>`
            } else if (d[0]['value'] && !d[1]['value']) { // if only actual growth exists
              return `<table class="bb-tooltip">
                <tbody>
                  <tr><th colspan="2">${monthToQuarter(quarterFormatter(d[0]['x']))}</th></tr>
                  <tr>
                    <td class="name">${capitalizeFirstLetter(d[0]['name'])}: ${d[0]['value'].toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>`
            } else if (d[1]['value'] && !d[0]['value']) { // if only potential growth exists
              return `<table class="bb-tooltip">
                <tbody>
                  <tr><th colspan="2">${monthToQuarter(quarterFormatter(d[0]['x']))}</th></tr>
                  <tr>
                    <td class="name">${capitalizeFirstLetter(d[1]['name'])} ${d[1]['value'].toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>`
            }
          } else if (graphicBind === '#global_growth_tracker_gap') {
            return `<table class="bb-tooltip">
              <tbody>
                <tr><th colspan="2">${monthToQuarter(quarterFormatter(d[0]['x']))}</th></tr>
                <tr>
                  <td class="name">${d[0]['value'] > 0 ? d[0]['value'].toFixed(1) : d[0]['value'].toFixed(1).toString().substring(1)} percentage points ${d[0]['value'] > 0 ? 'over' : 'under'} potential</td>
                </tr>
              </tbody>
            </table>`
          } else {
            return `<table class="bb-tooltip">
              <tbody>
                <tr><th colspan="2">${monthToQuarter(quarterFormatter(d[0]['x']))}</th></tr>
                <tr>
                  <td class="name">GDP growth: ${d[0]['value'].toFixed(1)}%</td>
                </tr>
              </tbody>
            </table>`
          }
        }
      },
      bindto: graphicBind
    });
    return graphic;
  }

  // post graphic generation helpers

  function capitalizeFirstLetter (string) {
    return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  function formatAxis () {
    $('#global_growth_tracker_ap .bb-axis-y .tick tspan').each(function () {
      let newVal = $(this).text();
      $(this).text(newVal + '%');
    });
    $('.bb-axis-y path.domain').attr('d', 'M-0,1H0V196H-0')
  }

  function formatMapChartAxis () {
    $('#global_growth_tracker_gdp .bb-axis-y .tick tspan').each(function () {
      let newVal = $(this).text();
      $(this).text(newVal + '%');
    });
    $('.bb-axis-y path.domain').attr('d', 'M-0,1H0V196H-0')
  }

  // generate default views
  console.log(actualGDP)
  actualGDP = generateGraph(actualGDP, 'line', 250, 'United States', 'Actual Growth')
  formatMapChartAxis();
  actualPotential = generateGraph(actualPotential, 'line', 250, 'United States', 'Actual Growth', 'Potential Growth', '#legendContainer1')
  gapGrowth = generateGraph(gapGrowth, 'bar', 250, 'United States', 'Gap Between Actual and Potential Growth', '#legendContainer2')
  formatAxis();
  $('b[role="presentation"]').hide();

  // redraw logic: destroy, prepare, regenerate
  $('#select1').on('change', function (e) {
    gapGrowth.destroy();
    actualPotential.destroy();
    $('b[role="presentation"]').hide();
    let countryDropdown = $('#select1').select2().val()
    actualPotential = generateGraph(actualPotential, 'line', 250, countryDropdown, 'Actual Growth', 'Potential Growth', '#legendContainer1')
    gapGrowth = generateGraph(gapGrowth, 'bar', 250, countryDropdown, 'Gap Between Actual and Potential Growth', '#legendContainer2')
    formatAxis();
  })

  $('#select2').on('change', function (e) {
    actualGDP.destroy();
    $('b[role="presentation"]').hide();
    let countryDropdown = $('#select2').select2().val()
    actualGDP = generateGraph(actualGDP, 'line', 250, countryDropdown, 'Actual Growth')
    formatMapChartAxis();
  })

  var resizeTimer;
  $(window).on('resize', function (e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      formatAxis();
      formatMapChartAxis();
      // if max size 960, adjust legend text
      // let mql = window.matchMedia('(max-width: 860px)');
      // if (mql.matches) {
      //   $('.cell .label').attr('transform', 'translate(5, 32)')
      // } else {
      //   $('.cell .label').attr('transform', 'translate(30, 32)')
      // }
      console.log('resized')
    }, 200);
  });

  /// MAP CONSTRUCTION ///

  let quarterFilter = mydata.filter(x => x.Date === '3/31/21')
  console.log(quarterFilter)

  var mapWidth, mapHeight, mapZoom, mapSvg, group

  var myfeatures = topojson.feature(datacountries.default, datacountries.objects.World_ADMIN0).features

  var mycoastline = topojson.feature(datacoastline.default, datacoastline.objects.World_ADMIN0)

  mapWidth = 680 // 680
  mapHeight = 360 // 400

  var mtooltip = d3.select('#map')
    .append('div')
    .style('display', 'none')
    .attr('class', 'mtooltip')

  function zoomFunction () {
    mtooltip.style('display', 'none')
    var transform = d3.zoomTransform(this);
    var h = 0
    transform[0] = Math.min((mapWidth / mapHeight) * (transform.k - 1), Math.max(mapWidth * (1 - transform.k), transform[0]));
    transform[1] = Math.min(h * (transform.k - 1) + h * transform.k, Math.max(mapHeight * (1 - transform.k) - h * transform.k, transform[1]));
    group.attr('transform', 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')')
    group.attr('transform', 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')')
  }

  function initMap () {
    var options = [
      { name: 'Miller', projection: d3.geoMiller() }
    ]

    var i = 0
    var projection = options[i].projection.rotate([0, 0, 0]).translate([+mapWidth / 2, +mapHeight / 1.61])

    var path = d3.geoPath(projection)

    mapSvg = d3.select('div#map')
      .append('svg')
      .raise()
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', '0 0 ' + mapWidth + ' ' + mapHeight)
      .classed('svg-content', true).call(mapZoom).on('wheel.zoom', null).on('dblclick.zoom', null);

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
      .attr('fill', '#fff')
      .attr('stroke', 'none');

    myfeatures = myfeatures.filter(function (d, i) {
      // removes antarctica
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
        return i
      })
      .attr('fill', function (d, i) {
        let dateFilter = quarterFilter.filter(x => x.Country === (d.properties.NAME_0))
        if (dateFilter[0]) {
          let data = dateFilter[0]['Actual Growth']
          // #0C4240
          // #2A6F74
          // #549FA7
          // #95D0D0
          // #D2EBEB
          // #FBE4BB
          // #F6BF61
          // #E08416
          // #AF550D
          // #6F130C
          if (data > 4) {
            return '#0C4240'
          } else if (data > 3) {
            return '#2A6F74'
          } else if (data > 2) {
            return '#549FA7'
          } else if (data > 1) {
            return '#95D0D0'
          } else if (data > 0) {
            return '#D2EBEB'
          } else if (data > -1) {
            return '#FBE4BB'
          } else if (data > -2) {
            return '#F6BF61'
          } else if (data > -3) {
            return '#E08416'
          } else if (data > -4) {
            return '#AF550D'
          } else if (data < -4) {
            return '#6F130C'
          } else { return '#eee' }
        }
        return '#eee'
      })

    var clipAfrica = d3.geoIdentity().clipExtent([[100, 100], [860, 500]])
    var coastlineClipped = d3.geoProject(mycoastline, clipAfrica);

    // added filter to add Western Sahara as a dashed line
    group.append('g')
      .attr('class', 'country-borders-dashed')
      .selectAll('path')
      .data(myfeatures.filter(d => d.properties.GID_0 === 'ESH'))
      .enter().append('path')
      .attr('d', path)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-dasharray', 4)
      .attr('vector-effect', 'non-scaling-stroke')

    // added filter to remove Western Sahara and Monaco as solid line
    group.append('g')
      .attr('class', 'country-borders')
      .selectAll('path')
      .data(myfeatures.filter(d => d.properties.GID_0 !== 'ESH' || d.properties.GID_0 !== 'MAR'))
      .enter().append('path')
      .attr('d', path)
      .attr('stroke-linejoin', 'round')
      .attr('vector-effect', 'non-scaling-stroke')

    group.append('g')
      .attr('class', 'country-borders')
      .selectAll('path')
      .data(coastlineClipped.features)
      .enter().append('path')
      .attr('d', path)
      .attr('stroke-linejoin', 'round')
      .attr('vector-effect', 'non-scaling-stroke')

    group.append('g')
      .attr('class', 'country-hover')
      .selectAll('path')
      .data(myfeatures)
      .enter().append('path')
      .attr('d', path)
      .attr('class', 'hover')
      .attr('id', function (d, i) { return 'hover_' + d.properties.NAME_0 })
      .attr('vector-effect', 'non-scaling-stroke')
      .attr('stroke-linejoin', 'round')
      // could move interaction to touchswipe in the future ?
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut)
      .on('mousemove', function (event) { handleMouseMove(event, mtooltip, findRectangularQuadrant) })
  }

  // zoom control
  mapZoom = d3.zoom()
    .scaleExtent([1, 5])
    .on('zoom', zoomFunction)
    .translateExtent([[0, 0], [680, 360]])

  d3.select('#reset').on('click', function () {
    mapSvg.transition().duration(500).call(mapZoom.transform, d3.zoomIdentity);
  });

  d3.select('#zoom_in').on('click', function () {
    mapZoom.scaleBy(mapSvg.transition().duration(400), 2);
  });

  d3.select('#zoom_out').on('click', function () {
    mapZoom.scaleBy(mapSvg.transition().duration(400), 0.5);
  });

  // function for getting Actual Growth for tooltips
  function getGDP (d) {
    let dateFilter = quarterFilter.filter(x => x.Country === (d.properties.NAME_0))
    if (dateFilter[0]) {
      let data = (dateFilter[0]['Actual Growth'])
      if (!isNaN(data)) { return (data * 1).toFixed(1) + '%' }
      if (data !== undefined) { return 'No data' }
    } else {
      return 'No data'
    }
  }

  function handleMouseOver (d, i) {
    d3.select(this).classed('highlight', true).moveToFront()
    mtooltip.style('display', 'inline');

    var tooltipTable = ''

    var date = $('#slider-text').text()

    var g = d.properties.NAME_0

    var gdp = getGDP(d)

    var s = '<p id="tooltip-country">' + g + '</p><p id="tooltip-quarter">' + date + '</p><p id="tooltip-gdp">GDP growth: ' + gdp + '</p>'

    tooltipTable = s

    mtooltip.html(tooltipTable)
    if (d.properties.NAME_0 === 'Democratic Republic of the Congo') {
      $('.mtooltip').css('width', '261px')
    } else {
      $('.mtooltip').css('width', '180px')
    }
  }

  function handleMouseOut (d, i) {
    d3.select(this).classed('highlight', false)
    mtooltip.style('display', 'none');
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

  // LEGEND
  var legend1 = {
    name: 'legend1',
    num: 11,
    size: 25,
    percision: d3.precisionFixed(1),
    width: 125,
    scale: d3.scaleOrdinal,
    labels: ['', '-4% or less', '-3%', '-2%', '-1%', ' 0%', '+1%', '+2%', '+3%', '+4% or more'],
    colors: ['#6f130c', '#AF550D', '#E08416', '#F6BF61', '#FBE4BB', '#d2ebeb', '#95D0D0', '#549FA7', '#2A6F74', '#0c4240']
  }

  var mlegend1 = {
    name: 'mlegend1',
    num: 11,
    size: 25,
    percision: d3.precisionFixed(1),
    width: 125,
    scale: d3.scaleOrdinal,
    labels: ['-4% or less', '-3%', '-2%', '-1%', ' 0%', '+1%', '+2%', '+3%', '+4% or more', '    '],
    colors: ['#6f130c', '#AF550D', '#E08416', '#F6BF61', '#FBE4BB', '#d2ebeb', '#95D0D0', '#549FA7', '#2A6F74', '#0c4240']
  }

  // add legend both horizontal or vertical
  // addLegend('legend1')
  // addLegend('legend1m', 'h')
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
      w = 290
      h = 80
      svg = d3.select('.mlegend_container').append('svg').attr('width', w).attr('height', h).attr('id', param.name).attr('class', 'mlegend')
      svg.append('g').attr('class', 'mobilelegend')
    } else {
      w = param.width
      h = (num * cellsize) + (7 * num)
      svg = d3.select('.legend_container').append('svg').attr('width', w).attr('height', h).attr('id', param.name).attr('class', 'legend')
      svg.append('g').attr('class', 'maplegend')
    }
    var linear = param.scale(param.labels, param.colors)

    if (layout === 'h') {
      // var cw = cellsize * 2
      var ch = cellsize / 2
      leg = d3.legendColor()
        .cells(param.labels)
        .shapeWidth(24)
        .shapeHeight(ch)
        .orient('horizontal')
        .shapePadding(2)
        .labelOffset(5)
        .ascending(false)
        .useClass(false)
        .scale(linear)
        .title('GDP growth')
        .titleWidth(150);
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
        .scale(linear)
        .title('GDP growth')
        .titleWidth(150);
      svg.select('.maplegend')
        .call(leg);
    }

    // var legendSwatch = d3.selectAll('#' + param.name + ' .swatch').last();
    // var nofill = textures.lines()
    //   .size(9)
    //   .orientation('diagonal')
    //   .strokeWidth(1.25)
    //   .stroke('white')
    //   .background('#dddddd');

    // svg.call(nofill)

    // if (legendSwatch.style('fill') === 'red') {
    //   legendSwatch.style('fill', function () { return nofill.url() })
    // }
    // shift labels down
    d3.selectAll('.legend .legendCells text.label').each(function (d, i) {
      d3.select(this).attr('transform', 'translate(30,30)')
    })
    d3.selectAll('.mlegend .legendCells text.label').each(function (d, i) {
      d3.select(this).attr('transform', 'translate(30,30)')
      if (d === '-3%' || d === '-2%' || d === '-1%' || d === '+1%' || d === '+2%' || d === '+3%') {
        d3.select(this).attr('visibility', 'hidden')
      }
      if (d === '+4% or more') {
        d3.select(this).attr('transform', 'translate(12,30)')
      }
    })
  }

  initMap()
  addLegend(legend1)
  addLegend(mlegend1, 'h')
  window.d3 = d3

  // SLIDER
  makeSlider()
  function makeSlider () {
    $('#dslider1').slider({
      min: 0,
      max: quartersFormatted.length - 1,
      create: function (event, ui) {
        $(this).slider('value', quartersFormatted.length - 1)
        $('#custom-handle #slider-text').text('2021 Q1');
      },
      slide: function (event, ui) {
        $('#custom-handle #slider-text').text(quartersFormatted[ui.value]);
        updateMap(quartersFormatted[ui.value])
        // // updateInfo()
      },
      stop: function (event, ui) {
        $('#custom-handle #slider-text').text(quartersFormatted[ui.value]);
        updateMap(quartersFormatted[ui.value])
        // updateInfo()
      }
    });
  }
  function updateMap (quarter) {
    let selectedQuarter = quarters[quartersFormatted.indexOf(quarter)]
    console.log(selectedQuarter)
    quarterFilter = mydata.filter(x => x.Date === selectedQuarter)
    // updates what can be highlighted and color
    group.selectAll('.country')
      .style('fill', function (d, i) {
        let dateFilter = quarterFilter.filter(x => x.Country === (d.properties.NAME_0))
        if (dateFilter[0]) {
          let data = dateFilter[0]['Actual Growth']
          // #0C4240
          // #2A6F74
          // #549FA7
          // #95D0D0
          // #D2EBEB
          // #FBE4BB
          // #F6BF61
          // #E08416
          // #AF550D
          // #6F130C
          if (data > 4) {
            return '#0C4240'
          } else if (data > 3) {
            return '#2A6F74'
          } else if (data > 2) {
            return '#549FA7'
          } else if (data > 1) {
            return '#95D0D0'
          } else if (data > 0) {
            return '#D2EBEB'
          } else if (data > -1) {
            return '#FBE4BB'
          } else if (data > -2) {
            return '#F6BF61'
          } else if (data > -3) {
            return '#E08416'
          } else if (data > -4) {
            return '#AF550D'
          } else if (data < -4) {
            return '#6F130C'
          } else { return '#eee' }
        }
        return '#eee'
      })
      .style('stroke', '#dedede')
      .style('stroke-width', '1px')
  }
});

function handleMouseMove (d, mtooltip, findRectangularQuadrant) {
  var rect = $('#map')[0].getBoundingClientRect();
  var cursorX = event.clientX - rect.left;
  var cursorY = event.clientY - rect.top;

  var tw = parseInt(mtooltip.style('width'))
  var th = parseInt(mtooltip.style('height'))
  var offset = 25

  // change tooltip dimensions in styles.scss

  var px = event.pageX
  var py = event.pageY

  var pos = findRectangularQuadrant(cursorX, cursorY, rect.width, rect.height)
  switch (pos) {
    // if tl -> br
    case 'tl':
      mtooltip
        .style('left', px + offset - $('#map').offset().left + 'px')
        .style('top', (py + offset) - $('#map').offset().top + 'px')
        .style('display', 'inline-block')
      break;
    // tr -> bl
    case 'tr':
      mtooltip
        .style('left', px - $('#map').offset().left - (tw + offset) + 'px')
        .style('top', (py + offset) - $('#map').offset().top + 'px')
        .style('display', 'inline-block')
      break;
    // bl -> tr
    case 'bl':
      mtooltip
        .style('left', px + offset - $('#map').offset().left + 'px')
        .style('top', py - $('#map').offset().top - th + 'px')
        .style('display', 'inline-block')
      break;
    // br -> tl
    case 'br':
      mtooltip
        .style('left', px - $('#map').offset().left - (tw + offset) + 'px')
        .style('top', py - $('#map').offset().top - th + 'px')
        .style('display', 'inline-block')
      break;
  }
}
