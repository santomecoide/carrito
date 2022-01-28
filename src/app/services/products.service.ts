import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { ProductCart } from '../models/product_cart.model';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
    constructor(
        private firestore: AngularFirestore
    ) {}

    private genId(){
        const length = 10
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let _id = '';
        for (let i = length; i > 0; --i) {
            _id += chars[Math.floor(Math.random() * chars.length)]
        } ;
        return _id;
    }
  
    getCart(): Promise<Cart> {
        return new Promise(resolve => {
            this.firestore.collection('carts').snapshotChanges().subscribe(res => {
                let cart: Cart        
                for (const dot of res) {
                    const res_status = dot.payload.doc.data()['status']
                    if(res_status == 'pending') {
                        cart = {
                            id: dot.payload.doc.id,
                            status: dot.payload.doc.data()['status']  
                        }
                        break
                    }
                }
                resolve(cart)
            })
        })
    }

    getProducts(): Promise<Array<Product>>  {
        return new Promise(resolve => {
            this.firestore.collection('products').snapshotChanges().subscribe(res => {
                const products: Array<Product> = []
                for (const dot of res) {
                    products.push({
                        id: dot.payload.doc.id,
                        name: dot.payload.doc.data()['name'],
                        desciption: dot.payload.doc.data()['description'],
                        sku: dot.payload.doc.data()['sku'], 
                        img: dot.payload.doc.data()['img']
                    })
                }
                resolve(products)
            })
        })
    }

    getProductCart(id_cart: string): Promise<Array<ProductCart>> {
        return new Promise(resolve => {
            this.firestore.collection('product_cart').snapshotChanges().subscribe(res => {
                const product_cart: Array<ProductCart> = []
                for (const dot of res) {
                    const res_id_cart = dot.payload.doc.data()['id_cart']
                    if(id_cart == res_id_cart) {
                        product_cart.push({
                            id: dot.payload.doc.id,
                            id_product: dot.payload.doc.data()['id_product'],
                            id_cart: res_id_cart,
                            amount: dot.payload.doc.data()['amount']
                        })
                    }
                }
                resolve(product_cart)
            })
        })
    }

    addProduct(id_product: string, id_cart: string): Promise<ProductCart> {
        const product_cart: ProductCart = {
            id: this.genId(),
            id_product: id_product,
            id_cart: id_cart,
            amount: 1
        }
        
        return new Promise(resolve => {
            this.firestore.collection('product_cart').add(product_cart).then(
                res => resolve(product_cart),
                err => resolve(null)
            )
        })
    }

    removeProduct(id_product_cart: string): Promise<Boolean> {        
        return new Promise(resolve => {
            this.firestore.collection('product_cart').doc(id_product_cart).delete().then(
                res => resolve(true),
                err => resolve(false)
            )
        })
    }

    updateProduct(product_cart: ProductCart): Promise<Boolean> {        
        return new Promise(resolve => {
            this.firestore.collection('product_cart').doc(product_cart.id).set(product_cart).then(
                res => resolve(true),
                err => resolve(false)
            )
        })
    }

    updateCart(cart: Cart): Promise<Cart> {        
        return new Promise(resolve => {
            this.firestore.collection('carts').doc(cart.id).set(cart).then(
                res => {
                    const new_cart: Cart = {
                        id: this.genId(),
                        status: 'pending'
                    }
                    this.firestore.collection('carts').add(new_cart).then(
                        res => resolve(new_cart),
                        err => resolve(null)
                    )
                },
                err => resolve(null)
            )
        })
    }
}