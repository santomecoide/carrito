import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { SigninComponent } from "./signin/signin.component";
import { BoardComponent } from "./board/board.component";
import { CartComponent } from "./cart/cart.component";
import { HomeGuard } from './guards/home.guard';
import { AuthGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';

 
const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signin",
    component: SigninComponent,
  },
  {
    path: "board",
    component: BoardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "cart",
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "home",
    component: AppComponent,
    canActivate: [HomeGuard]
  },
  {
    path: "**",
    redirectTo: "home"
  }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "corrected",
      anchorScrolling: "enabled",
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
