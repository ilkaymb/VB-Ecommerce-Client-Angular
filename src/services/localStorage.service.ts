import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  // LocalStorage'a veri eklemek
  addItemToCart(key: string, item: any): void {
    let cartItems = this.getCartItems(key) || [];
    cartItems.push(item);
    localStorage.setItem(key, JSON.stringify(cartItems));
  }

  // LocalStorage'dan verileri almak
  getCartItems(key: string): any[] {
    const cartItems = localStorage.getItem(key);
    return cartItems ? JSON.parse(cartItems) : [];
  }

  // LocalStorage'dan veri silmek
  removeItemFromCart(key: string, item: any): void {
    let cartItems = this.getCartItems(key) || [];
    const updatedCartItems = cartItems.filter((i) => i.id !== item.id);
    localStorage.setItem(key, JSON.stringify(updatedCartItems));
  }
  clearCart(key: string): void {
    localStorage.removeItem(key);
  }
}
