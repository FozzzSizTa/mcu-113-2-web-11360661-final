import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  bookId: string | null = null;
  book: any = null;
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id');
    });
  }
  ngOnInit() {
    if (this.bookId) {
      fetch(`http://localhost:3000/books/${this.bookId}`)
        .then(res => res.json())
        .then(data => this.book = data);
    }
  }
  goBack() {
    window.history.back();
  }
  goList() {
    window.location.href = '/';
  }
}
