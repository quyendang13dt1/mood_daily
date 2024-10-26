import { CommonModule, DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { debug } from 'console';
import { MOOD_STATUS, MOOD_STATUS_KEY } from '../mood-form/mood-form.component';
import { ChartModule } from 'primeng/chart';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

Chart.register(...registerables);

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    FieldsetModule,
    FormsModule,
    RatingModule,
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit, AfterViewInit {
  data: any;
  config: any = {};
  chart: any;
  moodList: any[] = Object.values(MOOD_STATUS)?.reverse();

  statusToday = MOOD_STATUS[MOOD_STATUS_KEY.HAPPPY];
  constructor(@Inject(DOCUMENT) private document: Document) {
    // var ctx = (this.document.getElementById("pie-chart") as any)?.getContext("2d");
  }
  ngOnInit(): void {
    this.loadChart();
  }

  ngAfterViewInit(): void {
    //     const canvas = document.getElementById('pipeChart') as HTMLCanvasElement;
    // canvas.width = 300;
    // canvas.height = 150;
    // const canvas = this.document.getElementById('pie-chart') as HTMLCanvasElement;
    // if (canvas) {
    //   this.chart = new Chart(canvas, this.config);
    // }
  }

  loadChart() {
    this.data = {
      labels: this.moodList?.map((x) => x?.name),
      datasets: [
        {
          label: 'My First Dataset',
          data: this.moodList?.map((x) => 20),
          backgroundColor: this.moodList?.map((x) => x?.color),
          hoverOffset: 4,
        },
      ],
    };
    this.config = {
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
    this.chart = new Chart('pipeChart', this.config);

    // const rotateBox = this.document.getElementById('rotateBox');

    // if (rotateBox) {
    //   // rotateBox.style.setProperty('--rotation-start', `${202}deg`);
    //   // rotateBox.style.setProperty(
    //   //   '--rotation-end',
    //   //   `${202 + 36 * (this.statusToday?.value - 1)}deg`
    //   // );
    //   // rotateBox.style.animation = `rotate 2s ease-in-out forwards`;
    //   console.log('rotateBox', rotateBox);
    // }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.loadChart();
  }
}
