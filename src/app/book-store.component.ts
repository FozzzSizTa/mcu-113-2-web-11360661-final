import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-store',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.scss']
})
export class BookStoreComponent implements OnInit {
  search = '';
  cartCount = 0;
  books: any[] = [];

  ngOnInit() {
    fetch('http://localhost:3000/books')
      .then(res => res.json())
      .then(data => this.books = data);
  }

  filteredBooks() {
    return this.books.filter(book =>
      book.IsShow &&
      (
        !this.search.trim() ||
        book.title.includes(this.search) ||
        book.author.includes(this.search)
      )
    );
  }

  onSearch() {}
  addToCart(book: any) {
    this.cartCount++;
  }
  showDetail(book: any) {
    alert(`${book.title}\n作者：${book.author}\n出版社：${book.publisher}\n價格：$${book.IsOnSale ?? book.price}`);
  }
}
