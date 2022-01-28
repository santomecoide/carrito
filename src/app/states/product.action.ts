import { createAction, props } from '@ngrx/store';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { ProductCart } from '../models/product_cart.model';

export const retrieveProductList = createAction(
    '[Product List/API] Retrieve Products Success',
    props<{ products: Array<Product> }>()
)

export const retrieveProductCartList = createAction(
    '[Product Cart List/API] Retrieve Product Cart Success',
    props<{ product_cart: Array<ProductCart> }>()
)

export const retrieveCart = createAction(
    '[Cart/API] Retrieve Cart Success',
    props<{ cart: Cart }>()
)

export const addProduct = createAction(
    '[Product List] Add Product',
    props<{ product_cart: ProductCart }>()
)

export const removeProduct = createAction(
    '[Product List] Remove Product',
    props<{ id_product: string }>()
)

export const removeAllProduct = createAction(
    '[Product List] Remove All Product'
)

export const decrementProduct = createAction(
    '[Product List] Decrement Product',
    props<{ id_product_cart: string }>()
)

export const incrementProduct = createAction(
    '[Product List] Increment Product',
    props<{ id_product_cart: string }>()
)

export const newOrder = createAction(
    '[Cart] New Order'
)