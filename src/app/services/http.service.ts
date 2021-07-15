import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { Hero } from '../entitys/hero';
import { Persona } from '../entitys/persona';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient, private login: LoginComponent) { }

  personas: Persona[] = [];

  getPersonas(token: string) {
    return this.http.get<any>('https://ecommerce-936ec.firebaseio.com/data.json?auth=' + token)
  }

  putPersonas(personas, token: string) {
    return this.http.put<any>('https://ecommerce-936ec.firebaseio.com/data.json?auth=' + token, personas).subscribe((response) => {
      console.log("BD sobrescrita exitosamente");
    }, (error) => {
      console.log(error);
    });
  }

  modificarPersona(index: number, persona: any, token: string) {
    return this.http.put<any>(`https://ecommerce-936ec.firebaseio.com/data/${index}.json?auth=${token}`, persona).subscribe((response) => {
      console.log('Persona modificada exitosamente');
    }, (error) => {
      console.log(error);
    });
  }

  eliminarPersona(index: number, token: string) {
    return this.http.delete<any>(`https://ecommerce-936ec.firebaseio.com/data/${index}.json?auth=${token}`).subscribe((response) => {
      console.log('Persona eliminada exitosamente');
    }, (error) => {
      console.log(error);
    });
  }

  // ***** OTROS CONSUMOS *****/
  // *****   GET ACCESS TOKEN   *****

  getToken(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      }),
    };

    var url = 'https://id.dev.tegere.info/oauth2/token';

    let params = new URLSearchParams();

    params.append('client_id', '35l8t1trd8gpge3p53dv936jnj');
    params.append(
      'client_secret',
      '1cqg4utvbsea4o2uvctd3rg8oijkna68jg0bgf1m9mir17r3mog5'
    );
    params.append('grant_type', 'client_credentials');
    params.append('scope', 'tgr-dev-api-portal-autoservicios/all');

    return this.http.post<any>(url, params.toString(), options);
  }

  /*** GET + HEADER + QUERY PARAMS***/

  httpGet(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization': 'eyJraWQiOiJIYVwvYVdRN0dJQTg2WTJDZlFHU3ZXKzJhXC9HQUQ0S2hjVHVpK2ZPWW01b289IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2cnEwdDQxNzBrdmlmbDU4cjVkcmptZ3FxbiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiY3J1ZFwvdGVzdCIsImF1dGhfdGltZSI6MTU3OTAyMTkxMSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfNmgxMndrSmhqIiwiZXhwIjoxNTc5MDI1NTExLCJpYXQiOjE1NzkwMjE5MTEsInZlcnNpb24iOjIsImp0aSI6ImQ2ZGM0OWE2LTcwMDktNDM1MS1hOTRlLWUzNmU0ZmMxYmJmNiIsImNsaWVudF9pZCI6IjZycTB0NDE3MGt2aWZsNThyNWRyam1ncXFuIn0.infGYiEzDPfoBdspu9R2qwkL1fyT-p6hCc6gXkk6vQaQk3-J6Lnt5YtcPDqKFr92axb_nesXCGDiBSS5vAf61ZXQ2-aYeDVlfl9aJg727HWs_hTHpsbFp-JSeot9yIB0L0b-y_JrRHrOgaG-T9UZ5sPhQOrIlx1IYSlHkvYKz4eQL-hZgRb2BeiiByIZRJWAc9Knj5RD0beWyLhzHLzIYZedKnhUKCV-B_cbNx4AgMJ7ayOUBFsS1sP0q6eODHJRwLofqCtLyTrItfxJg67tk5JgTycyci4Yeq5nizCTlEFopeTUNKwRZ0lV-RKUWcHaKraj-6rjkn1oTm_3CXvwYA'
      }),
      params: new HttpParams().set('limit', '1000'),
    };

    let url = 'https://pokeapi.co/api/v2/pokemon';
    return this.http.get<any>(url, options);
  }

  /*** PUT ***/

  //httpPut(hero: Hero): Observable<any> {

  //const options = {
  //  headers: new HttpHeaders({
  //    'Content-Type': 'application/json',
  //'Authorization': 'eyJraWQiOiJIYVwvYVdRN0dJQTg2WTJDZlFHU3ZXKzJhXC9HQUQ0S2hjVHVpK2ZPWW01b289IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2cnEwdDQxNzBrdmlmbDU4cjVkcmptZ3FxbiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiY3J1ZFwvdGVzdCIsImF1dGhfdGltZSI6MTU3OTAyMTkxMSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfNmgxMndrSmhqIiwiZXhwIjoxNTc5MDI1NTExLCJpYXQiOjE1NzkwMjE5MTEsInZlcnNpb24iOjIsImp0aSI6ImQ2ZGM0OWE2LTcwMDktNDM1MS1hOTRlLWUzNmU0ZmMxYmJmNiIsImNsaWVudF9pZCI6IjZycTB0NDE3MGt2aWZsNThyNWRyam1ncXFuIn0.infGYiEzDPfoBdspu9R2qwkL1fyT-p6hCc6gXkk6vQaQk3-J6Lnt5YtcPDqKFr92axb_nesXCGDiBSS5vAf61ZXQ2-aYeDVlfl9aJg727HWs_hTHpsbFp-JSeot9yIB0L0b-y_JrRHrOgaG-T9UZ5sPhQOrIlx1IYSlHkvYKz4eQL-hZgRb2BeiiByIZRJWAc9Knj5RD0beWyLhzHLzIYZedKnhUKCV-B_cbNx4AgMJ7ayOUBFsS1sP0q6eODHJRwLofqCtLyTrItfxJg67tk5JgTycyci4Yeq5nizCTlEFopeTUNKwRZ0lV-RKUWcHaKraj-6rjkn1oTm_3CXvwYA'
  //  }),
  //};

  //let url = 'https://pokeapi.co/api/v2/pokemon';
  //return this.http.put<any>(url, hero, options);
  //}

  /*** MOCK PUT ***/

  httpPut(hero: Hero): Observable<any> {
    console.log(hero);

    //const options = {
    //  headers: new HttpHeaders({
    //    'Content-Type': 'application/json',
    //'Authorization': 'eyJraWQiOiJIYVwvYVdRN0dJQTg2WTJDZlFHU3ZXKzJhXC9HQUQ0S2hjVHVpK2ZPWW01b289IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2cnEwdDQxNzBrdmlmbDU4cjVkcmptZ3FxbiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiY3J1ZFwvdGVzdCIsImF1dGhfdGltZSI6MTU3OTAyMTkxMSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfNmgxMndrSmhqIiwiZXhwIjoxNTc5MDI1NTExLCJpYXQiOjE1NzkwMjE5MTEsInZlcnNpb24iOjIsImp0aSI6ImQ2ZGM0OWE2LTcwMDktNDM1MS1hOTRlLWUzNmU0ZmMxYmJmNiIsImNsaWVudF9pZCI6IjZycTB0NDE3MGt2aWZsNThyNWRyam1ncXFuIn0.infGYiEzDPfoBdspu9R2qwkL1fyT-p6hCc6gXkk6vQaQk3-J6Lnt5YtcPDqKFr92axb_nesXCGDiBSS5vAf61ZXQ2-aYeDVlfl9aJg727HWs_hTHpsbFp-JSeot9yIB0L0b-y_JrRHrOgaG-T9UZ5sPhQOrIlx1IYSlHkvYKz4eQL-hZgRb2BeiiByIZRJWAc9Knj5RD0beWyLhzHLzIYZedKnhUKCV-B_cbNx4AgMJ7ayOUBFsS1sP0q6eODHJRwLofqCtLyTrItfxJg67tk5JgTycyci4Yeq5nizCTlEFopeTUNKwRZ0lV-RKUWcHaKraj-6rjkn1oTm_3CXvwYA'
    //  }),
    //};

    // Se supone que esto es el metodo put de un API.
    //let url = 'https://pokeapi.co/api/v2/pokemon';
    //return this.http.put<any>(url, hero, options);

    let result = 'Objeto actualizado correctamente';

    return of(result);
  }

  /*** POST ***/

  //httpPost(hero: Hero): Observable<any> {

  //const options = {
  //  headers: new HttpHeaders({
  //    'Content-Type': 'application/json',
  //'Authorization': 'eyJraWQiOiJIYVwvYVdRN0dJQTg2WTJDZlFHU3ZXKzJhXC9HQUQ0S2hjVHVpK2ZPWW01b289IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2cnEwdDQxNzBrdmlmbDU4cjVkcmptZ3FxbiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiY3J1ZFwvdGVzdCIsImF1dGhfdGltZSI6MTU3OTAyMTkxMSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfNmgxMndrSmhqIiwiZXhwIjoxNTc5MDI1NTExLCJpYXQiOjE1NzkwMjE5MTEsInZlcnNpb24iOjIsImp0aSI6ImQ2ZGM0OWE2LTcwMDktNDM1MS1hOTRlLWUzNmU0ZmMxYmJmNiIsImNsaWVudF9pZCI6IjZycTB0NDE3MGt2aWZsNThyNWRyam1ncXFuIn0.infGYiEzDPfoBdspu9R2qwkL1fyT-p6hCc6gXkk6vQaQk3-J6Lnt5YtcPDqKFr92axb_nesXCGDiBSS5vAf61ZXQ2-aYeDVlfl9aJg727HWs_hTHpsbFp-JSeot9yIB0L0b-y_JrRHrOgaG-T9UZ5sPhQOrIlx1IYSlHkvYKz4eQL-hZgRb2BeiiByIZRJWAc9Knj5RD0beWyLhzHLzIYZedKnhUKCV-B_cbNx4AgMJ7ayOUBFsS1sP0q6eODHJRwLofqCtLyTrItfxJg67tk5JgTycyci4Yeq5nizCTlEFopeTUNKwRZ0lV-RKUWcHaKraj-6rjkn1oTm_3CXvwYA'
  //  }),
  //};

  //let url = 'https://pokeapi.co/api/v2/pokemon';
  //return this.http.post<any>(url, hero, options);
  //}

  /*** MOCK POST ***/

  httpPost(hero: Hero): Observable<any> {
    console.log(hero);

    //const options = {
    //  headers: new HttpHeaders({
    //    'Content-Type': 'application/json',
    //'Authorization': 'eyJraWQiOiJIYVwvYVdRN0dJQTg2WTJDZlFHU3ZXKzJhXC9HQUQ0S2hjVHVpK2ZPWW01b289IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2cnEwdDQxNzBrdmlmbDU4cjVkcmptZ3FxbiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiY3J1ZFwvdGVzdCIsImF1dGhfdGltZSI6MTU3OTAyMTkxMSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfNmgxMndrSmhqIiwiZXhwIjoxNTc5MDI1NTExLCJpYXQiOjE1NzkwMjE5MTEsInZlcnNpb24iOjIsImp0aSI6ImQ2ZGM0OWE2LTcwMDktNDM1MS1hOTRlLWUzNmU0ZmMxYmJmNiIsImNsaWVudF9pZCI6IjZycTB0NDE3MGt2aWZsNThyNWRyam1ncXFuIn0.infGYiEzDPfoBdspu9R2qwkL1fyT-p6hCc6gXkk6vQaQk3-J6Lnt5YtcPDqKFr92axb_nesXCGDiBSS5vAf61ZXQ2-aYeDVlfl9aJg727HWs_hTHpsbFp-JSeot9yIB0L0b-y_JrRHrOgaG-T9UZ5sPhQOrIlx1IYSlHkvYKz4eQL-hZgRb2BeiiByIZRJWAc9Knj5RD0beWyLhzHLzIYZedKnhUKCV-B_cbNx4AgMJ7ayOUBFsS1sP0q6eODHJRwLofqCtLyTrItfxJg67tk5JgTycyci4Yeq5nizCTlEFopeTUNKwRZ0lV-RKUWcHaKraj-6rjkn1oTm_3CXvwYA'
    //  }),
    //};

    // Se supone que esto es el metodo put de un API.
    //let url = 'https://pokeapi.co/api/v2/pokemon';
    //return this.http.post<any>(url, hero, options);

    let result = 'Objeto agregado correctamente';

    return of(result);
  }

  /*** DELETE ***/

  //httpDelete(hero: Hero): Observable<any> {

  //const options = {
  //  headers: new HttpHeaders({
  //    'Content-Type': 'application/json',
  //'Authorization': 'eyJraWQiOiJIYVwvYVdRN0dJQTg2WTJDZlFHU3ZXKzJhXC9HQUQ0S2hjVHVpK2ZPWW01b289IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2cnEwdDQxNzBrdmlmbDU4cjVkcmptZ3FxbiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiY3J1ZFwvdGVzdCIsImF1dGhfdGltZSI6MTU3OTAyMTkxMSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfNmgxMndrSmhqIiwiZXhwIjoxNTc5MDI1NTExLCJpYXQiOjE1NzkwMjE5MTEsInZlcnNpb24iOjIsImp0aSI6ImQ2ZGM0OWE2LTcwMDktNDM1MS1hOTRlLWUzNmU0ZmMxYmJmNiIsImNsaWVudF9pZCI6IjZycTB0NDE3MGt2aWZsNThyNWRyam1ncXFuIn0.infGYiEzDPfoBdspu9R2qwkL1fyT-p6hCc6gXkk6vQaQk3-J6Lnt5YtcPDqKFr92axb_nesXCGDiBSS5vAf61ZXQ2-aYeDVlfl9aJg727HWs_hTHpsbFp-JSeot9yIB0L0b-y_JrRHrOgaG-T9UZ5sPhQOrIlx1IYSlHkvYKz4eQL-hZgRb2BeiiByIZRJWAc9Knj5RD0beWyLhzHLzIYZedKnhUKCV-B_cbNx4AgMJ7ayOUBFsS1sP0q6eODHJRwLofqCtLyTrItfxJg67tk5JgTycyci4Yeq5nizCTlEFopeTUNKwRZ0lV-RKUWcHaKraj-6rjkn1oTm_3CXvwYA'
  //  }),
  //};

  //let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  //return this.http.delete<any>(url, options);
  //}

  /*** DELETE MOCK ***/

  httpDelete(hero: Hero): Observable<any> {
    console.log(hero);

    //const options = {
    //  headers: new HttpHeaders({
    //    'Content-Type': 'application/json',
    //'Authorization': 'eyJraWQiOiJIYVwvYVdRN0dJQTg2WTJDZlFHU3ZXKzJhXC9HQUQ0S2hjVHVpK2ZPWW01b289IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2cnEwdDQxNzBrdmlmbDU4cjVkcmptZ3FxbiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiY3J1ZFwvdGVzdCIsImF1dGhfdGltZSI6MTU3OTAyMTkxMSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfNmgxMndrSmhqIiwiZXhwIjoxNTc5MDI1NTExLCJpYXQiOjE1NzkwMjE5MTEsInZlcnNpb24iOjIsImp0aSI6ImQ2ZGM0OWE2LTcwMDktNDM1MS1hOTRlLWUzNmU0ZmMxYmJmNiIsImNsaWVudF9pZCI6IjZycTB0NDE3MGt2aWZsNThyNWRyam1ncXFuIn0.infGYiEzDPfoBdspu9R2qwkL1fyT-p6hCc6gXkk6vQaQk3-J6Lnt5YtcPDqKFr92axb_nesXCGDiBSS5vAf61ZXQ2-aYeDVlfl9aJg727HWs_hTHpsbFp-JSeot9yIB0L0b-y_JrRHrOgaG-T9UZ5sPhQOrIlx1IYSlHkvYKz4eQL-hZgRb2BeiiByIZRJWAc9Knj5RD0beWyLhzHLzIYZedKnhUKCV-B_cbNx4AgMJ7ayOUBFsS1sP0q6eODHJRwLofqCtLyTrItfxJg67tk5JgTycyci4Yeq5nizCTlEFopeTUNKwRZ0lV-RKUWcHaKraj-6rjkn1oTm_3CXvwYA'
    //  }),
    //};

    // Se supone que esto es el metodo put de un API.
    //let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    //return this.http.delete<any>(url, options);

    let result = 'Objeto eliminado correctamente';

    return of(result);
  }

  /*** GET SPRING BOOT SECURITY ***/

  // httpGetSpring(): Observable<any> {
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: 'bearer 6a124df6-b379-45a0-9ae7-ce5a3cf0b0db',
  //     }),
  //   };

  //   let url = 'http://192.168.78.1:8081/getstatus';
  //   return this.http.get<any>(url, options);
  // }

  /*** POST PERSONAS */

  // getPersonas() {
  //   return this.http.get<any>('https://ecommerce-936ec.firebaseio.com/data.json').toPromise();
  // }
}
