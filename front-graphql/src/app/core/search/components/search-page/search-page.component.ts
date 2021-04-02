import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { GET_SEARCH_POST } from '@root/consts/queries';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  feed: any;
  loading = true;
  error: any;
  searchInput: string = '';

  private subscription: Subscription = new Subscription();

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const getInputQuerySubscription = this.route.queryParamMap
      .pipe(
        switchMap((params) => {
          this.searchInput = params.get('filter');
          return this.apollo.watchQuery<any>({
            query: GET_SEARCH_POST,
            variables: {
              filter: this.searchInput,
            },
          }).valueChanges;
        })
      )
      .subscribe(({ data, loading, error }) => {
        this.loading = loading;
        this.error = error;
        this.feed = data.feed;
        this.cdr.detectChanges();
      });

    this.subscription.add(getInputQuerySubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
