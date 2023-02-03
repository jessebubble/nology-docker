import express from "express";
import router from "./routes/students.js";
import bodyParser from "body-parser";
import mongoose from 'mongoose'; // DB control program
import { database, testDatabase } from './config/config.js';
import { sequelize } from "./db/index.js";

const app = express();
const port = process.env.PORT || 3010;

app.use(bodyParser.json());

mongoose.connect("mongodb://mongo:27017/students", {
  useNewUrlParser: true
})

// if (process.env.NODE_ENV !== 'test') {
//   mongoose.connect(database || "mongodb://localhost:27017/students");
//   console.log(`Connected to Prod DB`);
// } else {
//   mongoose.connect(testDatabase || "mongodb://localhost:27017/students_test");
//   console.log(`Connected to Test DB`);
// }

app.use("/api/students", router);

app.get("/api", (req, res) => {
  res.send("Welcome to my API!");
});

app.get("*", (req, res) =>
  res.status(404).send("There is no content at this route.")
);

app.listen(port, () => console.log(`Server is listening on port ${port}, Environment = ${process.env.NODE_ENV}`));

export default app;