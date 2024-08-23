`Axios` 是 `Vue` 官方推荐的一个基于 `Promise` 的 HTTP 库，用于在 `Vue` 项目中发送 HTTP 请求。`Axios` 支持浏览器和 `Node.js` 环境，并且支持 `Promise API` 和全局错误处理。

## 安装
```bash
npm install axios
```

## 处理并发请求
* `axios.all()` 是用于并发执行多个请求的，它接收一个请求数组并返回一个`Promise`，该 `Promise` 在所有请求都成功或其中一个请求失败时解析或拒绝。
* `Promise.all()` 也可以实现同样的功能，但不是 axios 特有的。它接受一个 `Promise` `数组，当所有Promise` 都解析时，返回的 `Promise` 会被拒绝。`Promise` 解析，如果任何一个`Promise` 被拒绝，则返回的`Promise` 也会立即被拒绝。
  
## 进行拦截
* `axios.interceptors.request.use()` 用于添加请求拦截器，可以用来在请求发送之前修改请求配置，添加请求头、添加请求参数等，例如添加全局的认证信息。
* `axios.interceptors.response.use()` 用于添加响应拦截器，用于在响应返回后处理数据，比如处理错误状态或者统一的数据格式化。
* 拦截器函数接收两个参数：`config` 和 `next`。`config` 表示当前的请求配置，`next` 表示一个函数，调用该函数可以传递处理后的配置给下一个拦截器或发送请求。
  
## 取消请求
Axios 可以取消请求。官方文档指出有两种方法可以取消请求，分别是cancelToken和AbortController，示例代码如下：
### 使用cancelToken的方法一：
```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
axios.post("/user/12345", { name: "new name" }, { cancelToken: source.token });
source.cancel("Operation canceled by the user.");
```
### 使用 cancelToken的方法二：
```js
const CancelToken = axios.CancelToken;
let cancel;
axios.get("/user/12345", {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  }),
});
cancel();
```

### 使用AbortController：
```js
const controller = new AbortController();
axios.get("/foo/bar", { signal: controller.signal }).then(function (response) {
  //...
});
controller.abort();
```
通过文档描述和示例代码，可以总结出以下功能点：
* 支持cancelToken取消请求，cancelToken可以通过工厂函数产生，也可以通过构造函数生成；
* 支持 Fetch API 的AbortController取消请求；
* 一个token/signal可以取消多个请求，一个请求也可同时使用token/signal；
* 如果在开始axios request之前执行了取消请求，则并不会发出真实的请求。

## 发送 JSON 数据
* `axios.post()` 方法可以用于发送JSON数据，只需要将JSON数据作为请求体的一部分传递给该方法即可。
```js
const data = {
    name: 'John',
    age: 30
};

axios.post('https://example.com/api/users', data)
    .then(function(response) {
        // 处理响应
    })
    .catch(function(error) {
        // 处理错误
    });
```
* 需要注意的是，`axios.post()` 方法默认会自动将请求体序列化为JSON字符串，如果需要发送非JSON数据，需要手动设置请求头的 `Content-Type` 为 `application/json`。
  
## 发送 FormData 数据
* `axios.post()` 方法可以用于发送FormData数据，只需要将FormData对象作为请求体的一部分传递给该方法即可。
```js
const formData = new FormData();
formData.append('name', 'John');
formData.append('age', 30);

axios.post('https://example.com/api/users', formData)
    .then(function(response) {
        // 处理响应
    })
    .catch(function(error) {
        // 处理错误
    });
```
* 需要注意的是，`axios.post()` 方法默认会自动将请求体序列化为FormData对象，如果需要发送非FormData数据，需要手动设置请求头的 `Content-Type` 为 `application/x-www-form-urlencoded`。
  
## 发送 PUT 请求
* `axios.put()` 方法可以用于发送PUT请求，只需要将请求体作为请求参数的一部分传递给该方法即可。
```js
const data = {
    name: 'John',
    age: 30
};

axios.put('https://example.com/api/users/1', data)
    .then(function(response) {
        // 处理响应
    })
    .catch(function(error) {
        // 处理错误
    });
```
* 需要注意的是，`axios.put()` 方法默认会自动将请求体序列化为JSON字符串，如果需要发送非JSON数据，需要手动设置请求头的 `Content-Type` 为 `application/json`。
  
## 发送 GET 请求
* `axios.get()` 方法可以用于发送GET请求，只需要将请求参数作为请求参数的一部分传递给该方法即可。
```js
axios.get('https://example.com/api/users', {
    params: {
        page: 1,
        limit: 10
    }
})
    .then(function(response) {
        // 处理响应
    })
    .catch(function(error) {
        // 处理错误
    });
```
    
* 需要注意的是，`axios.get()` 方法默认不会处理请求参数，需要手动设置请求头的 `Content-Type` 为 `application/x-www-form-urlencoded`。


## 发送 DELETE 请求
* `axios.delete()` 方法可以用于发送DELETE请求，只需要将请求体作为请求参数的一部分传递给该方法即可。
```js
const data = {
    name: 'John',
    age: 30
};

axios.delete('https://example.com/api/users/1', {
    data: data
})
    .then(function(response) {
        // 处理响应
    })
    .catch(function(error) {
        // 处理错误
    });
```
    
* 需要注意的是，`axios.delete()` 方法默认会自动将请求体序列化为JSON字符串，如果需要发送非JSON数据，需要手动设置请求头的 `Content-Type` 为 `application/json`。
  
## 发送文件上传请求
* `axios.post()` 方法可以用于发送文件上传请求，只需要将文件作为请求体的一部分传递给该方法即可。
```js
const formData = new FormData();
formData.append('file', file);

axios.post('https://example.com/upload', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}).then(function(response) {
    // 处理响应
})
.catch(function(error) {
    // 处理错误
});
```

## 处理网络错误和超时
* `axios.interceptors.response.use()` 方法可以用于处理网络错误和超时。
* 设置超时可以通过timeout配置项完成：
```js
axios.get('/some-url', { timeout: 1000 });
```
* 当请求失败时，可以通过响应拦截器检查response.status来区分网络错误（通常是4xx或5xx）和超时（ETIMEDOUT）。
