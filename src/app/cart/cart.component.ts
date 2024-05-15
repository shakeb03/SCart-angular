import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ApiService } from '../services/api.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  user$: Observable<any> = this.afAuth.authState.pipe(
    startWith(null),
  );
  userEmail: String = "";

  constructor(private cartService: CartService, private apiService: ApiService,private afAuth: AngularFireAuth) { 
    this.user$ = afAuth.authState;
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  }

  incrementQuantity(index: number) {
    this.cartItems[index].quantity++;
    this.cartService.updateQuantity(index, this.cartItems[index].quantity); 
    this.calculateTotal(); 
  }

  decrementQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.cartService.updateQuantity(index, this.cartItems[index].quantity); 
      this.calculateTotal(); 
    }
  }

  removeItem(index: number) {
    this.cartService.removeItem(index); 
    this.cartItems = this.cartService.getCartItems(); 
    this.calculateTotal();
  }
  
  placeOrder(){
    
    const productNames = this.cartItems.map(item => item.name);
    // const userEmail = '';
    this.user$.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        // console.log('User email:', userEmail);

      }
    });
    
    // const quantities = this.cartItems.map(item => item.quantity);
    // const prices = this.cartItems.map(item => item.price);

    const orderData = {
      orderPrice: this.total, 
    productName: productNames,
    userEmail: this.userEmail
    // quantity: quantities,
    // price: this.calculateTotal(),
    };

    if(this.userEmail != ''){
      this.apiService.addOrder(orderData)
        .then(() => {
          console.log('Order placed successfully');
          // this.cartService.clearCart();
          this.cartItems = [];
          this.total = 0;
          this.userEmail = "";
          localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        })
        .catch((error: any) => {
          console.error('Error placing order:', error);
        });
    }
    else{
      alert("Log in before placing order");
      console.log("Please log in");
    }
  }
}
