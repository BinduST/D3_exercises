var data = [0,1,2,3,4,5,6,7,8,9];
var MARGIN = 30;
var WIDTH = 600;
var HEIGHT = 600;
var INNERHEIGHT = HEIGHT-MARGIN-MARGIN;
var INNERWIDTH = WIDTH-MARGIN-MARGIN;

var translate = function (x,y) {
   return "translate("+x+","+y+")";
}

var formula = function (d) {
    return (Math.sin(3*d)+1)/2;
}

var tensionScale = d3.scaleLinear()
      .domain([2,10])
      .range([-2, 2]);

var line = d3.line()
      .curve(d3.curveCardinal.tension(tensionScale(2)))
      .x(function (d) {return xScale(d)})
      .y(function (d) {return yScale(formula(d))});

var xScale = d3.scaleLinear()
    .domain([0,10])
    .range([0, INNERWIDTH]);

var yScale = d3.scaleLinear()
    .domain([0,1])
    .range([INNERHEIGHT,0]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

var drawAtTensionLevel = function(){
    var svg = d3.select('body').append('svg')
        .attr('height', HEIGHT)
        .attr('width', WIDTH);

    svg.append('g').append('path')
        .attr('transform',translate(MARGIN, MARGIN))
        .attr('d', line(data));

    svg.append('g')
        .attr('transform',translate(MARGIN, INNERHEIGHT + MARGIN))
        .call(xAxis);

    svg.append('g')
        .attr('transform',translate(MARGIN,MARGIN))
        .call(yAxis);

    svg.append('g').selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx',function (d) {return xScale(d)})
      .attr('cy',function (d) {return yScale(formula(d))})
      .attr('transform',translate(MARGIN,MARGIN));
}


window.onload = drawAtTensionLevel;
