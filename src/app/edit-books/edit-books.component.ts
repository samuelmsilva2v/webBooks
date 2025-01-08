import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-books',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-books.component.html',
  styleUrls: ['./edit-books.component.css'],
})

export class EditBooksComponent implements OnInit {
  bookId: string = '';
  bookForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    publicationDate: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
    collection: new FormControl(''),
  });

  message: string = '';

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id') || '';
    console.log('ID do livro para edição:', this.bookId);
    this.loadBookDetails();
  }

  loadBookDetails(): void {

    this.httpClient.get<any>(`http://localhost:8080/api/books/${this.bookId}`).subscribe({
      next: (book) => {

        this.bookForm.patchValue(book);
      },
      error: (error) => {
        console.error('Erro ao carregar os detalhes do livro:', error);
        this.message = 'Erro ao carregar os detalhes do livro.';
      },
    });
  }

  updateBook(): void {
    
    if (this.bookForm.valid) {
      const formattedDate = this.formatDate(this.bookForm.get('publicationDate')?.value);
  
      const updatedBook = {
        ...this.bookForm.value,
        publicationDate: formattedDate, 
      };
  
      console.log('Dados enviados para atualização:', updatedBook);
  
      this.httpClient.put(`http://localhost:8080/api/books/${this.bookId}`, updatedBook).subscribe({
        next: () => {
          this.message = 'Livro atualizado com sucesso!';
          setTimeout(() => this.router.navigate(['/app/consult-books']), 2000);
        },
        error: (error) => {
          console.error('Erro ao atualizar o livro:', error);
          this.message = 'Erro ao atualizar o livro.';
        },
      });
    } else {
      this.message = 'Por favor, preencha todos os campos obrigatórios.';
    }
  }
  
  formatDate(date: string | null | undefined): string {
    if (!date) return ''; 
    const parsedDate = new Date(date); 
    const day = String(parsedDate.getDate()).padStart(2, '0'); 
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); 
    const year = parsedDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
