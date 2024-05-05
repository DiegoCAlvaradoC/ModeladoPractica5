import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

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

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      numJuegos: [''],
      costoJuego: [''],
      gananciaJugador: ['']
    });
  }

  ngOnInit() {}

  private rollDice(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  get houseWins(): number {
    return this.gameResults.filter(result => result.gainLoss === -this.orderForm.value.costoJuego).length;
  }

  get playerWins(): number {
    return this.gameResults.filter(result => result.gainLoss === this.orderForm.value.gananciaJugador).length;
  }

  get totalHouseGain(): number {
    return this.gameResults.reduce((acc, result) => acc + result.gainLoss, 0);
  }

  private simulateGame(gamesCount: number, costoJuego: number, gananciaJugador: number) {
    this.gameResults = [];
    for (let i = 0; i < gamesCount; i++) {
      const die1 = this.rollDice();
      const die2 = this.rollDice();
      const sum = die1 + die2;
      const gainLoss = sum === 7 ? gananciaJugador : -costoJuego;
      this.gameResults.push({
        launch: i + 1,
        die1,
        die2,
        sum,
        gainLoss,
        totalAccumulated: (this.gameResults[i - 1]?.totalAccumulated || 0) + gainLoss
      });
    }
  }

  submitForm() {
    const numJuegos = this.orderForm.get('numJuegos')?.value;
    const costoJuego = this.orderForm.get('costoJuego')?.value;
    const gananciaJugador = this.orderForm.get('gananciaJugador')?.value;

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

    this.simulateGame(numJuegos, costoJuego, gananciaJugador);
  }

  clearForm() {
    this.orderForm.reset();
    this.gameResults = [];
  }
}
