import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface SimulationResult {
  day: number;
  eggsLaid: number;
  eggsBroken: number;
  chicksBorn: number;
  chicksDied: number;
  dailyIncome: number;
}

@Component({
  selector: 'app-ej6',
  templateUrl: './ej6.component.html',
  styleUrls: ['./ej6.component.css']
})
export class Ej6Component implements OnInit {
  orderForm: FormGroup;
  simulationResults: SimulationResult[] = [];
  totalIncome: number = 0;

  // Propiedades agregadas para el resumen
  totalEggsLaid: number = 0;
  totalEggsBroken: number = 0;
  totalChicksBorn: number = 0;
  totalChicksDied: number = 0;
  totalChickensSold: number = 0;
  totalEggsSold: number = 0;
  simulationDays: number = 0; // Para mostrar la cantidad de días en el resumen

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      simulationDays: ['', [Validators.required, Validators.min(1)]],
      eggSalePrice: ['', [Validators.required, Validators.min(0)]],
      chickSalePrice: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  private poissonRandom(lambda: number): number {
    let L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
      k++;
      p *= Math.random();
    } while (p > L);
    return k - 1;
  }

  simulateFarm(): void {
    if (this.orderForm.valid) {
      this.simulationDays = this.orderForm.get('simulationDays')!.value;
      const eggPrice = this.orderForm.get('eggSalePrice')!.value;
      const chickPrice = this.orderForm.get('chickSalePrice')!.value;

      // Resetear los resultados de la simulación y los totales
      this.simulationResults = [];
      this.totalIncome = 0;
      this.totalEggsLaid = 0;
      this.totalEggsBroken = 0;
      this.totalChicksBorn = 0;
      this.totalChicksDied = 0;
      this.totalChickensSold = 0;
      this.totalEggsSold = 0;

      for (let day = 1; day <= this.simulationDays; day++) {
        const eggsLaid = this.poissonRandom(2);
        const eggsBroken = Math.round(eggsLaid * 0.2);
        const chicksBorn = Math.round((eggsLaid - eggsBroken) * 0.3);
        let chicksDied = 0;

        for (let i = 0; i < chicksBorn; i++) {
          if (Math.random() < 0.2) {
            chicksDied++;
          }
        }

        const dailyIncome = (eggsLaid - eggsBroken) * eggPrice + (chicksBorn - chicksDied) * chickPrice;
        
        // Acumular los totales
        this.totalEggsLaid += eggsLaid;
        this.totalEggsBroken += eggsBroken;
        this.totalChicksBorn += chicksBorn;
        this.totalChicksDied += chicksDied;
        this.totalChickensSold += chicksBorn - chicksDied; // Suponiendo que todos los pollos nacidos se venden
        this.totalEggsSold += eggsLaid - eggsBroken; // Suponiendo que todos los huevos puestos se venden
        
        this.simulationResults.push({
          day,
          eggsLaid,
          eggsBroken,
          chicksBorn,
          chicksDied,
          dailyIncome
        });

        this.totalIncome += dailyIncome;
      }
    } else {
      this.showAlert('Por favor, completa todos los campos correctamente.');
    }
  }

  clearForm(): void {
    this.orderForm.reset();
    this.simulationResults = [];
    this.totalIncome = 0;
    this.totalEggsLaid = 0;
    this.totalEggsBroken = 0;
    this.totalChicksBorn = 0;
    this.totalChicksDied = 0;
    this.totalChickensSold = 0;
    this.totalEggsSold = 0;
  }

  private showAlert(message: string): void {
    // Lógica para mostrar una alerta al usuario
    console.warn(message);
  }
}
