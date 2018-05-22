import { Component, OnInit, OnDestroy } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import gql from "graphql-tag";
import { Subscription } from "apollo-client/util/Observable";
import { SpinnerVisibilityService } from "ng-http-loader/services/spinner-visibility.service";
import { NgForm } from "@angular/forms";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export class Book {
  name: String;
  genre: String;
  authorId: String;
}

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.css"]
})
export class AddBookComponent implements OnInit, OnDestroy {
  authors: Observable<any[]>;

  book: Book;

  private querySubscription: Subscription;
  constructor(
    private apollo: Apollo,
    private spinner: SpinnerVisibilityService
  ) {
    this.book = new Book();
  }

  ngOnInit() {
    this.spinner.show();
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: getAuthorsQuery
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.spinner.hide();
        this.authors = data.authors;
        console.log("data", this.authors);
      });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  createBook(form: NgForm) {
    console.log(form.value);
  }
}
