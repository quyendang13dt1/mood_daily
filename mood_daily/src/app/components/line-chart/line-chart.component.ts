import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnInit {
  // DATA_COUNT = 12;
  // labels: any[] = [];
  // config: any = {};

  // chart: any;

  // ngOnInit(): void {
  //   for (let i = 0; i < this.DATA_COUNT; ++i) {
  //     this.labels.push(i.toString());
  //   }
  //   const datapoints = [
  //     0,
  //     20,
  //     20,
  //     60,
  //     60,
  //     120,
  //     NaN,
  //     180,
  //     120,
  //     125,
  //     105,
  //     110,
  //     170,
  //   ];
  //   const data = {
  //     labels: this.labels,
  //     datasets: [
  //       {
  //         label: 'Cubic interpolation (monotone)',
  //         data: datapoints,
  //         borderColor: 'red',
  //         fill: false,
  //         cubicInterpolationMode: 'monotone',
  //         tension: 0.4,
  //       },
  //       {
  //         label: 'Cubic interpolation',
  //         data: datapoints,
  //         borderColor: 'blue',
  //         fill: false,
  //         tension: 0.4,
  //       },
  //       {
  //         label: 'Linear interpolation (default)',
  //         data: datapoints,
  //         borderColor: 'green',
  //         fill: false,
  //       },
  //     ],
  //   };

  //   this.config = {
  //     type: 'line',
  //     data: data,
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         title: {
  //           display: true,
  //           text: 'Chart.js Line Chart - Cubic interpolation mode',
  //         },
  //       },
  //       interaction: {
  //         intersect: false,
  //       },
  //       scales: {
  //         x: {
  //           display: true,
  //           title: {
  //             display: true,
  //           },
  //         },
  //         y: {
  //           display: true,
  //           title: {
  //             display: true,
  //             text: 'Value',
  //           },
  //           suggestedMin: -10,
  //           suggestedMax: 200,
  //         },
  //       },
  //     },
  //   };

  //   this.chart = new Chart('MyChart', this.config);
  // }

  constructor(@Inject(DOCUMENT) private document: Document) {}
  ngOnInit(): void {
    const labels = ['Red Vans', 'Blue Vans', 'Green Vans', 'Gray Vans'];
    const images = [
      'https://i.sstatic.net/2RAv2.png',
      'https://i.sstatic.net/Tq5DA.png',
      'https://i.sstatic.net/3KRtW.png',
      'https://i.sstatic.net/iLyVi.png',
    ].map((png) => {
      const image = new Image();
      image.src = png;
      return image;
    });
    const values = [48, 56, 33, 44];
    debugger;
    new Chart(
      this.document?.getElementById('MyChartTEST') as any,
      {
        type: 'line',
        plugins: [
          {
            afterDraw: (chart: any) => {
              var ctx = chart.ctx;
              var xAxis = chart.scales?.x;
              var yAxis = chart.scales?.y;
              yAxis.ticks.forEach((value: any, index: any) => {
                var y = yAxis.getPixelForTick(index);
                (ctx as CanvasDrawImage).drawImage(
                  images[index],
                  xAxis.left - 40,
                  y - 10
                );
              });
            },
          },
        ],
        data: {
          labels: labels,
          datasets: [
            {
              label: 'My Dataset',
              data: values,
              backgroundColor: ['red', 'blue', 'green', 'lightgray'],
            },
          ],
        },
        options: {
          responsive: true,
          layout: {
            padding: {
              left: 50,
            },
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      } as any
    );
  }
}
