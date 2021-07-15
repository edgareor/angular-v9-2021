import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Persona } from '../../entitys/persona';
import { Location } from '@angular/common';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ExcelService } from 'src/app/services/excel.service';
import { GuardGuard } from 'src/app/guards/guard.guard';
import { EditarComponent } from './editar/editar.component';
import { AgregarComponent } from './agregar/agregar.component';
import { EliminarComponent } from './eliminar/eliminar.component';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  constructor(private servicio: HttpService,
    private location: Location,
    private excelService: ExcelService,
    private guard: GuardGuard,
    private dialog: MatDialog) { }

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'rut', 'gestion'];
  dataSource: MatTableDataSource<Persona>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  startSpinner = false;

  personas: any = [];
  respuesta: any;

  ngOnInit() {
    this.respuesta = this.servicio.getPersonas(this.guard.getToken()).subscribe(data => {
      console.log(data);
      this.personas = data;

      /*** En caso que exista alguna diferencia entre el arreglo de la BD y lo existente en la pagina: */
      // this.personas = data.filter((item) => {
      //   return item != null;
      // })
      // this.servicio.putPersonas(this.personas, this.guard.getToken());

      this.dataSource = new MatTableDataSource<Persona>(this.personas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goBack(): void {
    this.location.back();
  }

  exportAsXLSX(): void {
    setTimeout(() => {
      let token = this.guard.getToken();
      this.servicio.getPersonas(token).subscribe(data => {
        this.excelService.exportAsExcelFile(data, 'personas');
        this.startSpinner = false;
      });
    }, 5000);
  }

  openDialogAgregar() {
    const dialogRef = this.dialog.open(AgregarComponent, {
      width: '250px',
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(async (persona) => {
      if (persona == undefined) {
        console.log("Accion Cancelada");
      } else {
        persona.id = this.personas.length + 1;
        this.personas.push(persona);
        this.servicio.putPersonas(this.personas, this.guard.getToken());

        this.dataSource = new MatTableDataSource<Persona>(this.personas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
    });
  }

  openDialogEditar(personaIn) {
    console.log(personaIn);
    const dialogRef = this.dialog.open(EditarComponent, {
      width: '250px',
      height: '380px',
      data: personaIn,
    });

    dialogRef.afterClosed().subscribe(async (persona) => {
      console.log(persona);
      if (persona == undefined) {
        console.log('Accion Cancelada');
      } else {
        let resp = await this.servicio.modificarPersona(persona.id, persona, this.guard.getToken());
        this.personas = this.personas.map((item, index) => {
          if (index == persona.id) {
            item = persona;
          }
          return item;
        })
        this.dataSource = new MatTableDataSource<Persona>(this.personas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
    });
  }

  openDialogEliminar(persona) {
    console.log(persona);
    const dialogRef = this.dialog.open(EliminarComponent, {
      width: '250px',
      height: '420px',
      data: persona
    });

    dialogRef.afterClosed().subscribe(async (confirm) => {
      if (confirm == undefined) {
        console.log('Accion Cancelada');
      } else {
        //let resp = await this.servicio.eliminarPersona(persona.id, this.guard.getToken()); // El Metodo eliminar simplemente transforma en null el indice especificado, por lo tanto, lo mejor es sobrescribir la BD al ejecutar una eliminación.
        this.personas = this.personas.filter((item) => {
          return item.id != persona.id;
        })

        let resp = await this.servicio.putPersonas(this.personas, this.guard.getToken());

        this.dataSource = new MatTableDataSource<Persona>(this.personas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
    });
  }

  ngOnDestroy() {
    console.log('onDestroy');
    this.respuesta.unsubscribe();
  }
}
