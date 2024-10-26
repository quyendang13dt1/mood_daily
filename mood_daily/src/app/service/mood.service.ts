import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface MoodStatus {
  key: string;
  url: string;
  name: string;
  backgroundSelected: string;
}

export interface Mood {
  status: MoodStatus;
  title: string;
  desc: string;
  createdTime: number;
}
@Injectable({
  providedIn: 'root',
})
export class MoodService {
  moodListFake: Mood[] = [
    {
      status: {
        key: 'anxious',
        url: 'assets/icon/anxious.svg',
        name: 'anxious',
        backgroundSelected: 'rgba(225, 102, 0, 0.15)',
      },
      title: 'Nervous Energy',
      desc: 'Felt uneasy and restless most of the day.',
      createdTime: 1729954556556,
    },
    {
      status: {
        key: 'sad',
        url: 'assets/icon/sad.svg',
        name: 'sad',
        backgroundSelected: 'rgba(209, 2, 6, 0.15)',
      },
      title: 'Feeling Blue',
      desc: 'A bit down today, needed some time to reflect.',
      createdTime: 1729868156556,
    },
    {
      status: {
        key: 'excited',
        url: 'assets/icon/excited.svg',
        name: 'excited',
        backgroundSelected: 'rgba(10, 184, 10, 0.15)',
      },
      title: 'Big News!',
      desc: 'Received exciting news that made my day.',
      createdTime: 1729781756556,
    },
    {
      status: {
        key: 'happy',
        url: 'assets/icon/happy.svg',
        name: 'happy',
        backgroundSelected: 'rgba(132, 179, 5, 0.15)',
      },
      title: 'Bright and Cheerful',
      desc: 'Everything felt positive and light today.',
      createdTime: 1729695356556,
    },
    {
      status: {
        key: 'neutral',
        url: 'assets/icon/neutral.svg',
        name: 'neutral',
        backgroundSelected: 'rgba(225, 199, 10, 0.15)',
      },
      title: 'Balanced Day',
      desc: 'A calm, uneventful day without much excitement.',
      createdTime: 1729608956556,
    },
    {
      status: {
        key: 'anxious',
        url: 'assets/icon/anxious.svg',
        name: 'anxious',
        backgroundSelected: 'rgba(225, 102, 0, 0.15)',
      },
      title: 'Tense Moments',
      desc: 'Felt overwhelmed by little things throughout the day.',
      createdTime: 1729522556556,
    },
    {
      status: {
        key: 'sad',
        url: 'assets/icon/sad.svg',
        name: 'sad',
        backgroundSelected: 'rgba(209, 2, 6, 0.15)',
      },
      title: 'Not My Day',
      desc: 'A tough day emotionally, hoping tomorrow will be better.',
      createdTime: 1729436156556,
    },
  ];

  moodList$ = new BehaviorSubject<Mood[]>([]);

  constructor() {
    const updatedData = this.addCreatedTime(this.moodListFake);
    this.moodList$.next(updatedData);
  }

  addCreatedTime(data: any[]) {
    const currentTime = Date.now();
    return data.map((item, index) => ({
      ...item,
      createdTime: currentTime - index * 24 * 60 * 60 * 1000,
    }));
  }

  addMoodDaily(data: Mood) {
    this.moodList$.next([data, ...this.moodList$?.value]);
  }
}
