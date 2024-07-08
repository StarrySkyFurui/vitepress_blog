## BFC
`CSS` 中的块级格式化上下文（Block Formatting Context，简称BFC）是 Web页面 `CSS` 视觉渲染的一部分，它决定了元素如何与其子元素以及兄弟元素相互作用和布局。`BFC`是一个独立的渲染区域，其中的元素布局不会影响到其他元素。创建 `BFC` 的元素会阻止外边距折叠，并且内部的盒模型（包括内边距、边框和外边距）不会影响到外面的元素。

### 创建 BFC
* 根元素：页面的根元素 `<html>` 会自动形成 `BFC`。
* 浮动元素：当一个元素设置了 `float` 属性（不为 none）时，它将创建一个新的 `BFC`。
* 绝对定位元素：如果一个元素的 `position` 属性设置为 `absolute` 或 `fixed`，它将脱离正常的文档流并创建一个新的 `BFC`。
* 行内块元素：设置了 `display: inline-block`。
* 表格单元格：设置了 `display: table-cell`，(HTML表格单元格默认属性)。
* 表格标题：设置了 `display: table-caption`，(HTML表格标题默认属性)。
* `overflow` 属性不为 `visible` 的元素：当元素的 `overflow` 属性设置为 `auto`、`scroll`或 `hidden`时。

### BFC的特性
* 盒子的边界不会发生重叠：`BFC` 内部的元素和外部的元素永远不会发生垂直边距的重叠。
* `BFC`就是页面上的一个隔离的独立容器：容器里面的子元素不会影响到外面的元素，反之亦然。
* 每个 `BFC` 的区域不会与 `float box` 重叠：`BFC` 可以包含浮动元素（即，浮动元素不会溢出 `BFC` 容器）。

### BFC的应用场景
* 解决外边距折叠问题：当你不想两个垂直相邻元素的外边距发生折叠时，可以创建一个 `BFC` 来隔离它们。
* 包含浮动元素：如果你有一个包含浮动元素的容器，并且你希望这个容器能够正确地包含这些浮动元素的高度，你可以给这个容器创建 `BFC` 。
* 防止文字环绕：有时，你不希望文本环绕浮动元素，这时可以通过创建 `BFC` 来实现。
  
## 盒模型
CSS盒模型（Box Model）是CSS布局的基本概念，它决定了元素如何在页面上占据空间，以及与其他元素的关系和相互作用。每个HTML元素都可以看作是由内容、内边距（padding）、边框（border）和外边距（margin）组成的矩形盒子。

### 盒模型的组成部分
* 内容（Content）：这是元素的实际内容，如文本、图片等。你可以通过 `width` 和 `height` 属性来设置内容的尺寸。

  * 内边距（Padding）：内容区域与边框之间的空间。内边距是透明的，不会占据文档流中的空间，但会增加元素的总尺寸。你可以使用 `padding-top`、`padding-right`、`padding-bottom`和 padding-left（或简写形式padding）来设置内边距。

* 边框（Border）：围绕在内边距和内容周围的线。边框可以是实线、虚线或点线，并可以有不同的颜色和宽度。你可以使用 `border-style`、`border-width`和 `border-color`（或简写形式border）来设置边框。

* 外边距（Margin）：边框外部的空间，用于分隔相邻的元素。外边距是透明的，并且会占据文档流中的空间，影响元素之间的布局。你可以使用 `margin-top`、`margin-right`、`margin-bottom`和 `margin-left`（或简写形式margin）来设置外边距。

### 盒模型的总尺寸
盒模型的总宽度和总高度由以下公式决定：
```
总宽度 = 内容的宽度 + 左内边距 + 右内边距 + 左边框 + 右边框 + 左外边距 + 右外边距
总高度 = 内容的高度 + 上内边距 + 下内边距 + 上边框 + 下边框 + 上外边距 + 下外边距
```
> 需要注意的是，外边距不会包含在元素的尺寸内，但会影响元素在文档流中的位置。

### 改变元素的盒模型 
元素默认应用了 `box-sizing: content-box`，元素的宽高只会决定内容（content）的大小。
`box-sizing` 属性允许你改变盒模型的计算方式。默认情况下，元素的 `width` 和 `height` 属性只包含内容的尺寸。当你设置 `box-sizing: border-box;` 时，元素的 `width` 和 `height` 属性将包含内容、内边距和边框的尺寸，但不包括外边距。
> 这个属性对于响应式设计和复杂的布局非常有用，因为它可以简化元素的尺寸计算。

