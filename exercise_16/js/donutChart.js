var data = [1, 1, 2, 2, 1, 2, 1];

var HEIGHT = 500;
var WIDTH = 500;
var MARGIN = 30;
var INNERHEIGHT = HEIGHT - (2*MARGIN);
var INNERWIDTH = WIDTH - (2*MARGIN);
var RADIUS = Math.min(HEIGHT, WIDTH)/2;

var color = ['steelblue','lightsteelblue','darkorange','burlywood','green','lightgreen','red'];

var translate = function (x,y) {
    return "translate("+x+","+y+")";
}

var pie = d3.pie()
    .sort(null)
    .value(function (d) {return d;});

var arc = d3.arc()
    .innerRadius(RADIUS/2)
    .outerRadius(RADIUS);

var createDonutChart = function () {
    var svg = d3.select('body').append('svg')
        .attr('width', 500)
        .attr('height', 500);

    var g = svg.selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .classed('arc', true)
        .attr('transform',translate(INNERWIDTH/2+MARGIN, INNERHEIGHT/2+MARGIN));

    g.append('path')
        .attr('d', arc)
        .style('fill', function (d,i) {return color[i];});
}

window.onload = createDonutChart;
