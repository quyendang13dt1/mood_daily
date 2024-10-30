import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MoodService } from '../../service/mood.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { MOOD_STATUS } from '../mood-form/mood-form.component';

@Component({
  selector: 'app-statistical',
  standalone: true,
  imports: [MeterGroupModule, CardModule, ButtonModule, CommonModule],
  templateUrl: './statistical.component.html',
  styleUrl: './statistical.component.scss',
})
export class StatisticalComponent {
  value = [
    {
      label: 'Positive Emotions',
      color1: '#34d399',
      color2: '#fbbf24',
      value: 25,
      icon: 'pi pi-arrow-up',
      image: 'assets/emotions/positive.svg',
      percent: 0.8,
      bgPercent: '#0bd18a',
      bgPercentshadow: '0px 6px 20px rgba(11, 209, 138, 0.3)',
    },
    {
      label: 'Negative Emotions',
      color1: '#fbbf24',
      color2: '#60a5fa',
      value: 15,
      icon: 'pi pi-arrow-down',
      image: 'assets/emotions/negative.svg',
      percent: 0.6,
      bgPercent: '#fc6161',
      bgPercentshadow: '0px 6px 20px rgba(252, 97, 97, 0.3)',
    },
    {
      label: 'Neutral Emotions',
      color1: '#60a5fa',
      color2: '#c084fc',
      value: 20,
      icon: 'pi pi-minus',
      image: 'assets/emotions/neutral.svg',
      percent: 0.2,
      bgPercent: '#00d0de',
      bgPercentshadow: '0px 6px 20px rgba(0, 208, 222, 0.3)',
    },
    // {
    //   label: 'System',
    //   color1: '#c084fc',
    //   color2: '#c084fc',
    //   value: 10,
    //   icon: 'pi pi-cog',
    // },
  ];

  subscription = new Subscription();

  constructor(private moodService: MoodService) {}

  ngOnInit(): void {
    const moodList$ = this.moodService.moodList$.subscribe((rs) => {
      this.value[0].value = rs.reduce(
        (acc: any, val: any) =>
          acc + (MOOD_STATUS[val?.status?.key]?.value > 3 ? 1 : 0),
        0
      );
      this.value[1].value = rs.reduce(
        (acc: any, val: any) =>
          acc + (MOOD_STATUS[val?.status?.key]?.value === 3 ? 1 : 0),
        0
      );
      this.value[2].value = rs.reduce(
        (acc: any, val: any) =>
          acc + (MOOD_STATUS[val?.status?.key]?.value < 3 ? 1 : 0),
        0
      );
    });
    this.subscription.add(moodList$);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