### 示例代码
```css
.box {
  width: 300px; /* 内容的宽度 */
  padding: 10px; /* 内边距 */
  border: 5px solid black; /* 边框 */
  box-sizing: border-box; /* 盒模型包括内容、内边距和边框 */
}
```
在这个例子中，`.box` 类的元素的总宽度将是 `300px`，这个宽度包括了内容、内边距和边框。如果没有设置`box-sizing: border-box;`，那么总宽度将会是内容的宽度（假设为 `270px`，因为需要减去 `20px` 的内边距和`10px` 的边框）加上内边距和边框的宽度，总共是 `300px`。

## 选择器
### 1. 通配符（*）选择器
```css
* {
    margin: 0;
    padding: 0;
}
```
### 2. id 选择器
```css
<!-- 首先定义一个实例 -->
<div id="box"></div> 
#box {
    width: 100px;
    height: 100px;
    background-color: pink;
}
```
### 3. 类选择器
```html
<!-- 首先定义一个实例 -->
<div class="box"></div> 
.box {
    width: 100px;
    height: 100px;
    background-color: pink;
}
```
### 4. 标签选择器
```html
div {
    width: 100px;
    height: 100px;
}
```
### 5. 结构选择器
  
* 后代选择器
* 子代选择器
* 全部兄弟选择器
* 相邻兄弟选择器
* 并集（群组）选择器
* 交集选择器

### 6. 属性选择器
- 伪类选择器
  
    CSS伪类选择器用于像某些元素添加特殊效果，比如第一个元素、某个元素的子元素、鼠标滑过的元素。

    动态伪类选择器（主要用于超链接标签）
    ```css
    a:link { color: red; } /* 未访问的链接状态 */
    a:visited { color: green; } /* 已访问的链接状态 */
    a:hover { color: blue; } /*鼠标滑过链接状态*/
    a:active { color: yellow; } /*鼠标按下去时状态*/
    ```
    结构伪类选择器
    ```css
    div:first-child {}  /* 父元素的第一个子元素 */
    div:last-child {}  /* 父元素的最后一个子元素 */
    div:nth-child(n) {}  /* 父元素的第n个子元素 */
    ```
    其它伪类选择器
    ```css
    div:checked {}  /* 选中状态伪类选择器 */
    div:enabled {}  /* 可用状态伪类选择器 */
    div:disabled {}  /* 不可用状态伪类选择器 */
    ```
- 伪元素选择器
    可以帮助我们利用CSS创建新的标签元素（伪元素），从而达到简化结构的目的。
    ```css
    div::after {}  /* 在 div 元素后增加内容 */
    div::before {}  /* 在 div 元素前增加内容 */
    ```

### 选择器权重
__!important > 行内样式 > id选择器 > class选择器 = 伪类选择器 = 属性选择器 > 标签选择器 = 伪元素选择器 > 通配符选择器 > 继承样式。__
> 当权重相同时，样式遵循就近原则，CSS中哪个选择器最后定义，就执行哪个选择器的样式。

## CSS预处理
CSS预处理是一种使用类似 · 语法的扩展语言来编写样式的方法。预处理语言（如 `Sass`、`Less` 和 `Stylus`）提供了变量、嵌套规则、混合（mixin）、函数和其他高级功能，这些功能在纯 `CSS` 中是不可用的。预处理语言编写的代码最终会被编译成普通的 `CSS` 代码，以便浏览器能够理解和渲染。

### 使用方法
1. 安装预处理器：你需要在你的项目中安装相应的预处理器。这通常可以通过 `npm`（Node.js 的包管理器）来完成。
2. 编写预处理代码：使用预处理语言的语法编写你的样式代码。
3. 编译：使用预处理器将你的代码编译成普通的 `CSS` 代码。这可以通过命令行工具或构建工具（如 Webpack、Vite 或Gulp）来完成。
4. 在项目中引用：将编译后的 `CSS` 文件链接到你的 `HTML` 文件中。

### 总结
CSS 预处理为开发者提供了更多的工具和功能来编写和维护复杂的样式表。通过使用变量、嵌套、混合和其他高级特性，你可以创建更加可维护、可重用和结构化的样式代码。

