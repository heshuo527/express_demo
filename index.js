const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const cors = require("cors");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "ejs");

// 处理所有 OPTIONS 请求
app.options('*', cors());

app.get("/", (req, res) => {
  res.send('hello 公主殿下 诸葛先生说你一定会光芒万丈!');
});

// 读取全部文件
app.get("/user/all", async (req, res) => {
  try {
    const user = await fs.readFile(path.join(__dirname, '/user.json'), 'utf-8')
    const parseUser = JSON.parse(user);
    res.send(parseUser)
  } catch (error) {
    console.error('文件读取错误');
  }
});

// 添加一个用户
app.post("/user/add", async (req, res) => {
  try {
    const newItem = req.body;
    // 校验是否有数据送上来
    if (!newItem) {
      return res.status(400).send('data为空');
    }
    const user = await fs.readFile(path.join(__dirname, '/user.json'), 'utf-8')
    const parseUser = JSON.parse(user);
    parseUser.push(newItem);
    await fs.writeFile(path.join(__dirname, '/user.json'), JSON.stringify(parseUser, null, 2), 'utf-8')
    res.redirect("/");
  } catch (error) {
    console.error('添加用户失败', error);
    res.status(500).send('Internal Server Error');
  }
});

// 删除一个用户
app.post("/user/delete", async (req, res) => {
  try {
    const newItem = req.body;
    const user = await fs.readFile(path.join(__dirname, '/user.json'), 'utf-8')
    const parseUser = JSON.parse(user);
    const filterUser = parseUser.filter((p) => p.id !== newItem.id);
    await fs.writeFile(path.join(__dirname, '/user.json'), JSON.stringify(filterUser, null, 2), 'utf-8')
    res.redirect("/");
  } catch (error) {
    console.error('添加删除失败', error);
    res.status(500).send('Internal Server Error');
  }
});

// 修改一个用户
app.post("/user/update", async (req, res) => {
  try {
    const newItem = req.body;
    const user = await fs.readFile(path.join(__dirname, '/user.json'), 'utf-8')
    const parseUser = JSON.parse(user);
    const filterUser = parseUser.map((p) => {
      if (p.id === newItem.id) {
        p.done = !p.done;
      }
      return p;
    });
    await fs.writeFile(path.join(__dirname, '/user.json'), JSON.stringify(filterUser, null, 2), 'utf-8')
    res.redirect("/");
  } catch (error) {
    console.error('添加删除失败', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
});
