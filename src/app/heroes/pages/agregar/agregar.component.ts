import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private heroesService: HeroesService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.ActivatedRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHeroeById(id)))
        .subscribe((heroe) => (this.heroe = heroe));
    }
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Ok!', { duration: 2000 });
  }

  guardar() {
    if (!this.heroe.superhero.trim()) return;
    if (this.heroe.id) {
      this.heroesService.updateHeroe(this.heroe).subscribe((heroe) => {
        this.heroe = heroe;
        this.openSnackBar("Heroe Actualizado");
      });
    } else {
      this.heroesService.createHeroe(this.heroe).subscribe((heroe) => {
        this, this.router.navigate(['/heroes/editar', heroe.id]);
        this.openSnackBar("Heroe Creado");
      });
    }
  }

  eliminar() {
    this.heroesService
      .delteteHeroe(this.heroe.id!)
      .subscribe((resp) => this.router.navigate(['heroes/listado']));
      this.openSnackBar("Heroe eliminado");
  }
}
