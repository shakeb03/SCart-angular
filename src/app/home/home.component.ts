import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Product } from '../product/product.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, startWith } from 'rxjs';

// const products = {
//   name: "product 1",
//   description: "test desc",
//   price: "123"
// };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  user$: Observable<any> = this.afAuth.authState.pipe(
    startWith(null),
  );
  
  products: Product[] = [];
  // products = [
  //   {
  //     id: '1',
  //     name: 'Product 1',
  //     description: 'Description of Product 1',
  //     imageUrl: 'https://via.placeholder.com/150',
  //     price: 10
  //   },
  //   {
  //     id: '2',
  //     name: 'Product 2',
  //     description: 'Description of Product 2',
  //     imageUrl: 'https://via.placeholder.com/150',
  //     price: 20
  //   },
  //   {
  //     id: '3',
  //     name: 'Product 3',
  //     description: 'Description of Product 3',
  //     imageUrl: 'https://via.placeholder.com/150',
  //     price: 30
  //   }
  // ];

  constructor(private router: Router, private apiService: ApiService, private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
   }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  viewProductDetails(productId: string) {
    this.router.navigate(['/product', productId]);
  }

  editProduct(productId: string){
    this.router.navigate(['/editproduct', productId]);

  }

}
