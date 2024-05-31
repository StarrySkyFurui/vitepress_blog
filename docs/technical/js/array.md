## 判断数组
* `instanceof` 运算符用于检验构造函数的 prototype 属性是否出现在对象的原型链中的任何位置，返回一个布尔值
```js
let arr = []
console.log(arr instanceof Array); // true
```

* `constructor` 实例的构造函数属性 `constructor` 指向构造函数，通过 `constructor` 属性可以判断是否为一个数组
```js
let arr = []
console.log(arr.constructor === Array);//true
```

* `Object.prototype.toString.call()` 可以获取到对象的不同类型
```js
let arr = []
console.log(Object.prototype.toString.call(arr));//[object Array]s
```

* `Array.isArray()` 用于确定传递的值是否是一个数组，返回一个布尔值
```js
let arr = []
console.log(Array.isArray(arr));//true
```
## 遍历数组
数组常用遍历有 `for、forEach、for-in、for-of、map、reduce、every、some、filter、reduceRight、find、findIndex` 等方法，很多方法都可以达到同样的效果。

* for 语句
```js
const arr = [1,2,4,6]
for(var i = 0, len = arr.length; i < len; i++){
    console.log(arr[i])
}
```
> 这是标准for循环的写法也是最传统的语句，字符串也支持，定义一个变量i作为索引，以跟踪访问的位置，len是数组的长度，条件就是i不能超过len。
* forEach 语句
```js
const array = [1, 2, 3, 4, 5];
array.forEach((element, index) => {
    console.log('Element:', element, 'Index:', index);
});
```

##  数组分割
```js
const listChunk = (list = [], chunkSize = 1) => {
  const result = [];
  const tmp = [...list];
  if (!Array.isArray(list) || !Number.isInteger(chunkSize) || chunkSize <= 0) {
      return result;
  };
  while (tmp.length) {
      result.push(tmp.splice(0, chunkSize));
  };
  return result;
};

console.log(listChunk(['a', 'b', 'c', 'd']));// [['a'], ['b'], ['c'], ['d']]
console.log(listChunk(['a', 'b', 'c', 'd', 'e'], 2));// [['a', 'b'], ['c', 'd'], ['e']]
console.log(listChunk(['a', 'b', 'c', 'd'], 0));// []
console.log(listChunk(['a', 'b', 'c', 'd'], -1));// []
```

## 数组去重

* 利用ES6的 `Set`

```js
/** Set中不允许出现重复的元素 */
let arr1 = [1,2,3,1,3,4]
let arr2 = Array.from(new Set(arr1))
let arr3 = [...new Set(arr1)]
console.log(arr2); // [ 1, 2, 3, 4 ]
console.log(arr3); // [ 1, 2, 3, 4 ]
```

* 利用ES6的 `Map`

```js
/** 创建一个空Map数据结构，遍历需要去重的数组，把数组的每一个元素作为key存到Map中。由于Map中不会出现相同的key值，所以最终得到的就是去重后的结果。*/
let arr = [1, 0, 2, 3, 1, 0, 4]
function unique(arr) {
     let map = new Map();
     let arr1 = []
     for (let i = 0, len = arr.length; i < len; i++) {
          if (map.has(arr[i])) {      // 判断是否存在该key值
              map.set(arr[i], true);
          }
          else {
              map.set(arr[i], false);
              arr1.push(arr[i]);
          }
      }
    return arr1;
}
console.log(unique(arr)); // 1, 0, 8, 3, -9, 7
```

* 利用 `reduce` 去重

```js
let arr = [1, 2, 3, 4, 3, 2, 4]
let myArray = arr.reduce(function (accumulator, currentValue) {
  if (accumulator.indexOf(currentValue) === -1) {
    accumulator.push(currentValue)
  }
  return accumulator
}, [])

console.log(myArray) //[ 1, 2, 3, 4 ]
```

* 在原数组上去重

```js
let arr = [1, 2, 0, 3, 1, 3]
const removeDuplicates = (nums) => {
  let len = nums.length - 1
  // 从后向前遍历数组，indexOf从前向后找索引。
  for(let i = len; i>=0; i--) {
      if(nums.indexOf(nums[i]) != i) {
          nums[i] = nums[len--]
      }
  }
  // 删除重复项
  nums.splice(len+1)
  return nums
}
// 测试
removeDuplicates(arr)
console.log(arr); //[ 1, 2, 0, 3 ]
```

