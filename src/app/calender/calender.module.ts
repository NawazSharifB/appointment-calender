import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { CalenderBodyComponent } from "./components/calender-body/calender-body.component";

@NgModule({
  declarations: [CalenderBodyComponent],
  imports: [CommonModule, SharedModule],
  exports: [CalenderBodyComponent],
})
export class CalenderModule {}
