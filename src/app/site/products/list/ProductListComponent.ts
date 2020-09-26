// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/ProductService';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductDto} from '../service/dataModel/ProductDto';
import {MatDialog} from '@angular/material/dialog';
import {CreateProductDialogComponent} from '../dialog/CreateProductDialogComponent';
import * as _ from 'lodash';
import {EditProductDto} from "../service/dataModel/EditProductDto";


@Component({
  selector: 'app-product-list',
  templateUrl: 'productList.html',
  styleUrls: ['productList.scss']
})

export class ProductListComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'nome', 'valor'];

  private productListSubject: BehaviorSubject<ProductDto[]> = new BehaviorSubject(null);

  constructor(private productService: ProductService, private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe((productListItems) => this.productListSubject.next(productListItems));
  }

  public getProductList(): Observable<ProductDto[]> {
    return this.productListSubject.asObservable();
  }


  public editPost(editPost: EditProductDto) {
    const ref = this.matDialog.open(CreateProductDialogComponent, {
      data: {editPostDto: editPost}
    });

    ref.afterClosed().subscribe((editedProduct: ProductDto) => {
      if (editedProduct) {
        const list = this.productListSubject.getValue();
        const productIndex = _.findIndex(list, post => post.id === editedProduct.id);
        list[productIndex] = editedProduct;

        this.productListSubject.next(_.cloneDeep(list));
      }
    });

  }

  public createProduct() {
    const ref = this.matDialog.open(CreateProductDialogComponent);
    ref.afterClosed().subscribe((newProduct: ProductDto) => {
      if (newProduct) {
        const list = this.productListSubject.getValue();
        list.push(newProduct);
        this.productListSubject.next(_.cloneDeep(list));
      }
    });
  }
}
