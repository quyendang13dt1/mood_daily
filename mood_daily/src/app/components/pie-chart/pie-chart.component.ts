import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { debug } from 'console';
import { MOOD_STATUS } from '../mood-form/mood-form.component';

Chart.register(...registerables);

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit, AfterViewInit {
  data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  };
  config: any = {
    type: 'doughnut',
    data: this.data,
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
    responsive: true,
    maintainAspectRatio: false, // Không duy trì tỷ lệ khung mặc định
    layout: {
      padding: {
        top: 0,
        bottom: -50, // Thu gọn khoảng trống phía dưới
      },
    },
  };
  chart: any;
  moodList: any[] = Object.values(MOOD_STATUS);
  constructor(@Inject(DOCUMENT) private document: Document) {
    // var ctx = (this.document.getElementById("pie-chart") as any)?.getContext("2d");
    this.chart = new Chart('pipeChart', this.config);
  }
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //     const canvas = document.getElementById('pipeChart') as HTMLCanvasElement;
    // canvas.width = 300;
    // canvas.height = 150;
    // const canvas = this.document.getElementById('pie-chart') as HTMLCanvasElement;
    // if (canvas) {
    //   this.chart = new Chart(canvas, this.config);
    // }
  }
}