## position 定位
### static
这是默认值，除非另行指定，否则元素按照正常的文档流定位，不会受到`top、right、bottom、left` 等属性的影响。
### relative
元素相对于其正常位置进行偏移，但不会脱离文档流，原来的空间会被保留，其他元素不会重新排列。
### absolute
元素相对于最近的已定位祖先元素进行定位，如果没有已定位的祖先元素，则相对于文档的body元素进行定位，使用 `top、right、bottom、left` 属性来调整位置，元素原本所占空间不保留。
### fixed
元素相对于浏览器窗口进行定位，不随滚动条的滚动而改变位置，可以使用 `top、right、bottom、left`属性来调整位置。
### sticky
这是相对定位和固定定位的混合，元素在跨越特定阈值前为相对定位，之后为固定定位，它相对于其滚动父元素或视口进行定位。

## float 浮动
`float` 属性可以指定一个元素应沿其容器的左侧或右侧放置，允许文本和内联元素环绕它，绝对定位、浮动都会让元素脱离标准流，以达到灵活布局的效果，可以通过 `float` 属性让元素产生浮动效果。`float `的常用取值：
+ `inherit`：继承父元素的 `float` 属性
+ `initial`：设置 `float` 属性为默认值
+ `unset`：设置 `float` 属性为继承值
+ `none`：不浮动，默认值
+ `left`：向左浮动
+ `right`：向右浮动

### 清除浮动
> 场景：由于浮动元素脱离了标准流，所以不向父元素汇报高度，父元素在计算总高度的时候，就不会计算浮动子元素的高度，导致了高度塌陷的问题
1. 使用额外的标签，应用 `clear` 属性
```
<div style="float: left;">浮动内容</div>
<div style="clear: both;"></div>
```
2. 使用伪元素 `::after` 来清除父元素的浮动
```css
<div class="clearfix">浮动内容</div>
.clearfix::after {
    content: "";
    display: table;
    clear: both;
    }
```
3. 使用 `overflow` 属性为非 `visible` 的值（如 `auto` 或 `hidden）`
```css
<div class="overflow-method">浮动内容</div>
.overflow-method {
  overflow: auto; /* 或者使用 'hidden' */
}
```

## flex 布局
- 使用 `display: flex;` 创建一个flex容器：
```css
.container {
  display: flex;
}
```

- 水平或垂直排列 `flex` 项目，使用 `flex-direction`：
```css
.container {
  flex-direction: row; /* 水平排列 */
  flex-direction: column; /* 垂直排列 */
}
```

- 控制 `flex` 项目的对齐方式，使用 `justify-content` 和 `align-items`：
```css
/* 水平对齐 */
.container {
  justify-content: flex-start; /* 左对齐 */
  justify-content: flex-end; /* 右对齐 */
  justify-content: center; /* 居中 */
  justify-content: space-between; /* 两端对齐 */
  justify-content: space-around; /* 平均分布 */
}
/* 垂直对齐 */
.container {
  align-items: flex-start; /* 顶部对齐 */
  align-items: flex-end; /* 底部对齐 */
  align-items: center; /* 居中对齐 */
  align-items: stretch; /* 拉伸对齐 */
  align-items: baseline; /* 基线对齐 */
}
```

- 控制 `flex` 项目的排列顺序，使用 `flex-flow`（是 `flex-direction` 和 `flex-wrap` 的简写）：
```css
.container {
  flex-flow: row wrap; /* 水平排列，并且换行 */
}
```

- 使用 `flex-grow` 属性来控制 `flex` 项目的增长比例：
```css
.item {
  flex-grow: 1; /* 所有项目都将增长，以填满任何空白空间 */
}
```

- 使用 `flex-shrink` 属性来控制 `flex` 项目的收缩比例：
```css
.item {
  flex-shrink: 0; /* 防止项目在空间不足时收缩 */
}
```

- 使用 `flex-basis` 属性来设置 `flex` 项目在分配多余空间之前的初始大小：
```css
.item {
  flex-basis: 100px; /* 设置项目的基础大小为100px */
}
```

- 使用 `align-self` 属性来对单个 `flex` 项目进行垂直对齐：
```css
.item {
  align-self: flex-start; /* 顶部对齐 */
  align-self: flex-end; /* 底部对齐 */
  align-self: center; /* 居中对齐 */
  align-self: stretch; /* 拉伸对齐 */
  align-self: baseline; /* 基线对齐 */
}
```

