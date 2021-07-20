data: {
  columns: [
    ['data1', 30, 200, 100, 400, 150, 250],
    ['data2', 130, 100, 140, 200, 150, 50]
  ],
  type: 'bar',
  onover: function(e) { 
    target = '.bb-shape-'+ e.index;
    d3.selectAll('.bb-shape').style('fill-opacity', '0.75')
    d3.selectAll(target).style('fill-opacity', '1')
  },
  onout: function(e) { 
    d3.selectAll('.bb-shape').style('fill-opacity', '1')
  }
},
bar: {
  width: {
    ratio: 0.8
  }
}