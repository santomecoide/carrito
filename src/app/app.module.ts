import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment'
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as AllIcons from '@ant-design/icons-angular/icons';
import es from '@angular/common/locales/es';

import { StoreModule } from '@ngrx/store';
import { cartReducer, productsReducer, productCartReducer } from './states/product.reducer'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductComponent } from './product/product.component';
import { BoardComponent } from './board/board.component';
import { CartComponent } from './cart/cart.component';


const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    ProductComponent,
    BoardComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot({ 
      products: productsReducer, 
      product_cart: productCartReducer,
      cart: cartReducer 
    }),
  ],
  bootstrap: [AppComponent],
  providers: [ 
    { provide: NZ_I18N, useValue: en_US }, 
    { provide: NZ_ICONS, useValue: icons } 
  ]
})
export class AppModule { }
