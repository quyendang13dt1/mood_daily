import { Component, OnInit } from '@angular/core';
import { LineChartComponent } from '../line-chart/line-chart.component';
import AOS from 'aos';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LineChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    // AOS.init({
    //   duration: 1500, // values from 0 to 3000, with step 50ms
    // });
    // AOS.init();
  }
}
