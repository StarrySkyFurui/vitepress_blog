## HTML 常用标签和属性：
- 标题：h1~h6
- 段落：p
- HTML 文本格式化标签：b，strong，i，em，s，del，u，sup，sub，hr
- HTML 中的特殊符号：&lt;，&gt;，&emsp;，&copy;，&trade;，&reg;
- 区：div 和 span
- 列表：ol + li，ul + li，dl + dt + dd
- 图片：img
- 超链接：a
- HTML 表格：table，caption，th，tr，td
- HTML 表单：form，input，label，select + option，button
- 框架 iframe

## HTML5 新特性

- 用于媒介回放的 video 和 audio 元素
- 新的特殊内容元素：比如`article`,`footer`,`header`,`nav`,`section`
- 新的表单控件：比如`calendar`、`date`、`time`、`email`、`url`、`search`
- 2D/3D 绘图&效果
- 支持对本地离线存储

## HTML5 浏览器支持

最新版本的五个主流浏览器都支持某些 HTML5 特性，IE9 以上浏览器支持 HTML5 新特性。但是 IE8 以下的浏览器不支持

IE8 以下(包含 IE8)以下版本浏览器兼容 HTML5 的方法，我们必须使用 htmlshiv 垫片包，让其支持 HTML5 新特性
```html
<script src="https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
```

## HTML5 新标签

### 8 个新语义元素和新属性

`header`,`nav`,`aside`,`article`,`section`,`footer`, 所有的这些元素都是**块级**元素。

###  优点
- div + css 能解决布局问题，但是可读性不好，代码不好维护
- SEO 搜索引擎优化
- 更好地支持各种终端，例如无障碍阅读和有声小说等

## 本地存储

HTML5 web 存储，一个比 `cookie` 更好的本地存储方式。

随着互联网的快速发展，基于网页的应用越来越普遍，同时也变得越来越复杂。为了满足各种各样的需求，会经常在本地存储大量的数据，传统方式我们会以 `document.cookie` 来进行存储，但是由于其存储大小只有 4k 左右，并且解析也相当的复杂，给开发带来诸多不便，HTML5 规范提出解决方案，使用 `sessionStorage` 和 `localStorage` 存储数据

### localStorage

特点：

1. 永久存储
2. 多窗口共享
3. 容量大约为 20M

```js
window.localStorage.setItem(key,value); //设置存储的内容
window.localStorage.getItem(key); //获取内容
window.localStorage.removeItem(key);//删除内容
window.localStorage.clear(); //清空内容
```

### sessionStorage

1. 生命周期为关闭当前浏览器窗口
2. 可以在同一个窗口下访问
3. 数据大小为 5M 左右

```js
window.sessionStorage.setItem(key,value); //设置存储的内容
window.sessionStorage.getItem(key); //获取内容
window.sessionStorage.removeItem(key);//删除内容
window.sessionStorage.clear(); //清空内容
```

## 音频 audio

HTML5 提供了播放音频文件的标准。直到现在，仍然不存在在网页上播放音频的标准。今天，大多数音频都是通过插件(比如 Flash)来播放的。然而，并非所有浏览器都拥有同样的插件。

### 基本使用

```html
<audio controls="controls">
    <source src="my.mp3"  type="audio/mp3">
</audio>
```

- controls 属性添加音频的控件，播放、暂停和音量控件
- autoplay 使音频自动播放
- loop 使音频自动重复播放

## 视频 video

```html
<video width="800" height="" controls="">
    <source src="Hero.mp4" type="video/mp4"></source>
	<source src="Hero.ogv" type="video/ogg"></source>
	<source src="Hero.webm" type="video/webm"></source>
</video>
```

`<video>` 元素提供了 播放、暂停和音量控件来控制视频。同时`<video>` 元素也提供了 width 和 height 属性控制视频的尺寸.如果设置的高度和宽度，所需的视频空间会在页面加载时保留。如果没有设置这些属性，浏览器不知道大小的视频，浏览器就不能再加载时保留特定的空间，页面就会根据原始视频的大小而改变。

