import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-half-doughnut',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './half-doughnut.component.html',
  styleUrl: './half-doughnut.component.scss',
})
export class HalfDoughnutComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    // const options1 = {
    //   type: 'doughnut',
    //   data: {
    //     labels: ['Red', 'Orange', 'Green'],
    //     datasets: [
    //       {
    //         label: '# of Votes',
    //         data: [33, 33, 33],
    //         backgroundColor: [
    //           'rgba(231, 76, 60, 1)',
    //           'rgba(255, 164, 46, 1)',
    //           'rgba(46, 204, 113, 1)',
    //         ],
    //         borderColor: [
    //           'rgba(255, 255, 255 ,1)',
    //           'rgba(255, 255, 255 ,1)',
    //           'rgba(255, 255, 255 ,1)',
    //         ],
    //         borderWidth: 5,
    //       },
    //     ],
    //   },
    //   options: {
    //     rotation: 1 * Math.PI,
    //     circumference: 1 * Math.PI,
    //     legend: {
    //       display: false,
    //     },
    //     tooltip: {
    //       enabled: false,
    //     },
    //     cutoutPercentage: 95,
    //   },
    // } as any;

    // const ctx1 = (
    //   this.document.getElementById('chartJSContainer') as any
    // )?.getContext('2d');
    // new Chart(
    //   this.document.getElementById('chartJSContainer') as any,
    //   options1
    // );

    // var options2 = {
    //   type: 'doughnut',
    //   data: {
    //     labels: ['', 'Purple', ''],
    //     datasets: [
    //       {
    //         data: [88.5, 1, 10.5],
    //         backgroundColor: [
    //           'rgba(0,0,0,0)',
    //           'rgba(255,255,255,1)',
    //           'rgba(0,0,0,0)',
    //         ],
    //         borderColor: [
    //           'rgba(0, 0, 0 ,0)',
    //           'rgba(46, 204, 113, 1)',
    //           'rgba(0, 0, 0 ,0)',
    //         ],
    //         borderWidth: 3,
    //       },
    //     ],
    //   },
    //   options: {
    //     cutoutPercentage: 95,
    //     rotation: 1 * Math.PI,
    //     circumference: 1 * Math.PI,
    //     legend: {
    //       display: false,
    //     },
    //     tooltips: {
    //       enabled: false,
    //     },
    //   },
    // } as any;

    // const ctx2 = (
    //   this.document.getElementById('secondContainer') as any
    // )?.getContext('2d');
    // new Chart(this.document.getElementById('secondContainer') as any, options2);

    // Data for the donut chart (Group 2 first, then Group 1)
    const data = {
      labels: ['Group 2', 'Group 1'], // Swap the order of labels
      datasets: [
        {
          data: [30, 70], // Swap the order of data values
          backgroundColor: ['#A1A5B7', '#F1BC00'], // Colors for each group
        },
      ],
    };

    // Configuration for the chart
    const config = {
      type: 'doughnut', // Use doughnut chart type for a donut chart
      data: data,
      options: {
        rotation: -90,
        circumference: 180,
        cutout: '70%', // Cutout percentage for a 180-degree chart
        plugins: {
          legend: {
            display: false, // Hide the legend if not needed
          },
        },
      },
    } as any;

    // Get the canvas element and create the chart
    const canvas = this.document.getElementById('donut-chart') as any;
    const ctx = canvas.getContext('2d');
    new Chart(ctx, config);
  }
}
