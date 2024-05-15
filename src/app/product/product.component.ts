import { Component, OnInit } from '@angular/core';
import { Product } from './product.module';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  product: Product | undefined;
  quantity: number = 1;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private cartService: CartService){}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.apiService.getProductById(productId).subscribe(product => {
        this.product = product;
      });
    }
  }

  addToCart() {
    const item = { ...this.product, quantity: this.quantity };
    this.cartService.addToCart(item);
  }

}
