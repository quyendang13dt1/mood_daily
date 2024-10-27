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
import { Utility } from '../../utility/utility.service';

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

export enum Time {
  WEEK = 'This Week',
  MONTH = 'This Month',
}

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
    // { name: 'Last Week', code: 'Last Week' },
    { name: 'This Week', code: 'This Week' },
    { name: 'This Month', code: 'This Month' },
    // { name: 'This Year', code: 'This Year' },
  ];
  loadingTimeList = true;
  selectedTime = this.timeList[0];
  subscription = new Subscription();
  rsOrg: any;
  dataConvert: any;
  isOnInit = false;
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
        x['top'] = ((heightColumnChartTemp - 30) / 5) * index - 10;
      });
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.loadChart();
    // this.updateImageYAxis();
  }

  onChangeTime(): any {
    switch (this.selectedTime?.code) {
      case Time.WEEK: {
        this.dataConvert = this.getDatesInWeek().map((date) => {
          return {
            date: date,
            status: this.findStatusByDate(this.rsOrg, date),
          };
        });
        break;
      }
      case Time.MONTH: {
        this.dataConvert = this.getDatesInMonth().map((date) => {
          return {
            date: date,
            status: this.findStatusByDate(this.rsOrg, date),
          };
        });
        console.log('this.dataConvert', this.dataConvert);
        break;
      }
    }
    this.loadChart();
  }

  // Find data
  getStartOfWeek(date: Date): Date {
    const day = date.getDay(); // 0: Chủ Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Điều chỉnh cho Thứ Hai
    const startOfWeek = new Date(date.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00
    return startOfWeek;
  }

  // Get Date in week
  getDatesInWeek(): Date[] {
    const startOfWeek = this.getStartOfWeek(new Date());
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  }

  findStatusByDate(data: any[], targetDate: Date): any {
    const foundItem = data.find((item) => {
      const itemDate = new Date(item.createdTime);
      return (
        itemDate.getFullYear() === targetDate.getFullYear() &&
        itemDate.getMonth() === targetDate.getMonth() &&
        itemDate.getDate() === targetDate.getDate()
      );
    });
    return foundItem ? foundItem.status : null;
  }

  // Get Date in month
  getDatesInMonth(): Date[] {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month, i + 1);
      date.setHours(0, 0, 0, 0);
      return date;
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.loadingTimeList = false;
      this.selectedTime = this.timeList?.[0];
    }, 700);

    const moodList$ = this.moodService.moodList$.subscribe((rs) => {
      this.rsOrg = rs;
      this.onChangeTime();
    });
    this.subscription.add(moodList$);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadChart() {
    this.basicData = {
      labels: this.dataConvert?.map((x: any) => {
        return this.datePipe.transform(x?.date, 'dd.MMM');
      }),
      datasets: [
        {
          label: 'Mood',
          data: this.dataConvert?.map((x: any) => {
            return MOOD_STATUS[x?.status?.key]?.value ?? 0;
          }),
          backgroundColor: this.dataConvert?.map((x: any) => {
            return MOOD_STATUS[x?.status?.key]?.color;
          }),
          borderColor: this.dataConvert?.map((x: any) => {
            return MOOD_STATUS[x?.status?.key]?.color;
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

    let delayed: any;
    this.basicOptions = {
      animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context: any) => {
          if (this.isOnInit) {
            return 0;
          }
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
            display: false,
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
    setTimeout(() => {
      this.isOnInit = true;
    });
    this.updateImageYAxis();
  }
}
