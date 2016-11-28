var data = [1, 1, 2, 2, 1, 2, 1];
var HEIGHT = 500;
var WIDTH = 500;
var MARGIN = 30;
var INNERHEIGHT = HEIGHT - (2*MARGIN);
var INNERWIDTH = WIDTH - (2*MARGIN);
var RADIUS = Math.min(HEIGHT, WIDTH)/2;

var translate = function (x,y) {
    return "translate("+x+","+y+")";
}

var color = ['steelblue','lightsteelblue','darkorange','burlywood','green','lightgreen','red'];

var pie = d3.pie()
    .sort(null)
    .value(function (d) {return d;})(data);

var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(RADIUS);

var createPieChart = function () {

    var svg = d3.select('body').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    var container = svg.append('g')
        .attr('transform',translate(INNERWIDTH/2+MARGIN, INNERHEIGHT/2+MARGIN));

    var path = container.selectAll('path')
        .data(pie)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d,i) {return color[i]});
}

window.onload = createPieChart;
