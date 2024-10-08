# Vue 相关
## Vue 的 双向绑定原理
vue 的双向绑定
## Vue 的 响应式原理
## Vue2 和 Vue3 的区别
## computed 和 watch 的区别
## 组件通信的方式
## Vue 的虚拟DOM
## Vue 的 NextTick 
## Vuex 刷新后数据丢失的解决方案
## v-model本质是什么
## vue-cli 的用途
vue-cli 是一个基于 Vue.js 的命令行工具，用于快速搭建、开发和构建 Vue 项目。
## vue-cli 的作用
1. 快速搭建项目：vue-cli 可以通过简单的命令行操作，快速搭建一个 Vue 项目，包括项目结构、依赖、配置等。
2. 提供开发环境：vue-cli 提供了一个开发环境，包括热重载、代码压缩、代码检查等功能，方便开发者进行调试和优化。
3. 支持多种构建工具：vue-cli 支持多种构建工具，如 webpack，可以根据项目需求选择合适的构建工具。
4. 提供多种插件和模板：vue-cli 提供了多种插件和模板，可以快速集成各种功能，如路由、状态管理、国际化等。开发者可以根据项目需求选择合适的插件和模板，提高开发效率。
5. 支持多种构建模式：vue-cli 支持多种构建模式，如开发模式、生产模式等，可以根据项目需求选择合适的构建模式。
6. 项目部署：vue-cli 可以将项目打包成静态文件，方便部署到服务器上。

## v-if 和 v-show
Vue 官方中对 `v-if` 和 `v-show` 的使用场景区分是：因为 `v-if` 控制 dom 的渲染，`v-show` 通过 css 控制 dom 的显示，当需要频繁显示和隐藏的时候，那么需要使用 `v-show` 否则需要使用 `v-if`。
但是在实际的开发中我们是 无法分辨一个场景（Dialog）是否是频繁切换的。

所以说，在实际开发中，判断 `v-if` 和 `v-show` 的使用需要根据它们的特性来进行判断。

`v-show` 不会导致组件被销毁和渲染，但是 `v-if` 会导致组件被销毁和重新渲染。

也就是说：当使用 `v-show` 时，虽然用户看不到组件，但是当前组件的生命周期都已经执行了。如果在 created 中存在接口的调用，则【接口已经调用完成】。同时，当组件隐藏时，组件并不会销毁。相反：如果是 `v-if` 的每次点击时都会重新渲染组件，重新执行生命周期，隐藏则销毁组件。

> 当组件需要在指定时机创建，在指定时机销毁时，需要使用 `v-if`。而 当组件仅需要创建一次时，则可以使用 `v-show`。


## Vue2 和 vue3的v-model 区别
## 怎么实现两个v-model


## render有哪些参数

## vue的函数组件是什么，有哪些参数

## extend函数是什么

## 按需引入怎么做 install

## h函数的具体用途是什么，作用是什么

# Vue Router 相关


# Vuex 相关
## Vuex 有哪几种属性？
有五种，分别是 state、getters、mutations、actions、modules。
1. state：数据源存放地，用于存储全局状态，通过 getter 和 setter 访问和修改。
2. getters：用于计算属性，通过 getter 访问和修改 state 中的数据。
3. mutations：用于修改 state 中的数据，通过 mutation 提交一个 mutation，并传入新的数据。
4. actions：用于异步操作，通过 action 提交一个 mutation，并传入新的数据。
5. modules：用于模块化管理 state、getters、mutations 和 actions，每个模块可以有自己的命名空间，方便管理。

## Vuex 的状态管理有什么问题？

## Vuex 和单纯的全局对象有什么区别？
Vuex 和单纯的全局对象主要有以下区别：
1. Vuex 的状态存储是响应式的，当 store 中的状态发生变化时，依赖该状态的组件会自动更新。
2. Vuex 的状态存储是集中管理的，所有的状态都存储在 store 中，方便管理和维护。
3. Vuex 的状态存储是可追踪的，可以通过 mutation 和 action 来追踪状态的变更，方便调试和追踪状态的变化。
4. Vuex 的状态存储是可持久化的，可以通过插件将状态存储在本地，方便在页面刷新后恢复状态。
5. Vuex 不能直接改变 store 中的状态，只能通过显示地提交 mutation 来修改 store 中的状态，避免直接修改状态，这样可以方便跟踪每一个状态的变化。

## 为什么 Vuex 的 mutation 中必须是同步函数？
Vuex 的 mutation 必须是同步函数，因为 Vuex 的状态是响应式的，当状态发生变化时，依赖该状态的组件会自动更新。如果 mutation 中是异步操作，那么状态的变化会延迟到下一个事件循环中，导致组件无法及时更新，并且无法知道状态是何时更新的，无法很好的进行状态的追踪。

