import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { AdminDashComponent } from './admin/admin-dash/admin-dash.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { SigninComponent } from './signin/signin.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrdersComponent } from './orders/orders.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'admindashboard', component: AdminDashComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: 'editproduct/:id', component: EditProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
