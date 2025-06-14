import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-store',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.scss']
})
export class BookStoreComponent {
  search = '';
  cartCount = 0;
  books = [
    {
      title: 'Angular 入門',
      author: '王小明',
      publisher: '博碩文化',
      price: 450,
      image: 'https://fakeimg.pl/200x280/?text=Angular'
    },
    {
      title: 'TypeScript 實戰',
      author: '李小華',
      publisher: '博碩文化',
      price: 520,
      image: 'https://fakeimg.pl/200x280/?text=TypeScript'
    },
    {
      title: 'Vue 快速上手',
      author: '陳大明',
      publisher: '博碩文化',
      price: 399,
      image: 'https://fakeimg.pl/200x280/?text=Vue'
    },
    {
      title: 'React 全攻略',
      author: '林小美',
      publisher: '博碩文化',
      price: 580,
      image: 'https://fakeimg.pl/200x280/?text=React'
    },
    {
      title: 'Python 程式設計',
      author: '張偉',
      publisher: '博碩文化',
      price: 650,
      image: 'https://fakeimg.pl/200x280/?text=Python'
    }
  ];
  filteredBooks() {
    if (!this.search.trim()) return this.books;
    return this.books.filter(book =>
      book.title.includes(this.search) ||
      book.author.includes(this.search)
    );
  }
  onSearch() {
    // 觸發搜尋，實際已即時過濾
  }
  addToCart(book: any) {
    this.cartCount++;
    // 可擴充購物車邏輯
  }
  showDetail(book: any) {
    alert(`${book.title}\n作者：${book.author}\n出版社：${book.publisher}\n價格：$${book.price}`);
  }
}
