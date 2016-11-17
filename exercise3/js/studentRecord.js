var data = [
	{name:'ramesh',subject:'maths',score:87},
	{name:'suresh',subject:'maths',score:45},
	{name:'pokemon',subject:'english',score:65},
	{name:'mary',subject:'kannada',score:44},
	{name:'riya',subject:'science',score:72},
	{name:'katie',subject:'social studies',score:82},
	{name:'katie',subject:'maths',score:98},
	{name:'ramesh',subject:'bengali',score:25},
	{name:'suresh',subject:'science',score:55},
	{name:'riya',subject:'tamil',score:75},
	{name:'pokemon',subject:'sports',score:95},
	{name:'pokemon',subject:'social studies',score:32}
];

var allBars;
var color = {"maths":"#425ff4", "english":"#f49542", "kannada":"#28C71A","science":"#f44256","social studies":"#8342f4","bengali":"#613E1A","tamil":"#f442d9","sports":"#826b7e"};
var keys = ["name","subject","score"];

var renderChart = function () {
  var bars = d3.select('body').selectAll('.bar').data(data,function (d,i,count) {return count;});

  allBars = bars.enter()
    .append('div')
    .style('background-color',function (d) {return color[d.subject]})
    .classed('bar',true)
    .style('width',function (d) {return d.score*5+'px'})
    .style('height','15px')
    .text(function (d) {return d.name+' '+d.score});

	var options = d3.select('body').selectAll('.option').data(keys);

	options.enter()
		.append('button')
		.classed('option',true)
		.text(function (d) {return d})
		.on("click", function (option) {return sortBy(option)});

	var subjects = d3.select('body').selectAll('.subject').data(d3.map(data,function (d) {return d.subject}).keys());

	subjects.enter()
		.append('div')
		.style('width','50px')
    .style('height','15px')
		.text(function (d) {return d})
		.style('background-color',function (d) {return color[d]})
		.classed('subject',true);

	bars.exit().remove();
}

var  sortBy = function (option) {
	option == "name" ? sortByName() : option == "subject" ? sortBySubject() : sortByScore();
}

var sortByName = function () {
	return allBars.sort(function(first,second){
		return d3.ascending(first.name, second.name);
	});
}

var sortBySubject = function () {
	return allBars.sort(function(first,second){
		return d3.ascending(first.subject, second.subject);
	});
}

var sortByScore = function () {
	return allBars.sort(function (first, second) {
		return first.score - second.score;
	});
}

window.onload = renderChart;
