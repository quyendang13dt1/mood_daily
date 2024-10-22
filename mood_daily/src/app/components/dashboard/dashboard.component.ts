import { Component, OnInit } from '@angular/core';
import { LineChartComponent } from '../line-chart/line-chart.component';
// import AOS from 'aos';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { ButtonModule } from 'primeng/button';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ThemeService } from '../../service/theme.service';
import { MenuComponent } from '../menu/menu.component';
import { DialogModule } from 'primeng/dialog';
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
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  sidebarVisible: boolean = false;
  history = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  visible: boolean = false;
  constructor(private themeService: ThemeService) {}
  ngOnInit(): void {
    // AOS.init({
    //   duration: 1500, // values from 0 to 3000, with step 50ms
    // });
    // AOS.init();
  }

  onUpdateTheme(theme: string) {
    this.themeService.swtichTheme(theme);
  }

  showDialog() {
    this.visible = true;
  }
}
