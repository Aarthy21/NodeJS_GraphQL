import { Component, OnInit, OnDestroy } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import gql from "graphql-tag";
import { Subscription } from "apollo-client/util/Observable";
import { SpinnerVisibilityService } from "ng-http-loader/services/spinner-visibility.service";
const getBooksQuery = gql`
  {
    books {
      name
      genre
      author {
        name
      }
    }
  }
`;

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.css"]
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Observable<any[]>;

  private querySubscription: Subscription;
  constructor(
    private apollo: Apollo,
    private spinner: SpinnerVisibilityService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: getBooksQuery
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.spinner.hide();
        this.books = data.books;
        console.log("data", this.books);
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
