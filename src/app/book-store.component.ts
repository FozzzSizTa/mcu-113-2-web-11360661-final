import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  page = 1;
  pageSize = 4;
  totalPages = 1;
  pageInput = 1;

  constructor(private router: Router) {}

  ngOnInit() {
    fetch('http://localhost:3000/books')
      .then(res => res.json())
      .then(data => {
        this.books = data;
        this.updateTotalPages();
      });
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

  pagedBooks() {
    const filtered = this.filteredBooks();
    this.updateTotalPages(filtered.length);
    const start = (this.page - 1) * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }

  updateTotalPages(filteredLength?: number) {
    const count = filteredLength !== undefined ? filteredLength : this.filteredBooks().length;
    this.totalPages = Math.max(1, Math.ceil(count / this.pageSize));
    if (this.page > this.totalPages) this.page = this.totalPages;
  }

  goToPage(p: number) {
    if (p < 1) p = 1;
    if (p > this.totalPages) p = this.totalPages;
    this.page = p;
    this.pageInput = p;
  }

  prevPage() {
    if (this.page > 1) this.goToPage(this.page - 1);
  }

  nextPage() {
    if (this.page < this.totalPages) this.goToPage(this.page + 1);
  }

  onPageInputChange() {
    this.goToPage(this.pageInput);
  }

  onSearch() {
    this.goToPage(1);
  }
  addToCart(book: any) {
    this.cartCount++;
  }
  showDetail(book: any) {
    alert(`${book.title}\n作者：${book.author}\n出版社：${book.publisher}\n價格：$${book.IsOnSale !== null ? book.IsOnSale : book.price}`);
  }
  goDetail(id: number) {
    this.router.navigate(['/book', id]);
  }
}
