import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-loading',
  templateUrl: './content-loading.component.html',
  styleUrls: ['./content-loading.component.scss'],
})
export class ContentLoadingComponent {
  @Input() isLoading: boolean = true;
}
