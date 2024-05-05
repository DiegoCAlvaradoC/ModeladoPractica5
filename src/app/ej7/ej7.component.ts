import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface SugarSimulationResult {
  day: number;
  initialInventory: number;
  demand: number;
  finalInventory: number;
  unmetDemand: number;
  orderingCost: number;
  inventoryCost: number;
  netGain: number;
}

@Component({
  selector: 'app-ej7',
  templateUrl: './ej7.component.html',
  styleUrls: ['./ej7.component.css']
})
export class Ej7Component implements OnInit {

  orderForm: FormGroup;
  simulationResults: SugarSimulationResult[] = [];
  totalCosts: number = 0;
  totalGains: number = 0;
  totalUnmetDemand: number = 0;

  // Definir constantes y valores por defecto
  private readonly storageCapacity: number = 700; // Capacidad de almacenamiento de la bodega
  private readonly orderCost: number = 100; // Costo de ordenar
  private readonly inventoryCostPerKg: number = 0.1; // Costo de llevar el inventario por Kg
  private readonly acquisitionCostPerKg: number = 3.5; // Costo de adquisición por Kg
  private readonly salePricePerKg: number = 5; // Precio de venta por Kg

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      simulationDays: [60, [Validators.required, Validators.min(1)]],
      storageCapacity: [this.storageCapacity, [Validators.required, Validators.min(0)]],
      orderCost: [this.orderCost, [Validators.required, Validators.min(0)]],
      inventoryCostPerKg: [this.inventoryCostPerKg, [Validators.required, Validators.min(0)]],
      acquisitionCostPerKg: [this.acquisitionCostPerKg, [Validators.required, Validators.min(0)]],
      salePricePerKg: [this.salePricePerKg, [Validators.required, Validators.min(0)]],
      
      reviewPeriod: [7, [Validators.required, Validators.min(1)]] // Revisión cada 7 días
    });
  }

  ngOnInit(): void {}

  // Función auxiliar para generar un número aleatorio siguiendo una distribución exponencial
  private exponentialRandom(mean: number): number {
    return -mean * Math.log(Math.random());
  }

  // Función auxiliar para generar un número aleatorio siguiendo una distribución uniforme
  private uniformRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  simulateStore(): void {
    console.log('Simulate Store Called');
    if (this.orderForm.valid) {
      console.log('Form is valid');
      const simulationDays = this.orderForm.get('simulationDays')!.value;
      const storageCapacity = this.orderForm.get('storageCapacity')!.value;
      const orderCost = this.orderForm.get('orderCost')!.value;
      const inventoryCostPerKg = this.orderForm.get('inventoryCostPerKg')!.value;
      const acquisitionCostPerKg = this.orderForm.get('acquisitionCostPerKg')!.value;
      const salePricePerKg = this.orderForm.get('salePricePerKg')!.value;
      const reviewPeriod = this.orderForm.get('reviewPeriod')!.value;
      
      let currentInventory = storageCapacity;
      let deliveryTime = 0;
  
      // Resetear los resultados de la simulación
      this.simulationResults = [];
  
      for (let day = 1; day <= simulationDays; day++) {
        let demand = Math.round(this.exponentialRandom(100)); // Genera la demanda diaria
        let initialInventory = currentInventory;
        let unmetDemand = 0;
        let orderingCost = 0;
        let inventoryCost = currentInventory * inventoryCostPerKg;
        let netGain = 0;
  
        // Verifica si es necesario hacer un pedido
        if (day % reviewPeriod === 0 || currentInventory === 0) {
          orderingCost = orderCost;
          deliveryTime = this.uniformRandom(1, 3); // Genera el tiempo de entrega
        }
  
        if (deliveryTime > 0) {
          deliveryTime--;
          if (deliveryTime === 0) {
            currentInventory = storageCapacity; // Se asume que el pedido se completará
          }
        }
  
        // Calcula las ventas del día
        if (demand <= currentInventory) {
          netGain = demand * salePricePerKg;
          currentInventory -= demand;
        } else {
          unmetDemand = demand - currentInventory;
          netGain = currentInventory * salePricePerKg;
          currentInventory = 0;
        }
  
        // Registra los resultados del día en la simulación
        this.simulationResults.push({
          day,
          initialInventory,
          demand,
          finalInventory: currentInventory,
          unmetDemand,
          orderingCost,
          inventoryCost,
          netGain: netGain - orderingCost - inventoryCost
        });
      }
  
      // Calcula los totales después de la simulación
      this.totalCosts = this.simulationResults.reduce((acc, result) => acc + result.orderingCost + result.inventoryCost, 0);
      this.totalGains = this.simulationResults.reduce((acc, result) => acc + result.netGain, 0);
      this.totalUnmetDemand = this.simulationResults.reduce((acc, result) => acc + result.unmetDemand, 0);
    } else {
      console.log('Form is invalid');
    }
  }
  
}
