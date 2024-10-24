import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../service/auth.service';
import { SidebarModule } from 'primeng/sidebar';
import { ThemeService } from '../../service/theme.service';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AvatarModule,
    AvatarGroupModule,
    OverlayPanelModule,
    ListboxModule,
    FormsModule,
    DividerModule,
    RippleModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  cities!: any[];

  selectedCity!: any;

  visibleConfig = false;
  themesConfigList = [
    {
      key: 'aura-light-green',
      color: '#10b981',
    },
    {
      key: 'lara-dark-teal',
      color: '#2dd4bf',
    },
    {
      key: 'luna-pink',
      color: '#F48FB1',
    },
    {
      key: 'md-dark-indigo',
      color: '#9FA8DA',
    },
    {
      key: 'saga-blue',
      color: '#2196F3',
    },
    {
      key: 'saga-green',
      color: '#4CAF50',
    },
    {
      key: 'saga-orange',
      color: '#FFC107',
    },
    {
      key: 'saga-purple',
      color: '#9C27B0',
    },
  ];

  items: MenuItem[] | undefined;

  get themeSelected() {
    return ThemeService.theme;
  }
  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {}
  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    this.items = [
      {
        label: 'Config',
        icon: 'pi pi-cog',
        command: () => {
          this.onConfig();
        },
      },
      {
        label: 'Log Out',
        icon: 'pi pi-sign-out',
        command: () => {
          this.onLogout();
        },
      },
    ];
  }

  onConfig() {}

  onLogout() {
    this.authService.logout();
  }

  onChangeThemes(item: any) {
    this.themeService.swtichTheme(item?.key);
  }
}
