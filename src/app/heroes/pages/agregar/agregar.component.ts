import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

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
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
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
        this.openSnackBar('Héroe Actualizado');
      });
    } else {
      this.heroesService.createHeroe(this.heroe).subscribe((heroe) => {
        this.openSnackBar('Héroe Creado');
        this, this.router.navigate(['/heroes/editar', heroe.id]);
      });
    }
  }

  eliminar() {
    const dialog = this.dialog.open(ConfirmComponent, { data: this.heroe });
    dialog.afterClosed().subscribe((resp) => {
      if (resp) {
        this.heroesService.delteteHeroe(this.heroe.id!).subscribe((resp) => {
          this.openSnackBar('Héroe eliminado');
          this.router.navigate(['heroes/listado']);
        });
      }
    });
  }
}
