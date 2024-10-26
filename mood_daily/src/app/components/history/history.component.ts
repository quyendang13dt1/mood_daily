import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { MoodService } from '../../service/mood.service';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../../pipe/pipe.module';
import { Subscription } from 'rxjs';
import { ScrollPanelModule } from 'primeng/scrollpanel';
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [AnimateOnScrollModule, CommonModule, PipeModule, ScrollPanelModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit, OnDestroy {
  history: any = [];
  subscription = new Subscription();
  constructor(private moodService: MoodService) {}
  ngOnInit(): void {
    const moodList$ = this.moodService.moodList$.subscribe((rs) => {
      this.history = rs;
    });

    this.subscription.add(moodList$);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
