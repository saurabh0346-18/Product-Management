import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
// import { HomeComponent } from './home/home.component';
// import { CrudComponent } from './crud/crud.component';

import { AuthService } from './service/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { SharedModule } from './shared/shared.module'; 

import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewProductDialogComponent } from './view-product-dialog/view-product-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    // HomeComponent,
    // CrudComponent,
    EditProductDialogComponent,
    ConfirmDialogComponent,
    AddProductComponent,
    ViewProductDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule, 
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
