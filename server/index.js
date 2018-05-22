const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema  = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

// connect to mlab database
// make sure to replace my db & credentails with yours

mongoose.connect("mongodb://ikismail:test123@ds231070.mlab.com:31070/graphql")
mongoose.connection.once("open", ()=>{
	console.log("connected to database")
})

app.use("/graphql", graphqlHTTP({
	schema,
	graphiql: true
}));

app.listen(4000, () => {
    console.log("Application listening on port 4000")
})