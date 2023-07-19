import express from "express";
import path from "path";
import toDoController from "./src/application/controllers/toDoController";
import bodyParser from "body-parser";

const app = express();
const rootDir = path.join(__dirname, ".."); // Get the root directory

// ensure that the server is able to parse the request body correctly
app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(rootDir, "public")));

// Fire controllers
toDoController(app);

// Route to serve index.html
app.get("/index.html", (req, res) => {
  res.sendFile(path.join(rootDir, "index.html"));
});

// Listen to port
app.listen(3000, () => {
  console.log("Gurrus says hello from port 3000");
});