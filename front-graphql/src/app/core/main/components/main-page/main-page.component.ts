import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GET_FEED } from '@root/consts/queries';
import { CategoryService } from '@root/services/categoryService/category.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  posts: any;
  loading = true;
  error: any;
  count: number;

  private subscription: Subscription = new Subscription();

  constructor(
    private apollo: Apollo,
    private cdr: ChangeDetectorRef,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const getFeedSubscription = this.apollo
      .watchQuery<any>({
        query: GET_FEED,
      })
      .valueChanges.subscribe(({ data, loading, error }) => {
        this.loading = loading;
        this.error = error;
        this.posts = data.feed.posts;
        this.cdr.detectChanges();
      });

    this.subscription.add(getFeedSubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPostsByCategory(categoryId: string) {
    const postsByCategorySubscription = this.categoryService
      .getPostsByCategoryId(categoryId)
      .subscribe(({ data, loading, error }) => {
        console.log(data);
        this.loading = loading;
        this.error = error;
        this.posts = data.category.posts;
        this.cdr.detectChanges();
      });
    this.subscription.add(postsByCategorySubscription);
  }
}
