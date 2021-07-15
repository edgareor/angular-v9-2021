import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../entitys/hero';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHeroById();
  }

  @Input() heroe: Hero;

  heroeById: Hero;

  getHeroById(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    let array = this.httpService.httpGet().subscribe((data) => {
      // Agregar id al objeto ya que viene sin este campo en el JSON.
      let newArray = data.results.map((obj) => {
        obj.id = +obj.url.split('/')[6];
        return obj;
      });
      console.log(newArray);
      // Obtener el Heroe que coincide con el id proporcionado.
      this.heroeById = newArray.find((hero) => hero.id === id);
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(hero: Hero) {
    this.httpService.httpPut(hero).subscribe((data) => {
      console.log(data);
      this.goBack(); // Ejecutar el metodo goBack() despues de llamar el metodo PUT del servicio.
    });
  }
}
