import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { PanelModule } from 'primeng/panel';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    PasswordModule,
    PanelModule,
    ReactiveFormsModule,
    ToastModule,
    DividerModule,
    CardModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // // error = '';
  // loginForm!: FormGroup;
  // // loading = false;
  // // returnUrl!: string;
  // submitted!: boolean;
  // userName: string = '';
  // password: string = '';

  //   constructor(
  //     private authService: AuthService,
  //     private router: Router,
  //     private messageService: MessageService
  //   ) {
  //     // if (this.authService.userValue) {
  //     //   this.router.navigate(['dashboard']);
  //     // }
  //   }

  //   // @ts-ignore
  //   // get f() { return this.loginForm.controls; }

  //   ngOnInit() {
  //       // this.loginForm = new FormGroup({
  //       //     'username': new FormControl('', Validators.required),
  //       //     'password': new FormControl('', Validators.required)
  //       // });
  //   }

  //   onSubmit() {
  //       this.submitted = true;
  //       // alert(JSON.stringify(this.loginForm.value));
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  //   }

  // Test

  error = '';
  loginForm!: FormGroup;
  loading = false;
  returnUrl!: string;
  submitted!: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    // if (this.authService.userValue) {
    //   this.router.navigate(['dahsboard']);
    // }
  }

  // @ts-ignore
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    const response = this.authService.login(
      this.f['username'].value,
      this.f['password'].value
    );

    if (response) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Signin Successful',
      });
      setTimeout(() => {
        this.router.navigate(['pages/home']);
      }, 2000);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Signin Failed',
      });
    }
    this.loading = false;
    // .subscribe(() => {
    //   this.messageService.add({severity:'success', summary: 'Success', detail: 'Signin Successful'});
    //   this.router.navigate([this.returnUrl]);
    // },
    //   (error: any) => {
    //     this.error = error;
    //     this.loading = false;
    //     this.messageService.add({severity:'error', summary: 'Error', detail: 'Signin Failed'});
    //   }
    // );
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