## Vuex 和 localStorage 的区别
### 存储位置
Vuex 存储在内存中，localStorage 是以文件的方式存储在本地，且只能存储字符串类型的数据，存储对象需要 JSON 的 stringify 和 parse 方法来处理。
### 应用场景
Vuex 适合用于全局状态管理，采用集中式存储管理应用的所有的状态，而 localStorage 则适合用于本地存储，一般是在跨页面传递数据时使用，如用户偏好设置、认证令牌等。

### 响应性
Vuex 能做到数据的响应式，localStorage 需要手动处理。

### 存储容量和持久性
localStorage 存储容量有限，localStorage 的存储容量为 5MB，但是可以持久化存储。Vuex 无存储容量限制，但数据存储不持久。

### 集成性
Vuex 深度集成 Vue.js，提供丰富的API，而 localStorage 是浏览器的本地存储，API  简单但功能有限，可以在任何地方使用。

### 生命周期
Vuex 的数据在页面刷新后会丢失，而 localStorage 的数据会持久化存储，除非手动清除。

# Axios 相关
## 二次封装做了什么？作用是什么？
1. 统一请求的配置
* 设置 axios 的 baseURL，所有通过封装后的 axios 发出的请求都会自动带上baseURL，避免在每个请求里重复写。
* 设置请求头，统一设置常用的请求头，如 Authorization、Content-Type 等，方便进行身份验证、数据格式定义等。
* 统一处理请求超时，统一设置请求超时时间，避免请求长时间阻塞导致等待的时间过长。

2. 添加请求拦截
* 添加请求前拦截，可以执行一些前置操作，如添加 token、校验请求参数等。如果校验不通过，可以直接取消请求并给出对应的提示。

3. 添加响应拦截
* 错误处理，统一处理网络错误和服务器错误的一些状态码，如401（未授权），403（无权限），404（资源不存在），500（服务器错误）等，并给出对应的提示。
* 数据格式化，根据后端返回好的数据格式，进行统一的数据处理，如返回的文件流 blob 进行特殊处理。
  
4. 封装请求的方法
* 封装请求方法，统一处理 get、post、put、delete 等请求方式。

5. 结合 Typescript 使用
* 添加类型定义，方便使用 Typescript 进行开发时，进行类型检查和自动提示。


# Vue3 相关
## Vue3 中 ref、toRef、toRefs 的区别
在 Vue3 中，ref、toRef、toRefs 是 Vue Composition API 提供的函数，用于处理响应式数据。ref 用于创建一个响应式的引用，toRef 用于创建一个响应式对象的某个属性的引用，toRefs 用于将响应式对象转换为普通对象，并将每个属性转换为响应式引用。
### ref(value: T): Ref<T>
创建一个响应式数据引用。接收一个初始值作为参数，并返回一个包含该值的响应式引用。Ref 是一个包装对象，它的 .value 属性用于访问和修改引用的值。使用 ref 创建响应式数据引用：
```js
import { ref } from 'vue';

const count = ref(0); // 创建一个初始值为 0 的响应式引用

console.log(count.value); // 输出: 0

count.value++; // 修改引用的值
console.log(count.value); // 输出: 1
```
### toRef(object: object, key: string | symbol): ToRef
创建一个指向另一个响应式对象的响应式引用。接收一个响应式对象和其属性名作为参数，并返回一个指向该属性的响应式引用。ToRef 是一个只读的响应式引用。使用 toRef 创建指向另一个响应式对象的引用：
```js
import { ref, reactive, toRef } from 'vue';

const state = reactive({
  name: 'John',
  age: 30
});

const nameRef = toRef(state, 'name'); // 创建指向 state.name 的引用

console.log(nameRef.value); // 输出: "John"

state.name = 'Mike'; // 修改原始对象的属性值
console.log(nameRef.value); // 输出: "Mike"

nameRef.value = 'Amy'; // 修改引用的值
console.log(state.name); // 输出: "Amy"
```
### toRefs(object: T): ToRefs<T>
将一个响应式对象的所有属性转换为响应式引用。接收一个响应式对象作为参数，并返回一个包含所有属性的响应式引用对象。ToRefs 是一个对象，每个属性都是一个只读的响应式引用。使用 toRefs 将对象的所有属性转换为响应式引用：
```js
import { reactive, toRefs } from 'vue';

const state = reactive({
  name: 'John',
  age: 30
});

const refs = toRefs(state); // 将 state 中的所有属性转换为响应式引用

console.log(refs.name.value); // 输出: "John"
console.log(refs.age.value); // 输出: 30

state.name = 'Mike'; // 修改原始对象的属性值
console.log(refs.name.value); // 输出: "Mike"

refs.age.value = 25; // 修改引用的值
console.log(state.age); // 输出: 25
```

# 性能优化

# 打包优化


