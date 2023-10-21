require("dotenv").config()
const express = require("express");
const cors = require('cors');
const app = express();


app.use(cors()); 
const bodyParser = require("body-parser");
const Authentication = require("./features/routes/auth");
const {checkToken} = require("./features/auth/token.validation")



const cookieParser = require("cookie-parser");
const Posts = require("./features/routes/Posts");
const Users = require("./features/routes/Users");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use("/auth",Authentication );
app.use("/posts", Posts);
app.use("/user",Users );

app.listen(process.env.APP_PORT, (err) => {
  console.log("Server is listening ");
});
