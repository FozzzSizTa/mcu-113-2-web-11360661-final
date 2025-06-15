import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cart: any[] = [];
  name: string = '';
  address: string = '';
  phone: string = '';
  orderSuccess: boolean = false;
  orderInfo: any = null;

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
  removeItem(idx: number) {
    this.cart.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  isInvalid(field: 'name' | 'address' | 'phone') {
    return !this[field];
  }
  get isFormInvalid() {
    return !this.name || !this.address || !this.phone;
  }
  get isCartEmpty() {
    return this.cart.length === 0;
  }
  get totalPrice() {
    return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  checkout() {
    if (this.isFormInvalid || this.isCartEmpty) return;
    this.orderSuccess = true;
    this.orderInfo = {
      name: this.name,
      address: this.address,
      phone: this.phone,
      items: this.cart.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
      })),
      total: this.totalPrice,
    };
    // 清空購物車
    this.cart = [];
    localStorage.removeItem('cart');
  }
  // 之後會補上購物車資料與邏輯
}
