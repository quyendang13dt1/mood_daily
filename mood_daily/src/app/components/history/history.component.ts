import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { MoodService } from '../../service/mood.service';
import { CommonModule, DOCUMENT } from '@angular/common';
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
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private moodService: MoodService
  ) {}
  ngOnInit(): void {
    const moodList$ = this.moodService.moodList$.subscribe((rs) => {
      this.history = rs;
    });
    this.subscription.add(moodList$);
  }

  get heightScroll() {
    return (
      this.document?.getElementById('chart-column-and-pipe')?.offsetHeight ?? 0
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
