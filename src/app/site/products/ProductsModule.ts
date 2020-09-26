import {NgModule} from '@angular/core';
import {ProductListModule} from './list/ProductListModule';
import {ProductService} from './service/ProductService';
import {ProductResource} from './service/ProductResource';
import {CreateProductDialogComponent} from './dialog/CreateProductDialogComponent';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [ProductListModule, MatFormFieldModule, FormsModule, CommonModule],
  exports: [ProductListModule],
  declarations: [CreateProductDialogComponent],
  entryComponents: [CreateProductDialogComponent],
  providers: [
    ProductService,
    ProductResource
  ],
})
export class ProductsModule {
}
