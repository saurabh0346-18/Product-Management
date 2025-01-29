import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AddProductComponent } from './add-product/add-product.component'; // Import the AddProductComponent

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },

  // Lazy load HomeModule with AuthGuard
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard] // Protect with AuthGuard
  },

  // Lazy load CrudModule with AuthGuard
  { 
    path: 'crud', 
    loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule),
    canActivate: [AuthGuard] // Protect with AuthGuard
  },

  // AddProductComponent route with AuthGuard
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },

  // Other components with AuthGuard
  { path: 'edit-product-dialog', component: EditProductDialogComponent, canActivate: [AuthGuard] },
  { path: 'confirm-dialog', component: ConfirmDialogComponent, canActivate: [AuthGuard] },

  // Wildcard route for unmatched paths
  { path: '**', redirectTo: '/sign-in', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
