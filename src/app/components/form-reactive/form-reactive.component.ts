import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { DialogOpenTwoComponent } from './dialog-open/dialog-open-two.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-reactive',
  templateUrl: './form-reactive.component.html',
  styleUrls: ['./form-reactive.component.css'],
})
export class FormReactiveComponent implements OnInit {
  constructor(private location: Location, public dialog: MatDialog) {}

  ngOnInit(): void {}

  form = new FormGroup({
    usuario: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    password: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(`^[^@]+@[^@]+\.[a-zA-Z]{2,}$`),
    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern(`[29]{1}[0-9]{4}[0-9]{4}`),
    ]),
    edad: new FormControl('', [
      Validators.required,
      Validators.min(3),
      Validators.max(97),
    ]),
  });

  hide = true;

  goBack(): void {
    this.location.back();
  }

  submit(form: any) {
    console.log(form);
    const dialogRef = this.dialog.open(DialogOpenTwoComponent, {
      width: '300px', // Especificamos el ancho de la ventana.
      //height: '400px', // Especificamos la altura de la ventana.
      // disableClose: true, // Desactivar la salida del dialog con la tecla scape. (Se recomienda no deshabilitarlo).
      data: form,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
