require("dotenv").config();

// const routes = require('')

const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const sequelize = require("./db");
const path = require("path");
const routes = require("./routes");
const app = express();

app.use(cors());
app.use(fileUpload({ createParentPath: true }));
app.use(express.static(path.resolve("static")));
app.use(express.json());
app.use("/", routes);

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    app.listen(PORT, () => console.log("Server running on port " + PORT));
  } catch (error) {
    console.log(error);
  }
};

startServer();
