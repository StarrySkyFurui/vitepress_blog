<!-- # js 数据类型、数据类型检测的方式、常用的 string、array 方法、防抖、节流、日期时间戳转换、常用正则、数学函数【上取整、下取整、四舍五入之类的】、document、深浅拷贝、promise、call、apply、ES6常用的、ES10常用的、箭头函数、扩展运算符、位运算符、DOM与BOM、Ajax、原型与原型链、闭包、回调函数、回调地狱、作用域、执行上下文、异步编程、aync\await、面向对象、垃圾回收及内存泄漏、
## 数据类型 -->
## 数据类型
Javascript 数据类型分为 基本数据类型 和 引用数据类型:

基本数据类型包括以下几种:
* Number(数字): 整数和小数; 默认值 0
* String(字符串): 文本; 默认值 " "
* Boolean(布尔): 表示真(true)和假()的两个特殊的值; 默认值 false
* Undefined(未定义): 表示"未定义" 或不存在, 由于没有定义, 所以没有任何值
* Null(空值): 即此处的值为空, 默认值 null
* Symbol【Es6新增，表示独一无二的值】
* BigInt【Es10新增】

引用数据类型 Object:
* Array(数组): 数组
* Object(普通对象): 各种值组成的集合
* RegExp(正则对象)
* Date(日期对象)
* Math(数学对象)
* Function(函数对象)
```
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
```
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


> 各种 JavaScript 的数据类型最后都会在初始化之后放在不同的内存中，因此上面的数据类型大致可以分成两类来进行存储：

原始数据类型：基础类型存储在栈内存，被引用或拷贝时，会创建一个完全相等的变量；占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。

引用数据类型：引用类型存储在堆内存，存储的是地址，多个引用指向同一个地址，这里会涉及一个“共享”的概念；占据空间大、大小不固定。引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。


## 检测数据类型
Javascript 检测数据类型有以下几种方式：

1、typeof 运算符返回一个表示数据类型的字符串，返回结果包括：number、string、boolean、object、undefined、function。

typeof 可以对基本类型 number、string、boolean、undefined 做出准确的判断（null除外，typeof null===“object”）；而对于引用类型，除了function之外返回的都是object。

```
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
Tip: null的类型是object，这是由于历史原因造成的。JavaScript 语言第一版只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值）, 没考虑null, 只把它当作object的一种特殊值。后来null独立出来, 作为一种单独的数据类型, 为了兼容以前的代码, typeof null返回object就没法改变了。

2、instanceof 运算符返回一个布尔值，常用于区分数组和对象，instanceof 运算符判断左操作数对象的原型链上是否有右边这个构造函数的prototype属性，也就是说指定对象是否是某个构造函数的实例，最后返回布尔值。

```
[] instanceof Array; //true
[] instanceof Object; //true
new Date() instanceof Date;//true
new Date() instanceof Object;//true
function Person(){};
new Person() instanceof Person;//true
new Person() instanceof Object;//true
```
TIP: instanceof 运算符只能用于对象，不适用原始类型的值。

3、constructor 属性可以得知某个实例对象，到底是哪一个构造函数产生的
4、Object.prototype.toString 是Object原型对象上的一个方法，该方法默认返回其调用者的具体类型

## 数据类型转换
Javascript 的类型转换一共分两种：显示类型转换 和 隐式类型转换。
显示类型转换: 比较简单，通过 JS 提供的一些函数，可以直接进行转换

* 转化为 Number 类型：Number() / parseFloat() / parseInt()
* 转化为 String 类型：String() / toString()
* 转化为 Boolean 类型: Boolean()

## 变量声明
在js中，变量的声明方式在ES6之前只有var一种，而在ES6之后有var、let、const三种方式。

var：声明一个变量，在该变量被声明之后，可以在下文代码中对该变量进行重新赋值，并且每次赋值都会覆盖上一次的值，它不受限于块级作用域，但受限于局部作用域；
let：和var一样，用于声明一个变量，但是let声明的变量只在当前块级作用域中生效，只有在当前块级作用域内进行重新赋值，才会覆盖上一次的值；
const：用于声明一个常量，和let一样，只在块级作用域中生效，并且不可以重新赋值。
```
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

