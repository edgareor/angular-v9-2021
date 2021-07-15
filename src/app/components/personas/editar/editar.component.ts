import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    id: new FormControl({ value: this.data.id, disabled: true }, [Validators.required]),
    nombre: new FormControl(this.data.nombre, [Validators.required]),
    apellido: new FormControl(this.data.apellido, [Validators.required]),
    rut: new FormControl(this.data.rut, [Validators.required]),
  });

}
