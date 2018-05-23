import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { SpinnerVisibilityService } from "ng-http-loader/services/spinner-visibility.service";

// GraphQL Query
import { getBooksQuery, getBookQuery } from "../../graphQLQueries/Query";
import { Book } from "../add-book/add-book.component";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.css"]
})
export class BookListComponent implements OnInit {
  books: Observable<Book[]>;

  selectedBook: any;

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
        this.books = data.books;
        console.log("data", this.books);

        // Initially setting first element to book details
        // const firstBook: any = this.books[0];
        // this.selectedBook = firstBook;
      });
    this.spinner.hide();
  }

  selectBook(book: any) {
    console.log("selected Book", book);

    this.apollo
      .query<any>({
        query: getBookQuery,
        variables: {
          id: book.id
        }
      })
      .subscribe(response => {
        console.log("reposne Book", response.data);
        this.selectedBook = response.data.book;
      });
  }
}
