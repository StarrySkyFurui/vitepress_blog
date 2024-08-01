## 数据类型
`Javascript` 数据类型分为 基本数据类型 和 引用数据类型:

基本数据类型包括以下几种:
* `Number`(数字): 整数和小数; 默认值 0
* `String`(字符串): 文本; 默认值 " "
* `Boolean`(布尔): 表示真(true)和假()的两个特殊的值; 默认值 false
* `Undefined`(未定义): 表示"未定义" 或不存在, 由于没有定义, 所以没有任何值
* `Null`(空值): 即此处的值为空, 默认值 null
* `Symbol`【ES6新增，表示独一无二的值】
* `BigInt`【ES10新增】

引用数据类型 `Object`:
* `Array`(数组): 数组
* `Object`(普通对象): 各种值组成的集合
* `RegExp`(正则对象)如果节点有子节点，Vue 会递归地对子节点进行 diff 算法比较。
* `Date`(日期对象)
* `Math`(数学对象)
* `Function`(函数对象)
```js
<script>
    var a=1;
    var b=a;s
    b=3;
    console.log('a='+a,'b='+b);
    // a=1 b=3
    var arr1 =[1,2,3];
    var arr2=arr1;
    arr2=[5,4,3,2,1];
    console.log('arr1:',arr1);
    console.log('arr2:',arr2);
    // arr2=arr1=[5,4,3,2,1]
    var obj1 ={
      name :'xiaoming',
      age: 18,
    }
    var obj2 =obj1;
    obj2.age=20;
    console.log('obj1:',obj1);
    console.log('obl2:',obj2);
    // obj1.name=obj2.name='xiaoming'
    // obj1.age=obj2.age=20
  </script>

```

引用数据类型的变量，其变量名实际上是一个指针，和基本数据类型的变量一起存放在栈内存中，而这个指针指向堆内存中的一块内存，对引用数据类型的变量的操作实际上是通过指针，对堆内存的这些数据进行修改。所以通过赋值符号进行赋值的引用数据类型变量，实际上只是将指针赋值给了这个新的变量，使其指向同一块堆内存而已。
> 如果使用赋值符号（=）进行了重新赋值，即改变了引用数据类型变量的地址
```js
    var obj1 = {
        name: 'qiqi',
        age: 17
    }
    var obj2 = obj1
    obj1 = {
        name: 'xiaosi',
        age: 19
    }
    console.log(obj1)
    //obj1 = {name: 'xiaosi',age: 19 }
    //obj2 = {name: 'qiqi',abe: 17}
```

> 各种 `JavaScript` 的数据类型最后都会在初始化之后放在不同的内存中，因此上面的数据类型大致可以分成两类来进行存储：

原始数据类型：基础类型存储在栈内存，被引用或拷贝时，会创建一个完全相等的变量；占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。

引用数据类型：引用类型存储在堆内存，存储的是地址，多个引用指向同一个地址，这里会涉及一个“共享”的概念；占据空间大、大小不固定。引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

## null 和 undefined 区别

首先 Undefined 和 Null 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 undefined 和 null。

undefined 代表的含义是未定义，null 代表的含义是空对象。一般变量声明了但还没有定义的时候会返回 undefined，null主要用于赋值给一些可能会返回对象的变量，作为初始化。

undefined 在 JavaScript 中不是一个保留字，这意味着可以使用 undefined 来作为一个变量名，但是这样的做法是非常危险的，它会影响对 undefined 值的判断。我们可以通过一些方法获得安全的 undefined 值，比如说 void 0。

当对这两种类型使用 typeof 进行判断时，Null 类型化会返回 “object”，这是一个历史遗留的问题。当使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。

## 检测数据类型
`Javascript` 检测数据类型有以下几种方式：

`1、typeof` 运算符返回一个表示数据类型的字符串，返回结果包括：`number、string、boolean、object、undefined、function`。

`typeof` 可以对基本类型 `number、string、boolean、undefined` 做出准确的判断（`null` 除外，typeof null===“object”）；而对于引用类型，除了 `function` 之外返回的都是 `object`。

```js
typeof 'biubiubiu';            // string
typeof 123;                    // number
typeof false;                  // boolean
typeof undefined;              // undefined
typeof Symbol(1);              // symbol
typeof window;                 // object
typeof [];                     // object'
typeof {};                     // object
typeof (function f() {});      // function 
typeof null;                   // object
```
Tip: `null` 的类型是 `object` ，这是由于历史原因造成的。JavaScript 语言第一版只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值）, 没考虑 `null`, 只把它当作 `object` 的一种特殊值。后来 `null` 独立出来, 作为一种单独的数据类型, 为了兼容以前的代码, `typeof null` 返回 `object` 就没法改变了。

