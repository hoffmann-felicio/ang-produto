// @ts-ignore
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ProductsModule} from './products/ProductsModule';

@NgModule({
  imports: [
    ProductsModule,
    HttpClientModule
  ],
  exports: [
    ProductsModule],
  declarations: [],
})
export class SiteModule {
}
