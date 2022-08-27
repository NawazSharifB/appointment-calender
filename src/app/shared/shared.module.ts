import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ContentLoadingComponent } from './components/content-loading/content-loading.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const EXPORT_DECLARATIONS = [
  NotFoundComponent,
  PageNotFoundComponent,
  ContentLoadingComponent,
];

const MODULES_TO_EXPORT = [
  MatDialogModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  MatMenuModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [EXPORT_DECLARATIONS],
  imports: [CommonModule, MODULES_TO_EXPORT],
  exports: [EXPORT_DECLARATIONS, MODULES_TO_EXPORT],
})
export class SharedModule {}