2、`instanceof` 运算符返回一个布尔值，常用于区分数组和对象，`instanceof` 运算符判断左操作数对象的原型链上是否有右边这个构造函数的 `prototype` 属性，也就是说指定对象是否是某个构造函数的实例，最后返回布尔值。

```js
[] instanceof Array; //true
[] instanceof Object; //true
new Date() instanceof Date;//true
new Date() instanceof Object;//true
function Person(){};
new Person() instanceof Person;//true
new Person() instanceof Object;//true
```
> instanceof 运算符只能用于对象，不适用原始类型的值。

3、`constructor` 有两个作用，一是判断数据的类型，二是对象实例通过 `constructor` 对象访问它的构造函数
4、`Object.prototype.toString` 是 `Object` 原型对象上的一个方法，该方法默认返回其调用者的具体类型

## 数据类型转换
`Javascript` 的类型转换一共分两种：显示类型转换 和 隐式类型转换。
显示类型转换: 比较简单，通过 JS 提供的一些函数，可以直接进行转换

* 转化为 `Number` 类型：Number() / parseFloat() / parseInt()
* 转化为 `String` 类型：String() / toString()
* 转化为 `Boolean` 类型: Boolean()

## 变量声明
在js中，变量的声明方式在ES6之前只有 `var` 一种，而在ES6之后有 `var、let、const` 三种方式。

`var`：声明一个变量，在该变量被声明之后，可以在下文代码中对该变量进行重新赋值，并且每次赋值都会覆盖上一次的值，它不受限于块级作用域，但受限于局部作用域；

`let`：和 `var` 一样，用于声明一个变量，但是 `let` 声明的变量只在当前块级作用域中生效，只有在当前块级作用域内进行重新赋值，才会覆盖上一次的值；

`const`：用于声明一个常量，和 `let` 一样，只在块级作用域中生效，并且不可以重新赋值。

```js
if (true) {
    var a = 1
    a = 2
    console.log(a) // 2
}
console.log(a) // 2

if (true) {
    let b = 1
    b = 2
    console.log(b) // 2
}
console.log(b) // Uncaught ReferenceError: b is not defined

if (true) {
    const c = 1
    c = 2
}
// Uncaught TypeError: Assignment to constant variable.

if (true) {
    const c = 1
    console.log(c) // 1 
}
console.log(c) // Uncaught ReferenceError: c is not defined
```

### var、let、const的区别

* 块级作用域<br/>
    `let、const` 会受到块级作用域限制，`var` 不会；
* 变量提升<br/>
    `var` 会被提升到当前作用域的顶部，`let` 和 `const` 不会；即变量只能在声明之后才能使用，否则报错。
* 给全局添加属性<br/>
    浏览器的全局对象是 `window`，在浏览器环境中的 `var` 声明的变量实际上会被添加到 `window` 对象中，而 `let`、`const`  则不会；
* 重复声明<br/>
    `var` 在声明变量时可以重复声明，后声明的同名变量会覆盖之前声明的变量，`let、const` 不允许重复声明变量。
* 暂时性死区<br/>
    `let`、`const` 声明的变量，在声明之前，该变量都是不可用的，如果在声明之前使用，会抛出错误，而 `var` 声明的变量，在声明之前，该变量是可用的，只不过值为 `undefined`。
* 初始值设置<br/>
    在声明变量时，`var` 和 `let` 可以不设置初始值，`const` 必须设置初始值。
* 指针指向<br/>
    `let`、`const` 都是 ES6 新增的用于创建变量的语法。`let` 创建的变量是可以更改指针指向的（可以重新赋值），而 `const` 创建的变量不能更改指针指向。

| 区别 | var | let | const |
| :------- | :------- | :------- | :------- |
| 是否有块级作用域 | 否 | 是 | 是 |
| 是否存在变量提升 | 是 | 否 | 否 |
| 是否可以给全局添加属性 | 是 | 否 | 否 |
| 是否可以重复声明 | 是 | 否 | 否 |
| 是否存在暂时性死区 | 否 | 是 | 是 |
| 是否必须设置初始值 | 否 | 否 | 是 |
| 是否可以更改指针指向 | 是 | 是 | 否 |

## JSON
JSON 是一种基于文本的轻量级的数据交换格式。它可以被任何的编程语言读取和作为数据格式来传递。

因为 JSON 的语法是基于 js 的，因此很容易将 JSON 和 js 中的对象弄混，但是应该注意的是 JSON 和 js 中的对象不是一回事，JSON 中对象格式更加严格，比如说在 JSON 中属性值不能为函数，不能出现 NaN 这样的属性值等，因此大多数的 js 对象是不符合 JSON 对象的格式的。

