data: {
  columns: [
    ['data1', -30, 200, 200, 400, -150, 250],
    ['data2', 130, 100, -100, 200, -150, 50],
    ['data3', -230, 200, 200, -300, 250, 250]
  ],
  type: 'bar',
  groups: [
    [
      'data1',
      'data2'
    ]
  ],
  onover: function(e) { 
    target = '.bb-shape-'+ e.index;
    d3.selectAll('.bb-shape').style('fill-opacity', '0.75')
    d3.selectAll(target).style('fill-opacity', '1')
  },
  onout: function(e) { 
    d3.selectAll('.bb-shape').style('fill-opacity', '1')
  }
},
grid: {
  y: {
    lines: [
      {
        value: 0
      }
    ]
  }
}