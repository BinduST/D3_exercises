var numbers = [1,2,3,4,5,6,7,8,9,10];
var headings  = ["title","n","n square","log(n)","log(n) rounded"];
var rows;

var numberScale = d3.scaleLinear();
var squareScale = d3.scalePow().exponent(2);
var logScale = d3.scaleLog();
var roundedLogScale = d3.scaleLog().rangeRound([0,1]);

var appendDataFor = function(scaleName, title) {
  var data = numbers.map(function (num) {
      return scaleName(num);
  });
    data.unshift(title);
    return data;
}

var rowsData = [
  {head : "title",scale : numberScale},
  {head : "n",scale : numberScale},
  {head : "n square",scale : squareScale},
  {head : "log(n)",scale : logScale},
  {head : "log(n) rounded",scale : roundedLogScale}
];

var createTable = function () {
  var table = d3.select('body').append('table');
  var tbody = table.append('tbody');

  rows = tbody.selectAll('tr')
      .data(rowsData)
      .enter()
      .append('tr')
      .classed('row',true);

  var cells = rows.selectAll('td')
    .data(function (row) {return appendDataFor(row.scale, row.head)})
    .enter()
    .append('td')
    .text(function (d) {return d;})
}

window.onload = createTable;
