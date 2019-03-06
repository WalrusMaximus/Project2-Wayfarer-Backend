const express = require("express");
const userRoutes = require("./routes/user");
const cityRoutes = require("./routes/city");
const postRoutes = require("./routes/post");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

app.use("/users", userRoutes);
app.use("/cities", cityRoutes);
app.use("/posts", postRoutes);

app.listen(3001, () => console.log("Listening on 3001"));
