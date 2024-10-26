import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { MOOD_STATUS, MOOD_STATUS_KEY } from '../mood-form/mood-form.component';
import { Chart } from 'chart.js';
import { DatePipe, DOCUMENT } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MoodService } from '../../service/mood.service';

Chart.register({
  id: 'customYAxisIcons',
  afterRender: (chart: any) => {
    const yScale = chart.scales?.y;
    const ctx = chart.ctx;

    // Vẽ icon tương ứng với mỗi tick trên trục Y
    yScale?.ticks?.forEach((tick: any, index: any) => {
      const x = yScale.left - 30; // Vị trí X cho icon
      const y = yScale.getPixelForValue(tick.value); // Vị trí Y cho icon

      // Chọn icon dựa trên giá trị tick
      let iconSrc = '';
      switch (tick.value) {
        case 1:
          iconSrc = 'http://localhost:4200/assets/icon/excited.svg';
          break;
        case 2:
          iconSrc = 'assets/icon/happy.svg';
          break;
        case 3:
          iconSrc = 'assets/icon/neutral.svg';
          break;
        case 4:
          iconSrc = 'assets/icon/anxious.svg';
          break;
        case 5:
          iconSrc = 'assets/icon/sad.svg';
          break;
        default:
          return; // Bỏ qua nếu không có icon tương ứng
      }

      // Tạo đối tượng hình ảnh và vẽ icon lên canvas
      const img = new Image();
      img.src = iconSrc;
      img.onload = () => {
        var yIndex = yScale.getPixelForTick(index);
        ctx.drawImage(img, x, yIndex - 10, 20, 20); // Vẽ icon tại đúng vị trí
      };
    });
  },
});

