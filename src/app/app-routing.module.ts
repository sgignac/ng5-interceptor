import { ErrorComponent } from './components/error/error.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core/src/metadata/directives';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { HomeComponent } from './components/home/home.component';
import { NohitComponent } from './components/nohit/nohit.component';

const routes: Routes = [
  { path: "error", component: ErrorComponent },
  { path: "maintenance", component: MaintenanceComponent },
  { path: "nohit", component: NohitComponent },
  { path: "", component: HomeComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
