const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const swaggerUi = require('swagger-ui-express')
const swaggerDocument  =require("./swagger.json");
const swaggerJSDoc = require("swagger-jsdoc");
require("dotenv").config();

const app = express();

// connect to db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// app middlewares
//app.use(bodyParser.json());

app.use(fileUpload());
app.use(bodyParser.json({ limit: "50mb" }));
//app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors()); // allows all origins
//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// routes attached with server
app.use("/api", require("./routes/auth"));


//app.use("/api", require("./routes/auth"));

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
