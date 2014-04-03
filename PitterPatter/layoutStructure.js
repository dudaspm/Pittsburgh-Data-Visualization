/*------------------------------------------------------------------------------
* Program: Functions for Processing Networks
*
* Date: 6/01/2012
*-----------------------------------------------------------------------------*/
var sliderLineOpacityPER = .7;
var sliderLinkDistanceVAL = 300;
var sliderLinkStrengthVAL = 1;

var sliderClusterOpacityPER = 1;
var sliderClusterDistanceVAL = 70;
var sliderClusterStrengthVAL = .7;

changeOpacity = function(d) {
	if (d.linkType == "interLinks") { return sliderLineOpacityPER; }
	else if (d.linkType == "innerLinks") { return sliderClusterOpacityPER; }	
}

changeStrength = function(d) {
	if (d.linkType == "interLinks") { return sliderLinkStrengthVAL; }
	else if (d.linkType == "innerLinks") { return sliderClusterStrengthVAL; }
}


changeInnerBias = function(d) {
	if (d.linkType == "interLinks") { return 100; }
	else if (d.linkType == "innerLinks") { return 20; }
}
changeInterBias = function(d) {
	if (d.linkType == "interLinks") { return 70; }
	else if (d.linkType == "innerLinks") { return 30; }
}
changeBothBias = function(d) {
	if (d.linkType == "interLinks") { return 70; }
	else if (d.linkType == "innerLinks") { return 5; }
}



noEdgeBias = function() { force.stop(); force.linkDistance(d3.functor(function() { return 20; })).start(); }
InnerEdgeBias = function() { force.stop(); force.linkDistance(d3.functor(function(d) { return changeInnerBias(d); })).start(); }
InterEdgeBias = function() { force.stop(); force.linkDistance(d3.functor(function(d) { return changeInterBias(d); })).start(); }
BothEdgeBias = function() { force.stop(); force.linkDistance(d3.functor(function(d) { return changeBothBias(d); })).start(); }

removeStrength  = function() { force.stop(); force.linkStrength(d3.functor(function() { return 0; })).start(); }
addStrength = function() { force.stop(); force.linkStrength(d3.functor(function() { return 1; })).start(); }
