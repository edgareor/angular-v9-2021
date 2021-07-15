import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Hero } from '../../entitys/hero';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private httpService: HttpService, private location: Location) { }

  ngOnInit(): void {
    this.serviceGet();
  }

  heroes: Hero[] = [];
  dataTotal: Hero[] = []
  respuesta: any;

  serviceGet(): void {
    this.respuesta = this.httpService.httpGet().subscribe((data) => {
      console.log('Respuesta: ', data.results);
      let newArray = data.results.map((obj) => {
        obj.id = +obj.url.split('/')[6];
        return obj;
      });
      this.dataTotal = data.results;
      this.heroes = data.results.slice(0, 100);
    });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    console.log('onDestroy');
    this.respuesta.unsubscribe();
  }
}
