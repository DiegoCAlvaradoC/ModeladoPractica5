import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  url = '/api';  // Asegúrate que esta URL es correcta y está accesible

  constructor(private http: HttpClient) { }

  // GET pacientes
  getPacientes() {
    return this.http.get(this.url + '/pacientes');
  }

  // GET un paciente
  getPaciente(ci: string) {
    return this.http.get(this.url + '/pacientes/' + ci);
  }

  // POST un paciente
  addPaciente(paciente: Paciente) {
    return this.http.post(this.url + '/pacientes', paciente);
  }

  // DELETE un paciente
  deletePaciente(ci: string) {
    console.log('Deleting patient with ci: ', ci);  
    return this.http.delete(`${this.url}/pacientes/${ci}`);
  }
  
  // PUT un paciente
  updatePaciente(ci: string, paciente: Paciente) {
    return this.http.put(this.url + '/pacientes/' + ci, paciente);
  }
}

export interface Paciente {
  ci: string;
  nombre: string;
  tipoSangre: string;
}
