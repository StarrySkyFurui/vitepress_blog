## CSS 设置渐变色
CSS 中可以使用线性渐变（linear-gradient）和径向渐变（radial-gradient）来设置渐变色。以下是一些示例：

### 线性渐变
线性渐变从上到下（默认）或从左到右（默认）开始，并沿着直线过渡颜色。你可以指定渐变的方向，以及开始和结束的颜色。
```css
.element {
  background: linear-gradient(to right, red, yellow);
}
```
在上面的例子中，渐变从左到右，从红色过渡到黄色。

### 径向渐变
径向渐变从中心开始，向外扩散。你可以指定渐变的形状（圆形或椭圆形）和大小。
```css
.element {
  background: radial-gradient(circle, red, yellow);
}
```
在上面的例子中，渐变是一个圆形，从红色过渡到黄色。

### 多色渐变
你也可以在渐变中指定多个颜色。
```css
.element {
  background: linear-gradient(to bottom, red, yellow, green);
}
```
在上面的例子中，渐变从上到下，经过红色、黄色和绿色。

### 渐变角度
你可以使用角度来指定渐变的方向。
```css
.element {
  background: linear-gradient(45deg, red, yellow);
}
```
在上面的例子中，渐变从左上角开始，向右下方向过渡。

## CSS 中的 display 属性有哪些值？
CSS 中的display属性是一个非常重要的属性，它用于设置一个元素的显示类型。这个属性决定了元素是如何显示以及与其他元素如何交互。以下是一些### 常见的display属性值及其含义
* none：元素不会被显示。
* block：元素显示为块级元素，此类元素会新起一行。
* inline：元素不会新起一行，其宽度只占据它的内容宽度。
* inline-block：元素横排显示，但是同时具备块级元素的特性，比如可以设置宽高。
* flex：元素会变成弹性容器（flex container），其子元素会成为弹性项（flex items）。这个值允许使用弹性盒子布局（flexbox）。
* grid：元素会变成网格容器，其子元素会成为网格项。它开启了网格布局。
* table、table-row、table-cell 等：这些值让元素表现得像表格元素一样。
* list-item：元素会表现为列表项（像`<li>`元素一样）。
另外还有一些新的、较少使用或是实验性的display属性值，例如：
* inline-flex: 使元素的内容为弹性容器，与flex相似，但是元素自身会像inline元素一样排列。
* inline-grid: 类似于grid, 但是元素自身表现为inline级别。

##  CSS 变量的声明和使用
CSS 自定义属性，又称 CSS 变量，是一种在 CSS 样式表中声明可以使用任意值的方法，这样的值在同一份 CSS 代码中可以多次引用并调用来替代特定的内容。使用 CSS 变量可以提高样式表的可维护性和灵活性。以下是如何声明和使用 CSS 变量的步骤：

### 声明 CSS 变量
CSS 变量的声明总是以 -- 开头，跟随变量名。你可以在 CSS 的任何范围内声明变量，包括 :root（相当于 HTML 的根），这样所有样式规则都可以访问到。
### 示例
```css
:root {
  --main-color: #3498db;
  --padding: 8px;
  --transition-speed: 0.3s;
}
```

### 使用 CSS 变量
在 CSS 中使用变量时，你需要使用 var() 函数，并在括号中提供变量名，可以包含在-- 前缀之后。
### 示例
```css
body {
  background-color: var(--main-color);
  padding: var(--padding);
  transition: all var(--transition-speed) ease-in-out;
}
```

### 默认值
有时候，你可能想为 CSS 变量提供一个默认值，以防它未被声明时使用。在 var() 函数中，你可以添加一个可选的第二个参数作为默认值。
### 示例
```css
body {
  font-size: var(--font-size, 16px);
}
```
在上面的例子中，如果 --font-size 变量没有在任何地方声明，body 的 font-size将默认使用 16px。

### 作用域
变量的作用域是根据它们声明的地方确定的：
* 在 :root 选择器内声明的变量是全局变量，在任何地方都可以使用。
* 在其他元素或伪类的 CSS 规则中声明的变量会在该元素或这些伪类中局部有效。
### 示例
```css
button {
  --button-bg-color: #e74c3c;
}
.btn-primary {
  background-color: var(--button-bg-color);
}
```
在上面的例子中，`--button-bg-color` 变量只在 `button` 元素中声明，因此它只在 `button` 下的所有样式规则中可用，`.btn-primary` 则是基于这个变量设置的。

