## 主要特点
* 静态类型检查：在编译阶段进行类型检查，可以提高代码的可读性和可维护性，减少运行时错误。
* 基于类的面向对象编程：支持类、继承、接口等面向对象特性。
* 泛型：支持泛型编程，增加代码的复用性。
* 模块：支持模块化编程，可以更好地组织和管理代码。

## 内置数据类型
* 布尔类型（boolean）：表示逻辑值，可以是true或false。
* 数字类型（number）：表示数值，包括整数和浮点数。
* 字符串类型（string）：表示文本序列。
* 数组类型（Array）：表示同一类型元素的集合。
* 元组类型（Tuple）：表示不同类型元素的集合，每个位置的类型是固定的。
* 枚举类型（Enum）：表示一组命名的常量集合。
* 任意类型（Any）：表示任意类型的值。
* 空值（Void）：通常用于表示没有返回值的函数。
* Null和Undefined：分别表示空值和未定义。
* Never：表示永远不存在的值的类型，例如会抛出异常的函数。
* 对象类型（Object）：表示复杂的数据结构，可以包含属性和方法。

## 定义自定义类型
当需要描述复杂的数据结构或确保代码的某些部分遵循特定的形状时，我们会使用自定义类型。在 TypeScript 中，可以使用类型别名（type）或接口（interface）来定义自定义类型。

* 使用类型别名（type）关键字来定义
  
它可以为任何类型创建一个新的名字。类型别名常用于简化复杂的类型定义，或为现有的类型提供一个更具语义化的名称。
```ts
// 定义一个类型别名表示字符串或数字
type StringOrNumber = string | number;

// 使用类型别名
let value: StringOrNumber;
value = "hello"; // 正确
value = 42; // 正确
// value = true; // 错误，不是字符串或数字

// 定义一个复杂的类型别名
type Person = {
  name: string;
  age: number;
  isStudent?: boolean; // 可选属性
};

// 使用复杂的类型别名
let person: Person = {
  name: "Alice",
  age: 25,
  isStudent: true
};
```
* 使用接口（interface）关键字来定义
  
它描述了一个对象的形状，包括其应该具有的属性和方法。接口常用于定义对象的结构，并强制实施这些结构。
```ts
// 定义一个接口表示一个人
interface Person {
  name: string;
  age: number;
  isStudent?: boolean; // 可选属性
  greet(): void; // 方法
}

// 使用接口
let person: Person = {
  name: "Bob",
  age: 30,
  isStudent: false,
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
};

// 实现接口（类实现接口）
class Student implements Person {
  name: string;
  age: number;
  isStudent: boolean = true;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(`Hi, I'm ${this.name} and I'm a student.`);
  }
}
const student = new Student("Charlie", 20);
student.greet(); // 输出: Hi, I'm Charlie and I'm a student.

```
* 类型别名与接口的区别
  
    1. 语义差异<br/>
    类型别名可以看作是为现有类型创建新的名称，而接口定义了一个新类型的合约。

    2. 扩展方式<br/>
    接口可以通过 extends 关键字进行扩展，创建更复杂的类型层次结构；类型别名可以使用交叉类型（&）来组合多个类型。

    3. 声明合并<br/>
    相同名称的接口会自动合并，而类型别名不会。

    4. 使用场景<br/>
    接口常用于定义对象的结构，特别是在使用基于类的面向对象编程时；类型别名在处理更复杂的类型逻辑（如条件类型、映射类型）时更为灵活。

## 泛型及泛型的优点
* 泛型是指在定义函数、接口或类时，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。泛型提供了编译时的类型安全，允许用户创建可重用的组件，同时保持类型信息。
  

### 泛型的优点包括：
  * 提高代码的可重用性：泛型允许创建可重用的组件，在定义组件时不需要指定具体的类型，而在使用组件时再指定类型。
  * 提高代码的灵活性：泛型允许创建可重用的组件，在定义组件时不需要指定具体的类型，而在使用组件时再指定类型。
  * 提高代码的类型安全性：泛型提供了编译时的类型安全，可以捕获一些类型错误，提高代码的稳定性。
```ts
// 使用类型别名定义一个简单的类型
type ID = number;
type UserName = string;

// 使用接口定义一个用户
interface User {
  id: ID;
  name: UserName;
}

// 使用泛型定义一个能够操作多种类型数据的函数
function findInArray<T>(array: T[], predicate: (item: T) => boolean): T | null {
  for (const item of array) {
    if (predicate(item)) {
      return item;
    }
  }
  return null;
}

// 定义一个用户数组
const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

// 使用泛型函数查找特定用户
const foundUser = findInArray(users, (user) => user.id === 2);
if (foundUser) {
  console.log(`Found user: ${foundUser.name}`); // 输出: Found user: Bob
} else {
  console.log("User not found");
}

// 泛型与接口结合使用，定义一个通用的数据存储接口
interface DataStorage<T> {
  data: T[];
  addItem(item: T): void;
  getItem(index: number): T | null;
}

// 实现一个具体的用户数据存储类
class UserStorage implements DataStorage<User> {
  data: User[] = [];

  addItem(item: User) {
    this.data.push(item);
  }

  getItem(index: number) {
    return index >= 0 && index < this.data.length ? this.data[index] : null;
  }
}

// 使用用户数据存储类
const userStorage = new UserStorage();
userStorage.addItem({ id: 4, name: "David" });
const retrievedUser = userStorage.getItem(0);
if (retrievedUser) {
  console.log(`Retrieved user: ${retrievedUser.name}`); // 输出: Retrieved user: David
}
```
在这个示例中：

我们首先使用类型别名定义了两个简单的类型 ID 和 UserName，它们分别是 number 和 string 的别名。

然后，我们使用接口 User 定义了一个用户结构，其中包含了 id 和 name 两个属性。

接下来，我们定义了一个泛型函数 `findInArray`，它可以用于在任意类型的数组中寻找满足特定条件的元素。

我们创建了一个 User 类型的数组 users，并使用 `findInArray` 函数查找 id 为 2 的用户。

之后，我们定义了一个泛型接口 `DataStorage<T>`，用于描述一个通用的数据存储结构，其中包含了添加和获取数据的方法。

最后，我们实现了一个具体的 UserStorage 类，它实现了 `DataStorage<User>` 接口，用于存储和管理 User 类型的数据。

## 类型断言
类型断言是一种将一个类型更改为更具体或更抽象的类型的方式。在 TypeScript 中，类型断言是通过使用 `as` 关键字来实现的, 通常在类型推断不准确或需要兼容旧代码时使用。
```ts
function getLength(value: string | number): number {
  if ((<string>value).length) {
    return (<string>value).length;
  } else {
    return value.toString().length;
  }
}
```

## 与 JavaScript 的区别
* TypeScript 是 JavaScript 的一个超集，添加了静态类型检查和面向对象编程的特性。它可以编译成纯 JavaScript 代码，在浏览器中运行。与 JavaScript 相比，TypeScript 提供了更强大的类型系统，可以在编译阶段捕获许多常见错误。