const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const Authentication = require("./features/routes/auth");



const cookieParser = require("cookie-parser");
const Posts = require("./features/routes/Posts");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use("/auth",Authentication );
app.use("/posts", Posts);


app.listen(port, (err) => {
  console.log("Server is listening on port ", port);
});
