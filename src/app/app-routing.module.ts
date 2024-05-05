import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InventarioComponent } from './inventario/inventario.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ContactosComponent } from './contactos/contactos.component';
import { ProdmedComponent } from './prodmed/prodmed.component';
import { AlglinComponent } from './alglin/alglin.component';
import { AlgmulComponent } from './algmul/algmul.component';
import { Ej5Component } from './ej5/ej5.component';
import { Ej6Component } from './ej6/ej6.component';
import { Ej7Component } from './ej7/ej7.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'contactos', component: ContactosComponent },
  { path: 'prodmed', component: ProdmedComponent },
  { path: 'alglin', component: AlglinComponent },
  { path: 'algmul', component: AlgmulComponent },
  { path: 'ej5', component: Ej5Component },
  { path: 'ej6', component: Ej6Component},
  { path: 'ej7', component: Ej7Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
