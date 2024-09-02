## DOCTYPE 的作用?
`Doctype` 是 `HTML5` 中的一种标准通用标记语言的文档类型声明，通过它可以告诉浏览器（解析器）使用哪一个 （`HTML` 或 `XHTML`）标准解析文档。在浏览器发展的过程中，`HTML` 出现过很多版本，不同的版本之间格式书写上略有差异。如果没有事先告诉浏览器，那么浏览器就不知道文档解析标准是什么？此时，大部分浏览器将开启最大兼容模式来解析网页，我们一般称为 `怪异模式`，这不仅会降低解析效率，而且会在解析过程中产生一些难以预知的bug，所以文档声明是必须的。

## meta 标签
`meta` 标签是 `HTML` 文档的元数据，用来描述 `HTML` 文档的属性，如作者、日期、最后修改时间、关键词等。`meta` 标签本身不会显示在页面上，但会被浏览器解析。`meta` 标签通常用于指定网页的描述、关键词、作者、版权信息等元数据，也可以用于控制网页的缓存、刷新、跳转等行为。

## meta viewport
`meta viewport` 是 `HTML` 文档的元数据，用来控制网页在移动设备上的显示效果。`meta viewport` 标签的 `content` 属性可以设置以下参数：
- `width`：设置网页的宽度，单位可以是像素（`px`）或百分比（`%`）。如果设置为 `device-width`，则网页宽度等于设备屏幕宽度。
- `height`：设置网页的高度，单位可以是像素（`px`）或百分比（`%`）。如果设置为 `device-height`，则网页高度等于设备屏幕高度。
- `initial-scale`：设置网页的初始缩放比例，单位是倍数。如果设置为 `1.0`，则网页初始缩放比例为 100%。
- `maximum-scale`：设置网页的最大缩放比例，单位是倍数。如果设置为 `1.0`，则网页最大缩放比例为 100%。
- `minimum-scale`：设置网页的最小缩放比例，单位是倍数。如果设置为 `1.0`，则网页最小缩放比例为 100%。
- `user-scalable`：设置网页是否允许用户缩放，值为 `yes` 或 `no`。如果设置为 `no`，则网页不允许用户缩放。

## HTML 语义化
HTML语义化是指在编写HTML文档时，使用有意义的标签来描述文档的内容和结构。这不仅可以提高网页的可访问性，还有助于搜索引擎优化（SEO）和提高网页的可读性。

在实际项目中，HTML语义化的应用体现在以下几个方面：

* 改善可访问性：使用语义标签（如`<header>`, `<nav>`, `<article>`, `<section>`等）可以帮助屏幕阅读器等辅助技术更好地解析网页内容，从而改善残障人士访问网页的体验。

* 搜索引擎优化（SEO）：搜索引擎更倾向于将语义清晰的网页排在搜索结果的前面。因此，使用语义标签可以提高网页在搜索引擎中的排名。

* 提高可读性：对于开发者来说，使用语义标签可以使代码结构更清晰，更易于理解和维护。

## 行级元素、块级元素、行内块级元素 及转换
- 行级元素：行级元素会从左到右排列，宽度只与其内容相关，不能设置宽高，不能包含块级元素，只能容纳文本或者其它行内元素。常见的行级元素有 `<a>`、`<span>`、`<img>`、`<input>`、`<button>` 等。
- 块级元素：块级元素会独占一行，宽度默认为父元素的 100%，可以设置宽高，可以包含行级元素和块级元素。常见的块级元素有 `<div>`、`<p>`、`<form>`、`<h1>`、`<ul>`、`<ol>` 等。
- 行内块级元素：行内块级元素会从左到右排列，宽度只与其内容相关，可以设置宽高，可以包含行级元素和块级元素。常见的行内块级元素有 `<img>`、`<input>` 等。

