import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MarkerService } from '../marker.service';
import * as L from 'leaflet';
import { tileLayer } from 'leaflet';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SaveZoneService } from '../save-zone.service';
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
export class MapComponent implements AfterViewInit, OnInit {

  @ViewChild("content") content: any;

  private map:any;
  public zoneDetails:any;
  constructor(private modalService: NgbModal, private saveZoneService: SaveZoneService ) { }


  ngOnInit(): void {
    this.zoneDetails = {
      zoneName: "",
      nodeNumber: 0,
      linkNumber: 0,
      features: []
    }
  }

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
             featureGroup: drawnItems,
         }
     });
     var saveControl =  L.Control.extend({
      options: {
        position: 'topleft'
      },
      onAdd: (map:any) => {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

        container.style.backgroundColor = 'white';
        container.style.backgroundImage = "url(https://upload.wikimedia.org/wikipedia/commons/archive/8/8b/20180523120540%21OOjs_UI_icon_download.svg)";
        container.style.backgroundSize = "24px 24px";
        container.style.width = '30px';
        container.style.height = '30px';

        container.onclick = () => {
          const modal = this.modalService.open(this.content, { size: 'xl', backdrop: 'static' });
          modal.result.then((data) => {
            var body = {
              id: "55",
              zoneName: data.zoneName,
              nodeNumber: data.nodeNumber,
              linkNumber: data.linkNumber,
              geometry: data.features
          }
            console.log(body);
            this.saveZoneService.saveZone(body).subscribe(data => {
              console.log("DONE");
            })
          }, (closed) => {
            console.log("ERROR");
          })

        }

        return container;
      }
    });
      this.map.addControl(new saveControl());
      this.map.addControl(drawControl);
      this.map.on('draw:created',  (event: { layer: any; }) =>{
      var layer = event.layer,
      feature = layer.feature = layer.feature || {};
      feature.type = feature.type || "Feature";
      feature.properties = feature.properties || {};
      var objectOut = layer.toGeoJSON();
      var geometry = JSON.stringify(objectOut);
      this.zoneDetails.features.push(geometry)
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

  ngAfterViewInit(): void {
    this.initMap();
    //this.markerService.loadMarkers(this.map);
  }
}
