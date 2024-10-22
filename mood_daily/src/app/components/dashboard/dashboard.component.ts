import { Component, OnInit } from '@angular/core';
import { LineChartComponent } from '../line-chart/line-chart.component';
// import AOS from 'aos';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { ButtonModule } from 'primeng/button';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ThemeService } from '../../service/theme.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LineChartComponent, PieChartComponent, ButtonModule, AnimateOnScrollModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private themeService: ThemeService) {

  }
  ngOnInit(): void {
    // AOS.init({
    //   duration: 1500, // values from 0 to 3000, with step 50ms
    // });
    // AOS.init();
  }

  onUpdateTheme(theme: string) {
    this.themeService.swtichTheme(theme);
  }
}
