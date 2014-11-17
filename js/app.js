/* app.js -- our application code */

"use strict";

// UW coordinates:
// lat: 47.655
// lng: -122.3080

$(document).ready(function() {
	function createMap(center, zoom) {
		var mapElement = document.getElementById('map');

		var map = new google.maps.Map(mapElement, {
			center: center,
			zoom: zoom
		});

		var marker = new google.maps.Marker({
			position: center,
			map: map,
			animation: google.maps.Animation.DROP
		});

		var infoWindow = new google.maps.InfoWindow();

		google.maps.event.addListener(marker, 'click', function() {
			console.log('marker clicked');
			
			infoWindow.setContent('<h2>Here I am!!1</h2>');
			infoWindow.open(map, marker);
		})
	}//createMap

	var uwCoords = {
		lat: 47.655,
		lng: -122.3080
	};

	function onGeoSuccess(position) {
		var center = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		}
		createMap(center, 14);
	}//onGeoSuccess

	function onGeoError(error) {
		console.log(error);
	}//onGeoError

	if (navigator && navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
	} else {
		createMap(uwCoords, 14);
	}
}); //ends document ready function