在 js 中提供了两个函数来实现 js 数据结构和 JSON 格式的转换处理，

JSON.stringify 函数，通过传入一个符合 JSON 格式的数据结构，将其转换为一个 JSON 字符串。如果传入的数据结构不符合 JSON 格式，那么在序列化的时候会对这些值进行对应的特殊处理，使其符合规范。在前端向后端发送数据时，可以调用这个函数将数据对象转化为 JSON 格式的字符串。

JSON.parse() 函数，这个函数用来将 JSON 格式的字符串转换为一个 js 数据结构，如果传入的字符串不是标准的 JSON 格式的字符串的话，将会抛出错误。当从后端接收到 JSON 格式的字符串时，可以通过这个方法来将其解析为一个 js 数据结构，以此来进行数据的访问。

### String和JSON.stringify的区别
```js
console.log(String("abc")); // abc
console.log(JSON.stringify("abc")); // "abc"
​
console.log(String({ key: "value" })); // [object Object]
console.log(JSON.stringify({ key: "value" })); // {"key":"value"}
​
console.log(String([1, 2, 3])); // 1,2,3
console.log(JSON.stringify([1, 2, 3])); // [1,2,3]
​
const obj = {
    title: "devpoint",
    toString() {
        return "obj";
    },
};
console.log(String(obj)); // obj
console.log(JSON.stringify(obj)); // {"title":"devpoint"}
```

当需要将一个数组和一个普通对象转换为字符串时，经常使用JSON.stringify。
如果需要对象的toString方法被重写，则需要使用String()。
在其他情况下，使用String()将变量转换为字符串。

## this
`this`是一个在运行时才进行绑定的引用，在不同的情况下它可能会被绑定不同的对象。

`this` 的5种绑定方式:
* 默认绑定(非严格模式下 `this` 指向全局对象，严格模式下函数内的 `this` 指向 `undefined`)
* 隐式绑定(当函数引用有上下文对象时, 如 `obj.foo()`的调用方式, `foo` 内的 `this`指向 `obj`)
* 显示绑定(通过 `call` 或者 `apply` 方法直接指定 `this` 的绑定对象, 如 `foo.call(obj)`)
* `new`构造函数绑定，`this`指向新生成的对象
* 箭头函数，`this`指向的是定义该函数时，外层环境中的`this`，箭头函数的`this`在定义时就决定了，不能改变
  
### this绑定的优先级
new绑定优先级 > 显示绑定优先级 > 隐式绑定优先级 > 默认绑定优先级

## ES6 新特性
### 1. let 和 const
`let` 和 `const` 是 ES6 中新增的用于声明变量的关键字，与 `var` 不同，它们具有块级作用域。

### 2. 箭头函数
箭头函数提供了一种更简洁的函数定义方式，并且不绑定自己的 `this` 值。

### 3. 模板字符串
模板字符串使用反引号（`` ` ``）来定义，可以嵌入变量和表达式，并且可以跨行。

### 4. 解构赋值
解构赋值允许从数组或对象中提取值，并赋给变量。

### 5. 默认参数
函数的参数可以设置默认值，当调用函数时没有传递该参数时，将使用默认值。

### 6. 扩展运算符和展开运算符
* 扩展运算符
    可以将一个数组或对象展开成其组成元素。这在多种情况下非常有用，比如将数组元素或对象的可枚举属性作为单独的参数传递给函数，或者在数组字面量中创建新的数组等。
```js
// 数组中使用
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // arr2 是 [1, 2, 3, 4, 5]
// 对象中使用
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // obj2 是 { a: 1, b: 2, c: 3 }
```
* 剩余参数
    将一个不定数量的参数表示为一个数组。这在处理不确定数量的参数时非常有用，特别是在编写通用函数时。
```js
function sum(...theArgs) {
  return theArgs.reduce((previous, current) => previous + current, 0);
}