使用var声明的变量，不仅可以在if代码块中可以访问并且可以重新赋值，而且可以在if代码块之外进行访问；
使用let声明的变量，仅可以在if代码块中可以访问并且可以重新赋值，不可以在if代码块之外进行访问；
使用const声明的常量，无法进行重新赋值，并且无法在if代码块之外进行访问；

> var、let、const的区别

在当前作用域中，使用三者声明变量，都只能在当前作用域进行访问；
let和const会受到块级作用域限制，var不会；
三者都存在变量提升，但是let和const因为暂时性死区的关系，无法在声明前进行访问；
var和let声明的变量，在当前作用域链中可以被修改，const无法被修改；
在全局作用域中，使用var声明变量时，会将变量存放进window对象，let和const不会；
let和const在ES6中出现，因此只能在支持ES6的环境中使用，而var没有这个限制。

## 定义函数
* 函数声明
* 函数表达式
* 构造函数

## this
this的5种绑定方式
1）默认绑定(非严格模式下this指向全局对象，严格模式下函数内的this指向undefined)
2）隐式绑定(当函数引用有上下文对象时, 如 obj.foo()的调用方式, foo内的this指向obj)
3）显示绑定(通过call或者apply方法直接指定this的绑定对象, 如foo.call(obj))
4）new构造函数绑定，this指向新生成的对象
5）箭头函数，this指向的是定义该函数时，外层环境中的this，箭头函数的this在定义时就决定了，不能改变

## call apply bind
* 三者的区别
1）三者都可以显式绑定函数的this指向
2）三者第一个参数都是this要指向的对象，若该参数为undefined或null，this则默认指向全局window
3）传参不同：apply是数组、call是参数列表，而bind可以分为多次传入，实现参数的合并
4）call、apply是立即执行，bind是返回绑定this之后的函数，如果这个新的函数作为构造函数被调用，那么this不再指向传入给bind的第一个参数，而是指向新生成的对象
* 手写 call apply bind
  
```
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
## 闭包
> 函数引用了外部作用域的变量, 副作用：不合理的使用闭包，会造成内存泄露(就是该内存空间使用完毕之后未被回收)

* 闭包常见的两种情况：
一是函数作为返回值； 另一个是函数作为参数传递

* 闭包的作用：
可以让局部变量的值始终保持在内存中；对内部变量进行保护，使外部访问不到

* 最常见的案例：函数节流和防抖

* 闭包的垃圾回收：
闭包中引用的变量直到闭包被销毁时才会被垃圾回收

## promise 链式调用
* promise的回调只能被捕获一次
* 在 then 函数加上 return，后面的then函数才能继续捕获到
* race：返回 promises 列表中第一个执行完的结果
* all：返回 promises 列表中全部执行完的结果
* retry： 当接口请求失败后，每间隔几秒，再重发几次
  
## async、await
> 用同步方式，执行异步操作

1）async函数是generator（生成器函数）的语法糖
2）async函数返回的是一个Promise对象，有无值看有无return值
3）await关键字只能放在async函数内部，await关键字的作用 就是获取Promise中返回的resolve或者reject的值
4）async、await要结合try/catch使用，防止意外的错误

## 宏任务/微任务
> 宏任务（Macrotasks）script全部代码（注意同步代码也属于宏任务）、setTimeout、setInterval、setImmediate等

> 微任务（Microtasks） Promise、MutationObserver

事件轮询机制执行过程
1）代码执行过程中，宏任务和微任务放在不同的任务队列中
2）当某个宏任务执行完后,会查看微任务队列是否有任务。如果有，执行微任务队列中的所有微任务(注意这里是执行所有的微任务)
3）微任务执行完成后，会读取宏任务队列中排在最前的第一个宏任务（注意宏任务是一个个取），执行该宏任务，如果执行过程中，遇到微任务，依次加入微任务队列
4）宏任务执行完成后，再次读取微任务队列里的任务，依次类推。

> 总结：宏任务是一个个执行，执行一个宏任务，然后就把在任务队列中的所有微任务都执行完，再执行下一个宏任务，再执行所有微任务，依次类推


