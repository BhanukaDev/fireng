import { CommonModule } from '@angular/common';
import { Component, effect, Signal } from '@angular/core';
import { FirengScreenService, responsiveValue } from '@fireng/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fireng-demo';

  itemsPerRow: Signal<number | undefined> = responsiveValue<number>(
    {
      mobile: 1,
      desktop: 5,
    },
    1.5
  );

  constructor(public screenService: FirengScreenService) {
    effect(() => {
      const activeBreakpoints = this.screenService.activeBreakpoints();
      console.log('Active Breakpoints:', activeBreakpoints);
    });
  }
}
