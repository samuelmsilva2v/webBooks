import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-books',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register-books.component.html',
  styleUrls: ['./register-books.component.css'],
  providers: [DatePipe]  // Adicionado o DatePipe aqui
})

export class RegisterBooksComponent {

  message: string = '';

  constructor(
    private httpClient: HttpClient,
    private datePipe: DatePipe
  ) { }

  formulario = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    publicationDate: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
    collection: new FormControl('')
  });

  registerBook() {
    
    const formData = this.formulario.value;
    formData.publicationDate = this.datePipe.transform(formData.publicationDate, 'dd/MM/yyyy');

    this.httpClient.post('http://localhost:8080/api/books', formData, { responseType: 'text' }).subscribe({
      next: () => {  // Ignore o conteúdo da resposta, já que não precisamos usá-lo
        this.message = 'Livro registrado com sucesso!'; // Define a mensagem de sucesso
        this.formulario.reset(); // Reseta o formulário após o sucesso
      },
      error: (error) => {
        console.error('Erro ao registrar livro:', error);
        this.message = 'Erro ao registrar livro. Por favor, tente novamente.'; // Mensagem de erro
      }
    });
  }
}

