`Server-Sent Events (SSE)` 是一种让服务器向浏览器发送实时更新的技术，它基于 `HTTP` 协议，允许服务器端单向地向客户端推送数据。对于前端开发者来说，掌握 `SSE` 涉及到以下几个基础知识点：

## 基本概念

- `SSE` 是基于 `HTTP` 长连接的技术，用于实现实时数据传输，如股票报价、比赛分数、聊天消息等。
- `SSE` 使用 `EventSource` 对象来创建 `HTTP` 连接，并监听服务器事件。
- `SSE` 使用  `Event` 对象来封装服务器发送的数据。
- `SSE` 使用 `EventTarget` 对象来处理服务器事件。

## 使用场景
1. 聊天室：实时更新聊天记录。 
2. 股票报价：实时更新股票价格。 
3. 体育赛事：实时更新比赛结果。 

## 浏览器兼容性

需要了解不是所有浏览器都支持 `SSE` ，需要检查 `window.EventSource` 是否存在来判断浏览器兼容性。
```js
if (typeof EventSource !== "undefined") {
    var source = new EventSource("your-server-sse-endpoint");
} else {
    // 浏览器不支持SSE的处理
}
```

## 创建EventSource对象

* 学习如何实例化 `EventSource` 对象，包括指定服务器端点 `URL` 和设置可选参数（例如，用于自定义请求头）。
```js
const source = new EventSource("your-server-sse-endpoint");
```

## 监听、处理服务器事件

* 理解 `SSE` 中的事件类型，特别是默认的 `message` 事件以及其他自定义事件，以及如何为它们添加监听器。
```js
source.addEventListener("message", function(event) {
    console.log(event.data);
});

// 处理自定义事件
source.addEventListener("myCustomEvent", function(event) {
    console.log("Received custom event: ", event.data);
});
```

## 错误处理
* 学习如何处理连接错误、重连机制以及如何监听 `error` 事件。
```js
source.onerror = function() {
    console.error("Connection error detected!");
};
```
重连机制：
```js
source.onerror = function() {
    console.error("Connection error detected!");
    // 重新连接
    source.close();
    source = new EventSource("your-server-sse-endpoint");
};
```
    
## 发送自定义事件
* 学习如何使用 `EventSource` 对象发送自定义事件，包括指定事件名称和数据。
```js
source.send("myCustomEvent", "data");
```

## 自定义请求头
* 了解如何自定义请求头，例如添加认证信息或自定义请求参数。
```js
const headers = new Headers();
headers.append("Authorization", "Bearer your-token");

const source = new EventSource("your-server-sse-endpoint", { headers: headers });
```

## 关闭 SSE 连接
当不再需要 `SSE` 连接时，需要关闭连接。
```js
source.close();
```

## 示例代码
将创建一个简单的 `Vue` 组件，该组件连接到 `SSE` 服务器并显示接收到的消息。
```vue
<template>
  <div>
    <h1>SSE Events</h1>
    <ul>
      <li v-for="event in events" :key="event.id">{{ event.message }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'EventComponent',
  setup() {
    const state = reactive({
      events: [] as any[]
    })

    const connectToSSE = () => {
      const source = new EventSource('http://localhost:3000/sse')

      source.onmessage = (event) => {
        const data = JSON.parse(event.data)
        state.events.push(data)
      }

      source.onerror = (error) => {
        console.error(error)
      }
    }

    connectToSSE()

    return { ...toRefs(state) }
  }
})
</script>
```
需要一个 `SSE` 服务器来发送事件。这通常涉及到使用 `Node.js`、`Express`等后端技术。以下是一个简单的 `Node.js + Express SSE` 服务器的示例：
```js
// sse-server.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/sse-endpoint', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const intervalId = setInterval(() => {
    res.write(`data: ${new Date().toISOString()}\n\n`);
  }, 1000); // 每秒发送一个时间戳作为示例

  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```
运行这个 `Node.js` 服务器，并确保你的 `Vue` 应用可以访问它（例如，通过代理或在同一台机器上运行）。现在，当你打开 `Vue` 应用时，你应该能看到从 `SSE` 服务器接收到的消息。

```bash
node sse-server.js
```

## 与Ajax、WebSocket对比
* `SSE` 是单向通道，而 `Ajax ` 和 `WebSocket` 是双向通道。
* `SSE` 使用的是 `HTTP` 协议，而 Ajax和 WebSocket 使用的是 `TCP` 协议。 
* `SSE` 不支持二进制数据传输，而 `Ajax ` 和 `WebSocket` 支持。
* `SSE` 只支持 `GET` 请求，而 `Ajax ` 和 `WebSocket` 支持其他 `HTTP` 方法。
* `SSE` 不支持自定义头，而 `Ajax ` 和 `WebSocket` 支持。
* `SSE` 不支持心跳检测和断线重连，而 `Ajax ` 和 `WebSocket` 支持。
