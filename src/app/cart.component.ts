import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cart: any[] = [];
  constructor(private router: Router) {
    this.loadCart();
  }
  loadCart() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }
  goStore() {
    this.router.navigate(['/']);
  }
  get cartCount() {
    return this.cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  }
  updateQty(idx: number, qty: number) {
    if (qty < 1) qty = 1;
    this.cart[idx].qty = qty;
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  onQtyChange(event: Event, idx: number) {
    const input = event.target as HTMLInputElement;
    let qty = Number(input.value);
    if (isNaN(qty) || qty < 1) qty = 1;
    this.updateQty(idx, qty);
    input.value = String(qty); // 修正輸入框顯示
  }
  // 之後會補上購物車資料與邏輯
}