## 响应式布局
CSS 响应式布局是一种设计和开发网站的方法，它能使网站在各种屏幕尺寸和设备类型上都能良好地显示和工作。这主要是通过使用媒体查询（Media Queries）和流式布局来实现的，以确保在不同的视口宽度下，网站元素能够自动调整其大小、位置或可见性。

以下是一些实现 CSS 响应式布局的关键技术和概念：
### 1. 媒体查询
媒体查询是 CSS3 的一项功能，它允许你根据设备的特性（如视口宽度、设备类型等）来应用不同的 CSS 样式。你可以使用媒体查询来针对特定屏幕尺寸或设备类型定义样式规则。
```css
@media screen and (max-width: 600px) {
  /* 当屏幕宽度小于或等于 600px 时应用的样式 */
  body {
    background-color: lightblue;
  }
}
```
### 2. 流式布局
流式布局是一种网页布局方法，它使用相对单位（如百分比、em等）来定义元素的大小和位置，以确保在不同的屏幕尺寸下，网页元素能够自动调整其大小和位置。
```css
.container {
  width: 80%; /* 容器宽度始终为视口宽度的 80% */
  margin: 0 auto;
}
```
### 3. 弹性盒子布局（Flexbox）
Flexbox 是一种现代的 CSS 布局模式，它可以更轻松地设计复杂的布局结构，并对齐和分布空间，特别是在不同屏幕尺寸和设备类型上。
```css
.flex-container {
  display: flex; /* 启用弹性盒子布局 */
  flex-wrap: wrap; /* 当容器内的项目放不下时换行 */
}
.flex-item {
  flex: 1 1 200px; /* 项目在容器中的大小是弹性的 */
}
```
### 4. 栅格布局（Grid）
栅格布局是一种基于网格的二维布局方法，它允许你将网页内容分成多个列和行，可以同时处理行和列，并使用 CSS 属性来控制这些列和行的位置和大小。
```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 定义三列 */
  grid-gap: 10px; /* 定义网格之间的间距 */
}
.grid-item {
  /* 网格项目的样式 */
}
```

### 5. 视口单位
视口单位（vw、vh、vmin、vmax）是相对于视口大小的单位。这些单位允许你根据视口的大小来定义元素的大小，从而实现响应式布局。
```css
.element {
  height: 50vh; /* 元素高度始终为视口高度的 50% */
}
```

## 可继承与不可继承属性
### 不可继承性的属性：
1. display：规定元素应该生成的框的类型
  
2. 文本属性：
* vertical-align：垂直文本对齐
* text-decoration：规定添加到文本的装饰
* text-shadow：文本阴影效果
* white-space：空白符的处理
* unicode-bidi：设置文本的方向
  
3. 盒子模型的属性：width、height、margin、border、padding
  
4. 背景属性：background、background-color、background-image、background-repeat、background-position、background-attachment
   
5. 定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index

### 可以继承的属性：
1. 字体系列属性
* font-family：字体系列
* font-weight：字体的粗细
* font-size：字体的大小
* font-style：字体的风格
* font-variant：字体的小写
* font-stretch：字体的拉伸
* font-size-adjust：字体大小的调整
  
2. 文本系列属性
* text-indent：文本缩进
* text-align：文本水平对齐
* line-height：行高
* word-spacing：单词之间的间距
* letter-spacing：中文或者字母之间的间距
* text-transform：控制文本大小写（就是uppercase、lowercase、capitalize这三个）
* color：文本颜色

3. 元素可见性
visibility：控制元素显示隐藏

4. 列表布局属性
list-style：列表风格，包括list-style-type、list-style-image等

5. 光标属性
cursor：光标显示为何种形态

## CSS3 新特性
* 选择器：`CSS3` 引入了更多实用的选择器，如动态伪类选择器、目标伪类选择器和伪元素选择器。
* 边框：`CSS3` 允许给边框添加样式，如圆角、阴影和渐变。
* 背景：`CSS3` 允许给背景添加渐变、阴影和透明度。
* 文本效果：`CSS3` 允许添加阴影、嵌入图像、渐变和旋转文本。
* 2D/3D转换：`CSS3` 允许元素的2D或3D转换，如旋转、缩放、移动和倾斜。
* 动画：`CSS3` 允许创建动画，能够创建比简单的过渡更复杂的动画效果。
* 布局：`CSS3` 允许创建弹性盒子布局或多列布局。
* 媒体查询：`CSS3` 让可以针对不同的媒体类型定义不同的样式。
* 字体：`CSS3` 允许加载字体文件，并可以定义文本的样式。
* 颜色：`CSS3` 允许使用RGB、RGBA、HSL和HSLA函数定义颜色。
* 渐变：`CSS3` 允许创建线性渐变和径向渐变。
* 转换：`CSS3` 允许使用2D或3D转换元素，如旋转、缩放、移动和倾斜。
* 过渡：`CSS3` 允许添加元素在改变样式时的过渡效果，如改变颜色或大小。

