import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

interface NSA {
  i: number;
  semilla: number;
  yi: number; 
  xi: number;
  ri: number;
  observacion: string;
}

@Component({
  selector: 'app-algmul',
  templateUrl: './algmul.component.html',
  styleUrls: ['./algmul.component.css']
})
export class AlgmulComponent implements OnInit {
  orderForm: FormGroup;
  numeros: NSA[] = [];
  NUM_ITERATIONS = 0;
  bestSolution: [number, number, number] | null = null;
  Z = 0; 
  iterationBestSolution: number | null = null;  
  calculations: { x1:number; x2:number; x3:number; Z: number; iteracion: number }[] = [];
  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      numIteraciones: ['']
    });
  }

  ngOnInit() {}

  clearForm() {
    this.orderForm.reset();
    this.numeros = [];
  }
  generate_rx(): number {
    return Math.random();
  }

  Simulation(): void {
    for (let i = 0; i < this.NUM_ITERATIONS; i++) {
      let rx1c = this.generate_rx();
      let rx2c = this.generate_rx();
      let xc1 = Math.round(10 * rx1c); // Genera aleatorio entre 0 y 1000
      let xc2 = Math.round(100 * rx2c); // Genera  aleatorio entre 5 y 100

      //let xc1 = 22; // Genera aleatorio entre 0 y 1000
      //let xc2 = 23;
      let x1 = xc1;
      let x2 = xc2;

      let restriction = (x1+x2>=2);

      if (restriction) {
        
          let rx3c = this.generate_rx();
          let xc3 = Math.round(1+(2-1)*rx3c); //1 y 2
          let x3 = xc3;
          let Zc = Math.floor(2*x1 + 3*x2 -x3);  
          if (Zc >this.Z) {
              this.Z = Zc;
              this.bestSolution = [x1, x2, x3];
              this.iterationBestSolution = i;
          }
          this.calculations.push({ x1, x2, x3, Z: Zc, iteracion: i+1 });
      }
      else{
        this.calculations.push({ x1, x2, x3: 0, Z: 0, iteracion: i+1 });
      }
    }
  }
  submitForm() {
    const formValue = this.orderForm.value;
    const numIteraciones = formValue.numIteraciones;

    if (!Number.isInteger(numIteraciones)) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, ingresa un número entero para las iteraciones.',
        icon: 'error'
      });
      return;
    }

    if (numIteraciones <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'Solo se permite números positivos > 0.',
        icon: 'error'
      });
      return;
    }
    this.calculations = [];
    this.Z = 0;
    this.bestSolution = null;
    this.NUM_ITERATIONS = numIteraciones;  // Actualizamos la cantidad de iteraciones
    this.Simulation();
    Swal.fire({
      title: 'Simulacion generada con éxito',
      text: 'Se ha generado la simulación con éxito.',
      icon: 'success'
    });
  }
}