| 特点 | 块级元素 | 行内元素 | 行内块级元素|
| :---- | :----  | :---- | :---- | 
| 布局 | 通常开始于新的一行 | 在同一行内水平排列 | 在同一行内水平排列 |
| 宽度 | 默认填满父容器宽度 | 宽度由内容决定 | 宽度由内容决定 |
| 高度 | 可以设置高度 | 高度通常由内容决定 | 可以设置高度 |
| 外边距 | 可以设置上下左右的外边距 | 只能设置左右外边距 | 可以设置上下左右的外边距 |
| 内边距 | 可以设置上下左右的内边距 | 只能设置左右内边距 | 可以设置上下左右的内边距 |
| 内容 | 可以包含其他块级或行内元素 | 通常包含文本或数据 | 通常包含文本或数据 |
| 换行 | 前后有换行空间 | 默认没有前后换行空间 | 前后有换行空间 |
| 盒模型 | 表现为完整的盒子模型 | 只表现部分盒子模型 | 表现为完整的盒子模型 |
| 堆叠方式 | 垂直堆叠 | 水平方堆放齐 | 垂直堆叠 |

使用行内元素需要注意的是：

* 行内元素设置宽度 `width` 无效
* 行内元素设置 `height` 无效，但是可以通过 `line-height` 来设置
* 设置 `margin` 只有左右有效，上下无效
* 设置 `padding` 只有左右有效，上下无效

可以通过 `display` 属性将行级元素转换为块级元素，将块级元素转换为行内元素，将行内元素转换为行内块级元素。例如：
```css
span {
  display: block;
}

div {
  display: inline;
}

img {
  display: inline-block;
}
```

## cookie、sessionStorage、localStorage、indexDB 的区别及应用场景

| 特性 | cookie | sessionStorage | localStorage | indexDB |
| --- | --- | --- | --- | --- |
| 大小（每个域名） | 4KB | 5MB | 5MB | 无限制 |
| 生命周期 | 可以设置过期时间，默认是浏览器关闭时清除 | 页面会话结束时清除 | 永久保存，除非手动清除 | 永久保存，除非手动清除 |
| 存储位置 | 浏览器端 | 浏览器端 | 浏览器端 | 浏览器端 |
| 随请求发送到服务器 | 是，通过 Cookie 请求头，自动发送给服务器 | 否 | 否 | 否 | 
| 安全性 | 不安全，可以被客户端篡改 | 安全，只能被同源页面访问 | 安全，只能被同源页面访问 | 安全，只能被同源页面访问 |

应用场景：
* cookie：用于存储用户登录状态、购物车信息等需要跨页面共享的数据，因为 cookie 存储在客户端，所以安全性较低，需要设置合适的过期时间。
* sessionStorage：用于存储页面会话数据，如表单数据、临时数据等，因为 sessionStorage 存储在客户端，所以安全性较高，页面会话结束时清除。
* localStorage：用于存储长期数据，如用户设置、主题等，因为 localStorage 存储在客户端，所以安全性较高，除非手动清除，否则数据会一直存在。
* indexDB：用于存储大量数据，如离线数据、缓存数据等，因为 indexDB 存储在客户端，所以安全性较高，除非手动清除，否则数据会一直存在。

## script、script async 和 script defer 的区别
- `<script>`：浏览器会立即加载和执行脚本，阻塞 HTML 解析，直到脚本执行完毕。
- `<script async>`：浏览器会异步加载脚本，不会阻塞 HTML 解析，脚本加载完成后立即执行，可能会在 HTML 解析完成之前执行，所以如果脚本依赖于 DOM 元素，可能会出错。
- `<script defer>`：浏览器会异步加载脚本，不会阻塞 HTML 解析，脚本加载完成后等到 HTML 解析完毕再执行，所以脚本可以安全地访问 DOM 元素。

## iframe 的作用、优缺点及注意事项
`<iframe>` 标签用于在网页中嵌入另一个 HTML 页面。
使用 `<iframe>` 标签的优点包括：

1. 可以嵌入第三方页面，方便实现一些功能。
2. 可以实现页面之间的通信，例如使用 `postMessage` API。
3. 可以实现页面之间的数据共享，例如使用 `window.name` 属性。

使用 `<iframe>` 标签的缺点包括：

1. 会阻塞页面的加载，因为它会加载一个新的 HTML 页面。
2. 会创建一个新的浏览上下文，这意味着它有自己的 JavaScript 运行环境，不能与父页面共享 JavaScript 变量。
3. 会增加页面的复杂度，需要处理跨域问题、页面之间的通信等问题。
4. 会增加页面的性能开销，因为需要加载一个新的 HTML 页面。