CSS 变量是非常强大的工具，特别是当你需要在整个页面上保持一致性，或者是要实现主题应用时。它们有助于实现动态主题，使样式管理更系统化。

## CSS 属性值计算 - calc
calc() 函数用于各种 CSS 属性，如 width、height、margin、padding、top、right、bottom、left、font-size 等。

以下是 calc() 函数的一些应用示例：

* 基本运算：可以执行加 (+)、减 (-)、乘 (*) 和除 (/) 四种基本运算。
```css
.element {
  width: calc(100% - 80px);
}
```
* 混合单位：calc() 函数可以混合使用像素、百分比、em、rem 等单位。
```css
.element {
  margin-top: calc(50vh - 50px);
}
```
* 嵌套：你可以在 calc() 里面嵌套另一个 calc()。
```css
.element {
  width: calc(100% - calc(50px + 2em));
}
```
* 环境变量：结合 CSS 变量 (Custom Properties) 使用。
```css
:root {
  --main-padding: 10px;
}
.element {
  padding: calc(var(--main-padding) * 2);
}
```
* 动态值调整：用于某些动态大小的调整。
```css
.element {
  position: absolute;
  bottom: calc(50% - 20px);
}
```
* 嵌套 min() 和 max()：用于动态调整大小。
```css
.element {
  width: calc(min(100%, 500px)); // 宽度始终是容器的100%，但不超过500px
}
```
当使用 calc() 时有一些规则需要注意，例如:

* 不能进行 0 除运算，也就是说分母不能为 0。
* 运算符之间需要有空格。calc(50% -50px) 是无效的，而 calc(50% - 50px) 是有效的。
* calc() 必须确保表达式的两侧是兼容的单位，比如不能将像素（px）和百分比（%）相除。
* 在进行乘法和除法时，至少有一个值必须是数值（即不带单元的数字）。

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
#### 方法一 使用flex布局实现【最推荐】
设置父元素为 flex 布局，并设置 justify-content: center; align-items: center;
### 方案二 使用 grid 布局实现
设置父元素为 grid 布局，并设置 place-items: center;
### 方法三 使用定位属性 + transform 实现
设置父元素为相对定位，给子元素设置绝对定位，left:
 50%; top: 50%; transform: translateX(-50%) translateY(-50%);

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

## 隐藏元素
### display: none
这个属性会完全隐藏元素，并且元素不再占据空间，也不会触发元素的事件，触发回流重绘。

### visibility: hidden
这个属性会隐藏元素，但元素结构保留、仍然占据空间，可以选中并且可以触发事件。但用户无法通过常规界面交互直接触发事件。

### opacity: 0
这个属性会将元素的透明度设置为0，使其完全透明，但元素仍然占据空间，并且可以触发事件，不回流不重绘，可以被选中

### position: absolute + 负的 margin 超出父元素
将元素的位置设置为绝对定位，并使用负的 margin 超出父元素，这样元素就会完全隐藏，并且不再占据空间。

### z-index
将元素的 z-index 设置为一个非常低的值，使其位于其他元素的下方，从而使其不可见。

### transform: scale(0)
将元素缩放为0，使其不可见，但仍然占据空间。

