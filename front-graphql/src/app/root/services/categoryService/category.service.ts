import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_CATEGORY_POSTS } from '@root/consts/queries';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  feed: any;
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  getPostsByCategoryId(categoryId: string): any {
    return this.apollo.watchQuery({
      query: GET_CATEGORY_POSTS,
      variables: {
        id: +categoryId,
      },
    }).valueChanges;
  }
}
