
function changePval(x) {
		pval = x;
		oneValue = entries.filter(function(d,i) { return ((d.pval == pval)&&(d.sample == samples)) })	
		
		svg.selectAll("path.line").data(oneValue)
			.attr("d", function(d,i) { 
				return d3.line()
						.x(function(e,j) { return xScale(e[0]) })
						.y(function(e,j) { return yScale(e[1]); })	
						(d.pts);
			}).transition().duration(2000)
			.attrTween("stroke-dasharray", tweenDash)
}

function changeSample(x) {
		samples = x;
		oneValue = entries.filter(function(d,i) { return ((d.pval == pval)&&(d.sample == samples)) })	
		
		svg.selectAll("path.line").data(oneValue)
			.attr("d", function(d,i) { 
				return d3.line()
						.x(function(e,j) { return xScale(e[0]) })
						.y(function(e,j) { return yScale(e[1]); })	
						(d.pts);
			}).transition().duration(2000)
			.attrTween("stroke-dasharray", tweenDash)
}

function tweenDash() {
	var l = this.getTotalLength(),
	i = d3.interpolateString("0," + l, l + "," + l);
	return function(t) { return i(t); };
}
