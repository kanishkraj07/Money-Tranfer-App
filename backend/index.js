
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();

const apiRouter = require("./routes/index");

const app = express();

app.use(cors(), bodyParser.json());
app.use("/api/v1", apiRouter);

app.listen(3000);


