import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta-unica',
  templateUrl: './heroe-tarjeta-unica.component.html',
  styleUrls: ['./heroe-tarjeta-unica.component.scss'],
})
export class HeroeTarjetaUnicaComponent {
  @Input() heroe!: Heroe;

  constructor (private router: Router) {}

  goBack() {
    this.router.navigate(['/heroes/listado']);
  }
}
