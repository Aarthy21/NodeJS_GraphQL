## Reading List Application

### Developed a Simple Reading list Application using `AngularV6` + `ApolloClient` as FrontEnd and `NodeJs` + `Express` + `GraphQL` + `MongoDB` as Backend

#### Functionalities:

* Get Books List using GraphQL Query
* Add Book
* Add Author
* Get Book - which return the book details and authors detail and similar books return by this author.


#### GraphQL Queries:

* GraphQL Query for **getBook** 

  ```
  query($id: ID) {
    book(id: $id) {
        id 
        name 
        genre 
        author { 
            id 
            name 
            age 
            books { 
                id 
                name 
                genre 
            } 
        } 
    } 
  }
  ```

#### Folder Details:

* Server -> Server Folder is nothing but backend `NodeJS + Express` Application, and used `GraphQL` for Querying the data from the `MongoDB` Database.
* Client -> Client folder is Angular6 Front end Application



#### Installation:

* run `npm install` inside both **client** and **server** folders

* run `ng build -prod` inside the client directory to build the Angular application and build files will be saved into the `server/public` directory. 

* After that run ```node app.js``` inside the server folder to run the node application.
* navigate to `http://localhost:4000/` .

