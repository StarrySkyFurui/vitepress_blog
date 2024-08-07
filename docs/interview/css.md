## 实现一个上中下三行布局，顶部和底部最小高度是 100px，中间自适应
```html
<div class="container">
  <div class="header">Header</div>
  <div class="main">Main</div>
  <div class="footer">Footer</div>
</div>
```
```css
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header,
.footer {
  min-height: 100px;
  background-color: #ccc;
}

.main {
  flex: 1;
  background-color: #f0f0f0;
}
```



## 多种方式实现一个左右两列布局，左边固定宽度，右边自适应
```html
<div class="container">
  <div class="left">Left</div>
  <div class="right">Right</div>
</div>
```
### 浮动布局
使用float属性将左列浮动到左侧，然后右列的内容会自动环绕在左列的右侧，形成两列布局。由于右列没有设置宽度，它会自适应剩余的空间
```css
.container {
    overflow: hidden; /* 清除浮动带来的高度塌陷问题 */
}

.left {
    float: left;
    width: 200px; /* 左边列固定宽度 */
    background-color: #f0f0f0;
}

.right {
    margin-left: 200px; /* 右边列通过左边距与左边列隔开 */
    background-color: #ddd;
}
```
### Flexbox布局
使用flex属性将左列固定宽度，右列自适应剩余空间
```css
.container {
  display: flex;
}

.left {
  width: 200px;
  background-color: #ccc;
}

.right {
  flex: 1; flex-grow: 1; /* 或 flex-grow: 1; 右边列自适应剩余空间 */
  background-color: #f0f0f0;
}
```
### Grid布局
使用grid属性将左列固定宽度，右列自适应剩余空间
```css
.container {
  display: grid;
  grid-template-columns: 200px auto; /* 左边列固定宽度，右边列自适应 */
}

.left {
  background-color: #ccc;
}

.right {
  background-color: #f0f0f0;
}
```
### 绝对定位布局
使用position属性将左列固定到左侧，右列通过margin-left属性与左列隔开
```css
.container {
  position: relative;
}

.left {
  position: absolute;
  left: 0;
  width: 200px;
  background-color: #ccc;
}

.right {
  margin-left: 200px;
  background-color: #f0f0f0;
}
```


## 多种方式实现水平垂直居中
### 行内元素水平居中
首先看它的父元素是不是块级元素，如果是，则直接给父元素设置 text-align: center;
```css
.parent {
  text-align: center;
}
```
如果不是，则先将其父元素设置为块级元素，再给父元素设置 text-align: center;
```css
.parent {
  display: block;
  text-align: center;
}
```

### 块级元素水平居中
#### 方法一
* 给需要居中的元素设置 margin: 0 auto; （作用：使盒子自己居中）;
```css
.child {
  margin: 0 auto;
}
```
#### 方法二
* 设置父元素为相对定位，子元素为绝对定位
* 设置子元素的left:50%，即让子元素的左上角水平居中，利用css3新增属性transform: translateX(-50%), 如果子元素定宽也可以设置子元素的 margin-left: (元素宽度的一半px的负值)。
```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
```

### 水平垂直居中（定宽高）
#### 方法一
* 设置父元素为相对定位，给子元素设置绝对定位，top: 0; right: 0; bottom: 0; left: 0; margin: auto;
#### 方法二
* 设置父元素为相对定位，给子元素设置绝对定位，left: 50%; top: 50%; margin-left: (元素宽度的一半px的负值); margin-top: (元素高度的一半px的负值);

### 水平垂直居中（未知宽高）
#### 方法一 使用定位属性
设置父元素为相对定位，给子元素设置绝对定位，left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%);
### 方案二 使用flex布局实现【最推荐】
设置父元素为 flex 布局，并设置 justify-content: center; align-items: center;

## CSS 预处理器优点 及它们的区别
CSS 预处理器提供了一些高级功能，例如变量、嵌套规则、混合（mixins）、函数等，这些功能可以提高 CSS 的可维护性和可读性。
### 优点
* 可以利用嵌套的方式来编写CSS代码，层级更加直观；
* 可以将公共样式抽取成变量，方便复用；（CSS3也支持变量了）
* 可以使用mixin（混入），将一些CSS代码片段抽取出来，其它页面可以直接一行就能实现多行的功能。比如我们可以把实现0.5px的方法、水平/垂直居中的方法抽取成公共方法；

### Sass / Scss 与 Less 对比
Sass 语法属于缩排进法，比 CSS 多出变量、嵌套、运算、混入(Mixin)、继承、颜色处理、函数等功能。Sass 的缩排语法，对于写惯 CSS 前端的 Web 开发者来说很不直观，也不能将 CSS 代码加入到 Sass 里面，因此 Sass 语法进行了改良，Sass3 就变成了 Scss(Sassy CSS) 。与原来的语法兼容，只是用 {} 取代了原来的缩进。

