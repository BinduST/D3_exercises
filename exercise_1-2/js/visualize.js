
var getRandomNumbers = function (limit) {
  var data = [];
  while (data.length < 10)
    data.push(Math.floor(Math.random()*limit));
  return data;
}

var updateData = function () {
      var newSet = getRandomNumbers(100);
      data.shift();
      data.push(newSet.shift());
}

var data = getRandomNumbers(100);

var color = d3.scaleLinear().domain([0,50,100]).range(["steelblue","lightblue","blue"]);

var render = function () {

    var bars = d3.select('body').selectAll('div').data(data, function (d,i,count) {return count+i;});
      bars.enter()
      .append('div')
      .style('width',function (d) {return d*10+'px'})
      .style('height','25px')
      .style('margin-top','2px')
      .style('background-color', color)
      .text(function (d) {return d;})
      .style('text-align','right')
      .attr('class','new');


    var allBars = d3.select('body').selectAll('div').transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .text(function (d) {return d;});

      updateData();
      bars.exit().remove();
}

window.onload = setInterval(render,1000);
