import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Store, select } from '@ngrx/store';
import { ProductService } from '../services/products.service';
import { ProductCart } from '../models/product_cart.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Cart } from '../models/cart.model';
import * as actions from '../states/product.action';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  loading: boolean
  products$: Observable<Array<Product>>
  product_cart$: Observable<Array<ProductCart>>
  cart$: Observable<Cart>

  constructor(
    private router: Router,
    private product_service: ProductService,
    private products_store: Store< {products: Array<Product>} >,
    private product_cart_store: Store< {product_cart: Array<ProductCart>} >,
    private cart_store: Store< {cart: Cart} >,
    private message: NzMessageService
  ) { }

  async ngOnInit() {
    this.loading = true
    
    this.products$ = this.products_store.pipe(
      select('products')
    )

    this.product_cart$ = this.product_cart_store.pipe(
      select('product_cart')
    )

    this.cart$ = this.cart_store.pipe(
      select('cart')
    )
    
    const cart = await this.product_service.getCart()
    const products = await this.product_service.getProducts()
    const product_cart = await this.product_service.getProductCart(cart.id)

    this.products_store.dispatch( 
      actions.retrieveProductList({ products })
    )

    this.product_cart_store.dispatch( 
      actions.retrieveProductCartList({ product_cart })
    )

    this.cart_store.dispatch( 
      actions.retrieveCart({ cart })
    )

    this.loading = false
  }

  async onAdd(id_product: string) {
    this.loading = true
    
    const _product_cart = await this.getProductCart()
    const product_repeated = _product_cart.find(pc => pc.id_product == id_product)
    if(product_repeated){
      this.message.create('error', 'El producto ya fue seleccionado')
      this.loading = false
      return
    }

    const cart = await this.getCart()
    const product_cart = await this.product_service.addProduct(id_product, cart.id)
    
    this.product_cart_store.dispatch( 
      actions.addProduct({ product_cart })
    )

    this.message.create('success', 'Producto agregado correctamente')
    this.loading = false
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

  goShoppingCart() {
    this.router.navigate(['/cart'])
  }

  goLogin() {
    this.router.navigate(['/login'])
  }
}
