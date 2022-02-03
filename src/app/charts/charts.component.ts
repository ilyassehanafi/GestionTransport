import { Component,OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor(private route :Router, private authentificationService: AuthentificationService) {
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
      show:true
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none"
        },
        dataView: {
          readOnly: false
        },
        magicType: {
          type: ["line", "bar"]
        },
        restore: {},
        saveAsImage: {}
      }
    },
    dataset:{

    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
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
            y: 500
          },
          {
            name: 'Node 2',
            x: 550,
            y: 200
          },
          {
            name: 'Node 3',
            x: 900,
            y: 50
          },
          {
            name: 'Node 4',
            x: 1200,
            y: 100
          },
          {
            name: 'Node 5',
            x: 1500,
            y: 200
          },
          {
            name: 'Node 6',
            x: 1700,
            y: 400
          },
          {
            name: 'Node 7',
            x: 1400,
            y: 600
          },
          {
            name: 'Node 8',
            x: 1200,
            y:720
          },
          {
            name: 'Node 9',
            x: 1000,
            y: 900
          },
          {
            name: 'Node 10',
            x: 1000,
            y: 1200
          },
          {
            name: 'Node 11',
            x: 700,
            y: 1000
          },
          {
            name: 'Node 12',
            x: 400,
            y: 800
          },{
            name: 'Node 13',
            x: 900,
            y: 250
          },{
            name: 'Node 14',
            x: 800,
            y: 550
          },{
            name: 'Node 15',
            x: 1200,
            y: 450
          }
        ],
        links: [
          {
            source: 'Node 1',
            target: 'Node 2'
          },
          {
            source: 'Node 2',
            target: 'Node 1'
          },
          {
            source: 'Node 2',
            target: 'Node 3'
          },{
            source: 'Node 3',
            target: 'Node 2'
          },
          {
            source: 'Node 3',
            target: 'Node 4'
          },
          {
            source: 'Node 4',
            target: 'Node 3'
          },
          {
            source: 'Node 4',
            target: 'Node 5'
          },
          {
            source: 'Node 5',
            target: 'Node 4'
          },
          {
            source: 'Node 8',
            target: 'Node 9'
          },
          {
            source: 'Node 9',
            target: 'Node 8'
          },
          {
            source: 'Node 5',
            target: 'Node 6'
          },
          {
            source: 'Node 6',
            target: 'Node 5'
          },
          {
            source: 'Node 5',
            target: 'Node 7'
          },
          {
            source: 'Node 7',
            target: 'Node 5'
          },
          {
            source: 'Node 6',
            target: 'Node 7'
          },
          {
            source: 'Node 7',
            target: 'Node 6'
          },
          {
            source: 'Node 7',
            target: 'Node 8'
          },
          {
            source: 'Node 8',
            target: 'Node 7'
          },
          {
            source: 'Node 9',
            target: 'Node 10'
          },
          {
            source: 'Node 10',
            target: 'Node 9'
          },
          {
            source: 'Node 10',
            target: 'Node 11'
          }
          ,
          {
            source: 'Node 11',
            target: 'Node 10'
          },
          {
            source: 'Node 11',
            target: 'Node 12'
          },
          {
            source: 'Node 12',
            target: 'Node 11'
          },
          {
            source: 'Node 12',
            target: 'Node 1'
          },
          {
            source: 'Node 1',
            target: 'Node 12'
          },
          {
            source: 'Node 11',
            target: 'Node 14'
          },
          {
            source: 'Node 14',
            target: 'Node 11'
          },
          {
            source: 'Node 2',
            target: 'Node 14'
          },
          {
            source: 'Node 14',
            target: 'Node 2'
          },
          {
            source: 'Node 3',
            target: 'Node 13'
          },
          {
            source: 'Node 13',
            target: 'Node 3'
          },
          {
            source: 'Node 13',
            target: 'Node 15'
          },
          {
            source: 'Node 15',
            target: 'Node 13'
          },
          {
            source: 'Node 4',
            target: 'Node 7'
          },
          {
            source: 'Node 7',
            target: 'Node 4'
          },
          {
            source: 'Node 15',
            target: 'Node 8'
          },
          {
            source: 'Node 8',
            target: 'Node 15'
          },
          {
            source: 'Node 13',
            target: 'Node 14'
          },
          {
            source: 'Node 14',
            target: 'Node 13'
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
