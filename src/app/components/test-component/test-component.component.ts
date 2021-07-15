import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css'],
})
export class TestComponentComponent implements OnInit {

  constructor(private router: Router) { }

  url: any;
  valor: any;

  ngOnInit() {
    this.url = window.location.href;
  }
}
