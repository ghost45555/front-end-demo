import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  product: any = { name: '', price: 0 };
  isEditMode = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadProduct(Number(id));
    }
  }

  loadProduct(id: number): void {
    this.productService.getProduct(id).subscribe(
      (data) => {
        this.product = data;
      },
      (error) => {
        console.error('Error fetching product', error);
      }
    );
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.productService.updateProduct(this.product).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error updating product', error);
        }
      );
    } else {
      this.productService.addProduct(this.product).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error adding product', error);
        }
      );
    }
  }
}
