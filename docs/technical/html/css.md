## 块格式化上下文（Block Formatting Context）
块格式上下文（BFC）是 Web 页面的可视化 CSS 渲染的部分，是块级盒布局发生的区域，也是浮动元素与其他元素交互的区域。
一个 HTML 盒（Box）满足以下任意一条，会创建块格式化上下文：

- `float` 的值不是 `none`;
- `position` 的值不是 `static` 或 `relative`;
- `overflow` 的值不是 `visible`;
- `display` 的值是 `table-cell`、`table-caption`、`inline-block`、`flex` 或 `inline-flex`。

在 BFC 中，每个盒的左外边缘都与其包含的块的左边缘相接。
两个相邻的块级盒在垂直方向上的边距会发生合并（collapse）。

## 盒模型
CSS 盒模型描述了以文档树中的元素而生成的矩形框，并根据排版模式进行布局。每个盒子都有一个内容区域（例如文本，图像等）以及周围可选的 `padding``、border` 和 `margin` 区域。

CSS 盒模型负责计算：

块级元素占用多少空间。
边框是否重叠，边距是否合并。
盒子的尺寸。

盒模型有以下规则：

块级元素的大小由 `width`、`height`、`padding`、`border` 和 `margin` 决定。
如果没有指定 `height`，则块级元素的高度等于其包含子元素的内容高度加上 `padding`（除非有浮动元素，请参阅下文）。
如果没有指定 `width`，则非浮动块级元素的宽度等于其父元素的宽度减去父元素的 `padding`。
元素的 `height` 是由内容的 `height` 来计算的。
元素的 `width` 是由内容的 `width` 来计算的。
默认情况下，`padding` 和 `border` 不是元素 `width` 和 `height` 的组成部分。

* { box-sizing: border-box; }会产生怎样的效果？

元素默认应用了 `box-sizing: content-box`，元素的宽高只会决定内容（content）的大小。
`box-sizing`: `border-box` 改变计算元素 `width` 和 `height` 的方式，`border` 和 `padding` 的大小也将计算在内。
元素的 height = 内容（content）的高度 + 垂直方向的 padding + 垂直方向 border 的宽度
元素的 width = 内容（content）的宽度 + 水平方向的 padding + 水平方向 border 的宽度

## 响应式布局
是一种设计方法，允许一个网站在不同的设备（从桌面电脑显示器到手机和平板）上具有不同的布局。这是通过使用CSS媒体查询来实现的，它可以根据屏幕宽度调整样式规则。

### 功能
- 媒体查询
  
  根据不同的屏幕尺寸和设备特性应用不同的 CSS 样式。

- 弹性布局
  
  使用相对单位定义元素的大小和位置，使得页面能够在不同设备上自动调整布局。

- 图片响应式
  
  使用可伸缩的图片格式或通过 CSS 调整图片大小，确保图片在不同设备上显示良好。

- 自适应排版
  
  通过媒体查询和弹性布局实现页面元素的自适应排版。

### 用法
- 使用媒体查询
媒体查询是 CSS3 的一种功能，允许根据不同的设备特性，例如屏幕宽度、设备方向等，应用不同的 CSS 样式。通过媒体查询，我们可以针对不同的屏幕尺寸定义不同的样式。
```
  /* 在小屏幕上的样式 */
@media screen and (max-width: 768px) {
  /* 样式规则 */
}
 
/* 在中等屏幕上的样式 */
@media screen and (min-width: 768px) and (max-width: 1024px) {
  /* 样式规则 */
}
 
/* 在大屏幕上的样式 */
@media screen and (min-width: 1024px) {
  /* 样式规则 */
}
```
- 使用弹性布局
弹性布局使用相对单位（如百分比）来定义元素的大小，使得布局能够根据屏幕尺寸的变化而自适应。这种布局方式使得网页元素能够伸缩，并适应不同大小的屏幕。
```
.container {
  width: 100%; /* 宽度占据父容器的100% */
}
 
.item {
  width: 50%; /* 宽度占据父容器的50% */
}
```

- css 网格布局
CSS 网格布局是一种二维布局系统，允许开发者以网格的形式来组织页面布局，实现更复杂的排版效果。它可以灵活地调整各个网格单元的大小和位置，适应不同的屏幕尺寸。
```
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 将容器分为3列，每列的宽度相等 */
  grid-gap: 10px; /* 设置网格之间的间距 */
}
 
.item {
  /* 网格项的样式 */
}
```

