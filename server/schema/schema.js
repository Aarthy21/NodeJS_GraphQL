// Schema has 3 responsiblities
// 1. Define Types
// 2. Define Relationships
// 3. Define RootQueries


// Injecting GraphQl
const graphql = require("graphql");

const _ = require("lodash");

// Mongoose DB Models
const Book = require("../models/book.js")
const Author = require("../models/author.js")

const {
	GraphQLObjectType, 
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} = graphql;


// Defining Book Object Type
const BookType = new GraphQLObjectType({
	name: "Book",
	fields: ()=> ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		genre: {type: GraphQLString},
		author: {
			type: AuthorType,
			resolve(parent,args){
				// parent returns the book object which has authorId property
				// return _.find(authors, {id: parent.authorId})
				return Author.findById(parent.authorId);
			}
		}
	})
})

// Defining Author Object Type
const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: ()=> ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		age: {type: GraphQLInt},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args){
				// return _.filter(books, {authorId: parent.id});
				console.log("authorId", parent.id)
				return Book.find({authorId: parent.id});
			}
		}
	})
})


const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: {
				id: {type: GraphQLID}
			},
			resolve(parent, args){
				// code to get data from db / other source
			  // return _.find(books, {id: args.id});
			  return Book.findById(args.id)
			}
		},
		author: {
			type: AuthorType,
			args: {
				id: {type: GraphQLID}
			},
			resolve(parent,args){
				// code to get data from db / other source
				// return _.find(authors, {id: args.id});
				return Author.findById(args.id)
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args){
				// return books
				return Book.find({})
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args){
				// return authors
				return Author.find({})
			}
		}
	}
});


const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		// Creating new author function
		addAuthor: {
			type: AuthorType,
			args: {
				name: {type: new GraphQLNonNull(GraphQLString)},
				age: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve(parent, args){
				// Creating local db instance
				let author = new Author({
					name: args.name,
					age: args.age
				});
				// Saving object to db
				return author.save()
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: {type: new GraphQLNonNull(GraphQLString)},
				genre: {type: new GraphQLNonNull(GraphQLString)},
				authorId: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent, args){
				// Creating local db instance for Book
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId
				});
				return book.save();
			}
		}
	}
})


module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});

