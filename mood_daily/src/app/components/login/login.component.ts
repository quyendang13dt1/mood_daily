import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { NzInputModule } from 'ng-zorro-antd/input';
// import { NzGridModule } from 'ng-zorro-antd/grid';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  value?: string;
}
