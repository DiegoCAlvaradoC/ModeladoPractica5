import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface SimulationResult {
  totalCustomers: number;
  buyingCustomers: number;
  totalItemsSold: number;
  netGain: number;
  
}

@Component({
  selector: 'app-ej5',
  templateUrl: './ej5.component.html',
  styleUrls: ['./ej5.component.css']
})
export class Ej5Component implements OnInit {
  orderForm: FormGroup;
  simulationResults: SimulationResult[] = [];
  totalNetGain: number = 0;
  totalItemsSold: number = 0;
  averageItemsSold: number = 0;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      hours: ['', [Validators.required, Validators.min(1)]], // The number of hours for the simulation
      itemPurchasePrice: ['', [Validators.required, Validators.min(0)]], // Cost of the item
      dailyCost: ['', [Validators.required, Validators.min(0)]], // Daily fixed cost
      itemSalePrice: ['', [Validators.required, Validators.min(0)]] // Sale price of the item
    });
  }

  ngOnInit(): void {}

  private showAlert(message: string): void {
    // Use your preferred method to display alerts here.
    alert(message);
  }

  private simulateCustomersPerHour(): number {
    // Simulates customer arrivals per hour: 2 ± 2
    return Math.floor(Math.random() * 5); // 0 to 4, representing 2 ± 2 customers
  }

  private simulateItemsBought(): number {
    // Probability function of items bought
    let randomValue = Math.random();
    if (randomValue < 0.2) return 0;
    if (randomValue < 0.5) return 1;
    if (randomValue < 0.8) return 2;
    if (randomValue < 0.9) return 3;
    return 4; // For 0.1 probability of buying 4 items
  }

  private simulateDay(itemPurchasePrice: number, dailyCost: number, itemSalePrice: number): void {
    let totalCustomers = 0;
    let buyingCustomers = 0;
    let totalItemsSold = 0;
    let totalRevenue = 0;
  
    for (let hour = 0; hour < 24; hour++) { // Simulamos un día completo de 24 horas
      const customers = this.simulateCustomersPerHour();
      totalCustomers += customers;
  
      for (let i = 0; i < customers; i++) {
        const itemsBought = this.simulateItemsBought();
        if (itemsBought > 0) buyingCustomers++;
        totalItemsSold += itemsBought;
        totalRevenue += itemsBought * itemSalePrice;
      }
    }
  
    let totalCost = totalItemsSold * itemPurchasePrice + dailyCost; // Incluimos el costo fijo diario
    const netGain = totalRevenue - totalCost;
  
    this.simulationResults.push({
      totalCustomers,
      buyingCustomers,
      totalItemsSold,
      netGain
    });
  
    this.totalNetGain += netGain; 
    this.totalItemsSold += totalItemsSold;
  }

  submitForm(): void {
    if (this.orderForm.valid) {
      const hours = this.orderForm.get('hours')!.value;
      const itemPurchasePrice = this.orderForm.get('itemPurchasePrice')!.value;
      const dailyCost = this.orderForm.get('dailyCost')!.value;
      const itemSalePrice = this.orderForm.get('itemSalePrice')!.value;
  
      this.clearForm();
  
      for (let i = 0; i < hours; i++) { // "hours" ahora representa la cantidad de días a simular
        this.simulateDay(itemPurchasePrice, dailyCost, itemSalePrice);
      }
  
      this.averageItemsSold = this.totalItemsSold / hours; // Dividimos entre la cantidad de días simulados
    } else {
      this.showAlert('Ingrese todos los campos requeridos y asegúrese de que los valores sean válidos (mayores a 0).');
    }
  }

  clearForm(): void {
    this.orderForm.reset();
    this.simulationResults = [];
    this.totalNetGain = 0;
    this.totalItemsSold = 0;
  }
}
