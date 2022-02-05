import { Component,OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {nodes,links} from '../graph-data'


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  showTable = false;

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
  public test():void {
    this.showTable=!this.showTable;
  }
  chartOption: EChartsOption = {

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
          onclick: () =>{
            alert("15");
            this.showTable=!this.showTable;

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
        data: nodes,
        links: links,
        lineStyle: {
          opacity: 1,
          width: 4,
          curveness: 0.001
        }
      }
    ]
  };


  }
