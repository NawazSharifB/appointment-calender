import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ContentLoadingComponent } from './components/content-loading/content-loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
