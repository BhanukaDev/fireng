import { CommonModule } from '@angular/common';
import { Component, effect, signal, Signal } from '@angular/core';
import { FirengScreenService } from '@fireng/core';
import { FirengBoxDirective, FirengJustifyContent } from '@fireng/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FirengBoxDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title;

  constructor(public screenService: FirengScreenService) {
    this.title = screenService.currentBreakpoint;
  }
}
