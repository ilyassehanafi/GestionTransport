import { Component, AfterViewInit } from '@angular/core';
import { MarkerService } from '../marker.service';
import * as L from 'leaflet';
import { tileLayer } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  private map:any;
  private initMap(): void {

    const openstreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    const esriMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      minZoom: 3,
      attribution: 'esriMap'
    });
    const earth = L.tileLayer(''
    , {
      maxZoom: 18,
      minZoom: 3,
      attribution: 'satelliteView'
    });
    const googleHybrid = L.tileLayer('http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}',{
      maxZoom: 18,
      minZoom: 3,
      attribution: 'satelliteView'
    });

    const moroccoMarker = L.marker([31.794525, -7.0849336]).bindPopup('Morocco')
    const city = L.layerGroup([moroccoMarker]);
    this.map = L.map('map', {
      center: [ 31.794525, -7.0849336 ],
      zoom: 5,
      layers:[openstreetMap]
    });

    const baseMaps = {
      "openstreetmap": openstreetMap,
      "esri": esriMap,
      "googleEarthempty":earth,
      "Hybrid": googleHybrid
  };
    const overlayMaps = {
    "Maroc": city
};
  L.control.layers(baseMaps, overlayMaps).addTo(this.map);
  }
  zoomToMap(){
    this.map.flyTo([35.762828905844344, -5.8386885595215645], 17);
    this.map.on('zoomend', () => {
      L.marker([35.762828905844344, -5.8386885595215645]).bindPopup('Triyal Atlas').addTo(this.map)
  });
  }
  testFunction(){
    alert("Hi")
  }
  

  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.loadMarkers(this.map);
  }
}