// @ts-ignore
import {Injectable} from '@angular/core';
import {BackendConfig} from '../../BackendConfig';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {ProductDto} from './dataModel/ProductDto';
import {CreateProductDto} from "./dataModel/CreateProductDto";
import {EditProductDto} from "./dataModel/EditProductDto";

@Injectable()
export class ProductResource {
  private readonly URL = BackendConfig.url + '/products';
  constructor(private httpClient: HttpClient) {
  }

  public findAll(): Observable<ProductDto[]>{
    return this.httpClient.get(this.URL) as Observable<ProductDto[]>;
  }

  public create(createProductDto: CreateProductDto): Observable<ProductDto>{
    return this.httpClient.post(this.URL, createProductDto) as Observable<ProductDto>;
  }

  public edit(editProductDto: EditProductDto): Observable<ProductDto>{
    return this.httpClient.put(this.URL, editProductDto) as Observable<ProductDto>;
  }
}
