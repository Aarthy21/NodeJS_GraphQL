import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";

import { SpinnerVisibilityService } from "ng-http-loader/services/spinner-visibility.service";
import { NgForm } from "@angular/forms";

declare var $;

// GraphQL Query
import { getAuthorsQuery, addAuthorMutation } from "../../graphQLQueries/Query";

export class Author {
  name: String;
  age: number;
}

@Component({
  selector: "app-add-author",
  templateUrl: "./add-author.component.html",
  styleUrls: ["./add-author.component.css"]
})
export class AddAuthorComponent implements OnInit {
  author: Author;

  constructor(
    private apollo: Apollo,
    private spinner: SpinnerVisibilityService
  ) {
    this.author = new Author();
  }

  ngOnInit() {}

  createAuthor(form: NgForm) {
    console.log(form.value);
    this.apollo
      .mutate<any>({
        mutation: addAuthorMutation,
        variables: {
          name: this.author.name,
          age: this.author.age
        },
        refetchQueries: [{ query: getAuthorsQuery }]
      })
      .subscribe(response => {
        console.log("Added", response.data);
        form.reset();
        $("#addAuthor").modal("hide");
      });
  }
}
