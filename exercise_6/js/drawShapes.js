var PADDING = 50;
var HEIGHT = 100;
var WIDTH = 600;
var svg;

var translate = function (x,y) {
   return "translate("+x+","+y+")";
}

var scale = d3.scaleLinear().domain([0,100]).range([{x:0,y:100}, {x:100,y:0}]);

var lineFunction = d3.line()
    .x(function (d) {return d.x;})
    .y(function (d) {return d.y;});

var drawLine = function (x,y) {
  svg.append('line')
    .attr('x1', scale(0).x)
    .attr('y1', scale(0).y)
    .attr('x2', scale(100).x)
    .attr('y2', scale(100).y)
    .attr('transform',translate(x,y));
}

var drawRect = function (x,y) {
    svg.append('rect')
      .attr('x', scale(0).x)
      .attr('y', scale(100).y)
      .attr('height', HEIGHT)
      .attr('width', 100)
      .attr('rx', 15)
      .attr('ry', 15)
      .attr('transform',translate(x,y));
}

var drawCircle = function (x,y) {
    svg.append('circle')
      .attr('cx', scale(50).x)
      .attr('cy', scale(50).y)
      .attr('r',50)
      .attr('transform',translate(x,y));
}

var drawTriangle = function (x,y) {
    svg.append('polygon')
      .attr('points', "0,100 100,100 50,0")
      .attr('transform',translate(x,y))
      .classed('triangle',true);
}

var drawShapes = function () {
    svg = d3.select('body').append('svg')
      .attr('height',HEIGHT)
      .attr('width',WIDTH);

    drawCircle(100,0);
    drawLine(0,0);
    drawRect(200,0);
    drawTriangle(300,0)
}

window.onload = drawShapes;