## 选择器
- 通配符（*）选择器
```
* {
    margin: 0;
    padding: 0;
}
```
- id 选择器
```
<!-- 首先定义一个实例 -->
<div id="box"></div> 
#box {
    width: 100px;
    height: 100px;
    background-color: pink;
}
```
- 类选择器
```
<!-- 首先定义一个实例 -->
<div class="box"></div> 
.box {
    width: 100px;
    height: 100px;
    background-color: pink;
}
```
- 标签选择器
```
div {
    width: 100px;
    height: 100px;
}
```
- 结构选择器
  
    后代选择器
    子代选择器
    全部兄弟选择器
    相邻兄弟选择器
    并集（群组）选择器
    交集选择器

- 属性选择器
- 伪类选择器
  
    CSS伪类选择器用于像某些元素添加特殊效果，比如第一个元素、某个元素的子元素、鼠标滑过的元素。

    动态伪类选择器（主要用于超链接标签）
    ```
    a:link { color: red; } /* 未访问的链接状态 */
    a:visited { color: green; } /* 已访问的链接状态 */
    a:hover { color: blue; } /*鼠标滑过链接状态*/
    a:active { color: yellow; } /*鼠标按下去时状态*/
    ```
    结构伪类选择器
    ```
    div:first-child {}  /* 父元素的第一个子元素 */
    div:last-child {}  /* 父元素的最后一个子元素 */
    div:nth-child(n) {}  /* 父元素的第n个子元素 */
    ```
    其它伪类选择器
    ```
    div:checked {}  /* 选中状态伪类选择器 */
    div:enabled {}  /* 可用状态伪类选择器 */
    div:disabled {}  /* 不可用状态伪类选择器 */
    ```
- 伪元素选择器
    可以帮助我们利用CSS创建新的标签元素（伪元素），从而达到简化结构的目的。
    ```
    div::after {}  /* 在 div 元素后增加内容 */
    div::before {}  /* 在 div 元素前增加内容 */
    ```
  

### 选择器权重
> 当权重相同时，样式遵循就近原则，CSS中哪个选择器最后定义，就执行哪个选择器的样式。

!important > 行内样式 > id选择器 > class选择器 = 伪类选择器 = 属性选择器 > 标签选择器 = 伪元素选择器 > 通配符选择器 > 继承样式。


## CSS 预处理
### 优点
- 提高 CSS 可维护性。
- 易于编写嵌套选择器。
- 引入变量，增添主题功能。可以在不同的项目中共享主题文件。
- 通过混合（Mixins）生成重复的 CSS。
- 将代码分割成多个文件。不进行预处理的 CSS，虽然也可以分割成多个文件，但需要建立多个 `HTTP` 请求加载这些文件。

### 缺点
- 需要预处理工具。
- 重新编译的时间可能会很慢。

## position 定位
- static
  
    这是默认值，除非另行指定，否则元素按照正常的文档流定位，不会受到`top、right、bottom、left` 等属性的影响。

- relative
  
    元素相对于其正常位置进行偏移，但不会脱离文档流，原来的空间会被保留，其他元素不会重新排列。

- absolute
- 
    元素相对于最近的已定位祖先元素进行定位，如果没有已定位的祖先元素，则相对于文档的body元素进行定位，使用 `top、right、bottom、left` 属性来调整位置，元素原本所占空间不保留。

- fixed
  
    元素相对于浏览器窗口进行定位，不随滚动条的滚动而改变位置，可以使用 `top、right、bottom、left`属性来调整位置。

- sticky
    
    这是相对定位和固定定位的混合，元素在跨越特定阈值前为相对定位，之后为固定定位，它相对于其滚动父元素或视口进行定位。


## float 浮动
- `float` 属性可以指定一个元素应沿其容器的左侧或右侧放置，允许文本和内联元素环绕它
- 绝对定位、浮动都会让元素脱离标准流，以达到灵活布局的效果
- 可以通过 `float` 属性让元素产生浮动效果，`float `的常用取值
    + `none`：不浮动，默认值
    + `left`：向左浮动
    + `right`：向右浮动
### 浮动规则
- 规则一：向左浮动或者向右浮动
    + 向左或向右方向移动，直到自己的边界紧贴着包含块（一般是父元素）或者其他浮动元素的边界为止
    + 定位元素会层叠在浮动元素上面
- 规则二：不能超出包含块
    + 如果元素是向左（右）浮动，浮动元素的左（右）边界不能超出包含块的左（右）边界
