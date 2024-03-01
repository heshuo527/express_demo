## todoList API

1. 依赖下载
   npm i 或者 yarn add

2. 启动项目
   npm start 或者 yarn start

## 接口文档

### 查看全部 todo

```js
url: 'http://localhost:3000/user/all',
method: 'GET',
data: null,
result: [];
```

### 添加一个 todo

```js
url: 'http://localhost:3000/user/add',
method: 'POST',
// 参数: id-时间戳 done-状态 name-名称
data: {
  id: '1709203626850',
  done: false,
  name: '公主好美',
},
result: [];
```

### 删除一个 todo

```js
url: 'http://localhost:3000/user/delete',
method: 'POST',
// 参数: id-时间戳
data: {
  data: {
  id: '1709203626850',
},
},
result: [];
```

### 修改一个 todo

```js
url: 'http://localhost:3000/user/update',
method: 'POST',
// 参数: id-时间戳
data: data: {
  id: '1709203626850',
  },,
result: [];
```

### 示例

```js
ajax("http://localhost:3000/user/all", "GET", null)
  .then((res) => {
    console.log("请求成功", res);
  })
  .catch((err) => {
    console.error("请求失败", err);
  });
```

```js
/**
 * ajax请求函数
 * @param {*} url 请求接口
 * @param {*} methods 请求方式
 * @param {*} data 请求参数(供POST请求使用)
 * result []
 */
function ajax(url, methods, data = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(methods, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status <= 300) {
          try {
            const responseText = JSON.parse(xhr.responseText);
            resolve(responseText);
          } catch (error) {
            reject(new Error(`request status ${xhr.status}`));
          }
        } else {
          reject(new Error(`Request failed with status ${xhr.status}`));
        }
      }
    };
    xhr.onerror = function () {
      reject(new Error("网络错误"));
    };
    if (data !== null) {
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  });
}

export default ajax;
```
