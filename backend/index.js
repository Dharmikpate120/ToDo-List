const connectToUrl = require("./db");
const express = require("express");
const cors = require("cors");

//establish the connection to the database through db.js file.
connectToUrl();

//creating instance of the express function
const app = express();
//listning to the port no:5000
const port = 5000;

//enabling cors in express
app.use(cors());
// using built in middleware that parses the incoming json data from the user and puts it into req.body.
app.use(express.json());

// it mounts the middleware function which is auth.js or notes.js to its specific path /api/auth or /api/notes, means when
//the path matches the middle ware function gets called.
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

//starts listening to the given port.
app.listen(port, () => {
  console.log(`listning to the port ${port}`);

  //Using environment variable
});
// console.log("Hello");
