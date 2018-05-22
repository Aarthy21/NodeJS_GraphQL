import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";

import { SpinnerVisibilityService } from "ng-http-loader/services/spinner-visibility.service";
import { NgForm } from "@angular/forms";

declare var $;

// GraphQL Query
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../../graphQLQueries/Query";
import { Author } from "../add-author/add-author.component";

export class Book {
  name: String;
  genre: String;
  authorId: number;
}

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.css"]
})
export class AddBookComponent implements OnInit {
  authors: Observable<Author[]>;

  book: Book;

  constructor(
    private apollo: Apollo,
    private spinner: SpinnerVisibilityService
  ) {
    this.book = new Book();
  }

  ngOnInit() {
    this.spinner.show();
    this.apollo
      .watchQuery<any>({
        query: getAuthorsQuery
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.spinner.hide();
        this.authors = data.authors;
        console.log("data", this.authors);
      });
  }

  createBook(form: NgForm) {
    console.log(form.value);
    this.apollo
      .mutate<any>({
        mutation: addBookMutation,
        variables: {
          name: this.book.name,
          genre: this.book.genre,
          authorId: this.book.authorId
        },
        refetchQueries: [{ query: getBooksQuery }]
      })
      .subscribe(response => {
        console.log("Added", response.data);
        form.reset();
        $("#addBook").modal("hide");
      });
  }
}
