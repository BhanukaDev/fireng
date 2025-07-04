import { CommonModule } from '@angular/common';
import { Component, effect, signal, Signal } from '@angular/core';
import { FirengScreenService } from '@fireng/core';
import { FirengFlexDirective, FirengJustifyContent } from '@fireng/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FirengFlexDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fireng-demo';
  itemsPerRow: Signal<number | undefined>;

  constructor(public screenService: FirengScreenService) {
    this.itemsPerRow = this.screenService.resolveBreakpointValue(
      {
        mobile: 1,
        tablet: 2,
        desktop: 3,
        largeDesktop: 4,
      },
      1
    );
  }
}