console.log(sum(1, 2, 3)); // 输出: 6
console.log(sum(1, 10));   // 输出: 11
```

### 7. Promise
Promise 是一种用于处理异步操作的对象，它允许你以同步的方式编写异步代码。

### 8. async/await
`async/await` 是 ES2017 中引入的语法糖，用于简化 Promise 的使用，使异步代码看起来更像同步代码。

### 9. 类
ES6 引入了类的概念，可以使用 `class` 关键字来定义类，并且可以使用 `extends` 关键字来实现继承。

### 10. 模块化
ES6 引入了模块化的概念，可以使用 `import` 和 `export` 关键字来导入和导出模块。

## 闭包
指有权访问另一个函数作用域中的变量的函数。

### 常用用途
* 在函数外部能够访问到函数内部的变量。通过使用闭包，可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量。
* 使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。

### 引用场景
* 函数作为返回值
* 函数作为参数传递
* 循环赋值
* 立即执行函数
* 使用回调函数

## 重绘 / 重排
### 重绘
重绘是浏览器重新绘制受到影响的部分到屏幕上的过程。当元素的外观属性（如颜色、背景色、边框色等）发生变化，而不影响元素的位置和尺寸时，会触发重绘。

#### 1. 触发条件：
  * 单独改变DOM的样式而不改变尺寸的大小。
  * 修改了可见性（如使用display: none）等不会影响页面布局的属性。
  
#### 2. 性能影响：
重绘通常比重排更快，因为它只是关于元素的外观属性，不涉及布局和几何信息的计算。

#### 3. 优化策略：
  * 使用缓存来减少对引起flush队列的属性的访问。
  * 使用cssText来一次性修改多个样式属性。

### 重排
重排发生在当页面的布局和几何信息发生改变时，浏览器需要重新计算页面的布局和渲染树。这个过程也称为重排或重布局。

#### 1. 触发条件：
  * 添加或删除可见的DOM元素。
  * DOM元素位置发生变化。
  * DOM元素尺寸大小发生变化（如边距、填充、边框、宽度和高度变化）。
  * 内容变化（例如文本大小改变）。
  * 浏览器窗口尺寸改变。
  
#### 2. 性能影响：
重排通常需要更多的计算资源，因为它涉及到重新计算页面的布局和渲染树，这可能导致页面渲染的延迟。

#### 3. 优化策略：
  * 避免频繁地修改样式，尽量一次性修改多个样式属性。
  * 使用transform代替top/left等位移属性，因为transform不会触发重排。
  * 使用requestAnimationFrame来安排DOM更新，以将多个DOM操作合并为一个操作。
  * 将需要多次重排的元素设置为position: fixed或position: absolute，因为它们脱离了正常的文档流，其变化不会影响到其他元素。

### 示例
```html
<!DOCTYPE html>
<html>
<head>
<style>
.box {
  width: 200px;
  height: 200px;
  background-color: red;
  position: relative;
}
</style>
</head>
<body>
<div class="box" id="myBox"></div>
<button onclick="moveBox()">移动盒子</button>
<script>
function moveBox() {
  var box = document.getElementById('myBox');
  // 直接修改left属性会触发重排
  box.style.left = '200px';
}
</script>
</body>
</html>
```
在这个例子中，点击按钮后，直接修改了元素的left属性，这会导致浏览器进行重排操作。为了优化性能，我们可以使用CSS的transition属性来实现平滑的动画效果，而不是直接修改left属性：
```html
<!DOCTYPE html>
<html>
<head>
<style>
.box {
  width: 200px;
  height: 200px;
  background-color: red;
  position: relative;
  transition: left 0.3s ease-out; /* 添加过渡效果 */
}
.move {
  left: 200px;
}
</style>
</head>
<body>
<div class="box" id="myBox"></div>
<button onclick="moveBox()">移动盒子</button>
<script>
function moveBox() {
  var box = document.getElementById('myBox');
  // 使用CSS类名添加过渡效果，避免直接修改left属性
  box.classList.add('move');
}
</script>
</body>
</html>
```
在这个优化后的例子中，我们使用CSS的过渡效果来实现盒子的平滑移动，而不是直接修改left属性。这样，当点击按钮时，只会触发重绘而不会触发重排，从而提高了页面性能。


### 总结
* 区别：重绘只涉及元素的外观属性，而重排涉及页面布局和几何信息的计算。
* 联系：重绘不一定会触发重排，但重排一定会触发重绘。
* 优化：为了优化网页性能，应尽量减少重排和重绘的次数。可以通过上述优化策略来减少不必要的计算和渲染工作。


## 防抖 / 节流
防抖（debounce）和节流（throttle）是两种常用的优化高频率触发事件的技术，常用于处理如窗口resize、滚动、键盘输入等事件，以减少不必要的计算或DOM操作，提升性能。
### 防抖
如果一个函数持续被触发，那么在这个函数执行一次并且执行完毕之前，这个函数的调用会被忽略。也就是说，防抖函数会等待一定的时间，确保事件在这段时间内没有被重新触发，然后再执行。

```js
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(context, args);
    }, wait);
  };
}

// 使用示例
const myEfficientFn = debounce(function() {
  // 执行一些昂贵的操作，比如计算或者DOM操作
}, 250);