## 数组扁平化
```js
let arr = [1, 2, [3, 4], [5, [6, 7]], 8];
// 第一种方法：
console.log(arr.flat(Infinity)); // [1, 2, 3, 4, 5, 6, 7, 8]

// 第二种方法：
console.log(arr.toString().split(',')); // [1, 2, 3, 4, 5, 6, 7, 8]

// 第三种方法：
function flatten(arr) {
    return arr.reduce((prev, item) => {
        return prev.concat(Array.isArray(item) ? flatten(item) : item);
    }, [])
}
console.log(flatten(arr)); // [1, 2, 3, 4, 5, 6, 7, 8]

// 第四种方法：（对象数组举例）
const arr = [
  {
    id: 1,
    children: [
      {
        id: 11,
        children: [
          {
            id: 111,
          },
        ],
      },
      {
        id: 12,
        children: [
          {
            id: 112,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    children: [
      {
        id: 21,
      },
      {
        id: 22,
      },
    ],
  },
];

function flatten(arr) {
  return [].concat(
    ...arr.map((item) => [].concat(item, ...flatten(item.children || [])))
  );
}

console.log(flatten(arr));
```

## 数组柯里化Curry（求和）
```js
function sum(){
  var arr = [].slice.apply(arguments);
  var fn = function(){
      arr = arr.concat([].slice.apply(arguments))
      return fn;
  }
  fn.sumOf = function(){
      return  arr.reduce((total,num)=>total+num,0);
  }
  return fn;
}
console.log(sum(1,3).sumOf()) // 4
console.log(sum(1,2)(3,4).sumOf())// 10
```

## 数组排序
```js
let people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 20 },
  { name: 'Dave', age: 35 }
];

// 升序排序
people.sort(function(a, b) {
  return a.age - b.age;
});
console.log(people); // [{name: "Charlie", age: 20}, {name: "Alice", age: 25}, {name: "Bob", age: 30}, {name: "Dave", age: 35}]

// 降序排序
people.sort(function(a, b) {
  return b.age - a.age;
});
console.log(people); // [{name: "Dave", age: 35}, {name: "Bob", age: 30}, {name: "Alice", age: 25}, {name: "Charlie", age: 20}]

// 如果需要基于多个属性排序，可以在比较函数中添加逻辑，例如先按 age 排序，再按 name 排序
people.sort(function(a, b) {
  if (a.age !== b.age) {
    return a.age - b.age; // 先按年龄排序
  } else {
    return a.name.localeCompare(b.name); // 年龄相同，按姓名排序
  }
});
```

## 数组乱序
```js
//第一种方法
function arrScrambling(arr) {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  return arr;
}
console.log(arrScrambling([1,2,3,4])) // [1, 4, 2, 3]

//第二种方法
const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());
console.log(shuffleArray([1, 2, 3, 4])); // [1, 2, 4, 3]
```

## 计算数组中每个元素出现的次数
```js
let charArray = ['a', 'b', 'c', 'a', 'c'];
let charObject = charArray.reduce(function (allchars, char) {
  if (char in allchars) {
    allchars[char]++;
  } else {
    allchars[char] = 1;
  }
  return allchars;
}, {});
console.log(charObject); // { a: 2, b: 1, c: 2 }
```

## 去除数组中的无效值
创建一个新数组，包含原数组中所有的非假值元素。例如false, null,0, "", undefined, 和 NaN 都是被认为是“假值”。
```js
const compact = arr => arr.filter(Boolean)
console.log(compact([0, 1, false, true, 2, '', 3]));//[ 1, true, 2, 3 ]
```

## 数组中最大值、最小值
```js
const min = Math.min(...arr.filter(v => Boolean(v)))
const max = Math.max(...arr.filter(v => Boolean(v) || v === 0))
```

