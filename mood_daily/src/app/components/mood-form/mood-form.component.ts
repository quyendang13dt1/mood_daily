import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MoodService, MoodStatus } from '../../service/mood.service';

export enum MOOD_STATUS_KEY {
  EXCITED = 'excited',
  HAPPPY = 'happy',
  NEUTRAL = 'neutral',
  ANXIOUS = 'anxious',
  SAD = 'sad',
}

export const MOOD_STATUS: any = {
  [MOOD_STATUS_KEY.EXCITED]: {
    value: 5,
    key: 'excited',
    url: 'assets/icon/excited.svg',
    name: 'excited',
    nameCase: 'Excited',
    backgroundSelected: 'rgb(10,184,10, 0.15)',
    color: 'rgb(10,184,10)',
  },
  [MOOD_STATUS_KEY.HAPPPY]: {
    value: 4,
    key: 'happy',
    url: 'assets/icon/happy.svg',
    name: 'happy',
    nameCase: 'Happy',
    backgroundSelected: 'rgb(132,179,5,0.15)',
    color: 'rgb(132,179,5)',
  },
  [MOOD_STATUS_KEY.NEUTRAL]: {
    value: 3,
    key: 'neutral',
    url: 'assets/icon/neutral.svg',
    name: 'neutral',
    nameCase: 'Neutral',
    backgroundSelected: 'rgb(225,199,10,0.15)',
    color: 'rgb(225,199,10)',
  },
  [MOOD_STATUS_KEY.ANXIOUS]: {
    value: 2,
    key: 'anxious',
    url: 'assets/icon/anxious.svg',
    name: 'anxious',
    nameCase: 'Anxious',
    backgroundSelected: 'rgb(225, 102, 0, 0.15)',
    color: 'rgb(225, 102, 0)',
  },
  [MOOD_STATUS_KEY.SAD]: {
    value: 1,
    key: 'sad',
    url: 'assets/icon/sad.svg',
    name: 'sad',
    nameCase: 'Sad',
    backgroundSelected: 'rgb(209,2,6,0.15)',
    color: 'rgb(209,2,6)',
  },
};
@Component({
  selector: 'app-mood-form',
  standalone: true,
  imports: [ButtonModule, InputTextModule, InputTextareaModule, FormsModule],
  templateUrl: './mood-form.component.html',
  styleUrl: './mood-form.component.scss',
})
export class MoodFormComponent {
  @Output() close = new EventEmitter<any>();
  moodList: any[] = Object.values(MOOD_STATUS);

  moodStatus: any;
  moodTitle: string = '';
  moodeDesc: string = '';

  isSubmit = false;

  constructor(private moodService: MoodService) {}
  onClose() {
    this.close.emit(true);
  }

  onSubmit() {
    this.isSubmit = true;
    if (!(this.moodStatus && this.moodTitle && this.moodeDesc)) {
      return;
    }
    this.moodService.addMoodDaily({
      status: this.moodStatus,
      title: this.moodTitle,
      desc: this.moodeDesc,
      createdTime: new Date()?.getTime(),
    });
    this.resetForm();
    this.close.emit(true);
  }

  resetForm() {
    this.moodStatus = '';
    this.moodTitle = '';
    this.moodeDesc = '';
  }
}
