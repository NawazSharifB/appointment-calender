import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import {MatNativeDateModule, MAT_DATE_FORMATS} from '@angular/material/core';

const MODULES_TO_EXPORT = [
  MatDialogModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  MatMenuModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
];

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, MODULES_TO_EXPORT],
  exports: [PageNotFoundComponent, MODULES_TO_EXPORT],
})
export class SharedModule {}
