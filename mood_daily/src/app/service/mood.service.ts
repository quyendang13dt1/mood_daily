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
        key: 'excited',
        url: 'assets/icon/excited.svg',
        name: 'excited',
        backgroundSelected: 'rgb(10,184,10, 0.15)',
      },
      title: 'Hello',
      desc: 'flex shadow-2 justify-content-center align-items-center h-5rem sm:h-10rem animation-duration-1000 animation-ease-in-out card ',
    },
  ];
  constructor() {}
}
