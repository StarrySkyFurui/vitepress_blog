### 判断字符串
1、使用`===`运算符进行严格相等比较。

2、使用`indexOf`方法检查字符串中是否包含指定的子字符串。

3、使用`includes`方法检查字符串中是否包含指定的子字符串。

4、使用`startsWith`方法检查字符串是否以指定的子字符串开头。

5、使用`endsWith`方法检查字符串是否以指定的子字符串结尾。

6、使用`match`方法检查字符串是否匹配指定的正则表达式。

### 拼接与分割
1. 拼接字符串
   * 使用加号运算符将多个字符串拼接起来。
      ```
      let str1 = "Hello";
      let str2 = "World";
      console.log(str1 + " " + str2); // "Hello World"
      ```
   * 使用模板字符串将多个字符串拼接起来。
      ```
      let str1 = "Hello";
      let str2 = "World";
      console.log(`${str1} ${str2}`); // "Hello World"
      ```
   * 使用`Array.join()`方法将多个字符串拼接起来。
      ```
      let str1 = "Hello";
      let str2 = "World";
      console.log([str1, str2].join(" ")); // "Hello World"
      ```
   * 使用`String.concat()`方法将多个字符串拼接起来。
      ```
      let str1 = "Hello";
      let str2 = "World";
      console.log(str1.concat(" ").concat(str2)); // "Hello World"
      ``` 
2. 分割字符串
   * 使用split()方法将字符串分割成数组。
      ```
      let str = "Hello";
      console.log(str.split("")); // ["H", "e", "l", "l", "o"]
      ``` 
  

3. 查找与替换
indexOf(searchValue[, fromIndex])
功能: 返回指定文本首次出现的索引，未找到返回-1。
语法: string.indexOf(searchValue[, fromIndex])
示例:
javascript
  let text = "Hello, world!";
  console.log(text.indexOf("world")); // 输出: 7
lastIndexOf(searchValue[, fromIndex])
功能: 返回指定文本最后一次出现的索引，未找到返回-1。
语法: string.lastIndexOf(searchValue[, fromIndex])
示例:
javascript
  let text = "Repeat, repeat, again.";
  console.log(text.lastIndexOf("repeat")); // 输出: 14
replace(regexp|substr, newSubstr|function)
功能: 替换匹配项为新文本或根据函数返回的内容。
语法: string.replace(regexp|substr, newSubstr|function)
示例:
javascript
  let text = "Hello, world!";
  console.log(text.replace("world", "JavaScript")); // 输出: "Hello, JavaScript!"
1. 大小写转换
toLowerCase()
功能: 转换字符串为小写。
语法: string.toLowerCase()
示例:
javascript
  let text = "HELLO WORLD";
  console.log(text.toLowerCase()); // 输出: "hello world"
toUpperCase()
功能: 转换字符串为大写。
语法: string.toUpperCase()
示例:
javascript
  let text = "hello world";
  console.log(text.toUpperCase()); // 输出: "HELLO WORLD"
1. 去除空白
trim()
功能: 移除字符串两端的空白字符。
语法: string.trim()
示例:
javascript
  let text = "   Hello, world!   ";
  console.log(text.trim()); // 输出: "Hello, world!"
1. 截取与分割
slice(startIndex[, endIndex])
功能: 提取字符串的一部分，返回新的字符串。
语法: string.slice(startIndex[, endIndex])
示例:
javascript
  let text = "Hello, world!";
  console.log(text.slice(7)); // 输出: "world!"
substring(indexStart[, indexEnd])
功能: 类似于slice()，但参数为负或起始大于结束时会自动调整。
语法: string.substring(indexStart[, indexEnd])
示例:
javascript
  let text = "Hello, world!";
  console.log(text.substring(0, 5)); // 输出: "Hello"
split([separator[, limit]])
功能: 根据分隔符将字符串分割成数组。
语法: string.split([separator[, limit]])
示例:
javascript
  let text = "one,two,three";
  console.log(text.split(",")); // 输出: ["one", "two", "three"]
1. 搜索与模式匹配
match(regexp)
功能: 根据正则表达式搜索字符串，返回匹配结果数组。
语法: string.match(regexp)
示例:
javascript
  let text = "The rain in Spain";
  let pattern = /ain/g;
  console.log(text.match(pattern)); // 输出: ["ain", "ain", "ain"]
7.
1. charAt(index)
功能: 返回在指定位置的字符。
用法:
javascript
  let str = "Hello";
  console.log(str.charAt(1)); // 输出: 'e'
1. concat(string2, ..., stringX)
功能: 连接两个或多个字符串。
用法:
javascript
  let str1 = "Hello, ";
  let str2 = "World!";
  console.log(str1.concat(str2)); // 输出: "Hello, World!"
1. slice(startIndex[, endIndex])
功能: 提取字符串中的一部分，并返回一个新的字符串。endIndex是可选的，表示截取结束位置的前一个字符。
用法:
javascript
  let str = "Hello, World!";
  console.log(str.slice(7)); // 输出: "World!"
  console.log(str.slice(0, 5)); // 输出: "Hello"
1. substring(indexStart[, indexEnd])
功能: 类似于slice(), 但不能接受负值，并且如果indexStart大于indexEnd则会互换两者。
用法:
javascript
  let str = "Hello, World!";
  console.log(str.substring(7)); // 输出: "World!"
  console.log(str.substring(0, 5)); // 输出: "Hello"
1. substr(startIndex[, length])
功能: 从起始索引开始提取指定数量的字符。
用法:
javascript
  let str = "Hello, World!";
  console.log(str.substr(7)); // 输出: "World!"
  console.log(str.substr(0, 5)); // 输出: "Hello"
1. toLowerCase()
功能: 将字符串转换为小写。
用法:
javascript
  let str = "HELLO";
  console.log(str.toLowerCase()); // 输出: "hello"
1. toUpperCase()
功能: 将字符串转换为大写。
用法:
javascript
  let str = "hello";
  console.log(str.toUpperCase()); // 输出: "HELLO"
1. trim()
功能: 移除字符串两端的空白字符。
用法:
javascript
  let str = "   Hello, World!   ";
  console.log(str.trim()); // 输出: "Hello, World!"
1.  replace(regexp|substr, newSubstr|function)
功能: 替换匹配项。第一个参数可以是正则表达式或子字符串，第二个参数可以是替换的字符串或一个函数。
用法:
javascript
  let str = "Hello, World!";
  console.log(str.replace("World", "JavaScript")); // 输出: "Hello, JavaScript!"
1.  split([separator[, limit]])
功能: 根据分隔符将字符串分割成数组。
用法:
javascript
  let str = "one,two,three";
  console.log(str.split(",")); // 输出: ["one", "two", "three"]
