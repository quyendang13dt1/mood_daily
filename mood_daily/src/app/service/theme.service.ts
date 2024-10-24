import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  static theme: string;
  constructor(@Inject(DOCUMENT) private document: Document) {}

  swtichTheme(theme: string) {
    ThemeService.theme = theme;
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `${theme}.css`;
    }
  }
}
