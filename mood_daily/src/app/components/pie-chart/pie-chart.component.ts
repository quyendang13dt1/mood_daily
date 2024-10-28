import { CommonModule, DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { debug } from 'console';
import { MOOD_STATUS, MOOD_STATUS_KEY } from '../mood-form/mood-form.component';
import { ChartModule } from 'primeng/chart';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { MoodService } from '../../service/mood.service';
import { Subscription } from 'rxjs';
import { Utility } from '../../utility/utility.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

export const TREND_DATA: any = {
  [MOOD_STATUS_KEY.EXCITED]: {
    daily:
      'Brimming with energy! Something amazing has stirred a sense of excitement, making you feel fully alive and eager for what’s to come.',
    weekly:
      'Excitement has characterized your week, with thrilling moments that filled you with energy and enthusiasm. Whether it was new opportunities or uplifting news, these days have been vibrant and fulfilling. Keep riding this wave of excitement and let it propel you into new adventures!',
    suggestions: [
      `Channel the energy: Start a new project or plan an adventure. 🏞️`,
      `Share the excitement: Tell someone about your good news. 🗣️`,
      `Plan ahead: Use your enthusiasm to organize something fun. 🗓️`,
      `Creative outlet: Draw, paint, or journal about your excitement. 🎨`,
      `Exercise: Use your energy for a quick workout. 🏃‍♂️`,
    ],
  },
  [MOOD_STATUS_KEY.HAPPPY]: {
    daily:
      'Today was light and joyful! It felt easy to smile, and everything seemed to align. Cherish these moments—they’re precious.',
    weekly:
      'Happiness has been a notable theme this week, with several joyful moments that brought a smile to your face. Celebrating small victories and cherishing time spent with loved ones has lifted your spirits. Embrace these happy days and let them inspire you to seek more positivity in the future.',

    suggestions: [
      `Celebrate small wins: Treat yourself to something nice. 🍰`,
      `Share the joy: Call a friend and spread your happiness. 📞`,
      `Do something kind: Help someone in need or perform a random act of kindness. 💌`,
      `Capture the moment: Write down what made you feel happy today. 📔`,
      `Dance it out: Play your favorite upbeat music and dance! 🎶`,
    ],
  },
  [MOOD_STATUS_KEY.NEUTRAL]: {
    daily:
      'Neutral, with occasional moments of stress. It seems like you’re in a balanced state—not too bad, but not entirely comfortable either. This is completely normal!',
    weekly:
      'This week has been marked by a sense of neutrality, with days that were largely uneventful. It’s a reminder that not every day needs to be extraordinary; sometimes, simply existing in a balanced state is enough. Use this time to reflect, recharge, and prepare for the days ahead.',

    suggestions: [
      `Try something new: Explore a new hobby or skill. 🎨`,
      `Mindful eating: Savor a meal without distractions. 🍽️`,
      `Stretch: Do some light stretches or yoga. 🧎‍♂️`,
      `Declutter: Organize a small area in your space. 📦`,
      `Social connection: Send a message to someone you haven’t talked to in a while. 💬`,
    ],
  },
  [MOOD_STATUS_KEY.ANXIOUS]: {
    daily:
      'Felt a little on edge, as if things were slightly out of control. But remember, these moments are temporary, and you’re doing your best.',
    weekly:
      "The past week has brought a significant amount of anxiety, filled with moments of restlessness and worry. While some days felt overwhelming, it's important to remember that these feelings are valid. Taking small steps to address your concerns and practicing mindfulness can help you find calm amidst the chaos.",

    suggestions: [
      `Deep breathing exercises: Practice 4-7-8 breathing technique. 🌬️`,
      `Progressive muscle relaxation: Slowly relax each part of your body. 🧘`,
      `Limit screen time: Take breaks from phone or computer use. 📵`,
      `Grounding techniques: Try "5-4-3-2-1" to stay present. 🖐️`,
      `Herbal tea: Enjoy a calming tea like chamomile. 🍵`,
    ],
  },
  [MOOD_STATUS_KEY.SAD]: {
    daily: `A bit gloomy today, with moments of reflection. It's okay to feel down sometimes—tomorrow is a new day.`,
    weekly:
      "This week has been challenging, with a predominant feeling of sadness. A few days felt particularly heavy, making it hard to find joy in daily activities. It's okay to acknowledge these feelings and take time to heal. Remember, every cloud has a silver lining, and brighter days are ahead.",
    suggestions: [
      `Engage in self-care: Take a warm bath or listen to soothing music. 🛀🎵`,
      `Express emotions: Write your thoughts in a journal. 📝`,
      `Connect with loved ones: Talk to a close friend or family member. ❤️`,
      `Watch something uplifting: A favorite movie or comedy show. 🎥`,
      `Physical activity: A short walk to release endorphins. 🚶`,
    ],
  },
};

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
    OverlayPanelModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit, AfterViewInit {
  @Output() onCreateMoodEmit = new EventEmitter<any>();
  data: any;
  config: any = {};
  chart: any;
  moodList: any[] = Object.values(MOOD_STATUS)?.reverse();

  statusToday = MOOD_STATUS[MOOD_STATUS_KEY.HAPPPY];

  subscription = new Subscription();

  dailyStatus: string = '';
  weeklyStatus: string = '';
  suggestions: string[] = [];

  ratingLast7Days: number = 0;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private moodService: MoodService,
    private messageService: MessageService
  ) {
    // var ctx = (this.document.getElementById("pie-chart") as any)?.getContext("2d");
  }
  ngOnInit(): void {
    const moodList$ = this.moodService.moodList$.subscribe((rs) => {
      const itemToday = rs?.find((x) => Utility.isToday(x?.createdTime)) as any;
      this.statusToday = itemToday ? MOOD_STATUS[itemToday?.status?.key] : null;

      this.dailyStatus = TREND_DATA[itemToday?.status?.key]?.daily ?? '';

      this.ratingLast7Days = Utility.getRateAverageLast7Days(rs);
      this.weeklyStatus =
        TREND_DATA[
          this.moodList?.find((x) => x?.value === this.ratingLast7Days)?.key ??
            MOOD_STATUS_KEY.EXCITED
        ]?.weekly ?? '';

      this.suggestions =
        TREND_DATA[
          itemToday?.status?.key ??
            this.moodList?.find((x) => x?.value === this.ratingLast7Days)
              ?.key ??
            MOOD_STATUS_KEY.EXCITED
        ]?.suggestions;
      this.loadChart();
    });
    this.subscription.add(moodList$);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
          label: 'Your mood parameters for today.',
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
          tooltip: {
            callbacks: {
              title: () => {
                return '';
              },
              label: (tooltipItem: any) => {
                return ` ${MOOD_STATUS[tooltipItem?.label].nameCase}`;
              },
            },
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

    if (!this.chart) {
      this.chart = new Chart('pipeChart', this.config);
    }

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

  onCommingSoon() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: 'Comming Soon!',
    });
  }

  onCrateMood() {
    this.onCreateMoodEmit.emit(true);
  }
}
