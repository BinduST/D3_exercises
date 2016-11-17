var numbers = [0,1,2,3,4,5,6,7,8,9,10];

var sizeScale = d3.scaleLinear()
    .domain([0,10])
    .range(["italic bold 12px/30px Georgia, serif","italic bold 120px/180px Georgia, serif"]);

var showNumbers = function () {
    var boxes = d3.select('body').selectAll('div').data(numbers);
    boxes.enter()
      .append('div')
      .style('font', function (d) {return sizeScale(d)})
      .text(function (d) {return d;});

    boxes.exit().remove();
}

window.onload = showNumbers;
