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

    // Fake
    {
      status: {
        key: 'sad',
        url: 'assets/icon/sad.svg',
        name: 'sad',
        backgroundSelected: 'rgba(209, 2, 6, 0.15)',
      },
      title: 'Down in the Dumps',
      desc: 'A tough day emotionally, hoping tomorrow will be better.',
      createdTime: 1727710687614,
    },
    {
      status: {
        key: 'sad',
        url: 'assets/icon/sad.svg',
        name: 'sad',
        backgroundSelected: 'rgba(209, 2, 6, 0.15)',
      },
      title: 'Feeling Blue',
      desc: "Couldn't shake off the sadness today.",
      createdTime: 1727797087614,
    },
    {
      status: {
        key: 'excited',
        url: 'assets/icon/excited.svg',
        name: 'excited',
        backgroundSelected: 'rgba(10, 184, 10, 0.15)',
      },
      title: 'Energized',
      desc: 'Received exciting news that made my day.',
      createdTime: 1727883487614,
    },
    {
      status: {
        key: 'anxious',
        url: 'assets/icon/anxious.svg',
        name: 'anxious',
        backgroundSelected: 'rgba(225, 102, 0, 0.15)',
      },
      title: 'Nervous Energy',
      desc: 'Overwhelmed by little things today.',
      createdTime: 1727969887614,
    },
    {
      status: {
        key: 'neutral',
        url: 'assets/icon/neutral.svg',
        name: 'neutral',
        backgroundSelected: 'rgba(225, 199, 10, 0.15)',
      },
      title: 'Balanced Day',
      desc: 'Nothing much happened, just a normal day.',
      createdTime: 1728056287614,
    },
    {
      status: {
        key: 'happy',
        url: 'assets/icon/happy.svg',
        name: 'happy',
        backgroundSelected: 'rgba(132, 179, 5, 0.15)',
      },
      title: 'Bright and Cheerful',
      desc: 'Happiness seemed to follow me everywhere.',
      createdTime: 1728142687614,
    },
    {
      status: {
        key: 'sad',
        url: 'assets/icon/sad.svg',
        name: 'sad',
        backgroundSelected: 'rgba(209, 2, 6, 0.15)',
      },
      title: 'Down in the Dumps',
      desc: 'A bit down today, needed some time to reflect.',
      createdTime: 1728229087614,
    },
    {
      status: {
        key: 'excited',
        url: 'assets/icon/excited.svg',
        name: 'excited',
        backgroundSelected: 'rgba(10, 184, 10, 0.15)',
      },
      title: "Can't Contain Myself!",
      desc: 'Received exciting news that made my day.',
      createdTime: 1728315487614,
    },
    {
      status: {
        key: 'happy',
        url: 'assets/icon/happy.svg',
        name: 'happy',
        backgroundSelected: 'rgba(132, 179, 5, 0.15)',
      },
      title: 'Sunshine Mood',
      desc: 'Happiness seemed to follow me everywhere.',
      createdTime: 1728401887614,
    },
    {
      status: {
        key: 'anxious',
        url: 'assets/icon/anxious.svg',
        name: 'anxious',
        backgroundSelected: 'rgba(225, 102, 0, 0.15)',
      },
      title: 'Uneasy Vibes',
      desc: 'Overwhelmed by little things today.',
      createdTime: 1728488287614,
    },
    {
      status: {
        key: 'anxious',
        url: 'assets/icon/anxious.svg',
        name: 'anxious',
        backgroundSelected: 'rgba(225, 102, 0, 0.15)',
      },
      title: 'Nervous Energy',
      desc: 'Mind kept racing without much reason.',
      createdTime: 1728574687614,
    },
    {
      status: {
        key: 'neutral',
        url: 'assets/icon/neutral.svg',
        name: 'neutral',
        backgroundSelected: 'rgba(225, 199, 10, 0.15)',
      },
      title: 'Ordinary Moments',
      desc: 'A calm, uneventful day without much excitement.',
      createdTime: 1728747487614,
    },
    {
      status: {
        key: 'anxious',
        url: 'assets/icon/anxious.svg',
        name: 'anxious',
        backgroundSelected: 'rgba(225, 102, 0, 0.15)',
      },
      title: 'Uneasy Vibes',
      desc: 'Overwhelmed by little things today.',
      createdTime: 1728833887614,
    },
    {
      status: {
        key: 'excited',
        url: 'assets/icon/excited.svg',
        name: 'excited',
        backgroundSelected: 'rgba(10, 184, 10, 0.15)',
      },
      title: 'Energized',
      desc: 'Full of energy and enthusiasm all day!',
      createdTime: 1729093087614,
    },
    {
      status: {
        key: 'happy',
        url: 'assets/icon/happy.svg',
        name: 'happy',
        backgroundSelected: 'rgba(132, 179, 5, 0.15)',
      },
      title: 'Bright and Cheerful',
      desc: 'Happiness seemed to follow me everywhere.',
      createdTime: 1729179487614,
    },
    {
      status: {
        key: 'excited',
        url: 'assets/icon/excited.svg',
        name: 'excited',
        backgroundSelected: 'rgba(10, 184, 10, 0.15)',
      },
      title: "Can't Contain Myself!",
      desc: 'Full of energy and enthusiasm all day!',
      createdTime: 1729265887614,
    },
    {
      status: {
        key: 'neutral',
        url: 'assets/icon/neutral.svg',
        name: 'neutral',
        backgroundSelected: 'rgba(225, 199, 10, 0.15)',
      },
      title: 'Steady Streams',
      desc: 'Nothing much happened, just a normal day.',
      createdTime: 1729352287614,
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
      createdTime: 1729438687614,
    },
    {
      status: {
        key: 'sad',
        url: 'assets/icon/sad.svg',
        name: 'sad',
        backgroundSelected: 'rgba(209, 2, 6, 0.15)',
      },
      title: 'Feeling Blue',
      desc: 'A tough day emotionally, hoping tomorrow will be better.',
      createdTime: 1729525087614,
    },
    {
      status: {
        key: 'neutral',
        url: 'assets/icon/neutral.svg',
        name: 'neutral',
        backgroundSelected: 'rgba(225, 199, 10, 0.15)',
      },
      title: 'Steady Streams',
      desc: 'Everything was neutral—no highs or lows.',
      createdTime: 1729611487614,
    },
    {
      status: {
        key: 'anxious',
        url: 'assets/icon/anxious.svg',
        name: 'anxious',
        backgroundSelected: 'rgba(225, 102, 0, 0.15)',
      },
      title: 'Tense Moments',
      desc: 'Overwhelmed by little things today.',
      createdTime: 1729697887614,
    },
    {
      status: {
        key: 'happy',
        url: 'assets/icon/happy.svg',
        name: 'happy',
        backgroundSelected: 'rgba(132, 179, 5, 0.15)',
      },
      title: 'Sunshine Mood',
      desc: 'Happiness seemed to follow me everywhere.',
      createdTime: 1729784287614,
    },
    {
      status: {
        key: 'anxious',
        url: 'assets/icon/anxious.svg',
        name: 'anxious',
        backgroundSelected: 'rgba(225, 102, 0, 0.15)',
      },
      title: 'Uneasy Vibes',
      desc: 'Felt uneasy and restless most of the day.',
      createdTime: 1729870687614,
    },
    {
      status: {
        key: 'sad',
        url: 'assets/icon/sad.svg',
        name: 'sad',
        backgroundSelected: 'rgba(209, 2, 6, 0.15)',
      },
      title: 'Down in the Dumps',
      desc: "Couldn't shake off the sadness today.",
      createdTime: 1729957087614,
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
      createdTime: 1730043487614,
    },
    {
      status: {
        key: 'anxious',
        url: 'assets/icon/anxious.svg',
        name: 'anxious',
        backgroundSelected: 'rgba(225, 102, 0, 0.15)',
      },
      title: 'Uneasy Vibes',
      desc: 'Felt uneasy and restless most of the day.',
      createdTime: 1730129887614,
    },
    {
      status: {
        key: 'happy',
        url: 'assets/icon/happy.svg',
        name: 'happy',
        backgroundSelected: 'rgba(132, 179, 5, 0.15)',
      },
      title: 'Sunshine Mood',
      desc: 'Happiness seemed to follow me everywhere.',
      createdTime: 1730216287614,
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
      createdTime: currentTime - (index + 1) * 24 * 60 * 60 * 1000,
    }));
  }

  addMoodDaily(data: Mood) {
    this.moodList$.next([data, ...this.moodList$?.value]);
  }
}
