import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  DATA_COUNT = 12;
  labels: any[] = [];
  config: any = {};

  chart: any;

  ngOnInit(): void {
    for (let i = 0; i < this.DATA_COUNT; ++i) {
      this.labels.push(i.toString());
    }
    const datapoints = [
      0,
      20,
      20,
      60,
      60,
      120,
      NaN,
      180,
      120,
      125,
      105,
      110,
      170,
    ];
    const data = {
      labels: this.labels,
      datasets: [
        {
          label: 'Cubic interpolation (monotone)',
          data: datapoints,
          borderColor: 'red',
          fill: false,
          cubicInterpolationMode: 'monotone',
          tension: 0.4,
        },
        {
          label: 'Cubic interpolation',
          data: datapoints,
          borderColor: 'blue',
          fill: false,
          tension: 0.4,
        },
        {
          label: 'Linear interpolation (default)',
          data: datapoints,
          borderColor: 'green',
          fill: false,
        },
      ],
    };

    this.config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Line Chart - Cubic interpolation mode',
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Value',
            },
            suggestedMin: -10,
            suggestedMax: 200,
          },
        },
      },
    };

    this.chart = new Chart('MyChart', this.config);
  }
}
