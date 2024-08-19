## 数组排序常见方法及原理

### 1. 冒泡排序
冒泡排序是一种简单的排序算法，它重复地遍历要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。遍历数列的工作是重复进行的，直到没有再需要交换的元素为止。

```javascript
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```

### 2. 选择排序
选择排序是一种简单直观的排序算法。它的工作原理是：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

```javascript
function selectionSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}
```

### 3. 快速排序
快速排序是一种高效的排序算法，采用分而治之的策略，将一个大列表分为两个小列表。具体步骤如下：
1. 从数组中选择一个元素作为基准值（pivot）。
2. 重新排列数组，所有比基准值小的元素放在基准前面，所有比基准值大的元素放在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数组的中间位置。这个称为分区（partition）操作。
3. 递归地（recursive）把小于基准值元素的子数组和大于基准值元素的子数组排序。

```javascript
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}
```
### 4. 插入排序
插入排序是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
```javascript
function insertionSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
```

## 事件流和事件委托
### 1. 事件流
事件流是指从页面中接收事件的顺序。当一个HTML元素产生一个事件时，该事件会在元素节点与根节点之间的路径上传播，这个传播过程称为DOM事件流。事件流包括三个阶段：

* 捕获阶段：事件从Document节点自上而下向目标节点传播的阶段。在这个阶段，事件会依次经过目标节点的所有祖先节点，但事件处理函数（如果有的话）通常不会在这个阶段执行，除非在添加事件监听器时明确指定了捕获模式。

* 目标阶段：事件到达目标节点（即触发事件的元素）的阶段。在这个阶段，目标节点上的事件处理函数会被触发执行。需要注意的是，目标阶段并不总是明确地作为事件流的一个独立阶段被提及，但它是事件传播过程中不可或缺的一部分。

* 冒泡阶段：事件从目标节点自下而上向Document节点传播的阶段。在这个阶段，事件会依次经过目标节点的所有祖先节点，并且每个节点上注册的事件监听器（如果有的话）会按照其注册的顺序执行。浏览器默认的事件处理模型是冒泡模型。

### 2. 事件委托
事件委托是利用事件冒泡的原理，将事件监听器添加到一个父元素上，而不是每个子元素单独添加事件监听器。这样可以减少事件监听器的数量，提高性能。

```javascript
document.getElementById('parent').addEventListener('click', function(event) {
  if (event.target && event.target.nodeName.toLowerCase() === 'button') {
    console.log('Button clicked:', event.target);
  }
});
```

## 拖拽功能
实现拖拽功能需要监听鼠标的mousedown、mousemove和mouseup事件。具体步骤如下：

1. 在mousedown事件中，记录鼠标按下时的初始位置和被拖拽元素的初始位置。
2. 在mousemove事件中，计算鼠标移动的距离，并更新被拖拽元素的位置。
3. 在mouseup事件中，停止拖拽操作。

在监听事件的 event 对象中，有几个参数是比较重要的：`clientX`，`clientY` 标识的鼠标当前横坐标和纵坐标，`offsetX` 和 `offsetY `表示相对偏移量，可以在 `mousedown` 鼠标按下时记录初始坐标，在 `mouseup` 鼠标抬起时判断是否在目标区域中，如果是则用鼠标获取到的当前的偏移量 - 初始坐标得到元素实际在目标区域中的位置。


```javascript
let isDragging = false;
let startX, startY, initialX, initialY;

document.getElementById('draggable').addEventListener('mousedown', function(event) {
  isDragging = true;
  startX = event.clientX;
  startY = event.clientY;
  initialX = this.offsetLeft;
  initialY = this.offsetTop;
});

document.addEventListener('mousemove', function(event) {
  if (isDragging) {
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    const newX = initialX + deltaX;
    const newY = initialY + deltaY;
    this.style.left = newX + 'px';
    this.style.top = newY + 'px';
  }
});

document.addEventListener('mouseup', function() {
  isDragging = false;
});
```

## 内存泄漏 / 内存溢出
内存泄漏是指程序中已分配的内存未被正确释放，导致内存空间逐渐被耗尽。内存溢出是指程序在运行过程中所需的内存超过了系统或程序所能提供的内存，导致程序崩溃。

### 内存泄漏的常见原因包括：
1. 全局变量：全局变量在程序结束时不会被自动回收，如果全局变量引用了大量的对象，可能会导致内存泄漏。
2. 闭包：闭包会导致函数外部无法访问到函数内部的变量，如果闭包引用了大量的对象，可能会导致内存泄漏。
3. DOM 元素引用：如果 DOM 元素被引用，即使 DOM 元素被移除，其引用仍然存在，可能会导致内存泄漏。
4. 事件监听器：如果事件监听器没有被正确移除，可能会导致内存泄漏。
解决内存泄漏的方法包括：避免全局变量、使用闭包时注意引用的释放、移除 DOM 元素引用、移除事件监听器等。

### 内存溢出的常见原因包括：
1. 数据结构过大：如果程序中使用了过大的数据结构，可能会导致内存溢出。
2. 循环引用：如果两个对象相互引用，可能会导致内存泄漏，从而引发内存溢出。
3. 缓存：如果缓存中的数据过多，可能会导致内存溢出。
解决内存溢出的方法包括：优化数据结构、避免循环引用、优化缓存等。

## 实现一个 once 函数，传入函数参数只执行一次
```javascript
function once(fn) {
  let called = false;
  return function() {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

// 使用示例
function sayHello(name) {
  console.log(`Hello, ${name}!`);
}

const sayHelloOnce = once(sayHello);

sayHelloOnce('Alice'); // 输出: Hello, Alice!
sayHelloOnce('Bob'); // 不会输出任何内容
```

## sleep 的效果
```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function example() {
  console.log('Start');
  await sleep(1000);
  console.log('End');
}

example();
```

## 数组常用的方法，哪些会返回新数组
JavaScript 数组常用的方法包括：

1. `push()`：在数组末尾添加一个或多个元素，并返回新数组的长度。
2. `pop()`：删除数组末尾的一个元素，并返回被删除的元素。
3. `shift()`：删除数组开头的一个元素，并返回被删除的元素。
4. `unshift()`：在数组开头添加一个或多个元素，并返回新数组的长度。
5. `slice()`：返回一个新数组，包含从开始到结束（不包括结束）的数组元素。
6. `splice()`：通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容。此方法会改变原数组。
7. `concat()`：合并两个或多个数组，并返回一个新数组。
8. `map()`：创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
9. `filter()`：创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
10. `reduce()`：对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
11. `forEach()`：对数组的每个元素执行一次提供的函数。
12. `sort()`：对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的。
13. `reverse()`：将数组中元素的位置颠倒，并返回该数组。该方法会改变原数组。

## 