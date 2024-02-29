const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const todoList = [];
app.get("/", (req, res) => {
  res.render("index", todoList);
  res.send("Hello World!");
});

app.post("/add", (req, res) => {
  const newItem = req.body.newItem;
  todoList.push(newItem);
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const index = req.body.index;
  todoList.slice(index, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`服务启动成功 ${port}`);
});