// TODO:
## CSS 优化和提高性能的方法
（1）	css压缩：将写好的css进行打包压缩，可以减小文件体积。
（2）	css单一样式：当需要下边距和左边距的时候，很多时候会选择	使	用	margin:top	0	bottom	0	；	但 margin-bottom:bottom;margin-left:left;执行效率会更高。
（3）	减少使用@import，建议使用link，因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载。
选择器性能：
（1）	关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）。CSS选择符是从右到左进行匹配的。当使用后代选择器的时候，浏览器会遍历所有子元素来确定是否是指定的元素等等；
（2）	如果规则拥有ID选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）。
（3）	避免使用通配规则，如*{}计算次数惊人，只对需要用到的元素进行选择。
（4）	尽量少的去对标签进行选择，而是用class。（5）尽量少的去使用后代选择器，降低选择器的权重值。后代选择器的开销是最高的，尽量将选择器的深度降到最低，最高不要超过三层，更多的使用类来关联每一个标签元素。
（6）了解哪些属性是可以通过继承而来的，然后避免对这些属性重复指定规则。
渲染性能：
（1）	慎重使用高性能属性：浮动、定位。
（2）	尽量减少页面重排、重绘。
（3）	去除空规则：｛｝。空规则的产生原因一般来说是为了预留样式。去除这些空规则无疑能减少css文档体积。
（4）	属性值为0时，不加单位。
（5）	属性值为浮动小数0.**，可以省略小数点之前的0。
（6）	标准化各种浏览器前缀：带浏览器前缀的在前。标准属性在后。
（7）	不使用@import前缀，它会影响css的加载速度。
（8）	选择器优化嵌套，尽量避免层级过深。
（9）	css雪碧图，同一页面相近部分的小图标，方便使用，减少页面的请求次数，但是同时图片本身会变大，使用时，优劣考虑清楚，再使用。
（10）	正确使用display的属性，由于display的作用，某些样式组合会无效，徒增样式体积的同时也影响解析性能。（11）不滥用web字体。对于中文网站来说WebFonts可能很陌生，国外却很流行。webfonts通常体积庞大，而且一些浏览器在下载web fonts时会阻塞页面渲染损伤性能。
可维护性、健壮性：
（1）	将具有相同属性的样式抽离出来，整合并通过class在页面中进行使用，提高css的可维护性。
（2）	样式与内容分离：将css代码定义到外部css中。

## CSS 加载会造成阻塞么？
* css 加载不会阻塞DOM树的解析
* css 加载会阻塞DOM树的渲染
* css 加载会阻塞后面js语句的执行

加载css的时候， 可能会修改下面DOM节点的样式，如果css加载不阻塞DOM树渲染的话，那么当css加载完之后， DOM树可能又得重新重绘或者回流了，这就造成了一些没有必要的损耗。所以干脆就先把DOM树的结构先解析完，把可以做的工作做完， 然后等你css加载完之后，在根据最终的样式来渲染DOM树，这种做法性能方面确实会比较好一点。

因此，为了避免让用户看到长时间的白屏时间，我们应该尽可能的提高css加载速度，比如可以使用以下几种方法:

* 使用CDN(因为CDN会根据你的网络状况，替你挑选最近的一个具有缓存内容的节点为你提供资源，因此可以减少加载时间)
* 对css进行压缩(可以用很多打包工具，比如webpack,gulp等，也可以通过开启gzip压缩)
* 合理的使用缓存(设置cache-control,expires,以及E-tag都是不错的，不过要注意一个问题，就是文件更新后，你要避免缓存而带来的影响。其中一个解决防范是在文件名字后面加一个版本号)
* 减少http请求数，将多个css文件合并，或者是干脆直接写成内联样式(内联样式的一个缺点就是不能缓存)

## 样式隔离有哪些方法？
样式隔离意味着在一个复杂的前端应用中保持组件的样式私有化，使得不同组件之间的样式不会互相影响。以下是一些在前端开发中实现样式隔离的常见方式：
### 使用命名空间（如BEM方法）
将组件的样式限定在特定的class中。例如，一个按钮组件的class可能是`.button--primary`，这样就可以确保按钮的样式不会影响到其他组件。
### 使用CSS 模块（CSS Modules）
CSS 模块是一种在构建时将 CSS 类名局部作用域化的技术。每个类名都是独一无二的，通常通过添加哈希值来实现。当你导入一个 CSS 模块，会得到一个包含生成的类名的对象。这样可以确保样式的唯一性，并防止样式冲突。
### 使用CSS-in-JS
CSS-in-JS 是一种技术，允许你用 JavaScript 编写 CSS，并在运行时生成唯一的类名。常见的库有 Styled-components、Emotion 等。这些库通常提供自动的样式隔离，并且还支持主题化和动态样式。
### CSS scoped
CSS scoped 是一种在构建时将 CSS 类名限定为特定组件的特性。这通常是通过添加组件 ID 或其他唯一标识符来实现的，以确保样式不会影响其他组件。这种方法的缺点是它依赖于构建工具，并且需要手动处理样式的隔离。