## 对象数组去重
```js
// 使用 reduce 的方法
const uniqueBy = (arr, key) => {
    return arr.reduce((acc, cur) => {
        const ids = acc.map(item => item[key])
        return ids.includes(cur[key]) ? acc : [...acc, cur]
    }, [])
}

// 遍历数组并比较每个对象的内容，以确定它们是否唯一
const removeDuplicatesByProperty = (arr, propertyName) => {
    const uniqueObjects = [];
    const seenValues = new Set();
    for (const obj of arr) {
        const value = obj[propertyName];
        if (!seenValues.has(value)) {
            uniqueObjects.push(obj);
            seenValues.add(value);
        }
    }
    return uniqueObjects;
}
const responseList = [
    { id: 1, a: 1 },
    { id: 2, a: 2 },
    { id: 3, a: 3 },
    { id: 1, a: 4 },
    { id: 2, a: 2 },
    { id: 3, a: 3 },
    { id: 1, a: 4 },
    { id: 2, a: 2 }
]

console.log(uniqueBy(responseList, 'id'));
console.log(removeDuplicatesByProperty(responseList, 'id'));
//[ { id: 1, a: 1 }, { id: 2, a: 2 }, { id: 3, a: 3 } ]
```

##  数组取交集、差集
```js
const arr1 = [0, 1, 2, 3, 4, 5]
const arr2 = [3, 4, 5, 6, 7, 8]
const duplicatedValues = [...new Set(arr1)].filter(item => arr2.includes(item))
const diffValues = [...new Set([...arr1, ...arr2])].filter(item => !arr2.includes(item) || !arr1.includes(item))
console.log(duplicatedValues) // [3, 4, 5]
console.log(diffValues) // [0, 1, 2, 6, 7, 8]
```

## 数组转对象
```js
const arr = [1, 2, 3, 4]
const newObj = {...arr} // {0: 1, 1: 2, 2: 3, 3: 4}
const obj = {0: 0, 1: 1, 2: 2, length: 3}
// 对象转数组不能用展开操作符，因为展开操作符必须用在可迭代对象上
let newArr = [...obj] // Uncaught TypeError: object is not iterable...
// 可以使用Array.form()将类数组对象转为数组
let newArr = Array.from(obj) // [0, 1, 2]
```
## 实现数组的 `map` 方法
```js
//循环实现
const myMap = function(fn, context) {
    let arr = Array.prototype.slice.call(this)
    let mapArr = Array()
    //避免稀疏
    const temArr = Reflect.ownKeys(arr)
    //删除length
    temArr.pop()
    for (let i of temArr) {
        console.log('i', i);
       mapArr[i] = fn.call(context, arr[i], i, this)
      }
      return mapArr
    }
    Array.prototype.myMap = myMap
    console.log([1,2,3].myMap(number => number + 1)) //[ 2, 3, 4 ]

//利用reduce实现
Array.prototype.reduceMap = function(fn, context) {
    let arr = Array.prototype.slice.call(this)
    return arr.reduce((pre, cur, index) => {
        return [...pre, fn.call(context, cur, index, this)]
    }, [])
}
console.log([1,2,3].reduceMap(number => number + 1)); //[ 2, 3, 4 ]
```

## 实现数组的 `reduce` 方法
```js
Array.prototype.myReduce = function(fn, initValue) {
    let arr = Array.prototype.slice.call(this)
    let res, startIndex = 0
    // if (!initValue) {
    //     // 找到第一个非空的元素和下标
    //     for (let index = 0; index < arr.length; index++) {
    //         if(!arr.hasOwnProperty(index)) continue
    //         res = arr[index];
    //         startIndex = index
    //         break
    //     }
    // } else {
    //     res = initValue
    // }
    // for (let index = ++startIndex; index < arr.length; index++) {
    //     if(!arr.hasOwnProperty(index)) continue
    //     res = fn.call(null, res, arr[index], index, this)   
    // }
    // return res

    //避免稀疏数组, 删除length
    let tempArr
    (tempArr = Reflect.ownKeys(arr)).pop()
    if (initValue) {
        res = initValue
    } else {
        res = arr[tempArr[0]]
        tempArr.shift()
    }
    for (const i of tempArr) {
        res = fn.call(null, res, arr[i], i, this) 
    }
    return res
}
console.log([2,4,6, ,8].myReduce((pre, cur) => pre + cur, 1)); // 21
```
