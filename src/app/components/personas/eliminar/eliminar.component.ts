import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    id: new FormControl({ value: this.data.id, disabled: true }, [Validators.required]),
    nombre: new FormControl({ value: this.data.nombre, disabled: true }, [Validators.required]),
    apellido: new FormControl({ value: this.data.apellido, disabled: true }, [Validators.required]),
    rut: new FormControl({ value: this.data.rut, disabled: true }, [Validators.required]),
  });
}
