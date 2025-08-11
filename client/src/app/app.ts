import { Component, inject, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { setAppInjector } from './app.config';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatIcon,
    MatButton
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isSmallScreen = false;
  
  constructor(
    private injector: Injector
  ) {
    inject(BreakpointObserver)
    .observe([ Breakpoints.XSmall, Breakpoints.Small ])
    .pipe(takeUntilDestroyed())
    .subscribe(result => {
      this.isSmallScreen = result.matches;
    });
    setAppInjector(this.injector);
  }

  createTask(): void {
    // TODO
  }

}
