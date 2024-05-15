import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params} from '@angular/router';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


interface RouteParams {
  id: string;
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  productId!: string;
  productForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params as RouteParams;
    this.productId = params.id;

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      imageURL: ['', Validators.required]
    });

    this.apiService.getProductById(this.productId).subscribe(product => {
      if (product) {
        this.productForm.patchValue(product); // Populate form with product details
      } else {
        // Handle the case where product is undefined
        console.error('Product not found.');
      }
    });
  }

  updateProduct(){
    const updatedProductData = this.productForm.value;
    this.apiService.updateProduct(this.productId, updatedProductData)
      .subscribe(
        () => {
          console.log('Product updated successfully');
          this.router.navigate(['/product', this.productId]);
        },
        error => console.error('Error updating product:', error)
      );

  }

  deleteProduct(){
    
  }


}
