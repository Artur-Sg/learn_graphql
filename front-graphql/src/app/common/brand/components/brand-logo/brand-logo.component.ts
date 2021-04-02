import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Routes, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  templateUrl: './brand-logo.component.html',
  styleUrls: ['./brand-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandLogoComponent {
  constructor(private router: Router) {}

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/feed']);
  }
}
