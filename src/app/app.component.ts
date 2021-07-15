import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardGuard } from './guards/guard.guard';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
@Injectable({
  providedIn: 'root'
})
export class AppComponent implements OnInit {
  title = 'project-angular';

  constructor(private router: Router, private guard: GuardGuard, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    if (sessionStorage.getItem('usuario')) {
      this.saveUsuario();
    }
  }

  usuario: string;

  saveUsuario() {
    this.usuario = sessionStorage.getItem('usuario');
  }

  // El cierre de sesion simplemente borra el token y agrega la cadena 'noToken' a la variable token del sessionStorage.
  cerrarSesion() {
    this.usuario = null;
    sessionStorage.removeItem('usuario');
    sessionStorage.setItem('token', 'noToken');
    //firebase.default.auth().signOut();
    this.router.navigate(['login']);
  }

  openDialogRegistrar() {
    const dialogRef = this.dialog.open(RegistrarComponent, {
      width: '250px',
      height: '290px'
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp == 'OK') {
        this._snackBar.open('Usuario creado exitosamente', 'Cerrar', {
          duration: 6000,
          panelClass: ['barRegister']
        });
      }
    });
  }
}
