import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../services/products.service';
import { Store, select } from '@ngrx/store';
import { ProductCart } from '../models/product_cart.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Cart } from '../models/cart.model';
import * as actions from '../states/product.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  loading: boolean
  order_loading: boolean
  cart$: Observable<Cart>
  product_cart$: Observable<Array<ProductCart>>
  all_products: Array<Product>

  constructor(
    private router: Router,
    private product_service: ProductService,
    private product_cart_store: Store< {product_cart: Array<ProductCart>} >,
    private cart_store: Store< {cart: Cart} >,
    private message: NzMessageService
  ) { }

  async ngOnInit() {
    this.order_loading = false
    this.loading = true

    this.product_cart$ = this.product_cart_store.pipe(
      select('product_cart')
    )

    this.cart$ = this.cart_store.pipe(
      select('cart')
    )

    const cart = await this.product_service.getCart()
    this.all_products = await this.product_service.getProducts()
    const product_cart = await this.product_service.getProductCart(cart.id)
    
    this.product_cart_store.dispatch( 
      actions.retrieveProductCartList({ product_cart })
    )

    this.cart_store.dispatch( 
      actions.retrieveCart({ cart })
    )

    this.loading = false
  }

  async onDecrement(id_product_cart: string) {
    this.product_cart_store.dispatch( 
      actions.decrementProduct({id_product_cart})
    )
    
    const product_cart = await this.getProductCart()
    const current_product_cart = product_cart.find(pc => pc.id == id_product_cart) 
    await this.product_service.updateProduct(current_product_cart)
  }

  async onIncrement(id_product_cart: string) {
    this.product_cart_store.dispatch( 
      actions.incrementProduct({id_product_cart})
    )

    const product_cart = await this.getProductCart()
    const current_product_cart = product_cart.find(pc => pc.id == id_product_cart) 
    await this.product_service.updateProduct(current_product_cart)
  }

  async onRemove(id_product: string) {
    this.loading = true

    const _product_cart = await this.getProductCart()
    const custom_product_cart = _product_cart.find(pc => pc.id_product == id_product)
    await this.product_service.removeProduct(custom_product_cart.id)

    this.product_cart_store.dispatch(
      actions.removeProduct({ id_product })
    )
    
    this.message.create('success', 'Producto eliminado correctamente')
    this.loading = false
  }

  getProduct(id_product: string) {
    return this.all_products.find(product => product.id == id_product)
  }

  getProductCart(): Promise<Array<ProductCart>> {
    return new Promise(resolve => {
      this.product_cart$.subscribe(product_cart => resolve(product_cart))
    })
  }

  getCart(): Promise<Cart> {
    return new Promise(resolve => {
      this.cart$.subscribe(cart => resolve(cart))
    })
  }

  async newOrder() {
    this.order_loading = true
    this.loading = true
    
    this.cart_store.dispatch(
      actions.newOrder()
    )

    this.product_cart_store.dispatch(
      actions.removeAllProduct()
    )

    const current_cart = await this.getCart()
    const cart = await this.product_service.updateCart(current_cart)

    this.cart_store.dispatch( 
      actions.retrieveCart({ cart })
    )

    this.message.create('success', 'Su orden fue enviada correctamente')
    this.order_loading = false
    this.loading = false
  }

  goBoard(){
    this.router.navigate(['/board'])
  }
}
