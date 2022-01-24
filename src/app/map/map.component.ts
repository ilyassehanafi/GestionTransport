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
    var mapboxUrl ='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
    var mapboxAttribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    var mapboxToken ='pk.eyJ1IjoiYXltYW5lLW1zYSIsImEiOiJja3Jha2R1bzEzbTdjMnlzNmYwM2Y3MWYwIn0.umN_r7KlYA_4EdwsKC8uEA'
    var tileStreet = L.tileLayer(mapboxUrl, {
      attribution: mapboxAttribution,
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      accessToken: mapboxToken
      });
    var tileSattelite = L.tileLayer(mapboxUrl, {
          attribution: mapboxAttribution,
          maxZoom: 18,
          id: 'mapbox/satellite-v9',
          accessToken: mapboxToken
          });
    var tileLight= L.tileLayer(mapboxUrl, {
    attribution: mapboxAttribution,
    maxZoom: 18,
    id: 'mapbox/light-v10',
    accessToken: mapboxToken
    });
    var tileDark=L.tileLayer(mapboxUrl, {
    attribution: mapboxAttribution,
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    accessToken: mapboxToken
    });
    this.map = L.map('map', {
          center: [35.759465, -5.833954],
          zoom: 10,
          layers: [tileStreet, tileSattelite]
          });
    var baseMaps = {
          "Rue": tileStreet,
          "Satellite": tileSattelite,
          "Light":tileLight,
          "Dark":tileDark
    };
    L.control.layers(baseMaps).addTo(this.map);
    //ajouter toolbar et les differents operations plus creation de group layer
    var drawnItems =new L.FeatureGroup();
    this.map.addLayer(drawnItems);
    var drawControl = new L.Control.Draw({
         edit: {
             featureGroup: drawnItems
         }
     });
     this.map.addControl(drawControl);
     this.map.on('draw:created', function (event: { layer: any; }) {
      var layer = event.layer,
      feature = layer.feature = layer.feature || {};
      feature.type = feature.type || "Feature";
      var props = feature.properties = feature.properties || {};
      drawnItems.addLayer(layer); 
});
    
  }
  zoomToMap(){
    this.map.flyTo([35.762828905844344, -5.8386885595215645], 18)
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