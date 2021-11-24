import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@services/login-services';
import { SessionService } from '@services/session-service';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  errorLogin: boolean;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private sessionService: SessionService,
  ) {
    this.sessionService.removeSessionData();
  }

  ngOnInit() {
    this.initForm();
  }

  procesar() {
    const array = [3, 5, 6, 3, 3, 5]
    // this.test('2016-11-30', 14);
  }

  // test(today, limit) {
  //   let result = 0;

  //   $("tr").each(function () {
  //     const td2 = $(this).find("td:eq(1)").text();
  //     const td3 = $(this).find("td:eq(2)").text();

  //     const date1 = new Date(td2);
  //     const date2 = new Date(td3 !== '' ? td3 : today);
  //     const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  //     const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  //     if (diffDays > limit) {
  //       result++;
  //     }
  //     // if (diffDays > limit) {
  //     //   if (this.style.backgroundColor !== "red") {
  //     //     result++;
  //     //   }
  //     // } else {
  //     //   if (this.style.backgroundColor == "red") {
  //     //     result++;
  //     //   }
  //     // }
  //   });

  //   alert(result);

  //   return result;
  // }


  prcess() {
    return 0;
  }

  initForm() {
    this.formLogin = this.fb.group({
      user: ['admin', Validators.required],
      password: ['admin', Validators.required]
    });
  }

  doLogin(form) {
    const dataLogin = {
      userName: form.user,
      passWord: form.password
    }

    this.loginService.doLogin(dataLogin).subscribe(responseLogin => {
      if (responseLogin.codigo === 'Ok') {
        this.sessionService.saveSessionData(responseLogin.usuario);
        this.sessionService.saveSessionToken(responseLogin.usuario.token);

        this.router.navigateByUrl('/home');
      } else {
        this.errorLogin = true;
      }
    });
  }
}