## line-height 行高
line-height 指一行文本的高度，包含了字间距，实际上是下一行基线到上一行基线距离；
* 如果一个标签没有定义 height 属性，那么其最终表现的高度由 line-height 决定；
* 一个容器没有设置高度，那么撑开容器高度的是 line-height，而不是容器内的文本内容；
* 把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中；
* line-height 和 height 都能撑开一个高度；

## CSS 优化和提高性能的方法有哪些？
### 1. 加载性能
* css压缩：将写好的css进行打包压缩，可以减小文件体积。
* css单一样式：当需要下边距和左边距的时候，很多时候会选择使用 margin:top 0 bottom 0；但margin-bottom:bottom;margin-left:left;执行效率会更高。
* 减少使用@import，建议使用link，因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载。

### 2. 选择器性能：
* 关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）。CSS选择符是从右到左进行匹配的。当使用后代选择器的时候，浏览器会遍历所有子元素来确定是否是指定的元素等等；
* 如果规则拥有ID选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）。
* 避免使用通配规则，如*{}计算次数惊人，只对需要用到的元素进行选择。
* 尽量少的去对标签进行选择，而是用class。
最高不要超过三层
* 尽量少的去使用后代选择器，降低选择器的权重值。后代选择器的开销是最高的，尽量将选择器的深度降到最低，最高不要超过三层，更多的使用类来关联每一个标签元素。
* 了解哪些属性是可以通过继承而来的，然后避免对这些属性重复指定规则。
  
### 3. 渲染性能：
* 慎重使用高性能属性：浮动、定位。
* 尽量减少页面重排、重绘。
* 去除空规则：｛｝。空规则的产生原因一般来说是为了预留样式。去除这些空规则无疑能减少css文档体积。
* 属性值为0时，不加单位。
* 属性值为浮动小数0.**，可以省略小数点之前的0。
* 标准化各种浏览器前缀：带浏览器前缀的在前。标准属性在后。
* 不使用@import前缀，它会影响css的加载速度。
* 选择器优化嵌套，尽量避免层级过深。
* css雪碧图，同一页面相近部分的小图标，方便使用，减少页面的请求次数，但是同时图片本身会变大，使用时，优劣考虑清楚，再使用。
* 正确使用display的属性，由于display的作用，某些样式组合会无效，徒增样式体积的同时也影响解析性能。
* 不滥用web字体。对于中文网站来说WebFonts可能很陌生，国外却很流行。web fonts通常体积庞大，而且一些浏览器在下载web fonts时会阻塞页面渲染损伤性能。
  
### 4. 可维护性、健壮性：
* 将具有相同属性的样式抽离出来，整合并通过class在页面中进行使用，提高css的可维护性。
* 样式与内容分离：将css代码定义到外部css中。

## 常用代码块

## 文字超出部分显示省略号
- 单行文本
```css
overflow:hidden; // 超出的文本隐藏
text-overflow:ellipsis; // 溢出用省略号显示
white-space:nowrap; // 溢出不换行
```
- 多行文本
```css
overflow: hidden;
text-overflow: ellipsis;
display:-webkit-box; // 作为弹性伸缩盒子模型显示。
-webkit-box-orient:vertical; // 设置伸缩盒子的子元素排列方式--从上到下垂直排列
-webkit-line-clamp:2; // 显示的行
```

## 不固定宽高 div 垂直居中
先创建一个实例
```html
<div class="container">
    <p>垂直居中</p>
    <img src="test.png">
</div>
.container {
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
}
```

