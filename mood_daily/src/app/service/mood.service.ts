import { Injectable } from '@angular/core';
export interface MoodStatus {
  key: string;
  url: string;
  name: string;
  backgroundSelected: string;
}
@Injectable({
  providedIn: 'root',
})
export class MoodService {
  moodList: {
    status: MoodStatus;
    title: string;
    desc: string;
  }[] = [
    {
      status: {
        key: 'anxious',
        url: 'assets/icon/anxious.svg',
        name: 'anxious',
        backgroundSelected: 'rgba(225, 102, 0, 0.15)',
      },
      title: 'Nervous Energy',
      desc: 'Felt uneasy and restless most of the day.',
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
    },
  ];
  constructor() {}
}
