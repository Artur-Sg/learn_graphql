import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  formGroup: FormGroup | null = null;
  searchInput: string;
  feed: any;
  isLoading: boolean = false;
  error: any;

  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      searchInput: ['', Validators.nullValidator],
    });
  }

  onSubmit(): void {
    this.isLoading = true;

    if (!this.formGroup.valid) {
      return;
    }
    this.searchInput = this.formGroup.value.searchInput;
    const navigationExtras: NavigationExtras = {
      queryParams: { filter: this.searchInput },
    };
    this.router.navigate(['/search'], navigationExtras);
    this.formGroup.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
