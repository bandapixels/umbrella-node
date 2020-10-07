const umbrellaLiveMap = `<!DOCTYPE html>
<html lang="eu">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <title>Umbrella volunteers map</title>
    <script src = "http://localhost:3000/socket.io/socket.io.js"></script>
    <script src= "http://maps.google.com/maps/api/js?sensor=false" ></script>
  </head>
  <body>
    <div id="map" style="width: 1520px; height: 1080px; margin: auto"></div>
    <script type="text/javascript">
      const socket = io('http://localhost:3000');

      socket.emit('locations')

      let markers = [];

      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: new google.maps.LatLng(35, 145), // Tokyo
        mapTypeId: google.maps.MapTypeId.TERRAIN
      });

      const setMapOnAll = (map) => {
        markers.forEach((marker) => marker.setMap(map))
      }

      const clearMarkers = () => {
        setMapOnAll(null);
      }

      socket.on('locations', (locations) => {
        
        console.log(locations)
        clearMarkers();

        markers = [];

        locations.volunteersLocations.forEach((volunteer) => {
          const infoWindow = new google.maps.InfoWindow({
            content: \`Volunteer status: \` + volunteer.type,
          })

          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(volunteer.x_location, volunteer.y_location),
            title: \`Volunteer id: \` + volunteer.user_id,
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
            },
            map,
          })

          marker.addListener('click', () => infoWindow.open(map, marker))

          map.addListener('click', () => infoWindow.close())

          markers.push(marker);
        })
        
        locations.seekersLocations.forEach((seeker) => {
          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(seeker.x_location, seeker.y_location),
            title: \`Seeker id: \` + seeker.user_id,
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
            map,
          })

          marker.addListener('click', () => infoWindow.open(map, marker))

          map.addListener('click', () => infoWindow.close())

          markers.push(marker);
        })
      })
    </script>
  </body>
</html>`;

export default umbrellaLiveMap;
