/**
 * Created by IntelliJ IDEA.
 * User: sebastian
 * Date: 02-Feb-2011
 * Time: 11:27:49
 * New Map JavaSctript
 */

var map;
var infoWindow = new google.maps.InfoWindow({
	zIndex: 999
});

function initializeNewMap()
{
	var latlng = new google.maps.LatLng( Map_InitialLatitude, Map_InitialLongitude );
	var mapOptions = {
		zoom: Map_ZoomLevel,
		scrollwheel: false,
		center: latlng,
		panControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map( document.getElementById("map_canvas"), mapOptions );

	setMarkers( Map_Markers );

	if( document.getElementById("streetview_canvas") != null )
	{
		var panoramaOptions = {
			enableCloseButton: true,
			scrollwheel: false,
			position: latlng
		};
		var panorama = new google.maps.StreetViewPanorama(document.getElementById("streetview_canvas"), panoramaOptions);
		map.setStreetView(panorama);

		google.maps.event.addListener(panorama, 'visible_changed', function() {
			if( !panorama.getVisible() )
				document.getElementById("streetview_canvas").style.display = "none";
			else
				document.getElementById("streetview_canvas").style.display = "block";
		});
	}
}

function setMarkers( markers )
{
	var imageCountry = new google.maps.MarkerImage( Map_MarkerImage_Country, null, null, new google.maps.Point(0, 23) ); //Centered marker for new marker
	var imageCity = new google.maps.MarkerImage( Map_MarkerImage_City ); //Centered marker for new marker
	var imageProperty = new google.maps.MarkerImage( Map_MarkerImage_Property ); //Centered marker for new marker
//	var image = new google.maps.MarkerImage( Map_MarkerImage, null, null, new google.maps.Point(0, 23) ); //Marker which use the bottom left corner for marking

	for( var i = 0; i < markers.length; i++ )
	{
		var tmp = markers[i];
		if( tmp == null )
			continue;

		var myLatLng = new google.maps.LatLng(tmp[2], tmp[3]);

		if( tmp[0] == "Country" )
			image = imageCountry;
		else if( tmp[0] == "City" )
			image = imageCity;
		else
			image = imageProperty;

		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			icon: image,
			array_index: i,
			title: tmp[1]
		});

		if( tmp.length > 4 && tmp[4].length > 0  )
			attachInfoWindow( marker, tmp[4] );
	}
}

function showInfoWindow( marker, message )
{
	if( marker != null && message != null && message.length > 0 )
	{
		infoWindow.close();
		infoWindow.setContent( message );
		infoWindow.open( map, marker );
	}
}

function attachInfoWindow( marker, message )
{
	google.maps.event.addListener( marker, 'click', function() {
		showInfoWindow( marker, message );
	} );
}

