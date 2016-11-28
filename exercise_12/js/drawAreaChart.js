var data = [0,1,2,3,4,5,6,7,8,9,10];
var HEIGHT = 600;
var WIDTH = 600;
var MARGIN = 30;
var INNERHEIGHT = HEIGHT - (2*MARGIN);
var INNERWIDTH = WIDTH - (2*MARGIN);

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

var line = d3.line()
    .x(function (d) {return xScale(d/10);})
    .y(function (d) {return yScale(formula(d)/10);})

var area = d3.area()
    .x(function (d) {return xScale(d/10);})
    .y0(function (d) {return yScale(formula(d)/10);})
    .y1(INNERHEIGHT);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

var createAreaChart = function () {
    var svg = d3.select('body').append('svg')
          .attr('width', WIDTH)
          .attr('height', HEIGHT);

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
}

window.onload = createAreaChart;
