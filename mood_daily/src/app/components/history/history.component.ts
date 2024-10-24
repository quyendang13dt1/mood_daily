import { Component, OnInit } from '@angular/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { MoodService } from '../../service/mood.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [AnimateOnScrollModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  history: any = [];
  constructor(private moodService: MoodService) {}
  ngOnInit(): void {
    this.history = this.moodService.moodList;
  }
}