`<video>` 与`</video>` 标签之间插入的内容是提供给不支持 video 元素的浏览器显示的。

`<video>` 元素支持多个 `<source>` 元素. `<source>` 元素可以链接不同的视频文件。浏览器将使用第一个可识别的格式。

### 调用摄像头：getUserMedia() API

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title></title>
</head>
<body>
<video id="video" autoplay style="width: 480px;height: 320px;"></video>
<div>
  <button id="capture">拍照</button>
</div>
<!-- 展示拍摄的照片 -->
<canvas id="canvas" width="480" height="320"></canvas>
<script type="text/javascript">
  window.onload = function() {
    // 1.获取标签
    var video = document.getElementById('video');
    var capture = document.getElementById('capture');
    var ctx = document.getElementById('canvas').getContext('2d');
    // 调用媒体对象
    // 参数为constraints 一个约束对象  是video还是audio
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 480,
        height: 320
      }
    }).then(function(stream) {
      // 获取到window.URL对象
      var URL = window.URL || window.webkitURL;
      // 创建一个video的url字符串
      try {
        video.src = URL.createObjectURL(stream);
      } catch (e) {
        video.srcObject = stream;
      }
      // 视频播放
      video.play();
    }).catch(function(err) {
      console.log(err);
    })
    // 点击拍照按钮事件
    capture.onclick = function() {
      ctx.drawImage(video,0,0,480,320);
    }
  }
</script>
</body>
</html>

```

## canvas 画布

```html
<canvas id='canvas' width="150" height="150"></canvas>
```

`<canvas>`看起来跟`img`标签有点像，唯一不同的是它没有 src 属性和 alt 属性。实际上，canvas 标签只有两个属性:`width`和`height`。如果没有设置宽度和高度，默认的 canvas 会初始化`width：300px,height:150px`

`canvas`标签创造了一个固定大小的画布，它有一个或者多个**渲染上下文对象**，用它可以绘制和处理要展示的内容。canvas 起初是空白的。为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。`canvas`元素有一个叫做 `getContext()`的方法，这个方法是用来获得渲染上下文和它的绘画功能。`getContext()`只有一个参数。

```js
var canvas = document.getElementById('myCanvas');
//获取绘画上下文对象
var ctx = canvas.getContext('2d');
```

### 绘制一个填充的矩形

```js
fillRect(x,y,width,height);
```

### 绘制一个矩形的边框

```js
strokeRect(x, y, width, height)
```

### 清除指定矩形区域。

```js
clearRect(x, y, width, height)
```

上面提供的方法之中每个都包含了相同的参数。x 和 y 指定了 canvas 画布上所绘制的矩形的左上角(相对于原点)的坐标。width 和 height 设置矩形的尺寸。

### 填充颜色和描边颜色设置

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';//填充颜色
ctx.strokeStyle = 'green';//描边颜色
```

## SVG

SVG（Scalable Vector Graphics，可缩放矢量图形）是一种基于 `XML` 语法的图像格式，用于描述二维矢量图形和矢量/混合矢量与光栅图形。`SVG` 提供了丰富的图像描述功能，包括形状、文本和路径，并允许它们与位图图像、字体和脚本代码进行交互。

在 HTML 中，你可以使用 `<svg>` 元素来嵌入 SVG内容。`<svg>` 元素内部可以包含各种描述图形、路径、文本等的 `SVG` 子元素。

下面是一个简单的示例，它绘制了一个红色的圆形：

```html
<svg width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>
```
在这个示例中，`<svg>` 元素设置了图形的宽度和高度。`<circle>` 元素用于绘制圆形，其中 `cx` 和 `cy` 属性定义了圆心的位置，`r` 属性定义了圆的半径。`stroke` 和 `stroke-width` 属性用于设置圆形的边框颜色和宽度，而 `fill` 属性则用于设置圆形的填充颜色。

`SVG` 的优势在于它的可缩放性。无论图像的尺寸如何变化，`SVG` 图形都能保持清晰和光滑的外观，因为它们是由矢量数据定义的，而不是由像素组成的。这使得 `SVG` 非常适合用于需要高清晰度或响应式设计的场景。
