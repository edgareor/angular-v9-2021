import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as firebase from 'firebase';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  hide = true;

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[^@]+@[^@]+\.[a-zA-Z]{2,}$'),
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  // Cerramos dialogo desde codigo JS.
  cerrarDialog() {
    firebase.default.auth().createUserWithEmailAndPassword(this.form.value.email, this.form.value.password).then((resp) => {
      // Si se registra el usuario, cerrar el dialogo.
      this.dialogRef.close('OK');
    })
      .catch((error) => {
        console.log(error);
        // Si usuario ya existe levatar un snackbark y reiniciar el formulario, sin salir del dialog.
        if (error.code == 'auth/email-already-in-use') {
          console.log(error.code);
          this._snackBar.open('Usuario ya existe', 'Cerrar', {
            duration: 6000,
            panelClass: ['bar']
          });
          this.form.reset();
        }
      });;
  }
}
