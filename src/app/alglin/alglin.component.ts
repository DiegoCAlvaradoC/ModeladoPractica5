import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
interface Simulacion {
  Simulacion: number;
  JuegosGanados: number;
  JuegosPerdidos: number;
  Ganancia: number;

}

interface GameResult {
  launch: number;
  die1: number;
  die2: number;
  sum: number;
  gainLoss: number;
  totalAccumulated: number;
}

@Component({
  selector: 'app-alglin',
  templateUrl: './alglin.component.html',
  styleUrls: ['./alglin.component.css']
})
export class AlglinComponent implements OnInit {
  orderForm: FormGroup;
  gameResults: GameResult[] = [];
  simulaciones: Simulacion[] = [];
  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      numSimulaciones: [''],
      numJuegos: [''],
      costoJuego: [''],
      gananciaJugador: ['']
    });
  }

  ngOnInit() {}

  private rollDice(): number {
    return Math.floor(Math.random() * 6) + 1;
  }
  get GanoMesa() {
    //promedio de juegos ganados
    let total = 0;
    this.simulaciones.forEach((simulacion) => {
      total += simulacion.JuegosGanados;
    });
    return Math.round(total / this.simulaciones.length);
  }
  get GanoJugador() {
    //promedio de juegos perdidos
    let total = 0;
    this.simulaciones.forEach((simulacion) => {
      total += simulacion.JuegosPerdidos;
    });
    return Math.round(total / this.simulaciones.length);
  }
  get GananciaPromedio() {
    //promedio de ganancia
    let total = 0;
    this.simulaciones.forEach((simulacion) => {
      total += simulacion.Ganancia;
    });
    return Math.round(total / this.simulaciones.length);
  }
  

  private simulateGame(numSimulacion:number, gamesCount: number, costoJuego: number, gananciaJugador: number) {
    this.gameResults = [];
    let JuegosGanados = 0;
    let JuegosPerdidos = 0;
    let totalAccumulated = 0;
    console.log(numSimulacion);
    for (let i = 0; i < gamesCount; i++) {
      const die1 = this.rollDice();
      const die2 = this.rollDice();
      const sum = die1 + die2;
      let gainLoss = 0;
      if(sum === 7){  
           gainLoss = -gananciaJugador;
           JuegosPerdidos++;
      }
      else{
         gainLoss = costoJuego;
          JuegosGanados++;
      }
      totalAccumulated += gainLoss;
      this.gameResults.push({
        launch: i + 1,
        die1,
        die2,
        sum,
        gainLoss,
        totalAccumulated
      });
    }
    this.simulaciones.push({
      Simulacion: numSimulacion,
      JuegosGanados,
      JuegosPerdidos,
      Ganancia: totalAccumulated
    });
  }
  private simulateSimulacion(numSimulacion: number, numJuegos: number, costoJuego: number, gananciaJugador: number) {
    this.simulaciones = [];
    for (let i = 0; i < numSimulacion; i++) {
      this.simulateGame(i, numJuegos, costoJuego, gananciaJugador);
      
    }
  }

  submitForm() {
    const numSimulacion = this.orderForm.get('numSimulaciones')?.value;
    const numJuegos = this.orderForm.get('numJuegos')?.value;
    const costoJuego = this.orderForm.get('costoJuego')?.value;
    const gananciaJugador = this.orderForm.get('gananciaJugador')?.value;
    console.log(numSimulacion, numJuegos, costoJuego, gananciaJugador);
    if (!Number.isInteger(+numJuegos) || numJuegos <= 0 ||
        !Number.isInteger(+costoJuego) || costoJuego <= 0 ||
        !Number.isInteger(+gananciaJugador) || gananciaJugador <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, ingresa números enteros positivos para el número de juegos, el costo del juego y la ganancia del jugador.',
        icon: 'error'
      });
      return;
    }
    this.simulateSimulacion(numSimulacion, numJuegos, costoJuego, gananciaJugador);
  }

  clearForm() {
    this.orderForm.reset();
    this.gameResults = [];
  }
}
