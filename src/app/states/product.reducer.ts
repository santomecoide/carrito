import { createReducer, on } from '@ngrx/store';
import * as actions from './product.action';
import { Product } from '../models/product.model';
import { ProductCart } from '../models/product_cart.model';
import { Cart } from '../models/cart.model';

export const productInitialState: Array<Product> = [];
export const productCartInitialState: Array<ProductCart> = [];
export const cartInitialState: Cart = {
  id: null,
  status: null
};

export const productsReducer = createReducer(
  productInitialState,
  on(actions.retrieveProductList, (state, { products }) => products),
)

export const productCartReducer = createReducer(
  productCartInitialState,
  on(actions.retrieveProductCartList, (state, { product_cart }) => product_cart),
  
  on(actions.removeProduct, (state, { id_product }) => {
    return state.filter(product_cart => product_cart.id_product !== id_product)
  }), 

  on(actions.removeAllProduct, state => []), 
  
  on(actions.addProduct, (state, { product_cart }) => {
    const current_product_cart = state.find(pc => pc.id_product == product_cart.id)
    if (current_product_cart) return state
    return [...state, product_cart]
  }),
  
  on(actions.decrementProduct, (state, { id_product_cart }) => {
    return state.map(pc => {
      if(pc.id == id_product_cart && pc.amount > 0) {
        return {...pc, amount: pc.amount - 1}
      } 
      return pc
    })   
  }),

  on(actions.incrementProduct, (state, { id_product_cart }) => {
    return state.map(pc => {
      if(pc.id == id_product_cart) {
        return {...pc, amount: pc.amount + 1}
      } 
      return pc
    }) 
  })
)

export const cartReducer = createReducer(
  cartInitialState,
  on(actions.retrieveCart, (state, { cart }) => cart),

  on(actions.newOrder, state => {
    return {...state, status: 'completed'}
  })
)