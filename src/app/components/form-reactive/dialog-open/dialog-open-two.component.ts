import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-open-two',
  templateUrl: './dialog-open-two.component.html',
  styleUrls: ['./dialog-open-two.component.css'],
})
export class DialogOpenTwoComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  form = new FormGroup({
    usuario: new FormControl({ value: this.data.usuario, disabled: true }),
    password: new FormControl({ value: this.data.password, disabled: true }),
    fecha: new FormControl({ value: this.data.fecha, disabled: true }),
    comment: new FormControl({ value: this.data.comment, disabled: true }),
    email: new FormControl({ value: this.data.email, disabled: true }),
    telefono: new FormControl({ value: this.data.telefono, disabled: true }),
    edad: new FormControl({ value: this.data.edad, disabled: true }),
  });
}
