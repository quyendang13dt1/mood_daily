import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MoodService, MoodStatus } from '../../service/mood.service';

@Component({
  selector: 'app-mood-form',
  standalone: true,
  imports: [ButtonModule, InputTextModule, InputTextareaModule, FormsModule],
  templateUrl: './mood-form.component.html',
  styleUrl: './mood-form.component.scss',
})
export class MoodFormComponent {
  @Output() close = new EventEmitter<any>();
  moodList: MoodStatus[] = [
    {
      key: 'excited',
      url: 'assets/icon/excited.svg',
      name: 'excited',
      backgroundSelected: 'rgb(10,184,10, 0.15)',
    },
    {
      key: 'happy',
      url: 'assets/icon/happy.svg',
      name: 'happy',
      backgroundSelected: 'rgb(132,179,5,0.15)',
    },
    {
      key: 'neutral',
      url: 'assets/icon/neutral.svg',
      name: 'neutral',
      backgroundSelected: 'rgb(225,199,10,0.15)',
    },
    {
      key: 'anxious',
      url: 'assets/icon/anxious.svg',
      name: 'anxious',
      backgroundSelected: 'rgb(225, 102, 0, 0.15)',
    },
    {
      key: 'sad',
      url: 'assets/icon/sad.svg',
      name: 'sad',
      backgroundSelected: 'rgb(209,2,6,0.15)',
    },
  ];

  moodStatus: any;
  moodTitle: string = '';
  moodeDesc: string = '';

  constructor(private moodService: MoodService) {}
  onClose() {
    this.close.emit(true);
  }

  onSubmit() {
    this.moodService.moodList?.push({
      status: this.moodStatus,
      title: this.moodTitle,
      desc: this.moodeDesc,
    });
    this.close.emit(true);
    console.log('zzzzzz', this.moodService.moodList);
  }
}
