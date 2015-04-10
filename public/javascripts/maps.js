var map;
var myLatlng = new google.maps.LatLng(44.389328, -79.690007);

var MY_MAPTYPE_ID = 'custom_style';

function initialize() {

	var featureOpts = [

	{"featureType":"water","stylers":[{"color":"#19a0d8"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"weight":6}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#e85113"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-40}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#efe9e4"},{"lightness":-20}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},{"featureType":"road.highway","elementType":"labels.icon"},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","stylers":[{"lightness":20},{"color":"#efe9e4"}]},{"featureType":"landscape.man_made","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":-100}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"hue":"#11ff00"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"lightness":100}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"hue":"#4cff00"},{"saturation":58}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#f0e4d3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#efe9e4"},{"lightness":-10}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"simplified"}]}];

	var mapOptions = {
		zoom: 17,
		center: myLatlng,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
		},
		mapTypeId: MY_MAPTYPE_ID
	};

	var locs = [
	['The mansion', 44.389477, -79.688912,  4],
	['The bank', 44.389466, -79.687620,  5],
	['McReillys Pub & Restaurant', 44.389389, -79.687035, 3],
	['The queens', 44.389439, -79.686745, 2],
	['La Costa Restaurant', 44.389251, -79.685903, 1]
	];

	function setMarkers(map, locations) {

		var image = {
			url: 'images/icon3.png',
		};

		for (var i = 0; i < locations.length; i++) {
			var beach = locations[i];
			var myLatlng2 = new google.maps.LatLng(beach[1], beach[2]);
			var marker2 = new google.maps.Marker({
				position: myLatlng2,
				map: map,
				icon: image,
			});

		}
	}

	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);
	setMarkers(map, locs);

	var styledMapOptions = {
		name: 'Custom Style'
	};
	map.setOptions({ minZoom: 13, maxZoom: 20 });
	var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

	map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

	var contentString = '<div id="content">'+'<div id="siteNotice">'+'</div>'+'<h2 id="firstHeading" class="firstHeading">The Mansion</h2>'+'<div id="bodyContent">'+'<p>The Mansion is one of Downtown Barrie’s Nightclubs and Restaurants. Serving lunch and dinner from Friday to Sunday, and entertaining your dance shoes on Friday and Saturday evenings. With events, house parties, live music and so much more, The Mansion is a must for your weekend party.</p>'+'<p><a href="http://downtownbarrie.ca/the-mansion/">'+'The Mansion</a>'+'</p>'+'</div>'+'</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString,
		maxWidth: 300
	});

	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: 'The mansion'
	});
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});

}

google.maps.event.addDomListener(window, 'load', initialize);