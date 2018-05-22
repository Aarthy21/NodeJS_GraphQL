import { AddBookComponent } from "./components/add-book/add-book.component";
import { BookListComponent } from "./components/book-list/book-list.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpModule } from "@angular/http";

import { FormsModule } from "@angular/forms";

// Apollo Client
import { HttpClientModule } from "@angular/common/http";
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { NgHttpLoaderModule } from "ng-http-loader/ng-http-loader.module";
import { AddAuthorComponent } from "./components/add-author/add-author.component";
// export function createApollo(httpLink: HttpLink) {
//   return {
//     link: httpLink.create({ uri: "https://api.example.com/graphql" }),
//     cache: new InMemoryCache()
//   };
// }

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    AddBookComponent,
    AddAuthorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    NgHttpLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: "http://localhost:4000/graphql" }),
      cache: new InMemoryCache()
    });
  }
}
