import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prodmed',
  templateUrl: './prodmed.component.html',
  styleUrls: ['./prodmed.component.css']
})
export class ProdmedComponent implements OnInit {
  orderForm: FormGroup;
  capital: number = 0;
  time: number = 1;
  interest: number | null = null;
  totalAmount: number | null = null;
  calculations: { capital: number; time: number; interest: number; totalAmount: number }[] = [];

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      capital: [''],
      time: ['']
    });
  }

  ngOnInit() {
    // La simulación inicial se puede hacer aquí si es necesario
  }

  clearForm() {
    this.orderForm.reset();
    this.capital = 0;
    this.time = 1;
    this.interest = null;
    this.totalAmount = null;
    this.calculations = [];
  }

  submitForm() {
    const formValue = this.orderForm.value;
    this.capital = formValue.capital;
    this.time = formValue.time;

    if (!this.capital || !this.time) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, llena todos los campos.',
        icon: 'error'
      });
      return; // Salir del método
    }

    if (this.capital <= 0 || this.time <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'Solo se permite números positivos > 0.',
        icon: 'error'
      });
      return; // Salir del método
    }
    if (!Number.isInteger(this.time)) {
      Swal.fire({
        title: 'Error',
        text: 'El tiempo en años debe ser un número entero.',
        icon: 'error'
      });
      return; // Salir del método
    }
    

    let rate = this.getInterestRate(this.capital);
    this.interest = this.capital * rate * this.time;
    this.totalAmount = this.capital + this.interest;

    this.calculations.push({
      capital: this.capital,
      time: this.time,
      interest: this.interest,
      totalAmount: this.totalAmount
    });

    

    Swal.fire({
      title: 'Calculo realizado',
      icon: 'success'
    });
  }

  getInterestRate(capital: number): number {
    if (capital <= 10000) {
      return 0.035;
    } else if (capital <= 100000) {
      return 0.040;
    } else {
      return 0.050;
    }
  }

 
}
