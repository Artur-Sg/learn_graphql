import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { GET_LINK_BY_ID } from '@root/consts/queries';

@Component({
  selector: 'app-link',
  templateUrl: './link-page.component.html',
  styleUrls: ['./link-page.component.scss'],
})
export class LinkPageComponent implements OnInit, OnDestroy {
  id: number;
  post: any;
  loading = true;
  error: any;

  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    const getLinkSubscription = this.apollo
      .watchQuery<any>({
        query: GET_LINK_BY_ID,
        variables: {
          id: this.id,
        },
      })
      .valueChanges.subscribe(({ data, loading, error }) => {
        this.loading = loading;
        this.error = error;
        this.post = data.post;
        this.cdr.detectChanges();
      });
    this.subscription.add(getLinkSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getImage(): string {
    return this.post.imageUrl ? this.post.imageUrl : 'assets/dummy.png';
  }
}
