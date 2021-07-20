import '../../common/styles/styles.scss';
import '../../common/styles/fonts.scss';
import './styles.scss'
import $ from 'jquery';
import { bb } from 'billboard.js';
var mydata = require('./data/Currency_Manipulation_Interactive_Oct_7_2020.csv')
const d3 = Object.assign({}, require('d3'), require('d3-svg-annotation'), require('d3-format'), require('d3-geo'));
require('datatables')
require('datatables.net-fixedcolumns')
require('datatables/media/css/jquery.dataTables.min.css')
require('select2')
require('select2/dist/css/select2.min.css')
var downloadCSV = require('./export/Currency_Manipulation_Interactive_Export_Oct_7_2020.csv') // eslint-disable-line no-unused-vars

window.addEventListener('load', (event) => {
  let legend = `<div id="cm-legend" class="legend">
    <div class="legend-wrapper font-l text-gray" style="">
    <p class="legend-square" style="background: #BD3823"><p class="legend-text">Exceeds Treasury threshold</p></p>
    <p class="legend-square" style="background: #6F130C"><p class="legend-text">Exceeds Treasury threshold by more than 100%</p></p>
    </div></div>`
  let html = `<div id="currency_manipulator_wrapper">
  <div class="cm-wrapper quarter-data">
  </div>
  <div class="cm-wrapper country-data">
    <div class='header relative text-gray text-18 font-l pr-15px mt-20px status-wrapper margin-left'>
      <p id='data-status-lead'>Q2 2020: <span id="data-status"></span></p>
      <svg height="5" width="24">
      <line x1="0" y1="0" x2="200" y2="0" style="stroke:#9ea3a5;stroke-width:2px;stroke-dasharray:6px" />
      </svg><span class="chart-legend">Treasury threshold</span>
    </div>
    <div class='header relative text-gray text-18 font-lb pr-15px mb-20px mt-15px chart-divider margin-left'>
      <div class=' mt-20px'>Current account balance</div>
    </div>
    <div id='currency_manipulator_cab' class='chart-container'>
    </div>
    <div class='header relative text-gray text-18 font-lb pr-15px mb-20px mt-20px mb-15px chart-divider margin-left'>
      <div class=' mt-20px'>Foreign currency intervention</div>
    </div>
    <div id='currency_manipulator_fx' class='chart-container'>
    </div>
    <div class='header relative text-gray text-18 font-lb pr-15px mb-20px mt-20px chart-divider margin-left'>
      <div class=' mt-20px'>Bilateral goods trade with the U.S.</div>
    </div>
    <div id='currency_manipulator_bib' class='chart-container'>
    </div>
  </div></div>`
  $('#currency_manipulator').append(legend)
  $('#currency_manipulator').append(html)

  // TOOLS AND GLOBAL VARIABLES
  var dateParser = d3.timeParse('%m/%d/%y')
  var tickParser = d3.timeParse('%Y-%b')
  var quarterFormatter = d3.timeFormat('%Y-%b')
  var dateFormatter = d3.timeFormat('%-m/%-d/%y')
  let fxIntervention, currentAccountSurplus, bilateralBalance;
  let countryFilter, quarterFilter
  const fx = 'FX Intervention'
  const cab = 'Current Account Balance'
  const bib = 'Bilateral Balance'
  let years = ['2000-Dec', '2005-Dec', '2010-Dec', '2015-Dec', '2020-Jun'].map(e => tickParser(e))
  let countries = [] // lines 50-58 for dropdown population
  let quarters = []
  for (let o in mydata) {
    countries.push(mydata[o].Country)
    quarters.push(mydata[o].Quarter)
  }
  countries = [...new Set(countries)]
  quarters = [...new Set(quarters)]
  let quartersFormatted = quarters.map(e => monthToQuarter(quarterFormatter(dateParser(e))))
  quartersFormatted.pop()
  quartersFormatted.reverse()

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
  // ...and back
  function quarterToMonth (month) {
    if (month.includes(' Q1')) {
      month = month.replace(' Q1', '-Mar')
      return month;
    }
    if (month.includes(' Q2')) {
      month = month.replace(' Q2', '-Jun')
      return month;
    }
    if (month.includes(' Q3')) {
      month = month.replace(' Q3', '-Sep')
      return month;
    }
    if (month.includes(' Q4')) {
      month = month.replace(' Q4', '-Dec')
      return month;
    }
  }

  function formatMoney (amount, decimalCount = 1, decimal = '.', thousands = ',') {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? '-$' : '$';

      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '');
    } catch (e) {
      console.log(e)
    }
  };

  // ////// DATA MANIPULATION ////////
  // calculate violated criteria
  for (let data in mydata) {
    let violations = 0;
    if (mydata[data][fx] > 0.02) {
      violations++;
    }
    if (mydata[data][cab] > 0.02) {
      violations++;
    }
    if (mydata[data][bib] > 20) {
      violations++;
    }
    mydata[data]['Violations'] = violations
  }
  console.log(mydata)

  // tools and filters for table and charts
  function round (value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }
  const tableData = function (quarterSelection) {
    quarterFilter = mydata.filter(a => a.Quarter === quarterSelection);
  }
  const graphData = function (countrySelection, criteriaSelection) {
    countryFilter = mydata.filter(a => a.Country === countrySelection);
    var nestedData = d3.nest().key(function (d) { return d.Quarter; }).entries(countryFilter);
    var formattedData = nestedData.map(function (entry) {
      var values = entry.values;
      var obj = {};
      values.forEach(function (value) {
        let val = round(parseFloat(value[criteriaSelection]), 7)
        if (isNaN(value[criteriaSelection])) {
          obj[criteriaSelection] = NaN
        } else {
          obj[criteriaSelection] = val
        }
      })
      obj.Quarter = dateParser(entry.key);
      return obj;
    });
    return formattedData;
  }

  /* eslint no-extend-native: ["error", { "exceptions": ["Array"] }] */
  Array.prototype.hasMax = function (attrib) {
    return (this.length && this.reduce(function (prev, curr) {
      return prev[attrib] > curr[attrib] ? prev : curr;
    })) || null;
  }

  // DROPDOWN
  let tableDropdown = `<div class='select_container quarter-dropdown'>
    <div style='position:relative'>
    <div class='dd-orange placeholder'></div>
    <div class='toolbar'>
      <select id='dt-dropdown' class='myselect' autocomplete='false' style='width:135px;height:53px;padding-bottom: 20px;'>
      <option></option>
      </select>
    </div>
    </div>
    <div id='description'></div>
    </div>`
  $('.quarter-data').prepend(tableDropdown)
  $('#dt-dropdown').select2({
    minimumResultsForSearch: -1,
    data: quartersFormatted,
    placeholder: '2020 Q2'
  })
  $('b[role="presentation"]').hide();
  // GRAPH DROPDOWN
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
    minimumResultsForSearch: -1,
    data: countries,
    placeholder: 'China'
  })

  // ////// TABLE ////////

  tableData('6/1/20')
  for (let e in quarterFilter) {
    if (quarterFilter[e]['Current Account Balance'] === '#N/A' || quarterFilter[e]['Current Account Balance'] === '#DIV/0') {
      quarterFilter[e]['Current Account Balance'] = NaN
    }
    if (quarterFilter[e]['Bilateral Balance'] === '#N/A' || quarterFilter[e]['Bilateral Balance'] === '#DIV/0') {
      quarterFilter[e]['Bilateral Balance'] = NaN
    }
    if (quarterFilter[e]['FX Intervention'] === '#N/A' || quarterFilter[e]['FX Intervention'] === '#DIV/0') {
      quarterFilter[e]['FX Intervention'] = NaN
    }
  }

  $('.quarter-data').append(`<table id='currency_table' class='nowrap' style='width:100%;max-width:1024px; margin:0;'></table>`)

  // table tooltip information
  // const mydataInfo = [['Current account balance'], ['Bilateral trade balance'], ['Foreign exchange intervention'], ['Number of criteria violated']]
  // const infoIcon = `<img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI0LjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQgMjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojNjA2NjZCO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTEyLDIyLjFDNi40LDIyLjEsMS45LDE3LjYsMS45LDEyUzYuNCwxLjksMTIsMS45UzIyLjEsNi40LDIyLjEsMTJTMTcuNiwyMi4xLDEyLDIyLjF6IE0xMiwzLjQKCWMtNC43LDAtOC42LDMuOC04LjYsOC42czMuOCw4LjYsOC42LDguNnM4LjYtMy44LDguNi04LjZTMTYuNywzLjQsMTIsMy40eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTIuOSw3LjhjMCwwLjUtMC40LDAuOS0wLjksMC45cy0wLjktMC40LTAuOS0wLjlzMC40LTAuOSwwLjktMC45QzEyLjQsNi45LDEyLjksNy4zLDEyLjksNy44eiBNMTIuNywxNS43CgloLTEuNlY5LjZoMS42VjE1Ljd6Ii8+Cjwvc3ZnPgo=' style='width:14px'/>`

  var myColumns = [
    { title: 'Country', data: 'Country' },
    { title: '<div><div>Current account<br>balance<br>(share of GDP)</div></div>', type: 'num', data: 'Current Account Balance' },
    { title: '<div><div>Foreign currency<br>intervention<br>(share of GDP)</div></div>', type: 'num', data: 'FX Intervention' },
    { title: '<div><div>Bilateral goods<br>trade with the U.S.<br>(billions)</div></div>', type: 'num', data: 'Bilateral Balance' },
    { title: '<div><div>Number of<br>criteria<br>violated</div></div>', type: 'num', data: 'Violations' }
  ]

  let table;
  var th = ''
  if ($(window).width() < 767) {
    th = '200px'
  } else { th = '730px' }
  let tableOptions = {
    asStripeClasses: [],
    data: quarterFilter,
    order: [[0, 'asc']], // default view, col 0
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
        targets: [1, 2, 3, 4],
        orderSequence: ['desc', 'asc'],
        className: 'font-l text-13 text-center'
      },
      {
        targets: '_all',
        className: 'font-l text-13',
        width: '120px'
      }
    ]
  }

  // TABLE TOOLTIP

  // var ttooltip = d3.select('#currency_table_wrapper')
  //   .append('div')
  //   .style('display', 'none')
  //   .attr('class', 'ttooltip')

  // function handleMouseOver2 (d, i) {
  //   var rect = $('#currency_table_wrapper')[0].getBoundingClientRect();
  //   var cursorX = event.clientX - rect.left;
  //   var cursorY = event.clientY - rect.top;
  //   var px = event.pageX
  //   var py = event.pageY
  //   ttooltip.html('<div class="tooltiptext">' + $(event.target).parent().attr('data-content') + '</div>')
  //   ttooltip.style('display', 'inline-block')
  //   .style('left', px + 25 - $('#currency_table_wrapper').offset().left + 'px')
  //   .style('top', py + 25 - $('#currency_table_wrapper').offset().top + 'px')
  // }

  // function handleMouseOut2 (d, i) {
  //   ttooltip.style('display', 'none');
  // }

  // d3.selectAll('.infoIcon img')
  // .on('mouseover', handleMouseOver2)
  // .on('mouseout', handleMouseOut2)

  // ////// THREE GRAPHICS ///////

  // GRAPHIC GENERATOR
  function generateGraph (graphic, countryParameter, criteriaParameter, heightParameter) {
    let graphicBind; let data;
    if (criteriaParameter === bib) {
      data = graphData(countryParameter, criteriaParameter)
      graphicBind = '#currency_manipulator_bib'
    }
    if (criteriaParameter === cab) {
      data = graphData(countryParameter, criteriaParameter)
      graphicBind = '#currency_manipulator_cab'
    }
    if (criteriaParameter === fx) {
      data = graphData(countryParameter, criteriaParameter)
      graphicBind = '#currency_manipulator_fx'
    }

    graphic = bb.generate({
      data: {
        json: data,
        keys: {
          x: 'Quarter',
          xFormat: '%m/%d/%y',
          value: [criteriaParameter]
        },
        type: 'bar',
        color: function (color, d) {
          if (criteriaParameter === fx) {
            // d.value
            if (d.value > 0.02 && d.value <= 0.04) {
              return '#BD3823'
            } else if (d.value > 0.04) {
              return '#6F130C'
            } else { return '#BFBFBF' }
          }
          if (criteriaParameter === cab) {
            // d.value
            if (d.value > 0.02 && d.value <= 0.04) {
              return '#BD3823'
            } else if (d.value > 0.04) {
              return '#6F130C'
            } else { return '#BFBFBF' }
          }
          if (criteriaParameter === bib) {
            // d.value
            if (d.value > 20 && d.value <= 40) {
              return '#BD3823'
            } else if (d.value > 40) {
              return '#6F130C'
            } else { return '#BFBFBF' }
          }
        }
      },
      bar: {
        padding: 0,
        width: 8
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: { format: '%Y', culling: false, values: years },
          show: true
        },
        y: {
          tick: {
            values: function () {
              if (criteriaParameter === cab) {
                if (data.hasMax(cab)[cab] > 0.04) {
                  return [0, data.hasMax(cab)[cab]]
                } else {
                  return [0, 0.04]
                }
              }
              if (criteriaParameter === fx) {
                if (data.hasMax(fx)[fx] > 0.04) {
                  return [0, data.hasMax(fx)[fx]]
                } else {
                  return [0, 0.04]
                }
              }
              if (criteriaParameter === bib) {
                if (data.hasMax(bib)[bib] > 40) {
                  return [0, data.hasMax(bib)[bib]]
                } else {
                  return [0, 40]
                }
              }
            },
            format: function (value) {
              if (criteriaParameter === cab || criteriaParameter === fx) {
                return ((value * 100).toFixed(0) + '%')
              }
              if (criteriaParameter === bib) {
                return ('$' + (value).toFixed(0))
              }
            }
          }
        }
      },
      grid: {
        y: {
          lines: [
            {
              value: 0,
              axis: 'y',
              class: 'zero-line',
              position: 'start'
            }
          ]
        }
      },
      size: {
        height: heightParameter
      },
      padding: {
        right: 12
      },
      legend: {
        show: false
      },
      tooltip: {
        order: 'desc',
        format: {
          title: function (value) {
            value = monthToQuarter(quarterFormatter(value))
            return (value);
          },
          name: function (value) {
            if (criteriaParameter === cab) {
              return 'Current account balance (share of GDP):'
            }
            if (criteriaParameter === bib) {
              return 'Bilateral goods trade with the U.S. (billions):'
            }
            if (criteriaParameter === fx) {
              return 'Foreign currency intervention (share of GDP):'
            }
          },
          value: function (value) {
            if (isNaN(value)) {
              return 'N/A'
            }
            return criteriaParameter !== bib ? (value * 100).toFixed(1) + '%' : d3.format('$')(value.toFixed(1));
          }
        }
      },
      bindto: graphicBind
    });

    let range;
    if (criteriaParameter === fx) {
      graphic.ygrids.add({ value: 0.02, class: 'violation-line', position: 'start' })
      if (graphic.data.max()[0]['value'] > 0.04) {
        range = graphic.data.max()[0]['value']
      } else { range = 0.04 }
      graphic.axis.range({ max: { y: range } })
    }
    if (criteriaParameter === cab) {
      graphic.ygrids.add({ value: 0.02, class: 'violation-line', position: 'start' })
      if (graphic.data.max()[0]['value'] > 0.04) {
        range = graphic.data.max()[0]['value']
      } else { range = 0.04 }
      graphic.axis.range({ max: { y: range } })
    }
    if (criteriaParameter === bib) {
      graphic.ygrids.add({ value: 20, class: 'violation-line', position: 'start' })
      if (graphic.data.max()[0]['value'] > 40) {
        range = graphic.data.max()[0]['value']
      } else { range = 40 }
      graphic.axis.range({ max: { y: range } })
    }
    return graphic;
  }

  // generate default table
  table = $('#currency_table').DataTable(tableOptions)
  function cellEval () {
    table.cells().every(function () {
      var data = this.data();
      var index = this.index().columnVisible
      let val;
      if (index === 4) {
        $(this.node()).addClass('color-violation')
      }
      if (index === 1 && !isNaN(data)) {
        val = round((data * 100).toFixed(1), 2) + '%';
        if (data >= 0.02 && data <= 0.04) {
          $(this.node()).html(`<div class='criteria-violated'>${val}</div>`)
        } else if (data > 0.04) {
          $(this.node()).html(`<div class='criteria-violated-double'>${val}</div>`)
        } else { $(this.node()).html(`<div class='fill-grey'>${val}</div>`) }
      }
      if (index === 3) {
        val = formatMoney(data)
        if (data >= 20 && data <= 40) {
          $(this.node()).html(`<div class='criteria-violated'>${val}</div>`)
        } else if (data > 40) {
          $(this.node()).html(`<div class='criteria-violated-double'>${val}</div>`)
        } else { $(this.node()).html(`<div class='fill-grey'>${val}</div>`) }
      }
      if (index === 2 && !isNaN(data)) {
        val = round((data * 100).toFixed(1), 2) + '%';
        if (data >= 0.02 && data <= 0.04) {
          $(this.node()).html(`<div class='criteria-violated'>${val}</div>`)
        } else if (data > 0.04) {
          $(this.node()).html(`<div class='criteria-violated-double'>${val}</div>`)
        } else { $(this.node()).html(`<div class='fill-grey'>${val}</div>`) }
      }
      if (index === 1 || index === 2 || index === 3) {
        if (isNaN(data)) {
          $(this.node()).html('<div class="fill-none">No data</div>');
        }
      }
    });
  }
  cellEval();

  $('.sorting_asc, .sorting_desc').on('click', function (e) {
    e.preventDefault();
  });

  // redraw logic: destroy, prepare, regenerate
  $('#dt-dropdown').on('change', function (e) {
    $('b[role="presentation"]').hide();
    let quarterDropdown = $('#dt-dropdown').select2().val()
    quarterDropdown = dateFormatter(tickParser(quarterToMonth(quarterDropdown)))
    // 3/31
    // 6/30
    // 9/30
    // 12/31
    tableData(quarterDropdown)
    for (let e in quarterFilter) {
      if (quarterFilter[e]['Current Account Balance'] === '#N/A' || quarterFilter[e]['Current Account Balance'] === '#DIV/0') {
        quarterFilter[e]['Current Account Balance'] = NaN
      }
      if (quarterFilter[e]['Bilateral Balance'] === '#N/A' || quarterFilter[e]['Bilateral Balance'] === '#DIV/0') {
        quarterFilter[e]['Bilateral Balance'] = NaN
      }
      if (quarterFilter[e]['FX Intervention'] === '#N/A' || quarterFilter[e]['FX Intervention'] === '#DIV/0') {
        quarterFilter[e]['FX Intervention'] = NaN
      }
    }
    table.clear().rows.add(quarterFilter).draw()
    cellEval();
    table.fixedColumns().relayout().draw();
  })
  // generate default views
  currentAccountSurplus = generateGraph(currentAccountSurplus, 'China', cab, 158)
  fxIntervention = generateGraph(fxIntervention, 'China', fx, 158)
  bilateralBalance = generateGraph(bilateralBalance, 'China', bib, 158)
  // $('#currency_manipulator_cab .bb-axis-y tick:first text tspan').html('0%')
  // $('#currency_manipulator_cab .bb-axis-y tick:last text tspan').html('4%')
  // $('#currency_manipulator_bib .bb-axis-y text').html('$0')
  // $('#currency_manipulator_bib .bb-axis-y text').next().html('$40')
  // $('#currency_manipulator_fx .bb-axis-y text').html('0%')
  // $('#currency_manipulator_fx .bb-axis-y text').next().html('4%')
  $('b[role="presentation"]').hide();

  // STATUS FIELD
  let statusContainer = $('#data-status')
  function statusEval (country) {
    let violations = $(`td:contains("${country}")`).next().next().next().next().text()
    if (violations < '3') {
      statusContainer.text(`not a currency manipulator (exceeds ${violations} Treasury criteria)`)
    } else {
      statusContainer.text(`currency manipulator (exceeds ${violations} Treasury criteria)`)
    }
  }
  statusEval('China')

  // redraw logic: destroy, prepare, regenerate
  $('#select1').on('change', function (e) {
    fxIntervention.destroy();
    currentAccountSurplus.destroy();
    bilateralBalance.destroy();

    $('b[role="presentation"]').hide();
    let countryDropdown = $('#select1').select2().val()

    currentAccountSurplus = generateGraph(currentAccountSurplus, countryDropdown, cab, 158)
    fxIntervention = generateGraph(fxIntervention, countryDropdown, fx, 158)
    bilateralBalance = generateGraph(bilateralBalance, countryDropdown, bib, 158)
    statusEval(countryDropdown)

    // $('#currency_manipulator_cab .bb-axis-y text tspan').html('0%')
    // $('#currency_manipulator_bib .bb-axis-y text tspan').html('$0')
    // $('#currency_manipulator_fx .bb-axis-y text tspan').html('0%')
  })

  table.fixedColumns().relayout().draw();
  $('#currency_manipulator').append(`<div class="download-wrapper" style='padding-top:25px;padding-bottom:40px;'><div id='table_link' class="font-l"><a href='https://vallenato-cfr.netlify.com/currency_manipulator/export/Currency_Manipulation_Interactive_Export_Oct_7_2020.csv' download="Currency_Manipulation_Interactive_Export.csv">Download the data (csv)</a></div></div>`)

  var resizeTimer;
  $(window).on('resize', function (e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // $('#currency_manipulator_cab .bb-axis-y text tspan').html('0%')
      // $('#currency_manipulator_bib .bb-axis-y text tspan').html('$0')
      // $('#currency_manipulator_fx .bb-axis-y text tspan').html('0%')
      console.log('resized')
    }, 250);
  });
});
