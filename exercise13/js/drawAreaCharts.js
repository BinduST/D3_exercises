var data = [0,1,2,3,4,5,6,7,8,9,10];
var HEIGHT = 600;
var WIDTH = 600;
var MARGIN = 30;
var INNERHEIGHT = HEIGHT - (2*MARGIN);
var INNERWIDTH = WIDTH - (2*MARGIN);

var interpolations = [
  {"d3Curve":d3.curveLinearClosed,"curveTitle":"curveLinearClosed"},
  {"d3Curve":d3.curveStepAfter,"curveTitle":"curveStepAfter"},
  {"d3Curve":d3.curveBasisOpen,"curveTitle":"curveBasisOpen"},
  {"d3Curve":d3.curveCardinalClosed,"curveTitle":"curveCardinalClosed"},
  {"d3Curve":d3.curveBasis,"curveTitle":"curveBasis"},
];

var translate = function (x,y) {
   return "translate("+x+","+y+")";
}

var formula = function (d) {
    return 3*Math.sin(d)+5;
}

var xScale = d3.scaleLinear()
    .domain([0,1])
    .range([0, INNERWIDTH]);

var yScale = d3.scaleLinear()
    .domain([0,1])
    .range([INNERHEIGHT, 0]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

var createAreaChart = function () {
    for (curve of interpolations) {

      var svg = d3.select('body').append('div').append('svg')
      .attr('width', WIDTH)
      .attr('height', HEIGHT);

      var line = d3.line()
          .curve(curve.d3Curve)
          .x(function (d) {return xScale(d/10);})
          .y(function (d) {return yScale(formula(d)/10);})

      var area = d3.area()
          .curve(curve.d3Curve)
          .x(function (d) {return xScale(d/10);})
          .y0(function (d) {return yScale(formula(d)/10);})
          .y1(INNERHEIGHT);

        svg.append('g').append('path')
          .attr('transform', translate(MARGIN, MARGIN))
          .attr('d', line(data))
          .classed('line', true);

        svg.append('g').append('path')
          .attr('d', area(data))
          .attr('transform', translate(MARGIN, MARGIN))
          .classed('area', true);

        svg.append('g')
          .attr('transform', translate(MARGIN, INNERHEIGHT+MARGIN))
          .call(xAxis);

        svg.append('g')
          .attr('transform', translate(MARGIN, MARGIN))
          .call(yAxis);

        svg.append('g').selectAll('circle')
          .data(data)
          .enter()
          .append('circle')
          .attr('cx',function (d) {return xScale(d/10)})
          .attr('cy',function (d) {return yScale(formula(d)/10)})
          .attr('transform',translate(MARGIN,MARGIN));

        svg.append('text')
          .attr('x', '50%')
          .attr('y', '10%')
          .text(curve.curveTitle);
      }
}

window.onload = createAreaChart;
