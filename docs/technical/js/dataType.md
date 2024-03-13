<!-- # js 数据类型、数据类型检测的方式、常用的 string、array 方法、防抖、节流、日期时间戳转换、常用正则、数学函数【上取整、下取整、四舍五入之类的】、document、深浅拷贝、promise、call、apply、ES6常用的、ES10常用的、箭头函数、扩展运算符、位运算符、DOM与BOM、Ajax、原型与原型链、闭包、回调函数、回调地狱、作用域、执行上下文、异步编程、aync\await、面向对象、垃圾回收及内存泄漏、
### 数据类型 -->
### 数据类型
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


### 检测数据类型
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

### 数据类型转换
Javascript 的类型转换一共分两种：显示类型转换 和 隐式类型转换。
显示类型转换: 比较简单，通过 JS 提供的一些函数，可以直接进行转换

* 转化为 Number 类型：Number() / parseFloat() / parseInt()
* 转化为 String 类型：String() / toString()
* 转化为 Boolean 类型: Boolean()




### 定义变量
var \ let \ const