window.addEventListener('resize', myEfficientFn);
```
在这个例子中，myEfficientFn是一个防抖函数，它会在窗口大小调整（resize事件）停止后的250毫秒后执行。如果在这250毫秒内又发生了resize事件，那么之前的等待会被清除，并重新开始等待250毫秒。

### 节流
如果一个函数持续被触发，那么每隔一段时间，该函数只会执行一次。也就是说，节流函数会确保函数在一个固定的时间间隔内只被执行一次。
```js
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const context = this;
    const args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 使用示例
const myThrottledFn = throttle(function() {
  // 执行一些昂贵的操作，比如计算或者DOM操作
}, 250);

window.addEventListener('scroll', myThrottledFn);
```
在这个例子中，myThrottledFn是一个节流函数，它会在滚动（scroll事件）发生时，确保每250毫秒最多执行一次函数。即使滚动事件发生的频率高于这个间隔，函数也只会在每个间隔结束时执行一次。

### 总结
防抖和节流都是用来优化高频率触发事件的策略，但它们的工作方式略有不同。防抖侧重于确保事件处理函数在事件停止触发一段时间后执行，而节流则侧重于确保事件处理函数在固定的时间间隔内只执行一次。

### 闭包的优点
* 数据封装和私有性：闭包可以实现数据的封装和隐藏，将变量和函数保护起来，使得它们只能被闭包内部的代码访问，而不能从外部直接访问。
* 可以提供私有成员的存在，使得对象的状态和行为更加安全和可控。
* 闭包可以记住并访问其外部的词法环境，即使在函数执行完毕后，闭包中的变量状态也可以被保持下来。这使得闭包可以在不同的函数调用之间共享数据，实现更加灵活和复杂的逻辑处理。
* 闭包可以作为回调函数传递给其他函数，实现异步编程、事件处理等场景。同时，闭包还可以作为高阶函数，接受其他函数作为参数或返回函数作为结果，增强了代码的灵活性和可重用性。

### 闭包的缺点
* 由于闭包可以保留变量的状态，这可能会导致内存使用量的增加，如果闭包被频繁创建且未及时释放，可能会导致内存泄漏。此外，由于闭包涉及更多的内存操作，可能会导致程序的执行效率降低。因此，在使用闭包时需要注意合理使用和管理内存。
  

## escape / encodeURI / encodeURIComponent
### 三者的区别
* encodeURI 是对整个 URI 进行转义，将 URI 中的非法字符转换为合法字符，所以对于一些在 URI 中有特殊意义的字符不会进行转义。
* encodeURIComponent 是对 URI 的组成部分进行转义，所以一些特殊字符也会得到转义。
* escape 和 encodeURI 的作用相同，不过它们对于 unicode 编码为 0xff 之外字符的时候会有区别，escape 是直接在字符的 unicode 编码前加上 %u，而 encodeURI 首先会将字符转换为 UTF-8 的格式，再在每个字节前加上 %。


## call / apply / bind
### 三者的区别
* 三者都可以显式绑定函数的this指向
* 三者第一个参数都是this要指向的对象，若该参数为undefined或null，this则默认指向全局window
* 传参不同：apply是数组、call是参数列表，而bind可以分为多次传入，实现参数的合并
* call、apply是立即执行，bind是返回绑定this之后的函数，如果这个新的函数作为构造函数被调用，那么this不再指向传入给bind的第一个参数，而是指向新生成的对象
  
### 手写 call / apply / bind
  
```js
// 手写call
Function.prototype.Call = function(context, ...args) {
  // context为undefined或null时，则this默认指向全局window
  if (context === undefined || context === null) {
    context = window;
  }
  // 利用Symbol创建一个唯一的key值，防止新增加的属性与obj中的属性名重复
  let fn = Symbol();
  // this指向调用call的函数
  context[fn] = this; 
  // 隐式绑定this，如执行obj.foo(), foo内的this指向obj
  let res = context[fn](...args);
  // 执行完以后，删除新增加的属性
  delete context[fn]; 
  return res;
};

// apply与call相似，只有第二个参数是一个数组，
Function.prototype.Apply = function(context, args) {
  if (context === undefined || context === null) {
    context = window;
  }
  let fn = Symbol();
  context[fn] = this;
  let res = context[fn](...args);
  delete context[fn];
  return res;
};

