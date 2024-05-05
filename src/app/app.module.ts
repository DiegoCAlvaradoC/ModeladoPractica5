import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ContactosComponent } from './contactos/contactos.component';
import { InventarioComponent } from './inventario/inventario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProdmedComponent } from './prodmed/prodmed.component';
import { AlglinComponent } from './alglin/alglin.component';
import { AlgmulComponent } from './algmul/algmul.component';
import { Ej5Component } from './ej5/ej5.component';
import { Ej6Component } from './ej6/ej6.component';
import { Ej7Component } from './ej7/ej7.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PedidosComponent,
    ContactosComponent,
    InventarioComponent,
    HeaderComponent,
    FooterComponent,
    ProdmedComponent,
    AlglinComponent,
    AlgmulComponent,
    Ej5Component,
    Ej6Component,
    Ej7Component,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
