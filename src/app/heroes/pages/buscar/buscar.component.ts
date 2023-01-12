import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes!: Heroe[];
  heroeSeleccionado: Heroe | undefined;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  buscando() {
    this.heroesService
      .searchHeroe(this.termino.trim())
      .subscribe((heroes) => (this.heroes = heroes));
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (!this.heroes?.length) {
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService
      .getHeroeById(heroe.id!)
      .subscribe((heroe) => (this.heroeSeleccionado = heroe));
  }
}
