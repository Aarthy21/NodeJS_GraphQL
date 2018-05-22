import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { SpinnerVisibilityService } from "ng-http-loader/services/spinner-visibility.service";

// GraphQL Query
import { getBooksQuery } from "../../graphQLQueries/Query";
import { Book } from "../add-book/add-book.component";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.css"]
})
export class BookListComponent implements OnInit {
  books: Observable<Book[]>;

  constructor(
    private apollo: Apollo,
    private spinner: SpinnerVisibilityService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.apollo
      .watchQuery<any>({
        query: getBooksQuery
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.spinner.hide();
        this.books = data.books;
        console.log("data", this.books);
      });
  }
}
