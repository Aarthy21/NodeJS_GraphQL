// Schema has 3 responsiblities
// 1. Define Types
// 2. Define Relationships
// 3. Define RootQueries


// Injecting GraphQl
const graphql = require("graphql");

const _ = require("lodash");

const {
	GraphQLObjectType, 
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList
} = graphql;


// Dummy Data
var books = [
	{id:"1",name: "Name of the wind", genre: "Fantasy", authorId: "1"},
	{id:"2",name: "The Final Empire", genre: "Fantasy", authorId: "2"},
	{id:"3",name: "The Long Earth", genre: "Sci-Fi", authorId: "3"},
	{id:"4",name: "The Hero of Ages", genre: "Fantasy", authorId: "2"},
	{id:"5",name: "The Colour of Magic", genre: "Fantasy", authorId: "3"},
	{id:"6",name: "The Light Fantastic", genre: "Fantasy", authorId: "3"}
];

var authors = [
	{id: "1", name: "Mohammed Ismail", age: 23},
	{id: "2", name: "Mohamed Ajmal", age: 22},
	{id: "3", name: "Pathmaraj", age: 24}
]


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
				return _.find(authors, {id: parent.authorId})
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
				return _.filter(books, {authorId: parent.id});
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
			  return _.find(books, {id: args.id});
			}
		},
		author: {
			type: AuthorType,
			args: {
				id: {type: GraphQLID}
			},
			resolve(parent,args){
				// code to get data from db / other source
				return _.find(authors, {id: args.id});
			}
		}
	}
});


module.exports = new GraphQLSchema({
	query: RootQuery
});

