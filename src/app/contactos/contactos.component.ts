import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      message: ['']
    });
  }

  ngOnInit() {}

  submitForm() {
    const formValue = this.contactForm.value;
    Swal.fire({
      title: 'Información de Contacto',
      html: `
        <b>Nombre:</b> ${formValue.name}<br/>
        <b>Correo:</b> ${formValue.email}<br/>
        <b>Teléfono:</b> ${formValue.phone}<br/>
        <b>Mensaje:</b> ${formValue.message}
      `,
      icon: 'info',
      customClass: {
        confirmButton: 'custom-confirm-button',
        icon: 'custom-icon'
      }
    });
  }
}
