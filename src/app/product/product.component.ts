import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductCart } from '../models/product_cart.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input('product') product: Product
  @Input('parent') parent: String
  @Input('loading') loading: Boolean
  @Input('product_cart') product_cart: ProductCart

  @Output() add = new EventEmitter<string>()
  @Output() remove = new EventEmitter<string>()
  @Output() decrement = new EventEmitter<string>()
  @Output() increment = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }
}
