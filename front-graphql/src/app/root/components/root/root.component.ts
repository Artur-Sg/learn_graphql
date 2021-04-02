import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {}
