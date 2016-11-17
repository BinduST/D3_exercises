var points = [{x:0,y:5},{x:1,y:9},{x:2,y:7},{x:3,y:5},{x:4,y:3},{x:6,y:4},{x:7,y:2},{x:8,y:3},{x:9,y:2}];

var MARGIN = 30;

var HEIGHT = 600;
var WIDTH = 600;
var INNERHEIGHT = HEIGHT-MARGIN-MARGIN;
var INNERWIDTH = WIDTH-MARGIN-MARGIN;

var translate = function (x,y) {
   return "translate("+x+","+y+")";
}

var xValues = d3.extent(points, function (p) {
    return p.x;
});

var yValues = d3.extent(points, function (p) {
    return p.y;
});

var xScale = d3.scaleLinear()
    .domain([0.0,1.0])
    .range([0,INNERWIDTH]);

var yScale = d3.scaleLinear()
    .domain([0.0,1.0])
    .range([INNERHEIGHT,0]);

var line = d3.line()
    .x(function (d) {return xScale(d.x/10);})
    .y(function (d) {return yScale(d.y/10);});

var sineLine = d3.line()
    .x(function (d) {return xScale(d.x/10);})
    .y(function (d) {return yScale((Math.sin(d.x)/10)+0.5)});

var createGraph = function () {
    var svg = d3.select('body').append('svg')
      .attr('height', HEIGHT)
      .attr('width', WIDTH);

    svg.append('g').append('path')
      .attr('d', line(points))
      .attr('transform',translate(MARGIN, MARGIN))
      .classed('line',true);

    svg.append('g').append('path')
      .attr('d', sineLine(points))
      .attr('transform',translate(MARGIN, MARGIN))
      .classed('sineLine',true);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform',translate(MARGIN, INNERHEIGHT+MARGIN))
      .call(xAxis);

    svg.append('g')
      .attr('transform',translate(MARGIN, MARGIN))
      .call(yAxis);

    svg.append('g').selectAll('circle')
      .data(points)
      .enter()
      .append('circle')
      .attr('cx',function (p) {return xScale(p.x/10)})
      .attr('cy',function (p) {return yScale(p.y/10)})
      .attr('transform',translate(MARGIN, MARGIN));

    svg.append('g').selectAll('circle')
      .data(points)
      .enter()
      .append('circle')
      .attr('cx',function (p) {return xScale(p.x/10)})
      .attr('cy',function (p) {return yScale((Math.sin(p.x)/10)+0.5)})
      .attr('transform',translate(MARGIN,MARGIN));
}

window.onload = createGraph;
