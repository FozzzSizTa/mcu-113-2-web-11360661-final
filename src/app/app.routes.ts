import { Routes } from '@angular/router';
import { BookStoreComponent } from './book-store.component';
import { BookDetailComponent } from './book-detail.component';

export const routes: Routes = [
  { path: '', component: BookStoreComponent },
  { path: 'book/:id', component: BookDetailComponent },
];
