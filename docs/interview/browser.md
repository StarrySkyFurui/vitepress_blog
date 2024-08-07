## 常用的 BOM 对象
BOM 是浏览器对象模型，它提供了独立于内容而与浏览器窗口进行交互的对象。使用 BOM，开发者可以操控浏览器显示的页面以外的部分。以下是一些常用的 BOM 属性对象：

1. `window`：表示浏览器窗口，是 BOM 的核心对象。它包含了与浏览器窗口相关的属性和方法，如 `window.innerWidth` 和 `window.innerHeight` 分别表示浏览器窗口的宽度和高度。
2. `document`：表示当前加载的 HTML 文档，是 DOM 的核心对象。它包含了与文档内容相关的属性和方法，如 `document.title` 表示文档的标题。3. `navigator`：表示浏览器的信息，包含了与浏览器相关的属性和方法，如 `navigator.userAgent` 表示浏览器的用户代理字符串。
4. `location`：表示当前页面的 URL，包含了与 URL 相关的属性和方法，如 `location.href` 表示当前页面的 URL。
5. `history`：表示浏览器的历史记录，包含了与历史记录相关的属性和方法，如 `history.back()` 表示返回上一页。
6. `screen`：表示用户的屏幕信息，包含了与屏幕相关的属性和方法，如 `screen.width` 和 `screen.height` 分别表示屏幕的宽度和高度。

## Cookie 如何防范 XSS 攻击
XSS (Cross-Site Scripting) 攻击是一种常见的安全漏洞，攻击者可以通过这种手段注入恶意脚本到信任的网站中，从而窃取用户的敏感信息，如 Cookie 中的 session ID。
1. HttpOnly 标志
是一个可以在 Set-Cookie HTTP 响应头中设置的标志,当设置后，浏览器会阻止 JavaScript 代码通过 document.cookie 访问 Cookie。
2. Secure 标志
Secure 标志表示 Cookie 只能通过 HTTPS 协议传输。即使攻击者能够通过 XSS 注入恶意脚本，由于 Cookie 只能在加密连接中发送，这使得窃取变得更加困难。
3. 设置 Cookie 的 SameSite 属性
限制了 Cookie 在跨站请求中的行为,可以减少跨站请求伪造 (CSRF) 攻击的风险。

## 渲染过程
## 重排和重绘
## 事件循环
## 浏览器缓存
## 浏览器存储
## 跨域
## 浏览器安全
## 浏览器性能优化