import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    HeaderComponent,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  subscription = new Subscription();
  userData: any;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    // this.authService
    this.userData = this.authService.userValue;
  }

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;
}
