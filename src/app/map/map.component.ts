import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { tileLayer } from 'leaflet';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ZoneService } from '../zone.service';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit {

  @ViewChild("content") content: any;
  @ViewChild("nodegraph") nodegraph: any;

    private map:any;
    public zoneDetails:any;
    private json: any;
    constructor(private modalService: NgbModal, private saveZoneService: ZoneService,
    private authentificationService: AuthentificationService, private route:Router, private http: HttpClient) { }

  ngOnInit(): void {
    if(this.authentificationService.isUserLoggedIn() == false)
    {
      this.route.navigate(['/login'])
    }
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
              id: "",
              zoneName: data.zoneName,
              nodeNumber: data.nodeNumber,
              linkNumber: data.linkNumber,
              geometry: data.features
          }
            this.saveZoneService.saveZone(body).subscribe(data => {
              this.zoneDetails.features.length = 0
            })
          }, (closed) => {
            console.log("ERROR" + closed);
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

      this.zoneDetails.features.push(objectOut.geometry.coordinates)
      drawnItems.addLayer(layer);
    });

  }
  zoomToMap(){
    this.map.flyTo([35.7641171318026, -5.833117961883545], 16)
    this.map.on('zoomend', () => {
      this.http.get("./assets/data/data.json",  {responseType: 'json'}).subscribe(data => {
      this.json = data;
      L.geoJSON(this.json, /**{onEachFeature: this.onEachFeature}**/).addTo(this.map);
    },error => {
     console.error(error);
    });
    });
  }
  testFunction(){
    //this.route.navigate(['/chart']);
    const modal = this.modalService.open(this.nodegraph, { size: 'xl' });
  }

  logOut(){
    this.authentificationService.logOut();
    this.route.navigate(['/login']);
  }
  ngAfterViewInit(): void {
    this.initMap();
  }
}