Less 语法属于 CSS 语法扩展，兼容 CSS 语法，但允许使用变量、混合（mixins）、函数等特性。语法与 CSS 非常接近，更容易上手。
区别：
* 变量
Sass / Scss: 使用 $ 符号定义变量，例如 $primary-color: #333;。
Less: 使用 @ 符号定义变量，例如 @primary-color: #333;。
* 嵌套
Sass / Scss: 支持嵌套规则，例如：
```css
.container {
  .header {
    color: $primary-color;
  }
  .footer {
    color: $secondary-color;
  }
}
```
Less: 也支持嵌套规则，例如：
```css
.container {
  .header {
    color: @primary-color;
  }
  .footer {
    color: @secondary-color;
  }
}
```
* 混合（Mixin）
Sass / Scss: 使用 @mixin 和 @include 关键字，例如：
```css
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      border-radius: $radius;
}
.button {
  @include border-radius(5px);
}
```
Less: 使用 . 和 () 关键字，例如：
```css
.border-radius(@radius) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
      border-radius: @radius;
}
.button {
  .border-radius(5px);
}

```
* 函数
Sass / Scss: 支持自定义函数，例如：
```css
@function calculate($value) {
  @return $value * 2;
}
.example {
  width: calculate(10px);
}
```
Less: 也支持自定义函数，例如：
```css
.calculate(@value) {
  @return @value * 2;
}
.example {
  width: .calculate(10px);
}
```

* Sass 是在服务端处理的，以前是 Ruby，现在是 Dart-Sass 或 Node-Sass，而 Less 是在客户端处理的。
* Sass 的语法相对复杂，而 Less 的语法相对简单，更容易上手。
* Sass 的功能更加强大，支持更多的 CSS 特性，而 Less 的功能相对较少，但已经足够满足大部分需求。

## 常见伪类和伪元素 及它们的区别
### 伪类
伪类用于选择元素的特定状态，例如鼠标悬停、被点击、聚焦等。常见的伪类有：
- :hover
- :active
- :focus
- :visited
- :first-child
- :last-child
- :nth-child(n)
- :nth-of-type(n)
- :not(selector)

### 伪元素
伪元素用于选择元素的特定部分，例如元素的首字母、第一行、第一行中的第一个字母等。常见的伪元素有：
- ::first-line
- ::first-letter
- ::before
- ::after

### 区别
根本区别在于是否创造了新的元素(抽象)。如果需要添加新元素加以标识的，就是伪元素，反之，如果只需要在既有元素上添加类别的，就是伪类。

- 伪元素在一个选择器里只能出现一次，并且只能出现在末尾;
- 伪类可以出现多次，并且可以出现在任意位置。
- 伪类和伪元素都是用来选择元素的，但是伪类选择的是元素的某种状态，而伪元素选择的是元素的某个部分。
- 伪类用于选择元素的特定状态，伪元素用于选择元素的特定部分。
- 伪类使用单冒号（:），伪元素使用双冒号（::）。
- 伪类通常用于选择器中，伪元素通常用于样式规则中。

## 浮动元素的影响，清除浮动
### 影响
1. 父元素高度塌陷
父元素高度塌陷是因为子元素浮动，脱离了文档流，导致父元素无法正确计算子元素的高度，从而出现高度塌陷的问题。
2. 非浮动的兄弟元素
如果兄弟元素是非浮动块级元素，该兄弟元素会忽略浮动元素，从而占据浮动元素的位置，并且浮动元素会盖在兄弟元素之上，但是兄弟元素内部的文本内容或者行内元素会环绕在浮动元素周围。如果兄弟元素是非浮动行内元素，那么兄弟元素就会环绕在浮动元素周围。
3. 浮动的兄弟元素
如果兄弟元素也是浮动元素，并且浮动的方向和该元素一致，那么就会紧跟在该元素后面，如果浮动方向不一样，那么互不影响。

### 2. 清除浮动
#### 方法一 使用伪元素
在父元素的最后添加一个伪元素，设置其内容为空，并设置其 display 为 block，然后设置其 clear 属性为 both，即可清除浮动。
```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```
#### 方法二 使用 overflow 属性
在父元素上设置 overflow 属性为 hidden 或 auto，即可清除浮动。
```css
.clearfix {
  overflow: hidden;
}
```
#### 方法三 使用 clear 属性
在需要清除浮动的子元素上设置 clear 属性为 both，即可清除浮动。
```css
.clearfix {
  clear: both;
}
```

## BFC 概念、创建方式、用途
块级格式化上下文（Block Formatting Context）简称"BFC"，通俗来讲，BFC就是一块独立的渲染区域，它规定了处于BFC内部的块级元素如何布局。
### BFC的特点

* 属于同一个BFC的相邻块级元素垂直排列；
* 相邻的两个块级元素的边距由margin决定；
* 相邻的两个块级元素的margin会进行重叠，最终结果为二者的较大值（比如元素a的margin-bottom: 30px;元素b的margin-top: 20px;那么它们的边距就是30px）；
* BFC的区域不会与浮动元素重叠；
* BFC的高度在计算时，内部的浮动元素也参与计算；
* BFC内部元素不会影响外边的元素，外边的也不会影响内部的元素。

