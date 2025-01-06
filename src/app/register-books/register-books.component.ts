import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-books',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register-books.component.html',
  styleUrl: './register-books.component.css'
})

export class RegisterBooksComponent {

  formulario = new FormGroup({
    title : new FormControl('', [Validators.required]),
    author : new FormControl('', [Validators.required]),
    genre : new FormControl('', [Validators.required]),
    publicationDate : new FormControl('', [Validators.required]),
    publisher : new FormControl('', [Validators.required]),
    collection : new FormControl(''),
  })

  registerBook() {
    console.log(this.formulario.value);
  }
}
