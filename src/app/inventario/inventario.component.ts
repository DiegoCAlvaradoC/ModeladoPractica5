import { Component, OnInit } from '@angular/core';
import { EquipoService, Paciente } from '../service/equipo.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  patients: Paciente[] = [];
  newPatient: Paciente = {ci: '', nombre: '', tipoSangre: ''};
  editMode = false;
  editIndex: number | null = null;

  constructor(private equipoService: EquipoService) { }

  ngOnInit() {
    this.listPatients();
  }

  listPatients() {
  this.equipoService.getPacientes().subscribe(
    (response: any) => {
      this.patients = response as Paciente[];
      console.log(this.patients);
    },
    error => {
      console.log(error);
    }
  );
}

  addPatient(event: Event) {
    event.preventDefault();
    if (this.newPatient.ci && this.newPatient.nombre && this.newPatient.tipoSangre) {
      this.equipoService.addPaciente(this.newPatient).subscribe(
        response => {
          this.newPatient = {ci: '', nombre: '', tipoSangre: ''};
          this.listPatients();  // Re-fetch the patient list after adding a patient
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  editPatient(index: number) {
    this.editMode = true;
    this.editIndex = index;
    this.newPatient = { ...this.patients[index] };
  }

  updatePatient() {
    if (this.editIndex !== null) {
      this.equipoService.updatePaciente(this.patients[this.editIndex].ci, this.newPatient).subscribe(
        response => {
          if (this.editIndex !== null) {
            this.patients[this.editIndex] = { ...this.newPatient };
          }
          this.newPatient = {ci: '', nombre: '', tipoSangre: ''};
          this.editMode = false;
          this.editIndex = null;
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  cancelEdit() {
    this.editMode = false;
    this.editIndex = null;
    this.newPatient = {ci: '', nombre: '', tipoSangre: ''};
  }

  deletePatient(patient: Paciente) {
    const index = this.patients.indexOf(patient);
    if (index > -1) {
      if (patient.ci) {
        this.equipoService.deletePaciente(patient.ci).subscribe(
          response => {
            this.patients.splice(index, 1);
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
      } else {
        console.log('Error: ci es undefined.');
      }
    }
  
  }
}
