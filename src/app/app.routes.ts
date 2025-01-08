import { Routes } from '@angular/router';
import { RegisterBooksComponent } from './register-books/register-books.component';
import { ConsultBooksComponent } from './consult-books/consult-books.component';
import { EditBooksComponent } from './edit-books/edit-books.component';

export const routes: Routes = [
    {
        path: 'app/register-books',
        component: RegisterBooksComponent
    },
    {
        path: 'app/consult-books',
        component: ConsultBooksComponent
    },
    {
        path: 'app/edit-books/:id',
        component: EditBooksComponent
    },
    {
        path: '', pathMatch: 'full',
        redirectTo: '/app/consult-books'
    }

];
