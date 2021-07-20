import '../../common/styles/styles.scss';
import '../../common/styles/fonts.scss';
import $ from 'jquery';
import { bb } from 'billboard.js';
const d3 = Object.assign({}, require('d3'), require('d3-svg-annotation'), require('d3-format'), require('d3-geo'));
let graphic1, graphic2, graphic3, graphic4, graphic5, graphic6, graphic7, graphic8, graphic9, graphic10, graphic12, graphic13, graphic14, graphic15, graphic16, graphic17, graphic18, graphic19;
console.log($, d3, bb, graphic1, graphic2, graphic3, graphic4, graphic5, graphic6, graphic7, graphic8, graphic9, graphic10, graphic12, graphic13, graphic14, graphic15, graphic16, graphic17, graphic18, graphic19)

// AREA
graphic1 = bb.generate({
  data: {
    columns: [
      ['data1', 300, 350, 300, 0, 0, 0],
      ['data2', 130, 100, 140, 200, 150, 50]
    ],
    types: {
      data1: 'area',
      data2: 'area-spline'
    }
  },
  title: {
    text: 'A title',
    position: 'top-left',
    padding: {
      bottom: 30
    }
  },
  size: {
    height: 480
  },
  bindto: '#area'
});

// AREA RANGE
graphic2 = bb.generate({
  data: {
    x: 'x',
    columns: [
      ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
      ['data1', [150, 140, 110],
        [155, 130, 115],
        [160, 135, 120],
        [135, 120, 110],
        [180, 150, 130],
        [199, 160, 125]
      ],
      ['data2', 130, 340, 200, 500, 250, 350],
      ['data3', [220, 215, 205],
        [240, 225, 215],
        [260, 235, 225],
        [280, 245, 235],
        [270, 255, 225],
        [240, 225, 215]
      ],
      ['data4',
        { high: 155, low: 145, mid: 150 },
        { high: 200, mid: 190, low: 150 },
        { high: 230, mid: 215, low: 200 },
        { high: 210, mid: 200, low: 180 },
        { high: 220, mid: 210, low: 190 },
        { high: 200, mid: 180, low: 160 }
      ]
    ],
    types: {
      data1: 'area-line-range',
      data3: 'area-spline-range',
      data4: 'area-spline-range'
    }
  },
  title: {
    text: 'A title',
    position: 'top-left',
    padding: {
      bottom: 30
    }
  },
  size: {
    height: 480
  },
  axis: {
    x: {
      type: 'timeseries',
      tick: {
        format: '%Y-%m-%d'
      }
    }
  },
  bindto: '#arearange'
});

// AREA STACKED
graphic3 = bb.generate({
  data: {
    columns: [
      ['data1', 300, 350, 300, 0, 0, 120],
      ['data2', 130, 100, 140, 200, 150, 50]
    ],
    types: {
      data1: 'area-spline',
      data2: 'area-spline'
    },
    groups: [
      [
        'data1',
        'data2'
      ]
    ]
  },
  title: {
    text: 'A title',
    position: 'top-left',
    padding: {
      bottom: 30
    }
  },
  size: {
    height: 480
  },
  bindto: '#areastacked'
});
// BAR
// BAR STACKED
// BUBBLE
// DONUT
// GAUGE
// LINE
// LINE REGIONS
// MULTIPLE XY
// PIE
// RADAR
// SCATTER
// SIMPLE XY
// SPLINE
// STEP
// TIMESERIES
