前端模块化的命名规范主要目的是为了提高代码的可读性、可维护性和避免命名冲突。以下是一些常见的命名规范：

## 目录命名
* 全部采用小写，以横线或者中划线进行分割，例如 `user-manage`;或者驼峰命名，例如 `userManage`;
* 有复数结构时，要采用复数命名法，例如 `views`;
  
## 文件命名
* 全部小写，采用横线或者中划线分割，例如 `user-list.vue`;或者驼峰命名，例如 `userList.vue`;
* 文件夹命名要符合语义化、符合文件的层级关系;
* 对于组件或者模块，通常会使用名词来命名，反映其代表的对象或功能。

## 变量命名
* 尽量使用驼峰命名法，例如 `firstName`;
* 全局变量应避免，如果必须使用，要特别小心并加上前缀，如 `gMyGlobalVariable`。

## 函数命名
* 尽量使用动宾短语及驼峰命名法来命名，例如 `getUserInfo`;
* 尽量使用动词前缀来命名，例如 `get`、`set`、`open`、`close`、`jump`;
* 尽量使用常用单词开头，例如 `get`、`set`、`open`、`close`、`jump`;

## 常量命名
* 尽量使用大写字母，以横线或者下划线分割，例如 `MAX_NUM`;

## 模块导入/导出
* 使用 `import` 和 `export` 关键字时，导出的命名通常与文件名保持一致，如 `export default class ComponentName`。
* 导入时，可以使用别名来改善可读性，例如 `import { myFunction as doSomething } from './myModule'`。

## CSS 类名采用 BEM 命名规范
可以采用全部小写，横线分割；
推荐：
```css
.block__element {} 
.block--modifier {}
```

遵守这些命名规范可以帮助团队在协作时更容易理解和维护代码，同时也有助于代码审查和自动化工具的使用。