@Component({
  selector: 'app-column-chart',
  standalone: true,
  imports: [ChartModule, DropdownModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './column-chart.component.html',
  styleUrl: './column-chart.component.scss',
})
export class ColumnChartComponent {
  @ViewChild('columnChartTemp') columnChartTemp!: any;
  basicData: any;

  basicOptions: any;
  chart: any;
  moodList: any[] = Object.values(MOOD_STATUS);

  timeList = [
    { name: 'Last Week', code: 'Last Week' },
    { name: 'This Week', code: 'This Week' },
    { name: 'This Month', code: 'This Month' },
    { name: 'This Year', code: 'This Year' },
  ];
  loadingTimeList = true;
  selectedTime: any;
  subscription = new Subscription();
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cdref: ChangeDetectorRef,
    private moodService: MoodService,
    private datePipe: DatePipe
  ) {}
  udpateChart() {
    // const ticks = document.querySelectorAll('.y-axis .tick');
    // // getElementByIdks
    // ticks.forEach((tick) => {
    //   const value = tick.textContent;
    //   debugger;
    //   switch (value) {
    //     case '2':
    //       tick.innerHTML =
    //         '<img src="assets/icon/happy.svg" width="20" height="20"/>';
    //       break;
    //     case '3':
    //       tick.innerHTML =
    //         '<img src="assets/icon/neutral.svg" width="20" height="20"/>';
    //       break;
    //   }
    // });
  }

  get heightColumnChartTemp() {
    return (
      this.document.getElementById('column-chart')?.offsetHeight ?? 0
    ); /* change this */
  }

  ngAfterViewInit() {
    this.updateImageYAxis();
    this.cdref.detectChanges();
  }

  updateImageYAxis() {
    setTimeout(() => {
      const heightColumnChartTemp =
        this.document.getElementById('column-chart')?.offsetHeight ?? 0;
      this.moodList.forEach((x, index) => {
        x['top'] = ((heightColumnChartTemp - 40) / 5) * index;
      });
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.loadChart();
  }

  ngOnInit() {
    setTimeout(() => {
      this.loadingTimeList = false;
      this.selectedTime = this.timeList?.[0];
    }, 700);

    const moodList$ = this.moodService.moodList$.subscribe((rs) => {
      const data = [...rs]?.reverse();
      this.basicData = {
        labels: data?.map((x: any) => {
          return this.datePipe.transform(x?.createdTime, 'dd.MMM yyyy');
        }),
        datasets: [
          {
            label: 'Mood',
            data: data?.map((x: any) => {
              return MOOD_STATUS[x?.status?.key].value;
            }),
            backgroundColor: data?.map((x: any) => {
              return MOOD_STATUS[x?.status?.key].color;
            }),
            borderColor: data?.map((x: any) => {
              return MOOD_STATUS[x?.status?.key].color;
            }),
            // backgroundColor: [
            //   MOOD_STATUS[MOOD_STATUS_KEY.NEUTRAL].color,
            //   MOOD_STATUS[MOOD_STATUS_KEY.HAPPPY].color,
            //   MOOD_STATUS[MOOD_STATUS_KEY.ANXIOUS].color,
            //   MOOD_STATUS[MOOD_STATUS_KEY.EXCITED].color,
            //   MOOD_STATUS[MOOD_STATUS_KEY.HAPPPY].color,
            //   MOOD_STATUS[MOOD_STATUS_KEY.ANXIOUS].color,
            //   MOOD_STATUS[MOOD_STATUS_KEY.EXCITED].color,
            // ],
            // borderColor: [
            //   MOOD_STATUS[MOOD_STATUS_KEY.NEUTRAL].color,
            //   MOOD_STATUS[MOOD_STATUS_KEY.HAPPPY].color,
            //   MOOD_STATUS[MOOD_STATUS_KEY.ANXIOUS].color,
            //   MOOD_STATUS[MOOD_STATUS_KEY.EXCITED].color,
            //   MOOD_STATUS[MOOD_STATUS_KEY.HAPPPY].color,
            //   MOOD_STATUS[MOOD_STATUS_KEY.ANXIOUS].color,
            //   MOOD_STATUS[MOOD_STATUS_KEY.EXCITED].color,
            // ],
            borderWidth: 1,
          },
        ],
      };
      this.loadChart();
    });
    this.subscription.add(moodList$);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadChart() {
    // const documentStyle = getComputedStyle(this.document.documentElement);
    // const textColor = documentStyle.getPropertyValue('--text-color');
    // const textColorSecondary = documentStyle.getPropertyValue(
    //   '--text-color-secondary'
    // );
    // const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // this.basicData = {
    //   labels: [
    //     '24.Oct 2024',
    //     '25.Oct 2024',
    //     '26.Oct 2024',
    //     '27.Oct 2024',
    //     '28.Oct 2024',
    //     '29.Oct 2024',
    //     '30.Oct 2024',
    //   ],
    //   datasets: [
    //     {
    //       label: 'Mood',
    //       data: [3, 4, 2, 5, 1, 2, 3, 4],
    //       backgroundColor: [
    //         MOOD_STATUS[MOOD_STATUS_KEY.NEUTRAL].color,
    //         MOOD_STATUS[MOOD_STATUS_KEY.HAPPPY].color,
    //         MOOD_STATUS[MOOD_STATUS_KEY.ANXIOUS].color,
    //         MOOD_STATUS[MOOD_STATUS_KEY.EXCITED].color,
    //         MOOD_STATUS[MOOD_STATUS_KEY.HAPPPY].color,
    //         MOOD_STATUS[MOOD_STATUS_KEY.ANXIOUS].color,
    //         MOOD_STATUS[MOOD_STATUS_KEY.EXCITED].color,
    //       ],
    //       borderColor: [
    //         MOOD_STATUS[MOOD_STATUS_KEY.NEUTRAL].color,
    //         MOOD_STATUS[MOOD_STATUS_KEY.HAPPPY].color,
    //         MOOD_STATUS[MOOD_STATUS_KEY.ANXIOUS].color,
    //         MOOD_STATUS[MOOD_STATUS_KEY.EXCITED].color,
    //         MOOD_STATUS[MOOD_STATUS_KEY.HAPPPY].color,
    //         MOOD_STATUS[MOOD_STATUS_KEY.ANXIOUS].color,
    //         MOOD_STATUS[MOOD_STATUS_KEY.EXCITED].color,
    //       ],
    //       borderWidth: 1,
    //     },
    //   ],
    // };
    let delayed: any;
    this.basicOptions = {
      animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context: any) => {
          let delay = 0;
          if (
            context.type === 'data' &&
            context.mode === 'default' &&
            !delayed
          ) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay;
        },
      },
      plugins: {
        legend: {
          labels: {
            // color: textColor,
          },
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: any) => {
              // Tùy chỉnh nội dung tooltip
              const label = tooltipItem.dataset.label || '';
              const value = tooltipItem.raw; // Giá trị của cột
              const status: any = Object.values(MOOD_STATUS)?.find(
                (x: any) => x?.value === value
              );
              // ${value}
              return `${label}: ${status?.name.replace(/^./, (char: any) =>
                char.toUpperCase()
              )}`;
            },
          },
        },
      },

      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            // color: textColorSecondary,
            stepSize: 1,
            callback: (value: any) => {
              switch (value) {
                case 1:
                  return '';
                case 2:
                  return '';
                case 3:
                  return '';
                case 4:
                  return '';
                case 5:
                  return '';
                default:
                  return '';
              }
            },
          },
          grid: {
            // color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            // color: textColorSecondary,
          },
          grid: {
            // color: surfaceBorder,
            drawBorder: false,
            display: false,
          },
        },
      },
    };

    this.updateImageYAxis();
  }
}
