import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consult-books',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './consult-books.component.html',
  styleUrls: ['./consult-books.component.css'],
})

export class ConsultBooksComponent implements OnInit {

  books: any[] = [];
  message: string = '';
  errorMessage: string = '';
  paginator: number = 1;

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchBooks();
  }

  deleteBook(id: string) {

    if (confirm('Do you really want to delete the selected book ?')) {
      this.httpClient.delete('http://localhost:8080/api/books/' + id,
      { responseType: 'text' })
        .subscribe({
          next: (resposta) => {
            this.message = resposta; 
            this.ngOnInit(); 
          }
        });
  }
}

navigateToEdit(bookId: string): void {
  this.router.navigate(['/app/edit-books', bookId]);
}

handlePageChange(event: any) {
  this.paginator = event;
}


fetchBooks(): void {
  this.httpClient.get<any[]>('http://localhost:8080/api/books').subscribe({
    next: (response) => {
      this.books = response;
    },
    error: (error) => {
      console.error('Erro ao buscar livros:', error);
      this.errorMessage = 'Erro ao carregar os livros. Tente novamente mais tarde.';
    },
  });
}
}
