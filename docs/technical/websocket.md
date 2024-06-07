WebSocket 是一种在单个TCP连接上进行全双工通信的协议，它使得客户端和服务器之间的数据交换变得更加高效，特别适合实时应用，如在线聊天、游戏、股票报价等。以下是前端开发者使用WebSocket时应该掌握的关键知识点：

## 基本概念

* 全双工通信：与HTTP不同，WebSocket允许数据同时在两个方向上传输，即客户端和服务器都可以随时发送数据。
* 长连接：WebSocket建立连接后，除非一方主动关闭，否则连接将保持打开状态，减少了传统HTTP请求的握手开销。
  
## 建立连接

* 握手过程：WebSocket连接初始化通过HTTP Upgrade请求开始，然后转换为WebSocket协议。
* URL和端口：WebSocket连接使用ws://（非加密）或wss://（加密）作为协议前缀，指定服务器地址和端口。

## API使用

* 创建实例：使用new WebSocket(url, [protocols])创建WebSocket对象。
* 事件监听：主要事件包括open（连接建立）、message（接收到消息）、close（连接关闭）和error（发生错误）。
* 发送消息：通过WebSocket.send(data)方法向服务器发送数据。
* 关闭连接：使用WebSocket.close([code[, reason]])来关闭连接。

## 数据格式

* WebSocket传输的数据可以是文本（UTF-8编码）或二进制数据，前端需要根据实际情况处理数据类型。
  
## 错误处理

* 理解如何处理连接失败、断线重连、超时等情况，以及如何优雅地向用户反馈错误信息。

## 跨域问题

* WebSocket同样受到同源策略限制，但支持CORS（跨源资源共享），需要服务器正确配置响应头。

## 心跳机制

* 为了维持长连接，可能需要实现心跳包机制，定期发送少量数据以检测连接是否活跃。

## 安全性

* 使用wss://加密连接，保护数据传输的安全性，尤其是在传输敏感信息时。

## 示例代码
在 Vue 3 + TypeScript 的项目中集成 WebSocket，可以用来实现实时通信功能，例如聊天应用、实时数据更新等场景。下面是一个简单的示例，演示如何建立WebSocket连接、发送消息和接收消息。
1. mac 环境下制作 ssl 证书、生成自签名证书
* 生成 key
```bash
# 生成rsa私钥，des3算法，server_ssl.key是秘钥文件名 1024位强度
openssl genrsa -des3 -out server_ssl.key 1024
```
让输入两次密码，随便，但是两次得是一样的
* 移除密码
```bash
# 这里执行完上一步的密码即已经被移除了
openssl rsa -in server_ssl.key -out server_ssl.key
```
* 生成 csr
```bash
# -new 执行生成新的证书请求
# -key 指定密钥
openssl req -new -key server_ssl.key -out server_ssl.csr
```
  * Country Name (2 letter code) [国家]:CN

  * State or Province Name (full name) [省份]:Zhejiang

  * Locality Name (eg, city) [城市]: Hangzhou

  * Organization Name (eg, company) [组织/公司]:fr

  * Organizational Unit Name (eg, section) [部门/单位]:fr

  * Common Name (eg, fully qualified host name) [域名]:test.fr.cn

  * Email Address [邮箱]:demo@qq.com

Please enter the following ‘extra’ attributes
to be sent with your certificate request
A challenge password [上一步已经移除，直接回车即可]:
* 生成证书
```bash
# x509 根据现有的证书请求生成自签名根证书
# -days 设置证书的有效天数
# -in 指定输入证书请求文件
openssl x509 -req -days 365 -in server_ssl.csr -signkey server_ssl.key -out server_ssl.crt

```
2. 使用 node + express 创建 https/wss 服务
```js
import express from "express";
import * as http from "http";
import * as https from "https";
import { WebSocketServer } from "ws";
import fs from "fs";
import path from "path";

const app = express();
const httpServer = http.createServer(app);
const wss = new WebSocketServer({ server: httpServer });

// 加载SSL证书（如果需要wss，请确保你有有效的证书和私钥）
const options = {
  key: fs.readFileSync("./certificate/server_ssl.key"), // 你的私钥, 需按照第一步生成的私钥路径自行配置绝对路径
  cert: fs.readFileSync("./certificate/server_ssl.crt"), // 你的证书, 需按照第一步生成的证书路径自行配置绝对路径
};

// 创建HTTPS服务器（如果需要wss）
const httpsServer = https.createServer(options, app);
const wssSecure = new WebSocketServer({ server: httpsServer
  cert: fs.readFileSync("./certificate/server_ssl.crt"),
};

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log("received: %s", message);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

wssSecure.on("connection", (ws) => {
  // 与wss相同的处理逻辑
});

const PORT = process.env.PORT || 3000;
const SECURE_PORT = process.env.SECURE_PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`HTTP Server is running on port ${PORT}`);
});

httpsServer.listen(SECURE_PORT, () => {
  console.log(`HTTPS Server is running on port ${SECURE_PORT}`);
});
```

3. 示例代码
在 Vue3
```vue
<template>
  <div>
    <input
      v-model="message"
      @keyup.enter="sendMessage"
      placeholder="Enter message"
    />
    <button @click="sendMessage">Send</button>
    <ul>
      <li v-for="msg in messages" :key="msg.id">{{ msg.text }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Chat',
  setup() {
    const socket = new WebSocket(`wss://localhost:3001`) // 使用wss连接,需自行配置 ws 服务路径
    const message = ref('')
    const messages = ref([])
    let messageId = 0

    socket.onopen = () => {
      console.log('Connected to WebSocket server')
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      messages.value.push({ id: ++messageId, text: data.text })
    }

    const sendMessage = () => {
      if (message.value) {
        socket.send(JSON.stringify({ text: message.value }))
        messages.value.push({ id: ++messageId, text: `Me: ${message.value}` })
        message.value = ''
      }
    }

    return {
      message,
      messages,
      sendMessage
    }
  }
})
</script>
```
