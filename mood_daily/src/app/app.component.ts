import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './service/theme.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private themeService: ThemeService) {
    this.themeService.swtichTheme('aura-light-green');
  }
  title = 'mood_daily';
}
