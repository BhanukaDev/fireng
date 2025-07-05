import { CommonModule } from '@angular/common';
import { Component, effect, signal, Signal } from '@angular/core';
import { FirengScreenService } from '@fireng/core';
import { FirengBoxDirective, FirengStyleDirective } from '@fireng/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FirengBoxDirective, FirengStyleDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title;
  test = `
  <div
  fireBox
  display="flex"
  [flexDirection]="{ xs: 'column', md: 'row' }"
  [justifyContent]="{
    xs: 'flex-start',
    md: 'space-between',
    lg: 'space-around'
  }"
  [gap]="{ xs: '0.5rem', md: '1rem', lg: '2rem' }"
  fireStyle
>
  <span>Small Screen</span>
  <span>Medium Screen</span>
  <span>Large Screen</span>
</div>
  `;

  constructor(public screenService: FirengScreenService) {
    this.title = screenService.currentBreakpoint;
  }
}
