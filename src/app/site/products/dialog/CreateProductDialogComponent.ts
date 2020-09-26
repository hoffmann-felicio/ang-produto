import {Component, Inject, OnInit} from '@angular/core';
import {CreateProductDto} from "../service/dataModel/CreateProductDto";
import {NgForm} from "@angular/forms";
import {ProductService} from "../service/ProductService";
import {finalize} from "rxjs/operators";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog' ;
import {EditProductDto} from "../service/dataModel/EditProductDto";
import * as _ from 'lodash';
import {ProductDto} from "../service/dataModel/ProductDto";
import {Observable} from "rxjs";

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: 'createProductDialog.html'
})

export class CreateProductDialogComponent implements OnInit {
  public newProductModel: CreateProductDto | EditProductDto = {} as CreateProductDto;
  public isloading = false;
  public isediting = true;

  constructor(private dialogRef: MatDialogRef<CreateProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { editProductDto: EditProductDto },
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.isediting = !!_.get(this.data, 'editProductDto');
    if (this.isediting) {
      this.newProductModel = _.clone(this.data.editProductDto);
    }
  }

  public submit(form: NgForm) {
    if (form.valid) {
      this.handleAfterSubmit(
        this.isediting ?
          this.productService.createProduct(this.newProductModel) :
          this.productService.editProduct(this.newProductModel as EditProductDto)
      );

    }
  }

  private handleAfterSubmit(observable: Observable<ProductDto>) {
    return observable
      .pipe(finalize(() => this.isloading = false))
      .subscribe((response) => {
        this.dialogRef.close(response);
      });
  }


}
