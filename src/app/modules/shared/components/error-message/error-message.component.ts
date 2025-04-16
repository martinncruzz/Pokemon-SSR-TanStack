import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'error-message',
  imports: [],
  templateUrl: './error-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent {
  title = input<string>('Error');
  message = input<string>('An error occurred');
}
