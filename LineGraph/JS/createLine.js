var pval = .01;
var samples = 10;
var entries, svg;
var xScale, yScale;
function createLine () {
	// set the dimensions and margins of the graph
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;


	// set the ranges
	xScale = d3.scaleLinear().range([0, width]);
	yScale = d3.scaleLinear().range([height, 0]);


	// append the svg obgect to the body of the page
	// appends a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	svg = d3.select("div#graph").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform",
			  "translate(" + margin.left + "," + margin.top + ")");

	// Get the data
	d3.json("../data/pwr.json", function(error, data) {
		if (error) throw error;
		entries = data.nodes;
		// format the data
		entries.forEach(function(d) {
			d.sample = +d.sample;
			d.pval = +d.pval;
			d.pts = [];
			d.points.forEach(function(e,j) {
				d.pts.push([+e[1],+e[0]]);
			})
		});
		
		// Scale the range of the data
		maxx = d3.max(entries, function(d,i) { return d3.extent(d.pts, function(e,j) { return e[0]; }); })[1]
		minx = d3.min(entries, function(d,i) { return d3.extent(d.pts, function(e,j) { return e[0]; }); })[0]
		xScale.domain([minx,maxx]);
		
		maxy = d3.max(entries, function(d,i) { return d3.extent(d.pts, function(e,j) { return e[1]; }); })[1]
		miny = d3.min(entries, function(d,i) { return d3.extent(d.pts, function(e,j) { return e[1]; }); })[0]
		yScale.domain([miny,maxy]);

		oneValue = entries.filter(function(d,i) { return ((d.pval == pval)&&(d.sample == samples)) })	
		svg.selectAll("path.line").data(oneValue).enter().append("path")
			
			.attr("class", "line")
			.attr("d", function(d,i) { 
				
				line = d3.line()
					.x(function(e,j) { return xScale(e[0]) })
					.y(function(e,j) { return yScale(e[1]); })	
					(d.pts);
				return line;

			}).transition().duration(2000)
			.attrTween("stroke-dasharray", tweenDash)

			
		// Add the X Axis
		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(xScale));

		// Add the Y Axis
		svg.append("g")
			.call(d3.axisLeft(yScale));

	});
}

