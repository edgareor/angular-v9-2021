import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class GuardGuard implements CanActivate {
  constructor(private router: Router) {
  }

  token: string;

  // Al hacer login, se guarda el token en la variable token del session storage.
  saveToken(token) {
    this.token = token;
    sessionStorage.setItem('token', token);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Si el token el null (Primer inicio de sesion), ó es igual a 'noToken' debido a que se cerro la sesion (cuando se 
    // cierra sesion se establece el valor en 'noToken'), no esta logueado.
    if (sessionStorage.getItem('token') == 'noToken' || sessionStorage.getItem('token') == null) {
      console.log('No estás logueado');
      this.router.navigate(['/login']);
      return false;
    } else {
      // Si la fecha de expiracion es menor que el presente, entonces ya vencio.
      console.log('Expiration Token: ', JSON.parse(sessionStorage.getItem('tokenResult')).expirationTime)
      let dateExp = new Date(JSON.parse(sessionStorage.getItem('tokenResult')).expirationTime);
      let dateNow = new Date();
      if (dateExp < dateNow) {
        console.log('Token Expirado');
        sessionStorage.removeItem('usuario');
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }
  }
}