// bind要考虑返回的函数，作为构造函数被调用的情况
Function.prototype.Bind = function(context, ...args) {
  if (context === undefined || context === null) {
    context = window;
  }
  let fn = this;
  let f = Symbol();
  const result = function(...args1) {
    if (this instanceof fn) {
      // result如果作为构造函数被调用，this指向的是new出来的对象
      // this instanceof fn，判断new出来的对象是否为fn的实例
      this[f] = fn;
      let res = this[f](...args, ...args1);
      delete this[f];
      return res;
    } else {
      // bind返回的函数作为普通函数被调用时
      context[f] = fn;
      let res = context[f](...args, ...args1);
      delete context[f];
      return res;
    }
  };
  // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
  // 实现继承的方式: 使用Object.create
  result.prototype = Object.create(fn.prototype);
  return result;
};
```

## Promise 相关
`Promise` 是异步编程的一种解决方案，它是一个对象，可以获取异步操作的消息；

`Promise` 本身只是一个容器,真正异步的是它的两个回调 `resolve()`和`reject()`;

`Promise` 本质不是控制异步代码的执行顺序（无法控制） ，而是控制异步代码结果处理的顺序。

### `Promise` 的三种状态：
* pending（进行中）
* resolved（已完成）
* rejected（已拒绝）

当把一件事情交给 `Promise`时，它的状态就是 `pending（进行中）`，任务完成了状态就变成了  、没有完成失败了就变成了`rejected（已拒绝）`。

### 如何改变 Promise 的状态

* resolve(value): 如果当前是 `pending` 就会变为 `resolved`
* reject(error): 如果当前是 `pending` 就会变为 `rejected`
* 抛出异常: 如果当前是 `pending` 就会变为 `rejected`

> `Promise` 状态一旦改变就不会再变，任何时候都可以得到这个结果。

### 创建 Promise 实例
* new Promise()
```js
const promise = new Promise((resolve, reject) => {
  // 异步操作
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
一般情况下都会使用`new Promise()`来创建 `promise` 对象，但是也可以使用 `promise.resolve` 和 `promise.reject` 这两个方法。

### Promise 的实例方法
* then
接受两个回调函数作为参数。第一个回调函数是 `Promise` 对象的状态变为 `resolved` 时调用，第二个回调函数是 `Promise` 对象的状态变为 `rejected` 时调用。其中第二个参数可以省略。 

then方法返回的是一个新的 `Promise` 实例（不是原来那个 `Promise` 实例）。因此可以采用链式写法，即 `then` 方法后面再调用另一个 `then` 方法。
* catch
该方法相当于 `then` 方法的第二个参数，指向 `reject` 的回调函数。不过 `catch` 方法还有一个作用，就是在执行 `resolve` 回调函数时，如果出现错误，抛出异常，不会停止运行，而是进入 `catch` 方法中。
* finally
`finally` 方法用于指定不管 `Promise` 对象最后状态如何，都会执行的操作。

`finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 `Promise` resolved 还是 rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

### Promise 的静态方法
* Promise.resolve / Promise.reject
用来生成对应状态的Promise实例

* Promise.all
`Promise.all` 方法可以完成并发任务， 它接收一个数组，数组的每一项都是一个 `promise` 对象，返回一个 `Promise` 实例。当数组中所有的 `promise` 的状态都达到 `resolved` 的时候，`Promise.all` 方法的状态就会变成 `resolved` ，如果有一个状态变成了 `rejected`，那么`Promise.all` 方法的状态就会变成 `rejected`。
> 成功的时候返回的是一个结果数组，而失败的时候则返回最先被 `reject` 失败状态的值。

* Promise.race
`Promise.race` 方法和 `Promise.all` 一样，接受的参数是一个每项都是 `promise` 的数组，但是与 `Promise.all` 不同的是，当最先执行完的事件执行完之后，就直接返回该 `promise` 对象的值。如果第一个 `promise` 对象状态变成 `resolved`，那自身的状态变成了 `resolved`；反之第一个 `promise` 变成 `rejected`，那自身状态就会变成 `rejected`。
> 哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。

* Promise.any
该方法返回一个 `promise`，只要参数实例有一个变成 `resolved` 状态，包装实例就会变成 `resolved` 状态；如果所有参数实例都变成 `rejected` 状态，包装实例就会变成 `rejected` 状态。
> 返回最快的成功结果，如果全部失败就返回失败结果。

### 缺点
* 无法取消 `Promise`，一旦新建它就会立即执行，无法中途取消。
* 如果不设置回调函数，`Promise` 内部抛出的错误，不会反应到外部。
* 当处于 `pending` 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
  
## async、await
`async` 和 `await` 是 Js 中用于处理异步操作的关键字

### async 
`async` 关键字用于声明一个函数是异步的。当一个函数被标记为 `async`，它会隐式地返回一个 `Promise` 对象。这意味着，即使你没有在函数内部显式地使用 `return` 语句返回一个新的 `Promise`，该函数仍然会返回一个 `Promise`。

### await
`await` 关键字只能在 `async` 函数内部使用。它用于等待一个 `Promise` 完成，并返回其解析的值。如果 `Promise`被拒绝，`await` 会抛出一个异常。

### 错误处理
使用 `try-catch` 块来处理 `async` 函数中的错误。在 `try-catch` 块中，你可以使用 `await` 来等待 `Promise` 的完成，并在 `catch` 块中处理任何可能发生的错误。

### 注意事项
* `async` 函数总是返回一个 `Promise`，即使你没有显式地使用 `return` 语句。
* `await` 只能出现在 `async` 函数内部。
* `await` 等待的是一个 `Promise` 对象，而不是任何其他类型的值。
* 使用 `await` 会暂停当前 `async` 函数的执行，直到等待的 Promise 完成或拒绝。这并不意味着整个 Js 运行时会被暂停；只有当前的 `async` 函数会被暂停。
* 虽然 `async/await` 使异步代码看起来更同步，但它们仍然是异步的，并且不会阻塞其他代码的执行。
  
## async/await 对比 Promise 的优势

### 1. 代码可读性更高
`async/await` 使得异步代码看起来更像同步代码，逻辑更清晰，易于理解和维护。通过使用 `await` 关键字，可以将异步操作写成一系列顺序执行的语句，而不是嵌套的回调函数，从而提高了代码的可读性。

### 2. 错误处理更方便
`Promise` 使用 `catch()` 方法来捕获错误，而 `async/await` 可以使用 `try-catch` 语句来捕获错误。`try-catch `语句的语法更加直观，能够更清晰地表示出代码中的错误处理逻辑。此外，`async/await` 的错误堆栈追踪会显示在出错的地方，方便调试和定位错误。

### 3. 避免回调地狱
`Promise` 有效地解决了回调地狱问题，即多个异步操作嵌套调用导致的代码可读性差、难以维护的问题。然而，`async/await` 更进一步地简化了异步代码的书写，使得代码结构更加扁平化，避免了回调嵌套的问题。

### 4. 更好的并发控制
虽然 `Promise` 可以通过 `Promise.all()` 方法实现并发操作，但 `async/await` 在某些情况下可能提供更直观的并发控制。例如，你可以使用 `Promise.all()` 与 `async/await` 结合，以顺序的方式处理一组异步操作，并在所有操作完成后进行下一步处理。

## 深拷贝 / 浅拷贝
### 浅拷贝
浅拷贝只复制对象的顶层属性和值。如果对象的属性值还是对象，那么复制的是内存中的地址，因此原对象和拷贝对象中的这个属性会指向同一个内存地址，修改其中一个对象的属性值，另一个对象的属性值也会跟着改变。

在JavaScript中，Object.assign() 和展开运算符（...）都是浅拷贝的例子。
```js
let obj1 = {
  a: 1,
  b: { c: 2 }
};

let obj2 = Object.assign({}, obj1);
// 或者
// let obj2 = {...obj1};
obj2.b.c = 3;
console.log(obj1.b.c); // 输出：3，因为obj1和obj2的b属性指向同一个对象
```
### 深拷贝
深拷贝会复制对象及其所有的子对象，直到最底层的基本数据类型为止。这样，原对象和拷贝对象是完全独立的，修改其中一个对象的属性值，不会影响到另一个对象。

`Js` 本身并没有提供深拷贝的内置方法，但可以通过递归或者使用`JSON.parse(JSON.stringify(obj))` 的方式来实现深拷贝。但需要注意的是，`JSON.parse(JSON.stringify(obj))`这种方法有局限性，比如它不能处理函数和循环引用的情况，而且如果对象的属性值包含 `undefined`、`Symbol`、或者函数等，也无法正确拷贝。
```js
let obj1 = {
  a: 1,
  b: { c: 2 }
};

let obj2 = JSON.parse(JSON.stringify(obj1));

obj2.b.c = 3;
console.log(obj1.b.c); // 输出：2，因为obj1和obj2是完全独立的对象
```
对于更复杂或者需要处理函数、循环引用等情况的深拷贝，你可能需要使用一些库，如`lodash`的`_.cloneDeep()`方法。

首先，你需要确保你的项目中已经安装了`lodash`库。如果还没有安装，你可以通过npm或yarn来安装：
```bash
npm install lodash
```
安装好`lodash`之后，就可以在你的JavaScript代码中使用`_.cloneDeep()`函数来实现深拷贝了：
```js
const _ = require('lodash'); // 如果你使用CommonJS模块系统
// 或者
import _ from 'lodash'; // 如果你使用ES6模块系统

let obj1 = {
  a: 1,
  b: { c: 2 },
  d: [3, 4, { e: 5 }]
};
let obj2 = _.cloneDeep(obj1);
obj2.b.c = 3;
obj2.d.push(6);
obj2.d[2].e = 7;

console.log(obj1); // 输出：{ a: 1, b: { c: 2 }, d: [ 3, 4, { e: 5 } ] }
console.log(obj2); // 输出：{ a: 1, b: { c: 3 }, d: [ 3, 4, { e: 7 }, 6 ] }
```

## 宏任务/微任务
### 宏任务（MacroTask）
宏任务通常包括：

* script（整体代码）
* setTimeout
* setInterval
* setImmediate（Node.js环境）
* I/O 操作（Node.js环境）
* UI渲染（浏览器环境）
* postMessage（浏览器环境）
* MessageChannel（浏览器和Node.js环境）
* requestAnimationFrame（浏览器环境）
* 监听某些Web API事件（如监听DOM事件）

宏任务会被添加到宏任务队列中，按照先进先出的顺序执行。

### 微任务（MicroTask）
微任务通常包括：

* Promise.then()
* Promise.catch()
* Promise.finally()
* MutationObserver（浏览器环境）
* process.nextTick（Node.js环境）

微任务会被添加到微任务队列中。在每一次事件循环中，当宏任务执行完毕后，会查看微任务队列中是否有微任务，如果有，会一次性执行完所有微任务，然后再执行下一个宏任务。
### 执行顺序
1. 代码执行过程中，宏任务和微任务放在不同的任务队列中，并按先进先出的顺序依次执行一个宏任务（例如，整体代码）。
2. 当某个宏任务执行完后,会查看微任务队列是否有任务。如果有，执行微任务队列中的所有微任务(注意这里是执行所有的微任务)
3. 微任务执行完成后，会读取宏任务队列中排在最前的第一个宏任务（注意宏任务是一个个取）。
4. 执行该宏任务，如果执行过程中，遇到微任务，依次加入微任务队列
5. 重复上述步骤，直到宏任务队列和微任务队列都为空。

> 微任务总是会在下一个宏任务开始之前执行完毕。因此，如果你在一个宏任务中创建了一个`Promise`，并在其`Promise.then()`方法中注册了一个回调函数，那么这个回调函数会在当前宏任务执行完毕后立即执行，而不是等到下一个宏任务。

### 示例代码
```js
console.log('script start'); // 宏任务

setTimeout(() => {
  console.log('setTimeout'); // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log('promise1'); // 微任务
}).then(() => {
  console.log('promise2'); // 微任务
});

console.log('script end'); // 宏任务
```
输出顺序是:
```
script start
script end
promise1
promise2
setTimeout
```

在这个示例中，`setTimeout`是一个宏任务，而`Promise的.then()`方法注册的回调函数是微任务。因此，即使`setTimeout`的延迟时间设置为0，它的回调函数仍然会在所有微任务执行完毕之后才执行。

## 常用排序算法
* 冒泡排序
  > 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
  > 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数；
  > 针对所有的元素重复以上的步骤，除了最后一个；
  > 重复步骤1~3，直到排序完成。

```js
// 定义冒泡排序函数
function bubbleSort(arr) {
  // 外层循环遍历数组的每个元素
  for (let i = 0; i < arr.length; i++) {
    // 内层循环遍历数组中除当前元素外的其他元素
    for (let j = 0; j < arr.length - i - 1; j++) {
      // 如果当前元素大于它后面的元素，则交换它们的位置
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
let arr = [5, 3, 8, 4, 6];
console.log(bubbleSort(arr)); // [3, 4, 5, 6, 8]
```
* 快速排序
  > 选择一个基准元素，通常选择第一个元素或者最后一个元素；
  > 遍历数组，将小于等于基准值的元素放在基准元素的左边，将大于基准值的元素放在基准元素的右边；
  > 递归地对左右两个子数组进行排序；
  > 返回已排序的数组。

```js
// 定义快速排序函数
function quickSort(arr) {
  // 如果数组长度小于等于1，直接返回数组
  if (arr.length <= 1) {
    return arr;
  }
  // 选择基准元素，这里我们选择数组中间的元素
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  // 定义左右两个数组
  let left = [];
  let right = [];
  // 遍历数组，将小于基准元素的元素放入左数组，大于基准元素的元素放入右数组
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // 递归地对左右两个数组进行快速排序，并将结果合并返回
  return [...quickSort(left), pivot, ...quickSort(right)];
}
let arr = [5, 3, 8, 4, 6];
console.log(quickSort(arr)); // [3, 4, 5, 6, 8]
```