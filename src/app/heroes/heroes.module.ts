import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';

@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    HomeComponent,
    ListadoComponent,
  ],
  imports: [CommonModule],
})
export class HeroesModule {}
