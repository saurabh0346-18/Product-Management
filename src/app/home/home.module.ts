import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route for home
];

@NgModule({
  declarations: [HomeComponent],
  imports: [RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule],
})
export class HomeModule {}
