var force, svg, node, link, network, zoom;
var width = 1160,
	height = 700,
	maxCol = 0,
	maxRow = 0;
function getNetwork() {
	if (window.XMLHttpRequest) {
		var xmlNetwork = new XMLHttpRequest();
	}
	else {
		var xmlNetwork1=new ActiveXObject("Microsoft.XMLHTTP");
		xmlNetwork1.async = false;
	}
	xmlNetwork.onreadystatechange=function() {
		if (xmlNetwork.readyState==4 && xmlNetwork.status==200) {
			var JSONObject = new Object;
			JSONObject  = xmlNetwork.responseText;
			var data = JSON.parse(JSONObject);
			createVisualization(data);
		}
	}	
	xmlNetwork.open("GET","createNetwork.py",false);
	xmlNetwork.send();			
}			

function createNetwork(data) {
	var nodes = [], links = [];
	for (var i=0; i<data.nodes.length; ++i) {
		o = data.nodes[i];
		group = o.group.replace("[", "").replace("]", "").replace(/\'/g, "").replace(/ /g, "").split(",");
		var sections = []
		for (var j=0; j<group.length; ++j) {
			g = group[j];
			sections.push({"group": g, "value": 1, "radius": 2});
		}
		if (maxCol < o.col) maxCol = o.col;
		if (maxRow < o.row) maxRow = o.row;
		nodes.push({
			nodeName: o.name,
			nodeID: i,
			group: group,
			proportions: sections,
			fixed: o.fixed,
			col: o.col,
			row: o.row,		
			ox: 0,
			oy: 0,
			cx: o.cx,
			cy: o.cy,
			connect: 0,
		});			
	}
	for (var i=0; i<data.links.length; ++i) {
		o = data.links[i];
		links.push({
			source: nodes[o.source],
			target:  nodes[o.target],
			linkType: nodes[o.source].group == nodes[o.target].group ? "innerLinks" : "interLinks",
			linkGroup: nodes[o.source].group == nodes[o.target].group ? nodes[o.source].group.toString() : nodes[o.source].group.toString() + "," + nodes[o.target].group.toString(),
			value: o.value,
		});
	}
	
	// Update Radius
	for (var i=0; i<links.length; ++i) {
		o = links[i];
		for (var j=0; j<nodes[o.source.nodeID].proportions.length; ++j) {
			nodes[o.source.nodeID].proportions[j].radius = nodes[o.source.nodeID].proportions[j].radius + 1;
		}
		
		for (var j=0; j<nodes[o.target.nodeID].proportions.length; ++j) {
			nodes[o.target.nodeID].proportions[j].radius = nodes[o.target.nodeID].proportions[j].radius + 1;
		}

	}
	return {nodes: nodes, links: links};
}

function createVisualization(data) {

	zoom = d3.behavior.zoom().translate([329.1783142089844,183.0731964111328]).scale(0.41179540753364563);
	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) { return d.value; });

	var arc = d3.svg.arc()
		.outerRadius(function(d) { return Math.log(d.data.radius) * 10; })
		.innerRadius(0);
	// set the color category (either 10 or 20)
	var color = d3.scale.category20();

		
	
	force = d3.layout.force() 
		.charge(-120)
		.linkDistance(100)
		.size([width, height]);

	InnerEdgeBias();
	svg = d3.select("div#graph").append("svg")
		.attr("width", width)
		.attr("height", height)
	// you need to add a layer to actually do the zooming
		.call(zoom.on("zoom", zooming))
			.append("svg:g")
			.attr("id", "ZoomLayer")
			.attr("transform","translate(329.1783142089844,183.0731964111328)scale(0.41179540753364563,0.41179540753364563)");
	
	defs = svg.append("svg:defs");
	marker = defs.append("svg:marker").attr("id", "StartMarker")    
		.attr("viewBox", "0 -5 10 10")
		.attr("refX", 20)
		.attr("refY", 0)
		.attr("markerWidth", 5)
		.attr("markerHeight", 5)
		.attr("orient", "auto")
		.append("svg:path")
		.attr("d", "M0,-5L10,0L0,5");
	
	function zooming() {
		svg
			.transition()
			.duration(1500)
			.attr("transform", "translate(" + d3.event.translate + ")" + "scale(" + d3.event.scale + ")");
	}	
	network = createNetwork(data);
	
	force
		.nodes(network.nodes)
		.links(network.links)
		.start();
		
	link = svg.selectAll(".link").data(network.links)
		.enter().append("line")
		.attr("class", "link")
		.style("stroke", "#999")
		.style("fill", "none")
		.style("marker-end", "url(#StartMarker)")
		.style("stroke-width", "2px");
		//.style("stroke-width", function(d) { return Math.sqrt(d.value); });
	
	link.append("title")
		.text(function(d) { return d.linkGroup; });				
		
	node = svg.selectAll(".node")
		.data(network.nodes)
		.enter().append("g")
		.attr("class", "node")
		.style("stroke-width", 1)
		.style("stroke", "black")	
		.on("click", function(d) { checkBuses(d.group); }) 
		// on mouse-over, change the border of the given circle to 2
		//.on("mouseover", function() {d3.select(this).style("stroke-width", 2)})
		.on("mouseover", function(d) { checkBuses(d)});
		// on mouse-out, change the border back to the original (0)
		//.on("mouseout", function() {d3.select(this).style("stroke-width", 1)})				
		//.call(force.drag);

	node.selectAll("path")
		.data(function(d, i) {return pie(d.proportions); })
		.enter()
		.append("svg:path")
		.attr("d", arc)
		.attr("fill", function(d, i) { return color(d.data.group); });
		

	node.append("title")
		.text(function(d) { return d.nodeName; });
	
	force.start()
	for (var i = 0; i < 150; ++i) { force.tick(); }	
	
	force.on("tick", function() {
			link.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });
		node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"});
	});
}
