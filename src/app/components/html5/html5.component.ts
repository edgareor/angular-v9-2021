import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DOCUMENT } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-test-component',
  templateUrl: './html5.component.html',
  styleUrls: ['./html5.component.css'],
})
export class Html5Component implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  isActive: boolean;
  salida: any;
  latitud: any;
  longitud: any;
  x: number = 10;

  @ViewChild('divDaD', { static: false }) div: ElementRef;
  @ViewChild('myCanvas', { static: true }) canvas: ElementRef<
    HTMLCanvasElement
  >;
  ctx: CanvasRenderingContext2D;
  ctx2: CanvasRenderingContext2D;

  activarBandera() {
    this.isActive = true;
  }

  desactivarBandera() {
    this.isActive = false;
  }

  ngOnInit() {
    console.log(this.document.doctype);
    console.log(this.canvas.nativeElement);
    this.canvasFunction();
    //alert('Solicitaremos un dato inicial');
    //let num1 = prompt('Valor 1', 'Valor Inicial');
    //let num2 = prompt('Valor 2', 'Valor Inicial');
    //let result = parseInt(num1) + parseInt(num2);
    //console.log(result);
    //confirm(result.toString());
  }

  dioClick() {
    console.log('presiono click');
  }

  ingresarFile(event) {
    console.log(event.target.files);
  }

  testJquery() {
    let entrada = $('#textIn').val();
    alert(entrada);
  }

  /* GEOLOCALIZACION */

  testJquery2() {
    window.navigator.geolocation.watchPosition(
      (position) => {
        this.salida = true; // habilitar un div que muestre los datos de longitud y latitud.
        this.latitud = position.coords.latitude;
        this.longitud = position.coords.longitude;
      },
      (error) => {
        console.log(error);
      },
      { maximumAge: 1000, timeout: 10000, enableHighAccuracy: true }
    );
  }

  /* DRAG AND DROP */

  drag(event) {
    console.log(event);
    event.dataTransfer.setData('text/html', event.target.id); // Establecer el valor del dataTransfer con el elemento seleccionado para arrastrar.
  }

  dragover(event) {
    //console.log(event);
    return false;
  }

  dropFunction(event) {
    console.log(event);
    let idImg = event.dataTransfer.getData('text/html');
    let data = document.getElementById(idImg);
    this.renderer.appendChild(this.div.nativeElement, data);
  }

  /* CANVAS */

  canvasFunction() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    console.log(this.ctx);

    /* RECTANGULO */

    this.ctx.strokeStyle = 'blue'; // color del borde de la figura.
    this.ctx.lineWidth = 5; // Ancho en pixeles del borde de la figura.
    this.ctx.strokeRect(10, 10, 200, 100); // Tamaño del rectangulo, se posicion en x=10 y y=10, ancho=200 y alto=100
    this.ctx.fillStyle = 'gray'; // Color del relleno del rectangulo.
    this.ctx.fillRect(10, 10, 200, 100); // Tamaño del relleno del rectangulo, en x=10 y y=10, ancho=200 y alto=100

    /* CIRCULO 360° 2PI*/

    // Obtener centro de canvas
    let x = 300;
    let y = 200;
    let radio = 50;

    this.ctx.beginPath(); // Para comenzar a crear un elemento, excepto un rectangulo ya que es nativo de canvas.
    this.ctx.arc(x, y, radio, 0, 2 * Math.PI, false); // establecer origen de la circunferencia, pixeles del radio, inicio de circunferencia y fin, en este ejemplo establecemos que sea un circulo completo, y false indica en sentido de las agujas del reloj.
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'blue';
    this.ctx.stroke(); // Indica que se dibuje la figura.
    this.ctx.fillStyle = 'gray';
    this.ctx.fill();

    /* CIRCULO 90° PI/2 */

    this.ctx.beginPath(); // Para comenzar a crear un elemento, excepto un rectangulo ya que es nativo de canvas.
    this.ctx.arc(60, 200, radio, 0, 0.5 * Math.PI, false); // establecer origen de la circunferencia, pixeles del radio, inicio de circunferencia y fin, en este ejemplo establecemos que sea un circulo completo, y false indica en sentido de las agujas del reloj.
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke(); // Indica que se dibuje la figura.

    /* CIRCULO 180° PI */

    this.ctx.beginPath(); // Para comenzar a crear un elemento, excepto un rectangulo ya que es nativo de canvas.
    this.ctx.arc(300, 60, radio, 0, 1 * Math.PI, false); // establecer origen de la circunferencia, pixeles del radio, inicio de circunferencia y fin, en este ejemplo establecemos que sea un circulo completo, y false indica en sentido de las agujas del reloj.
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke(); // Indica que se dibuje la figura.

    /* CIRCULO 90° PI/2 en contra de las agujas del reloj */

    this.ctx.beginPath(); // Para comenzar a crear un elemento, excepto un rectangulo ya que es nativo de canvas.
    this.ctx.arc(500, 60, radio, 0, -0.5 * Math.PI, true); // establecer origen de la circunferencia, pixeles del radio, inicio de circunferencia y fin, en este ejemplo establecemos que sea un circulo completo, y false indica en sentido de las agujas del reloj.
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke(); // Indica que se dibuje la figura.
    this.ctx.fill(); // Rellenar la figura.

    /* TRAZO DE LINEA */

    this.ctx.beginPath();
    this.ctx.moveTo(450, 200);
    this.ctx.lineTo(500, 250);
    this.ctx.stroke(); // Construir linea.

    this.ctx.lineTo(550, 200); // El segundo lineTo comienza desde el ultimo lineTo, por lo que solo se especifica el siguiente punto.
    this.ctx.closePath(); // Cerrar las lineas, une el punto de inicio con el punto final del triangulo.
    this.ctx.stroke(); // Construir linea.

    this.ctx.save(); // Guardar todos los cambios hechos hasta el momento.

    // Cambiar estilos
    this.ctx.fillStyle = 'red';
    this.ctx.strokeStyle = 'gray';
    this.ctx.lineWidth = 10;
    this.ctx.beginPath();
    this.ctx.moveTo(60, 300);
    this.ctx.lineTo(60, 350);
    this.ctx.lineTo(120, 350);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();

    this.ctx.restore(); // Regresar a configuracion antes de metodo save().
    this.ctx.beginPath();
    this.ctx.moveTo(300, 300);
    this.ctx.lineTo(300, 350);
    this.ctx.lineTo(350, 350);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();

    /* TEXTO */

    let texto = 'Example';
    this.ctx.font = 'italic 40pt Calibri';
    this.ctx.fillStyle = 'gray';
    this.ctx.strokeStyle = 'orange';
    this.ctx.lineWidth = 1;
    this.ctx.fillText(texto, 400, 320); // Definir texto, y punto de comienzo, eje x y eje y.
    this.ctx.strokeText(texto, 400, 320); // Sombra del texto.

    /* TEXTO CON GRADIENTE */

    this.ctx.font = '30px verdana';
    let gradiente = this.ctx.createLinearGradient(
      0,
      0,
      this.canvas.nativeElement.width,
      0
    ); // Crear Gradiente
    gradiente.addColorStop(0, 'magenta'); // Establecer caracteristicas de gradiente.
    gradiente.addColorStop(0.5, 'blue');
    gradiente.addColorStop(1, 'red');
    this.ctx.fillStyle = gradiente;
    this.ctx.fillText(texto, 600, 60);
  }

  /* ANIMACION */
  ancho: any = 50;

  animationCanvas() {
    this.ctx2 = this.canvas.nativeElement.getContext('2d');
    this.ctx2.strokeStyle = 'gray'; // color del borde de la figura.
    this.ctx2.lineWidth = 5; // Ancho en pixeles del borde de la figura.
    this.ctx2.strokeRect(0, 400, this.ancho, 50); // Tamaño del rectangulo, se posicion en x=10 y y=10, ancho=200 y alto=100
    this.ctx2.fillStyle = 'blue'; // Color del relleno del rectangulo.
    this.ctx2.fillRect(0, 400, this.ancho, 50); // Tamaño del relleno del rectangulo, en x=10 y y=10, ancho=200 y alto=100
    this.ancho = this.ancho + 50;
    if (this.ancho == 750) {
      this.ancho = 50;
    }
  }

  i: any = 0;
  animationCanvas2() {
    this.ctx.clearRect(0, 400, 750, 50); // Borrar cualquier objeto en el eje x=0, y=400, y en todo el ancho del canvas (750) y de alto 50.
    this.ctx2 = this.canvas.nativeElement.getContext('2d');
    this.ctx2.strokeStyle = 'gray'; // color del borde de la figura.
    this.ctx2.lineWidth = 5; // Ancho en pixeles del borde de la figura.
    this.ctx2.strokeRect(this.i, 400, 50, 50); // Tamaño del rectangulo, se posicion en x=10 y y=10, ancho=200 y alto=100
    this.ctx2.fillStyle = 'blue'; // Color del relleno del rectangulo.
    this.ctx2.fillRect(this.i, 400, 50, 50); // Tamaño del relleno del rectangulo, en x=10 y y=10, ancho=200 y alto=100
    this.ancho = this.ancho + 50;
    this.i = this.i + 10;
    console.log(this.i);
    if (this.i == 750) {
      this.i = 0;
    }
  }

  interval: any;
  time: number = 0;

  startTimer() {
    this.interval = setInterval(() => {
      this.time++;
      console.log(this.time);
      this.animationCanvas2(); // Ejecutar la funcion cada 200 milisegundos
    }, 200); // Ejecucion del timer en ms. 1000 = 1 segundo.
  }

  pauseTimer() {
    this.time = 0; // Reiniciar el contador del timer a 0;
    this.i = 0; // Al detener la animacion reiniciar el eje x a 0;
    clearInterval(this.interval);
  }
}
