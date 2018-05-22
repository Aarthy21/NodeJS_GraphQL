const express = require("express");
const path = require("path");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Allow Cross-origin requests
app.use(cors());

// connect to mlab database
// make sure to replace my db & credentails with yours
mongoose.connect("mongodb://ikismail:test123@ds231070.mlab.com:31070/graphql");
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Application listening on port 4000");
});
