import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../product/product.module';

import { Order } from '../orders/orders/orders.module';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore: AngularFirestore) { }
  getProducts(): Observable<Product[]> {
    return this.firestore.collection<Product>('products').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Product;
          return { ...data };
        });
      })
    );
  }

  getProductById(productId: string): Observable<Product | undefined> {
    return from(
      this.firestore.collection('products', ref => ref.where('id', '==', productId)).get()
    ).pipe(
      map(productsSnapshot => {
        if (!productsSnapshot.empty) {
          const productDoc = productsSnapshot.docs[0];
          const data = productDoc.data() as Product;
          return { ...data };
        } else {
          throw new Error('Product not found');
        }
      })
    );
  }

  updateProduct(productId: string, updatedProductData: any): Observable<void> {
    return new Observable<void>((observer) => {
      this.firestore.collection('products', ref => ref.where('id', '==', productId))
        .get()
        .pipe(
          catchError(error => {
            observer.error(`Error fetching product: ${error}`);
            return throwError(error);
          })
        )
        .subscribe(productsSnapshot => {
          if (productsSnapshot.empty) {
            observer.error('Product not found');
            return;
          }
          productsSnapshot.forEach(doc => {
            doc.ref.update(updatedProductData);
          });
          console.log('Product updated successfully');
          observer.next();
          observer.complete();
        });
    });
  }

  getOrders(): Observable<Order[]> {
    return this.firestore.collection<Order>('orders').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Order;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }


  async addProduct(productData: any): Promise<string> {
    try {
      const productsRef = this.firestore.collection('products');

      const lastProductQuery = await productsRef.ref.orderBy('id', 'desc').limit(1).get();

      let newId = '1'; 

      if (!lastProductQuery.empty) {
        const lastProduct = lastProductQuery.docs[0].data() as any;
        const lastId = parseInt(lastProduct.id, 10);
        newId = String(lastId + 1); 
      }

   
      await productsRef.add({ ...productData, id: newId });
      console.log('Product added with ID: ', newId);

      return newId; 
    } catch (error) {
      console.error('Error adding product: ', error);
      throw error;
    }
  }

  async addOrder(orderData: any): Promise<void> {
    try {
      await this.firestore.collection('orders').add({
        ...orderData,
        createdAt: new Date()  
      });
      console.log('Order added successfully');
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  }
  
} //final
