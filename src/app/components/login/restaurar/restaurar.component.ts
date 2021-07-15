import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as firebase from 'firebase';

@Component({
  selector: 'app-restaurar',
  templateUrl: './restaurar.component.html',
  styleUrls: ['./restaurar.component.css']
})
export class RestaurarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[^@]+@[^@]+\.[a-zA-Z]{2,}$'),
    ]),
  });

  enviarCorreo() {
    console.log(this.form.value.email);
    firebase.default.auth().sendPasswordResetEmail(this.form.value.email).then(() => {
      this.dialogRef.close('OK');
    })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        this._snackBar.open('El correo ingresado es incorrecto', 'Cerrar', {
          duration: 6000,
          panelClass: ['bar']
        });
      });
  }

}