#### 1. flex 布局【推荐】
```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

#### 2. flex + margin 

父级元素设置 flex，子元素设置 margin: auto;。可以理解为子元素被四周的 margin “挤” 到了中间
```css
.container {
    ... // 如上
    display: flex;
}
.container > p {
    margin: auto;
}
```

#### 3. transform + position: absolute 【常用于图片】
```css
.container {
    ... // 如上
    position: relative;
}
.container > img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
```

#### 4. position: absolute + margin 【常用于弹窗】
```css
.container {
    ... // 如上
    position: relative;
}
.container > p {
    width: 100px;
    height: 100px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
```

#### 5. grid 布局
```css
.container {
    ... // 如上
    display: grid;
}
.container > p {
    align-self: center;
    justify-self: center;
}
```

## 实现隐藏滚动条同时可以滚动
```css
<div class="container"></div>
.container {
    height: 300px
    overflow-x: hidden;
    overflow-y: auto;
}
.container::-webkit-scrollbar {
  	display: none;
}
```

## 创建圆形或圆角渐变色边框
```css
<div class="circle"></div>

.circle {
    border: 1px solid;
    border-image-source: linear-gradient(180deg, red 0%, blue 100%);
    z-index: 1;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(30px);
    padding: 16px;
    color: #3c485c;
    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        padding: 1px;
        border-radius: 50%; // 设置圆角的程度， 50% 则为圆形边框，也可以设置具体的 px 值
        background: linear-gradient(180deg, red 0%, blue 100%);
        -webkit-mask-image: linear-gradient(153.43deg, #0db3e1, #9e3bea),
        linear-gradient(153.43deg, #0db3e1, #9e3bea); // 颜色随便设置，但必须保留
        -webkit-mask-clip: content-box, padding-box;
        mask-composite: exclude;
        -webkit-mask-composite: destination-out;
    }
}
```

## 全屏背景图片的实现
### 属性
- `background-image`:可添加多张背景图片。
  
    参数：url() || none(默认)

> 背景图不占位置（不受padding的影响） 
                 
- `background-size`:背景图片的大小

    参数：百分比 ||  精确值 ||  auto(默认) ||  cover || contain
    1. auto:背景图像的真实大小。
    2. cover:将背景图像等比缩放到完全覆盖容器，背景图像有可能超出容器。
    3. 图片边缘距父元素边框中最远边等比例放大
    4. contain:将背景图像等比缩放到宽度或高度与容器的宽度或高度相等。
            背景图像始终被包含在容器内。
            图片边缘距父元素边框中最近边等比例放大
> 一般只设置一个值（宽度），高度就等比例缩放; 用于调整背景图像是否完整显示


- `background-position` 复合属性：背景图像位置 （ background-position-x  ， background-position-y）
  
    参数：x坐标和y坐标，可以使用**方位名词**和**精确单位**

    * 方位：`top,center,bottom,left,right`
    * 精确单位：百分数或由浮点数字和单位标识符组成的长度值（表示与容器边缘的偏移量）,如：`20px 50px` 表示：以图片左上角为基准，向右偏移 `20px`,向下偏移 `50px`
> 该属性定位不受对象的补丁属性（padding）设置影响, 默认值为：(0% 0%)，即图片定位于对象不包括补丁（padding）的内容区域左上角
     
- `background-repeat`: 背景图像的平铺
    参数：repeat（默认）  ||  no-repeat || repeat-x || repeat-y
           
- `background-attachment`:背景图像是否固定或者随着页面的其余部分滚动
    参数：scroll || fixed
        scroll ：背景图像是随着对象内容滚动
        fixed：背景图像固定
          	  
- `background-color`:背景颜色
    参数：transparent（默认） || color
    背景半透明是指盒子背景半透明，盒子里面的内容不受影响
		  
- `background-origin`:背景图像的位置
    border-box ：背景图片从边框的左上角开始
    padding-box (默认)：背景图像从填充边缘的左上角开始
    content-box ：背景图片从内容的左上角开始
		  
- **background:背景复合写法**
  
    `background`: 背景颜色 背景图像地址 背景平铺 背景图像滚动 背景图片位置;
### 用法
```css
// 方法一
margin:0px;
background: url(images/bg.png) no-repeat;
background-size:100% 100%;
background-attachment:fixed;

// 方法二
background: url("bg.png") no-repeat;
height:100%;
width:100%;
overflow: hidden;
background-size:cover;// 或者background-size:100%;

// 方法三
background-image: url(images/bg.jpg);
background-position: center center;
background-repeat: no-repeat;
/* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
background-attachment: fixed;
background-size: cover;
background-color: #464646;
```
