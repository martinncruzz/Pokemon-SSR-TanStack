import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'loading-spinner',
  imports: [],
  templateUrl: './loading-spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent {}
