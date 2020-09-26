import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductDto} from './dataModel/ProductDto';
import {ProductResource} from './ProductResource';
import {CreateProductDto} from "./dataModel/CreateProductDto";
import {EditProductDto} from "./dataModel/EditProductDto";

@Injectable()
export class ProductService {

  constructor(private productResource: ProductResource) {
  }

  public getAllProducts(): Observable<ProductDto[]>{
    return this.productResource.findAll();
  }

  public createProduct(createProductDto: CreateProductDto): Observable<ProductDto>{
    return this.productResource.create(createProductDto);
  }
  public editProduct(editProductDto: EditProductDto): Observable<ProductDto>{
    return this.productResource.edit(editProductDto);
  }

}
