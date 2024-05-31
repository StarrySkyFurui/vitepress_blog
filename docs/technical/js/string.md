## 判断字符串
* 使用`===`运算符进行严格相等比较。

* 使用`indexOf`方法检查字符串中是否包含指定的子字符串。

* 使用`includes`方法检查字符串中是否包含指定的子字符串。

* 使用`startsWith`方法检查字符串是否以指定的子字符串开头。

* 使用`endsWith`方法检查字符串是否以指定的子字符串结尾。

* 使用`match`方法检查字符串是否匹配指定的正则表达式。

## 拼接字符串
```js
let str1 = "Hello";
let str2 = "World";
// 使用 " + " 运算符将多个字符串拼接起来。
console.log(str1 + " " + str2); // "Hello World"
// 使用模板字符串将多个字符串拼接起来。
console.log(`${str1} ${str2}`); // "Hello World"
// 使用`Array.join()`方法将多个字符串拼接起来。
console.log([str1, str2].join(" ")); // "Hello World"
// 使用 String.concat() 方法将多个字符串拼接起来
console.log(str1.concat(" ").concat(str2)); // "Hello World"
```

## 分割字符串
* 使用split()方法将字符串分割成数组。
```js
let str = "Hello";
console.log(str.split("")); // ["H", "e", "l", "l", "o"]
```

## 截取字符串
```js
let str = "Hello, world!";
// 使用slice()方法截取字符串。
console.log(str.slice(7)); // "world!"
// 使用substring()方法截取字符串。
console.log(str.substring(7)); // "world!"
// 使用substr()方法截取字符串。
console.log(str.substr(7)); // "world!"
```

## 查找与替换
  
* indexOf(searchValue[, fromIndex])
  
功能: 返回指定文本首次出现的索引，未找到返回-1。
```js
let text = "Hello, world!";
console.log(text.indexOf("world")); // 输出: 7
```

* lastIndexOf(searchValue[, fromIndex])
  
功能: 返回指定文本最后一次出现的索引，未找到返回-1。
```js
  let text = "Repeat, repeat, again.";
  console.log(text.lastIndexOf("repeat")); // 输出: 14
```

* replace(regexp|substr, newSubstr|function)
  
功能: 替换匹配项为新文本或根据函数返回的内容。
```js
  let text = "Hello, world!";
  console.log(text.replace("world", "JavaScript")); // 输出: "Hello, JavaScript!"
```

## 大小写转换
* 转换字符串为小写  toLowerCase()

```js
  let text = "HELLO WORLD";
  console.log(text.toLowerCase()); // 输出: "hello world"
```
* 转换字符串为大写  toUpperCase()

```js
  let text = "hello world";
  console.log(text.toUpperCase()); // 输出: "HELLO WORLD"
```

## 字符串去除空白
```js
  let text = "   He llo, world!   ";
  // 使用 trim 去除字符串首尾的空白
  console.log(text.trim()); // 输出: "He llo, world!"
  // 使用 replace 去除字符串中的所有空白
  console.log(text.replace(/\s/g, "")); // 输出: "Hello,world!"
  // 使用 match 去除字符串中的所有空白
  console.log(text.match(/\S/g).join("")); // 输出: "Hello,world!"
```
  
## 字符串中字符计数
```js
const countChars = (str) => {
    const countMap = {};
    for (let char of str) {
        countMap[char] = (countMap[char] || 0) + 1;
    }
    return countMap;
}

const charCount = countChars("hello");
console.log(charCount); // 输出: { h: 1, e: 1, l: 2, o: 1 }
```

## 返回在指定位置的字符
```js
let str = "Hello";
  console.log(str.charAt(1)); // 输出: 'e'
```