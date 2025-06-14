import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  bookId: string | null = null;
  book: any = null;
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('id');
      if (this.bookId) {
        fetch(`http://localhost:3000/books/${this.bookId}`)
          .then((res) => res.json())
          .then((data) => (this.book = data));
      } else {
        this.book = null;
      }
    });
  }
  ngOnInit() {
    // ...existing code...
  }
  goBack() {
    window.history.back();
  }
  goList() {
    window.location.href = '/';
  }
  goCart() {
    window.location.href = '/cart';
  }
  addToCart() {
    if (!this.book) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const price = this.book.IsOnSale !== null ? this.book.IsOnSale : this.book.price;
    const idx = cart.findIndex((item: any) => item.id === this.book.id);
    if (idx > -1) {
      cart[idx].qty = (cart[idx].qty || 1) + 1;
    } else {
      cart.push({ id: this.book.id, name: this.book.title, price, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
