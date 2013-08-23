// this file houses the AJAX calls //
// they need to be called in order getStanding -> getWalking -> getWalking2 - > getWalking3 -> createMario //
// notice, to keep this order, the async was turned to false //

function getStanding() {
	if (window.XMLHttpRequest) {
	// code for IE7+, Firefox, Chrome, Opera, Safari
		var xmlNetwork = new XMLHttpRequest();
	}
	else {
	// code for IE6, IE5
		var xmlNetwork=new ActiveXObject("Microsoft.XMLHTTP");
		xmlNetwork.async = false;
	}
	xmlNetwork.onreadystatechange=function() {
		if (xmlNetwork.readyState==4 && xmlNetwork.status==200) {
			var mario = [];
			var marioState = [];
			var response = xmlNetwork.responseText;
			response = response.replace(/(\r\n|\n|\r)/gm,",");
			mario = response.split(",");
			mario.pop();
			mario.forEach(function(d,i){ marioAnimate.push([[i,+d]])});  
			getWalking();
		}
	}	
	xmlNetwork.open("GET","marioStanding.csv",false);
	xmlNetwork.send();			
}	

function getWalking() {
	if (window.XMLHttpRequest) {
	// code for IE7+, Firefox, Chrome, Opera, Safari
		var xmlNetwork = new XMLHttpRequest();
	}
	else {
	// code for IE6, IE5
		var xmlNetwork=new ActiveXObject("Microsoft.XMLHTTP");
		xmlNetwork.async = false;
	}
	xmlNetwork.onreadystatechange=function() {
		if (xmlNetwork.readyState==4 && xmlNetwork.status==200) {
			var mario = [];
			var marioState = [];
			var response = xmlNetwork.responseText;
			response = response.replace(/(\r\n|\n|\r)/gm,",");
			mario = response.split(",");
			mario.pop();
			mario.forEach(function(d,i){ marioAnimate[i].push([i,+d]) });   
			getWalking2();
		}
	}	
	xmlNetwork.open("GET","marioWalking1.csv",false);
	xmlNetwork.send();			
}	

function getWalking2() {
	if (window.XMLHttpRequest) {
	// code for IE7+, Firefox, Chrome, Opera, Safari
		var xmlNetwork = new XMLHttpRequest();
	}
	else {
	// code for IE6, IE5
		var xmlNetwork=new ActiveXObject("Microsoft.XMLHTTP");
		xmlNetwork.async = false;
	}
	xmlNetwork.onreadystatechange=function() {
		if (xmlNetwork.readyState==4 && xmlNetwork.status==200) {
			var mario = [];
			var marioState = [];
			var response = xmlNetwork.responseText;
			response = response.replace(/(\r\n|\n|\r)/gm,",");
			mario = response.split(",");
			mario.pop();
			mario.forEach(function(d,i){ marioAnimate[i].push([i,+d])  });  
			getWalking3();
		}
	}	
	xmlNetwork.open("GET","marioWalking2.csv",false);
	xmlNetwork.send();			
}		

function getWalking3() {
	if (window.XMLHttpRequest) {
	// code for IE7+, Firefox, Chrome, Opera, Safari
		var xmlNetwork = new XMLHttpRequest();
	}
	else {
	// code for IE6, IE5
		var xmlNetwork=new ActiveXObject("Microsoft.XMLHTTP");
		xmlNetwork.async = false;
	}
	xmlNetwork.onreadystatechange=function() {
		if (xmlNetwork.readyState==4 && xmlNetwork.status==200) {
			var mario = [];
			var marioState = [];
			var response = xmlNetwork.responseText;
			response = response.replace(/(\r\n|\n|\r)/gm,",");
			mario = response.split(",");
			mario.pop();
			mario.forEach(function(d,i){ marioAnimate[i].push([i,+d]) });    
			createMario();
		}
	}	
	xmlNetwork.open("GET","marioWalking3.csv",false);
	xmlNetwork.send();			
}		
