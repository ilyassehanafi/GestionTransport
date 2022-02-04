import { Component,OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor(private route :Router, private authentificationService: AuthentificationService,
    private modalService: NgbModal
    ) {
  }

  ngOnInit(): void {
    if(this.authentificationService.isUserLoggedIn() == false)
    {
      this.route.navigate(['/login'])
    }
  }
  chartOption: EChartsOption = {
    title: {
      text: 'Modelisation du réseau'
    },
    tooltip: {
      show:true,
      type: 'line',
    }
    ,
    toolbox: {
      show: true,
      feature: {
        myTool1: {
          show: true,
          title: 'Données',
          icon:'image://https://img.icons8.com/ios/50/000000/read.png',
          onclick: function (){

          }
      },
        dataZoom: {
          yAxisIndex: "none"
        },
        dataView: {
          readOnly: true,
          show:true
        },
        magicType: {
          type: ["line"]
        },
        restore: {show:true},
        saveAsImage: {},
      }
    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    dataset:{
      source:
        [{product: 'Matcha Latte', count: 823, score: 95.8} ]

    },
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 50,
        roam: true,
        label: {
          show: true
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 20
        },
        data: [
          {
            name: 'Node 1',
            x: 150,
            y: 500,
            value: 188,

            itemStyle: {
                color: 'red'
            }
          },
          {
            name: 'Node 2',
            x: 550,
            y: 200,
            value: 315
            },
          {
            name: 'Node 3',
            x: 900,
            y: 50,
            value: 345,
            itemStyle: {
                color: 'red'
            }
          },
          {
            name: 'Node 4',
            x: 1200,
            y: 100,
            value: 297
          },
          {
            name: 'Node 5',
            x: 1500,
            y: 200,
            value: 106
          },
          {
            name: 'Node 6',
            x: 1700,
            y: 400,
            value: 167,
            itemStyle: {
                color: 'red'
            }
          },
          {
            name: 'Node 7',
            x: 1400,
            y: 600,
            value: 146
          },
          {
            name: 'Node 8',
            x: 1200,
            y:720,
            value: 160
          },
          {
            name: 'Node 9',
            x: 1000,
            y: 900,
            value: 359
          },
          {
            name: 'Node 10',
            x: 1000,
            y: 1200,
            value: 337,
            itemStyle: {
                color: 'red'
            }
          },
          {
            name: 'Node 11',
            x: 500,
            y: 800,
            value: 140
          },
          {
            name: 'Node 12',
            x: 800,
            y: 450,
          },
          {
            name: 'Node 13',
            x: 1000,
            y: 250,
          }
        ],
        links: [
          {
            source: 'Node 1',
            target: 'Node 2',
            label:{
              show:true,
              position:'middle'
            }

          },
          {
            source: 'Node 2',
            target: 'Node 3',
            label:{
              show:true,
              position:'middle'
            }
          },
          {
            source: 'Node 3',
            target: 'Node 4',
            label:{
              show:true,
              position:'middle'
            }
          },
          {
            source: 'Node 4',
            target: 'Node 5',
            label:{
              show:true,
              position:'middle'
            }
          },
          {
            source: 'Node 5',
            target: 'Node 6',
            label:{
              show:true,
              position:'middle'
            }
          },
          {
            source: 'Node 6',
            target: 'Node 7',
            label:{
              show:true,
              position:'middle'
            }
          },
          {
            source: 'Node 7',
            target: 'Node 8',
            label:{
              show:true,
              position:'middle'
            }
          },
          {
            source: 'Node 8',
            target: 'Node 9',
            label:{
              show:true,
              position:'middle'
            }
          },
          {
            source: 'Node 9',
            target: 'Node 10',
            label:{
              show:true,
              position:'middle'
            }
          },
          {
            source: 'Node 10',
            target: 'Node 11',
            label:{
              show:true,
              position:'middle'
            }
          },
          {
            source: 'Node 11',
            target: 'Node 1',
            label:{
              show:true,
              position:'middle'
            }
          },{
            source: 'Node 11',
            target: 'Node 12'
          },
          {
            source: 'Node 2',
            target: 'Node 12'
          },
          {
            source: 'Node 12',
            target: 'Node 13'
          },
          {
            source: 'Node 13',
            target: 'Node 9'
          },
          {
            source: 'Node 13',
            target: 'Node 3'
          },
          {
            source: 'Node 4',
            target: 'Node 8'
          },
          {
            source: 'Node 5',
            target: 'Node 7'
          },
        ],
        lineStyle: {
          opacity: 1,
          width: 4,
          curveness: 0.001
        }
      }
    ]
  };


  }