使用 `<iframe>` 标签时需要注意以下几点：

- `<iframe>` 标签会阻塞页面的加载，因为它会加载一个新的 HTML 页面。
- `<iframe>` 标签会创建一个新的浏览上下文，这意味着它有自己的 JavaScript 运行环境，不能与父页面共享 JavaScript 变量。如果需要与父页面通信，可以使用 `postMessage` API。
- `<iframe>` 标签的 `src` 属性可以设置为 `about:blank`，这样它就不会加载任何内容，可以用于延迟加载页面或者创建一个空的 iframe 用于后续操作。
- `<iframe>` 标签的 `sandbox` 属性可以用于限制 iframe 的行为，例如禁止表单提交、禁止脚本执行等。

## HTML5 的新特性
HTML5 引入了一些新的特性，包括：

1. 新的语义化标签：如 `<header>`、`<footer>`、`<nav>`、`<section>`、`<article>` 等，用于更好地描述页面结构。
2. 新的表单控件：如 `<input type="email">`、`<input type="url">`、`<input type="number">` 等，用于更好地验证用户输入。
3. 新的媒体元素：如 `<audio>`、`<video>` 等，用于嵌入音频和视频。
4. 新的 API：如 `Canvas`、`SVG`、`WebGL` 等，用于绘制图形和动画。
5. 新的存储方式：如 `localStorage`、`sessionStorage`、`indexedDB` 等，用于存储数据。
6. 新的通信方式：如 `WebSocket`、`Server-Sent Events` 等，用于实现实时通信。
7. 安全和隐私保护：HTML5提供了一些安全性和隐私保护的功能，例如加密连接（通过HTTPS）和用户认证等。

## 使用 canvas 截图
使用 HTML5 的 canvas 元素来截图通常涉及几个步骤：

* 需要有一个元素（比如一个 div、img 或者其他任何可视元素）作为你想要截图的来源；
* 需要将这个元素的内容绘制到 canvas 上；
* 将这个 canvas 的内容保存为一个图片文件。
```html
<!DOCTYPE html>
<html>
<body>
<canvas id="screenshot-canvas" style="display: none;"></canvas>
<!-- 要截图的元素 -->
<div id="screenshot-area">
  这里是你想截图的内容。
</div>

<button onclick="captureScreenshot()">截图并下载</button>
<img id="screenshot-image" src="" alt="截图预览"/>
 
<script>
function captureScreenshot() {
  // 获取要截图的元素
  var element = document.getElementById('screenshot-area');
  
  // 创建一个canvas元素，并设置尺寸
  var canvas = document.createElement('canvas');
  var scale = 2; // 放大倍数
  canvas.width = element.offsetWidth * scale;
  canvas.height = element.offsetHeight * scale;
  canvas.style.width = element.offsetWidth + 'px';
  canvas.style.height = element.offsetHeight + 'px';
  
  // 将canvas放入文档流中，但是隐藏
  document.body.appendChild(canvas);
  
  // 获取canvas的2D上下文
  var ctx = canvas.getContext('2d');
  // 重置canvas的CSS尺寸以避免影响渲染
  canvas.style.width = '${canvas.width}px';
  canvas.style.height = '${canvas.height}px';
  
  // 执行渲染操作
  var rect = element.getBoundingClientRect();
  ctx.translate(-rect.left, -rect.top);
  ctx.scale(scale, scale);
  html2canvas(element).then(function(canvas) {
    // 创建一个Image元素来显示截图
    var img = document.getElementById('screenshot-image');
    img.src = canvas.toDataURL('image/png');
    // 如果需要，可以创建一个下载链接
    var link = document.createElement('a');
    link.download = 'screenshot.png';
    link.href = img.src;
    link.click();
    // 清除canvas
    canvas.width = 0;
    canvas.height = 0;
  });
}
</script>
 
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.min.js"></script>
</body>
</html>
```
> 在上面的 JavaScript 示例中，drawImage 方法不能直接用于绘制 DOM 元素到 canvas 上。为了正确截图 DOM 元素，包括那些可能包含跨域图片或复杂 CSS 属性的元素，推荐使用 html2canvas 库。html2canvas 可以将 HTML 渲染成一个 canvas，然后你可以将这个 canvas 转换为图片并保存。
