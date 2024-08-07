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

## 闭包
闭包是指有权访问另一个函数作用域中的变量的函数。闭包常常用来创建私有变量。
