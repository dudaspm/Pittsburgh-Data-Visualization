 var delay = 1, mode = 1;
 var durationAmount = 2000;
 console.log("durationAmount");
forceBased = function() {
	delay = 0; 
	network.nodes.forEach(function(d, i) { 
		d.fixed = false; 
		d.y = d.oy;
		d.x = d.ox;		
		d.py = d.oy;
		d.px = d.ox;			
		
	});
	mode = 1;
	network.links.forEach(function(d, i) { 
		d.source = network.nodes[d.source.index];
		d.target =  network.nodes[d.target.index];
	});		
		force
		.nodes(network.nodes)
		.links(network.links).stop();
	node.transition().duration(durationAmount).attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"});
	
	link.transition().duration(durationAmount)
		.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; })
		.each("end", function () { force.start(); delay = 1; });
	
	
}

graphique = function() {
	delay = 0;  
	network.nodes.forEach(function(d, i) { 
		d.fixed = true;  
		if (mode) d.ox = d.x;
		if (mode) d.oy = d.y;
		colInc = (width/maxCol);
		rowInc = (height/maxRow);
		d.x = ((d.col-.8)*colInc)/zoom.scale() - zoom.translate()[0]/zoom.scale();			
		d.y = ((d.row+2)*rowInc)/zoom.scale() - zoom.translate()[1]/zoom.scale();
		d.px = ((d.col)*colInc)/zoom.scale() - zoom.translate()[0]/zoom.scale();
		d.py = ((d.row)*rowInc)/zoom.scale() - zoom.translate()[1]/zoom.scale();
	});
	mode = 0;
	network.links.forEach(function(d, i) { 
		d.source = network.nodes[d.source.index];
		d.target =  network.nodes[d.target.index];
	});	
	force
		.nodes(network.nodes)
		.links(network.links)
		.stop();
	node.transition().duration(durationAmount).attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"});
	force.stop();
	link.transition().duration(durationAmount)
		.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; })
		.each("end", function () { delay = 1; });
}	

circlegraph = function() {
	delay = 0;  
	
	network.nodes.forEach(function(d, i) { 
		d.fixed = true;  
		if (mode) d.ox = d.x;
		if (mode) d.oy = d.y;
		d.x = ((d.cx))/zoom.scale() - zoom.translate()[0]/zoom.scale();			
		d.y = ((d.cy))/zoom.scale() - zoom.translate()[1]/zoom.scale();
		d.px = ((d.cx))/zoom.scale() - zoom.translate()[0]/zoom.scale();
		d.py = ((d.cy))/zoom.scale() - zoom.translate()[1]/zoom.scale();
		//d.x = d.cx;
		//d.y = d.cy;
		//d.px = d.cx;
		//d.py = d.cy;
	});
	mode = 0;
	network.links.forEach(function(d, i) { 
		d.source = network.nodes[d.source.index];
		d.target =  network.nodes[d.target.index];
	});	
	force
		.nodes(network.nodes)
		.links(network.links)
		.stop();
	node.transition().duration(durationAmount).attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"});
	force.stop();
	link.transition().duration(durationAmount)
		.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; })
		.each("end", function () { delay = 1;  });
}	