### 创建（开启）BFC

* 文档的根元素；
* 浮动元素（float不为none的元素）；
* position的值为absolute或者fixed的元素；
* 行内块级元素（display:inline-block的元素）；
* overflow不为visible或者cilp的块级元素；
* display值为flow-root的元素；
* 弹性元素的子元素（如果他们本身不是弹性、网格、表格容器的话）；
* 网格元素的子元素（如果他们本身不是弹性、网格、表格容器的话）；

### 作用

* 防止外边距重叠，如果两个元素的边距重叠，我们可以将其中一个元素创建一个新的BFC，就和另一个元素形成了两个不同的BFC，外边距就不会重叠了。
* 解决高度塌陷，如果一个父容器内有一个浮动元素和一个普通元素，如果我们父容器没有设置高度，那么它的高度只会被普通元素撑开，如果普通元素高度小于浮动元素，浮动元素就会溢出。如果我们在当前父容器内创建BFC，浮动元素也会参与父容器高度的计算。
* 排除外部浮动，比如我们当前同一个BFC中有两个相邻的块级元素，一个浮动元素和一个普通元素，浮动元素会覆盖普通元素，我们可以利用BFC的特性，给非浮动元素创建一个新的BFC，就不会和浮动元素进行重叠了。

## CSS的选择器 及优先级
### 选择器
* id选择器，#开头，后面跟上元素的id；
* 类选择器，.开头，后面跟上元素的类名；
* 标签选择器，标签名；
* 相邻选择器，第一个选择器+第二个选择器（h1+h2）；
* 子代选择器，父元素选择器>子元素选择器（.father>.son）;
* 后代选择器，父元素选择器+空格+后代选择器（.father p）；
* 后续相邻相抵选择器，第一个选择器~第一个元素之后的选择器（.first~p（在first之后，并且和first同级的所有p标签））；
* 属性选择器，标签名+标签的属性（比如div[class=^a]，就代表所有类名以a开头的div元素）；
* 伪类选择器，比如:last-child、:is()、:not()、:first-child、:nth-child(n)、:nth-of-type(n)等等；
* 伪元素选择器，::after、::before等；
* 通配符选择器，*

### 优先级
!important > 内联样式(1000) > id选择器(100) > 类选择器、伪类选择器、属性选择器(10) > 标签选择器、伪元素选择器(1) > 通配符选择器(0)

> !important的优先级最高，无视权重，当选择器一样时，就要根据权重来计算优先级，权重一样时，哪个属性在后面，就会覆盖前面的属性。只有同级别的选择器才会去比较权重，不能跨选择器去比较权重。

## 实现一个 0.5px 的边框
### 使用 伪元素 + transform: scaleY(0.5)
利用transform: scale()属性来将1px的边框缩小到0.5px的视觉效果。但需要注意的是，这种方法在标准DPI屏幕上可能不会完美工作，因为缩放操作会基于像素进行四舍五入。
```html
<div class="half-border"></div>

<style>
.half-border {
  position: relative;
  width: 200px;
  height: 100px;
  background-color: white;
}

.half-border::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 200%;
  height: 200%;
  border: 1px solid black;
  border-radius: inherit; /* 如果需要的话 */
  transform: scale(0.5);
  transform-origin: top left;
  pointer-events: none; /* 防止伪元素影响鼠标事件 */
}
</style>
```

### 使用 svg
SVG（可缩放矢量图形）可以精确地控制线条的宽度，包括非整数宽度。
```html
<div class="svg-border">
  <svg width="100%" height="100%" preserveAspectRatio="none">
    <rect width="100%" height="100%" fill="white" />
    <rect x="0.5" y="0.5" width="calc(100% - 1px)" height="calc(100% - 1px)" fill="transparent" stroke="black" stroke-width="0.5" />
  </svg>
</div>

<style>
.svg-border {
  width: 200px;
  height: 100px;
  display: inline-block;
}

svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
```

### 使用 box-shadow
box-shadow属性可以创建一个或多个阴影，其中阴影的宽度可以设置为0.5px。
```html
<div class="box-shadow-border"></div>

<style>
.box-shadow-border {
  width: 200px;
  height: 100px;
  background-color: white;
  box-shadow: 0 0 0 0.5px black;
}
</style>
```

### 单边框使用 border-image + 线性渐变linear-gradient
border-image属性可以用来创建边框，并且可以使用linear-gradient()函数来创建渐变。
```html
<div class="border-image-border"></div>

<style>
.border-image-border {
    position: relative;
    box-sizing: border-box;
    width: 200px;
    height: 200px;
}
.border-image-border::after {
    display: block;
    position: absolute;
    content: "";
    width: 100%;
    height: 1px;
    bottom: 0px;
    background-color: red;
    background: linear-gradient(to bottom, transparent 50%, red 50%); 
}
```
### 总结
如果你需要高度可缩放且精确的边框，SVG可能是最佳选择。如果只是为了视觉上的0.5px效果，并且考虑到兼容性和实现的简单性，使用transform: scale()可能更合适。

