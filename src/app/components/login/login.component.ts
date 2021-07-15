import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { GuardGuard } from '../../guards/guard.guard';
import { AppComponent } from '../../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RestaurarComponent } from './restaurar/restaurar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,
    private guard: GuardGuard,
    private appComponent: AppComponent,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  @ViewChild('enviar') enviar: ElementRef;

  ngOnInit() {
    if (!firebase.default.apps.length) {
      firebase.default.initializeApp({ apiKey: "AIzaSyCBJ3U2HKoVWLYklMKD4tf0mOekXg3DImM", authDomain: "ecommerce-936ec.firebaseapp.com" });
    } else {
      firebase.default.app();
    }
  }

  invalid: boolean = false;
  hide = true;

  formLogin = new FormGroup({
    password: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[^@]+@[^@]+\.[a-zA-Z]{2,}$'),
    ]),
  });

  async submit(entrada: any) {
    try {
      await firebase.default.auth().signInWithEmailAndPassword(entrada.email, entrada.password);
      let token = await firebase.default.auth().currentUser.getIdToken();

      // Obtener usuario o correo verificado y aceptado por Firestore y enviarlo al icono de usuario.
      let usuario = await firebase.default.auth().currentUser.email;
      sessionStorage.setItem('usuario', usuario);
      this.appComponent.saveUsuario();

      // Objeto con fecha de expiracion de token.
      let tokenResult = await firebase.default.auth().currentUser.getIdTokenResult();
      sessionStorage.setItem('tokenResult', JSON.stringify(tokenResult));

      this.guard.saveToken(token);
      this.router.navigate(['dashboard']);
    } catch (err) {
      console.log(err);
      this._snackBar.open('Email o Password incorrecto', 'Cerrar', {
        duration: 6000,
        panelClass: ['bar']
      });
      this.formLogin.reset();
    }
  }

  reset() {
    this.invalid = false;
  }

  recaptcha = true;

  resolved(captchaResponse: string) {
    if (captchaResponse && this.formLogin.valid) {
      this.recaptcha = false;
    }
  }

  restaurarPassword() {
    console.log('Restaurar contraseña')
    const dialogRef = this.dialog.open(RestaurarComponent, {
      width: '250px',
      height: '250px'
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp == 'OK') {
        this._snackBar.open('Contraseña Enviada. Favor revisar su bandeja de correos', 'Cerrar', {
          duration: 6000,
          panelClass: ['barRegister']
        });
      }
    });
  }
}
