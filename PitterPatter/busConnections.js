checkBuses = function(g) {
	if (delay) {
		svg.selectAll("g.node")
			.transition()
			.style("stroke-width", function(d) { return checkArrays(g,d) ? 4 : 1; });
			
		svg.selectAll("line.link")
			.transition()
			.style("stroke-width", function(d) { return ((d.source.connect) && (d.target.connect)) ? "4px" : ".5px"; });
	}
}


checkArrays = function(a,b) { 
	for (var i=0; i<a.group.length; ++i) {
		for (var j=0; j<b.group.length; ++j) {
			if (a.group[i] == b.group[j]) { b.connect = 1; return true; }
		}
	}
	b.connect = 0;
	return false; 
}
