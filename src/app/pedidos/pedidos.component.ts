import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  orderForm: FormGroup;
  NUM_ITERATIONS = 0;
  calculations: { pob: number; anios: number; tasaN: number; tasaM: number; pobF: number }[] = [];

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      anios: [''],
      tasaN: [''],
      tasaM: [''],
      pob: ['']
    });
  }

  ngOnInit() {}

  clearForm() {
    this.orderForm.reset();

  }

  Simulation(): void {
    let pob = this.calculations[0].pob; // Inicializamos pob con el valor inicial
    for (let i = 0; i < this.NUM_ITERATIONS; i++) {
        const pob= this.calculations[i].pobF;
        const tasaN = this.calculations[i].tasaN;
        const tasaM = this.calculations[i].tasaM;
        const pobF = Math.round((pob + tasaN*pob) - tasaM*pob);
        
        this.calculations.push({ pob, anios: i+1, tasaN, tasaM, pobF});
    }
  }
  submitForm() {
    const formValue = this.orderForm.value;
    const pob = formValue.pob;
    const anios = formValue.anios;
    const tasaN = formValue.tasaN;
    const tasaM = formValue.tasaM;
    console.log(pob, anios, tasaN, tasaM);
    if (!anios || !tasaN || !tasaM || !pob) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, llena todos los campos.',
        icon: 'error'
      });
      return;
    }
    if (anios < 0 || tasaN < 0 || tasaM < 0 || pob < 0) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, llena todos los campos con valores positivos.',
        icon: 'error'
      });
      return;
    }
    if(tasaN < tasaM){
      Swal.fire({
        title: 'Error',
        text: 'La tasa de natalidad debe ser mayor que la tasa de mortalidad.',
        icon: 'error'
      });
      return;
    }
    if(tasaN>1 || tasaM>1){
      Swal.fire({
        title: 'Error',
        text: 'Las tasas de natalidad y mortalidad deben ser menores o iguales a 1.',
        icon: 'error'
      });
      return;
    }
    // Limpiamos el array calculations
    this.calculations = [];
    this.calculations.push({ pob, anios:0, tasaN, tasaM, pobF: (pob + tasaN*pob) - tasaM*pob});
    this.NUM_ITERATIONS = anios;  // Actualizamos la cantidad de iteraciones
    this.Simulation();
    Swal.fire({
      title: 'Simulacion generada con éxito',
      text: 'Se ha generado la simulación con éxito.',
      icon: 'success'
    });
  }
}
