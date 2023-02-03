import bodyParser from "body-parser";
import express from "express";
import router from "./routes/students.js";
import { sequelize } from "./db/index.js";

const app = express();
const port = process.env.PORT || 3010;



 const connect = () => {
  sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  })
 } 

 setTimeout(connect, 30000)

  



app.use(bodyParser.json());
app.use("/api/students", router);
app.get("/api", (req, res) => {
  res.send("Welcome to my API!");
});
app.get("*", (req, res) =>
  res.status(404).send("There is no content at this route.")
);

app.listen(port, () => console.log(`Server is listening on port ${port}, Environment = ${process.env.NODE_ENV}`));

export default app;