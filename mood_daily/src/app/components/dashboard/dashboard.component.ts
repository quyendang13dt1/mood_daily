import { Component, OnInit } from '@angular/core';
import { LineChartComponent } from '../line-chart/line-chart.component';
// import AOS from 'aos';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { ButtonModule } from 'primeng/button';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ThemeService } from '../../service/theme.service';
import { MenuComponent } from '../menu/menu.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { MoodFormComponent } from '../mood-form/mood-form.component';
import { HistoryComponent } from '../history/history.component';
import { ColumnChartComponent } from '../column-chart/column-chart.component';
import { HalfDoughnutComponent } from '../half-doughnut/half-doughnut.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MoodService } from '../../service/mood.service';
import { Subscription } from 'rxjs';
import { Utility } from '../../utility/utility.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    LineChartComponent,
    PieChartComponent,
    ButtonModule,
    AnimateOnScrollModule,
    MenuComponent,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    RippleModule,
    MoodFormComponent,
    HistoryComponent,
    ColumnChartComponent,
    HalfDoughnutComponent,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  sidebarVisible: boolean = false;
  visibleMoodPopup: boolean = false;
  history: any[] = [];
  subscription = new Subscription();

  styleMoodPopup: any = {
    width: '42rem',
  };
  constructor(
    private themeService: ThemeService,
    private messageService: MessageService,
    private moodService: MoodService
  ) {}
  ngOnInit(): void {
    // AOS.init({
    //   duration: 1500, // values from 0 to 3000, with step 50ms
    // });
    // AOS.init();

    const moodList$ = this.moodService.moodList$.subscribe((rs) => {
      this.history = rs;
    });
    this.subscription.add(moodList$);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onUpdateTheme(theme: string) {
    this.themeService.swtichTheme(theme);
  }

  showDialog() {
    const today = this.history?.find((x) => Utility.isToday(x?.createdTime));
    if (today) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'You have updated your mood today!',
      });
      return;
    }

    this.styleMoodPopup = {
      width: window?.innerWidth >= 800 ? '42rem' : '92vw',
    };
    this.visibleMoodPopup = true;
  }

  closeDialog() {
    this.visibleMoodPopup = false;
  }
}
