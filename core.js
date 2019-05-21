function setCenter()
    {
        map.setOptions({center:new google.maps.LatLng(prompt("Latitude:"),prompt( "Longtitude:"))});
    }

$( "#b1" ).click(function() {
	$("#pac-input").show();
});

$( "#b2" ).click(function() {
	randPosition();
});

$( "#b3" ).click(function() {
	$("#markers").show();	
});

$("#marker-red").click(function() {
	randPositionWithColor("red");
});

$("#marker-blue").click(function() {
	randPositionWithColor("blue");
});

$("#marker-green").click(function() {
	randPositionWithColor("green");
});

$("#marker-yellow").click(function() {
	randPositionWithColor("yellow");
});

$( "#b4" ).click(function() {
	map.setOptions({styles: styles['default']});
});

$( "#b5" ).click(function() {
	$("#drawing-stop").show();
	
	drawingMgr = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
    },
    markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
    polygonOptions: {
      strokeColor: '#FF0000',
	  strokeOpacity: 0.8,
	  strokeWeight: 2,
	  fillColor: '#ffff00',
	  fillOpacity: 0.35,
	  map: map
    },
	rectangleOptions: {
      strokeColor: '#FF0000',
	  strokeOpacity: 0.8,
	  strokeWeight: 2,
	  fillColor: '#ffff00',
	  fillOpacity: 0.35,
	  map: map
    },
	circleOptions: {
      strokeColor: '#FF0000',
	  strokeOpacity: 0.8,
	  strokeWeight: 2,
	  fillColor: '#ffff00',
	  fillOpacity: 0.35,
	  map: map
    }
  });
  
	drawingMgr.setMap(map);
	
	google.maps.event.addListener(drawingMgr, 'overlaycomplete', function(event) {
		if (event.type == "rectangle")
			alert("overlay complete");
		var overlay = event.overlay;
		

		overlay.addListener('mouseover', function(event) {
			addMarker(event.latLng);
			
			overlay.setOptions({
			  strokeColor: '#FF0000',
			  strokeOpacity: 0.8,
			  strokeWeight: 2,
			  fillColor: '#FF0000',
			  fillOpacity: 0.35,
			  map: map
			  
			});

		});
		

		overlay.addListener('mouseout', function() {
			overlay.setOptions({
			  strokeColor: '##fffff0',
			  strokeOpacity: 0.8,
			  strokeWeight: 2,
			  fillColor: '#ffff00',
			  fillOpacity: 0.35,
			  map: map
			  
			});

		});

		  
	});

});

$( "#b6" ).click(function() {
	$("#b6-panel").show();
});

$("#drawing-stop").click(function () {
	drawingMgr.setMap(null);
	$("#drawing-stop").hide();
});

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

function randPosition () {

	var rand_lat = getRandomInRange(-84, 84, 3);
	var rand_lng = getRandomInRange(-170, 170, 3);
	
	var randLatLng = { lat: rand_lat, lng: rand_lng };

	var distance = google.maps.geometry.spherical.computeDistanceBetween( new google.maps.LatLng(currentLatLng.lat, currentLatLng.lng), new google.maps.LatLng(randLatLng.lat, randLatLng.lng));
	distance = distance * 1000;
	if (distance >= 100) {
		addMarker(randLatLng);
		map.setOptions({
			center: randLatLng
		});
	}
}

function randPositionWithColor(color) {
	var rand_lat = getRandomInRange(-84, 84, 3);
	var rand_lng = getRandomInRange(-170, 170, 3);
	
	var randLatLng = { lat: rand_lat, lng: rand_lng };

	var distance = google.maps.geometry.spherical.computeDistanceBetween(
		new google.maps.LatLng(currentLatLng.lat, currentLatLng.lng), new google.maps.LatLng(randLatLng.lat, randLatLng.lng));
	distance = distance * 1000;

	if (distance >= 100) {
		addMarkerWithColor(randLatLng, color);
		map.setOptions({
			center: randLatLng
		});
	}
}

function addMarkerWithColor(location, color) {	
	var icon_url = 'http://maps.google.com/mapfiles/ms/icons/'+color+'-dot.png';
	var marker = new google.maps.Marker({
		position: location,
		map: map,
		icon: icon_url
	});
	
	currentLatLng = location;
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
	directionsService.route({
	  origin: document.getElementById('start').value,
	  destination: document.getElementById('end').value,
	  travelMode: 'DRIVING'
	}, function(response, status) {
	  if (status === 'OK') {
		directionsDisplay.setDirections(response);
	  } else {
		window.alert('Directions request failed due to ' + status);
	  }
	});
}

$('#googleMapModal').on('show.bs.modal', function () {
	resizeMap();

})

$('#modalSubmitBtn').click(function () {
	var lat = currentMapMarker.getPosition().lat();
	var lng = currentMapMarker.getPosition().lng();

	document.getElementById("Lat").value = lat;
	document.getElementById("Lng").value = lng;

	$("#filters-form").submit();
});

function setNewMarker(location) {
	
	var marker = new google.maps.Marker({
		position: location,
		map: map
	});

	currentMapMarker.setMap(null);
	currentMapMarker = marker;
}
