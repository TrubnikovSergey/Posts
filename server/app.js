const mongoose = require("mongoose");
const express = require("express");
const config = require("config");
const chalk = require("chalk");
const path = require("path");
const cors = require("cors");
const initDatabase = require("./startUp/initDatabase");
const routes = require("./routes");

const app = express();

const PORT = config.get("port") ?? 8080;

if (process.env.NODE_ENV === "prodaction") {
  app.use("/", express.static(path.join(__dirname, "client")));

  // const indexPath = path.join(__dirname, "client", "index.html");
  // app.get("*", (req, res) => {
  //   res.sendFile(indexPath);
  // });
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", routes);

async function start() {
  try {
    // mongoose.connection.once("open", () => {
    //   initDatabase();
    // });
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.green(`MongoDB connected`));
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}`));
    });
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}

start();
