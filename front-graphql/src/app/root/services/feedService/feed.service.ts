import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private feed$: Subject<any> = new Subject<any>();

  setFeed(feed: any): void {
    this.feed$.next(feed);
  }
  getFeed(): Subject<any> {
    return this.feed$;
  }
}