- 规则三：浮动元素不能层叠
    + 如果一个元素浮动，另一个浮动元素已经在那个位置了，后浮动的元素将紧贴着前一个浮动元素（左浮找左浮，右浮找右浮）
    + 如果水平方向剩余的空间不够显示浮动元素，浮动元素将向下移动，直到有充足的空间为止
- 规则四：浮动元素会将行内级元素内容推出
    + 浮动元素不能与行内级内容层叠，行内级内容将会被浮动元素推出
    + 比如行内级元素、`inline-block` 元素、块级元素的文字内容
- 规则五：浮动只能左右浮动, 不能超出本行的高度
    + 行内级元素、`inline-block` 元素浮动后，其顶部将与所在行的顶部对齐
  

## 清除浮动
> 场景：由于浮动元素脱离了标准流，所以不向父元素汇报高度，父元素在计算总高度的时候，就不会计算浮动子元素的高度，导致了高度塌陷的问题

### 解决方法
- 使用额外的标签，应用 `clear` 属性
```
<div style="float: left;">浮动内容</div>
<div style="clear: both;"></div>
```
- 使用伪元素 `::after` 来清除父元素的浮动
```
<div class="clearfix">浮动内容</div>
.clearfix::after {
    content: "";
    display: table;
    clear: both;
    }
```
- 使用 `overflow` 属性为非 `visible` 的值（如 `auto` 或 `hidden）`
```
<div class="overflow-method">浮动内容</div>
.overflow-method {
  overflow: auto; /* 或者使用 'hidden' */
}
```

## flex 布局
- 使用 `display: flex;` 创建一个flex容器：
```
.container {
  display: flex;
}
```

- 水平或垂直排列 `flex` 项目，使用 `flex-direction`：
```
.container {
  flex-direction: row; /* 水平排列 */
  flex-direction: column; /* 垂直排列 */
}
```

- 控制 `flex` 项目的对齐方式，使用 `justify-content` 和 `align-items`：
```
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
```
.container {
  flex-flow: row wrap; /* 水平排列，并且换行 */
}
```

- 使用 `flex-grow` 属性来控制 `flex` 项目的增长比例：
```
.item {
  flex-grow: 1; /* 所有项目都将增长，以填满任何空白空间 */
}
```

- 使用 `flex-shrink` 属性来控制 `flex` 项目的收缩比例：
```
.item {
  flex-shrink: 0; /* 防止项目在空间不足时收缩 */
}
```

- 使用 `flex-basis` 属性来设置 `flex` 项目在分配多余空间之前的初始大小：
```
.item {
  flex-basis: 100px; /* 设置项目的基础大小为100px */
}
```

- 使用 `align-self` 属性来对单个 `flex` 项目进行垂直对齐：
```
.item {
  align-self: flex-start; /* 顶部对齐 */
  align-self: flex-end; /* 底部对齐 */
  align-self: center; /* 居中对齐 */
  align-self: stretch; /* 拉伸对齐 */
  align-self: baseline; /* 基线对齐 */
}
```

## 常用代码块

### 文字超出部分显示省略号
- 单行文本
```
overflow:hidden; // 超出的文本隐藏
text-overflow:ellipsis; // 溢出用省略号显示
white-space:nowrap; // 溢出不换行
```
- 多行文本
```
overflow: hidden;
text-overflow: ellipsis;
display:-webkit-box; // 作为弹性伸缩盒子模型显示。
-webkit-box-orient:vertical; // 设置伸缩盒子的子元素排列方式--从上到下垂直排列
-webkit-line-clamp:2; // 显示的行
```

### 不固定宽高 div 垂直居中
先创建一个实例
```
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

- flex 布局【推荐】
```
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

- flex + margin 

父级元素设置 flex，子元素设置 margin: auto;。可以理解为子元素被四周的 margin “挤” 到了中间
```
.container {
    ... // 如上
    display: flex;
}
.container > p {
    margin: auto;
}
```

- transform + position: absolute 【常用于图片】
```
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

- position: absolute + margin 【常用于弹窗】
```
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

- grid 布局
```
.container {
    ... // 如上
    display: grid;
}
.container > p {
    align-self: center;
    justify-self: center;
}
```

### 实现隐藏滚动条同时可以滚动
```
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

### 创建圆形或圆角渐变色边框
```
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

### 全屏背景图片的实现
#### 属性
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
#### 用法
```
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
