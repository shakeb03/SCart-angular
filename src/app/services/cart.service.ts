import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  cartItems$ = new BehaviorSubject<any[]>([]);

  constructor() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    }
   }

  addToCart(item: any) {
    this.cartItems.push(item);
    this.cartItems$.next(this.cartItems);
    this.saveCartItems();
  }

  getCartItems() {
    return this.cartItems;
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCartItems();
  }

  updateQuantity(index: number, quantity: number) {
    this.cartItems[index].quantity = quantity;
    this.saveCartItems(); 
  }

  clearCart() {
    this.cartItems = [];
    // this.cartItems$.next(this.cartItems);
  }

  private saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
