import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import path from 'path';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ProductsComponent } from './components/products/products.component';
import { authGuard } from './core/guards/authGuard/auth.guard';
import { logedGuard } from './core/guards/loged/loged.guard';
import { ProductDetaliseComponent } from './components/product-detalise/product-detalise.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrderComponent } from './components/order/order.component';

export const routes: Routes = [
  {path:'', component:AuthLayoutComponent, canActivate:[logedGuard],
    children:[
        {path:'', redirectTo:'login', pathMatch:'full'},
        {path:'login' , component:LoginComponent, title:"Login"},
        {path:'register' , component:RegisterComponent, title:"Register"},
        {path:'forget' , loadComponent: () => import("./components/forget-password/forget-password.component").then(c => c.ForgetPasswordComponent), title:"Forget Password"},


  ]},

  {path:'', component:BlankLayoutComponent, canActivate:[authGuard],
    children:[
      {path:'', redirectTo:'home', pathMatch:'full'},
      {path:'home', component:HomeComponent, title:'Home'},
      {path:'brands', loadComponent: () => import("./components/brands/brands.component").then(c => c.BrandsComponent) , title:"Brands" },
      {path:'cart', loadComponent: () => import("./components/cart/cart.component").then(c => c.CartComponent) , title:'Cart'},
      {path:'categories',loadComponent: () => import("./components/categories/categories.component").then(c => c.CategoriesComponent) , title:'Categories'},
      {path:'wish-list', component:WishListComponent, title:'Wish List'},
      {path:'products', component:ProductsComponent, title:'Products'},
      {path:'ProductDetalise/:id', component:ProductDetaliseComponent, title:'Product Detalise'},
      {path:'allorders', component:AllOrdersComponent, title:'All Orders'},
      {path:"orders/:id" , component:OrderComponent, title:"Orders"},
      {path:"**", component:NotFoundComponent, title:"not found"}

    ]
  },

];
