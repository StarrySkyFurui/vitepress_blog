`Vue Router` 是 Vue.js 官方的路由管理器。它允许我们使用 Vue.js 构建单页面应用（SPA），并实现页面导航和组件渲染等功能。

## 安装
```
npm install vue-router
```

## 配置
## 基本原理
`Vue Router`主要解决了在`Vue.js`单页面应用（SPA）中如何进行页面导航和组件渲染的问题。`Vue Router`的基本原理主要基于前端路由的概念，通过监听URL的变化来匹配对应的路由规则，并渲染相应的组件。

1. 定义路由规则：在`Vue Router`中，我们首先定义一系列的路由规则。这些规则通常包括一个路径（path）和一个与之对应的组件（component）。例如，当用户访问根路径/时，我们可能希望渲染一个名为Home的组件；当用户访问/about路径时，我们则渲染About组件。

2. 监听URL变化：`Vue Router`会监听浏览器的地址栏变化。这通常是通过`HTML5`的`History API`（在`history`模式下）或`hash`变化（在hash模式下）来实现的。当用户点击导航链接、通过编程式导航（如`this.$router.push`）或直接在地址栏中输入新的URL时，都会触发这一监听机制。

3. 匹配路由规则：一旦URL发生变化，`Vue Router`会根据当前的URL去匹配之前定义的路由规则。它会找到与当前`URL`最匹配的路径，并确定应该加载哪个组件。

4. 渲染组件：一旦找到匹配的路由规则，`Vue Router`就会根据规则中指定的组件进行渲染。这通常意味着它会创建一个新的组件实例（如果之前不存在）或复用已有的组件实例（如果组件已经渲染过并且没有变化）。

5. 导航守卫：在路由匹配和渲染组件的过程中，`Vue Router`还提供了导航守卫的功能。这允许我们在路由发生变化之前、之后或过程中执行一些逻辑，如权限检查、数据预加载等。

6.与`Vue.js`的集成：`Vue Router`与`Vue.js`深度集成，能够无缝地配合`Vue.js`的响应式系统和组件化开发方式。这使得在`Vue.js`应用中使用`Vue Router`变得更加简单和直观。

总的来说，`Vue Router`通过监听URL变化、匹配路由规则和渲染组件的方式，实现了单页应用（SPA）中的页面切换和局部更新。这使得我们可以构建出更加流畅和响应式的Web应用体验。

## 路由模式
### 哈希模式（mode: hash）
  * 原理：在 `URL` 中使用带有 `#` 符号的哈希值来管理路由。例如，`http://xxxx.com/#/path`。
  * 特点：当 `URL` 的哈希值发生变化时，浏览器不会向服务器发送请求，而是通过监听 `hashchange` 事件来进行路由导航。
  * 优点：支持在所有现代浏览器中运行，包括旧版本的浏览器，且不需要后端服务器的特殊配置。
  * 缺点：`URL` 中包含 `#` 符号，可能不太美观，同时在搜索引擎优化`（SEO）`方面不如 `History` 模式。
### History 模式（mode: history）
  * 原理：使用 `HTML5 History API`（`pushState`、`replaceState` 和 `popstate` 事件）来管理路由。
  * 特点：使用 `URL` 中的路径来管理路由，例如 `http://xxxx.com/path`。当 `URL` 发生变化时，浏览器会向服务器发送请求。因此，在使用此模式时，服务器需要配置相应的路由规则，以确保在刷新页面或直接访问 `URL` 时能正确响应路由。
  * 优点：`URL` 看起来更干净，没有 `#` 符号更加美观，在 `SEO` 方面表现更好。
  * 缺点：需要后端服务器支持，否则直接访问子路由可能会返回 404 错误。
### Abstract 模式（mode: abstract）
  * 原理：使用一个虚拟的 `URL` 管理路由。
  * 特点：不依赖于 `URL`，可以用于非浏览器环境，例如 `Node.js` 服务器端渲染。
  * 优点：可以用于非浏览器环境，例如 `Node.js` 服务器端渲染。
  * 缺点：不支持 `HTML5 History API`，需要后端服务器支持。

## 路由跳转
在 `vue-router` 中，你可以定义路由规则，并通过编程式或声明式的方式实现路由跳转。
### 声明式导航
声明式导航主要使用 `<router-link>` 组件来实现。`<router-link>` 会被渲染成一个 `<a>` 标签，点击该标签会触发路由跳转。
```vue
<router-link to="/home">Home</router-link>
<router-link to="/about">About</router-link>
```
在上面的例子中，`to` 属性指定了目标路由的地址。点击链接时，浏览器会导航到相应的路由。

### 编程式导航
编程式导航使用 `router` 实例的 `push` 或 `replace` 方法来实现路由跳转。
```js
// 使用 push
this.$router.push('/some-path')
// 或者使用对象形式的路由描述
this.$router.push({ name: 'user', params: { userId: 123 }})

// 使用 replace
this.$router.push('/some-path')
// 或者使用对象形式的路由描述
this.$router.push({ name: 'user', params: { userId: 123 }})

// 使用 replace
this.$router.replace('/some-path')

// 使用 go
this.$router.go(-1) // 返回上一页
this.$router.go(1) // 前进到下一页

// 使用 back
this.$router.back() // 返回上一页

// 使用 forward
this.$router.forward() // 前进到下一页
```
> push 方法会向历史记录中添加一个新的条目，而 replace 方法则会替换当前的历史记录条目。

## 路由传参
vue-router 提供了几种不同的路由传参方式，这些方式允许你在组件之间传递数据。以下是主要的传参方式及其示例：

### 1. URL 参数（路由参数）
* 定义路由： 在定义时可以在路径中使用动态段（以冒号开头）来接收参数。

```js
const routes = [
  { path: '/user/:id', component: User }
];
```
* 导航到路由：使用 `router.push` 方法或 `<router-link>` 组件导航到带有参数的路由。

```js
// 编程式导航
this.$router.push('/user/123');

// 声明式导航
<router-link to="/user/123">Go to User</router-link>
```
* 在组件中获取参数：在目标组件中，你可以通过 `$route.params` 来获取传递的参数。

```js
export default {
  mounted() {
    const userId = this.$route.params.id;
    console.log(userId); // 输出：123
  }
};
```
### 2. 查询参数
* 导航到路由：查询参数是附加在 URL 末尾的键值对。

```js
// 编程式导航
this.$router.push({ path: '/user', query: { id: 123 } });

// 或者
this.$router.push('/user?id=123');

// 声明式导航
<router-link :to="{ path: '/user', query: { id: 123 } }">Go to User</router-link>

// 或者
<router-link to="/user?id=123">Go to User</router-link>
```
* 在组件中获取参数：在目标组件中，你可以通过 $route.query 来获取查询参数。

```js
export default {
  mounted() {
    const userId = this.$route.query.id;
    console.log(userId); // 输出：123
  }
};
```
### 3. 通过 props 传递参数
* 定义路由：你可以在路由配置中设置 props 选项，以将路由参数或查询参数作为 props 传递给组件。

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    props: true // 将路由参数作为 props 传递
  }
];
```
或者，你可以使用函数模式来自定义 props：
```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    props: (route) => ({ userId: route.params.id })
  }
];
```
* 在组件中接收 props：在目标组件中，你可以像处理普通 props 一样处理这些参数。

```js
export default {
  props: ['id'], // 或者 ['userId'] 如果你在路由配置中使用了函数模式
  mounted() {
    console.log(this.id); // 输出：123
  }
};
```
### 注意事项
* 当使用 URL 参数时，如果路由参数是可选的，确保你的组件能够处理参数不存在的情况。
* 查询参数可以添加任意数量的键值对，并且它们的顺序并不重要。
* 使用 props 传递参数可以使组件更加解耦和可重用，因为它遵循了 Vue 的 props 传递机制。

## 路由守卫
### 全局守卫：
  * 全局前置守卫（beforeEach） 【全局前置守卫在每次路由切换前触发】
  ```js
  const router = new VueRouter({ ... })

  router.beforeEach((to, from, next) => {
    // 在路由切换前执行的操作
    console.log('Global beforeEach guard:', to.path, '->', from.path)

    // 检查用户是否登录
    if (to.meta.requiresAuth && !isUserLoggedIn()) {
      // 如果未登录且访问需要认证的页面，则跳转到登录页
      next('/login')
    } else {
      // 否则，继续导航
      next()
    }
  })
  ```
  * 全局解析守卫（beforeResolve） 【在每次路由切换前触发，但是不会在初始化时触发】
  ```js
  router.beforeResolve((to, from, next) => {
      console.log('Global beforeResolve guard:', to.path, '->', from.path)
      // 这里可以进行一些数据预加载或其他准备操作
      next()
  })
  ```
  * 全局后置钩子（afterEach）【在每次路由切换后触发】
  ```js
  router.afterEach((to, from) => {
      console.log('Global afterEach guard:', to.path, '->', from.path)
      // 这里适合做一些分析、记录日志等操作
  })
```
### 路由独享守卫 （beforeEnter） 【仅对特定路由生效】
```js
const router = new VueRouter({
routes: [{
    path: '/profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      console.log('Route-specific beforeEnter guard:', to.path)
      // 可以根据需要进行权限检查或其他逻辑
      next()
    }  
  }]
})
```
### 组件内守卫：
  * beforeRouteEnter 【在进入组件时触发 】
  * beforeRouteUpdate 【在更新当前路由组件时触发 】
  * beforeRouteLeave 【在离开当前路由组件时触发】
```js
beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter:', to.path)
    // 不能访问 `this`，因为守卫在导航确认前被调用
    // 可以通过 `next(vm => {})` 将回调传递给下一个钩子
    next(vm => {
      // 初始化操作
    })
},
beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate:', to.path)
    // 当路由参数变化但组件被复用时调用，可以访问 `this`
    next()
},
beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave:', to.path)
    // 导航离开该组件的对应路由时调用
    // 可以进行清理工作
    next()
}
```

## 路由配置
### 路由路径：
  * 静态路径：/home
  * 动态路径：/user/:id
### 路由参数：
  * 动态路径参数：/user/:id
  * 查询参数：/user?id=1
  * 路由路径和参数的组合：/user/:id/profile
### 路由名称：
  * 给路由配置一个名称，可以通过 this.$route.name 访问

## 动态路由
### 定义动态路由：
  * 动态路径参数：/user/:id
  * 查询参数：/user?id=1
  * 路由路径和参数的组合：/user/:id/profile
### 访问动态路由：
  * 通过 this.$route.params.id 访问动态路径参数
  * 通过 this.$route.query.id 访问查询参数
  * 通过 this.$route.params.id 和 this.$route.query.id 访问动态路径参数和查询参数

## query 和 params 的区别
query 和 params 都是用于在路由之间传递数据的

### query
* 定义：query是URL中的一个可选部分，位于问号?后面，以键值对的形式存在，多个键值对之间用&分隔。例如：/path?name=value&age=25。
* 特点：
  - 不是路由路径的一部分，因此不会影响路由的匹配。
  - 可以用来传递非必需的、辅助性质的数据，如筛选条件、分页参数等。
  - 用户可以在浏览器地址栏直接修改query参数，这可能导致无意间改变应用状态，但同时也支持了分享和书签功能。
  - 在Vue Router中，可以通过this.$route.query访问。
### params
* 定义：params是路由的动态部分，通常用于定义动态路由，如/user/:id中的id。这些值被编码为URL路径的一部分。
* 特点：
  - 是路由路径的一部分，会影响路由的匹配，每个路由可以有预定义的一组params。
  - 更适用于必须的、与当前页面内容紧密相关的数据，如用户ID、文章ID等。
  - 用户不能直接修改URL中的params（除非通过导航或后退/前进操作），这使得它更适合控制应用状态。
  - 在Vue Router中，需要在路由配置中声明动态段，并通过this.$route.params访问。
### 总结
* 用途差异：如果你需要传递的数据是路由逻辑的一部分或者数据对于URL具有语义性，应该使用params。如果数据更多的是作为额外筛选条件或非核心信息，使用query更合适。
* 修改与共享：query便于用户直接修改和分享链接，而params则更多依赖于程序内部的导航来改变。
* 声明与访问：params需要在路由配置中声明，而query不需要。两者都可以在组件内通过this.$route对象访问，但访问的属性不同。

## 路由钩子在生命周期中的使用
### 完整的路由导航解析流程
* 触发进入其他路由。
* 调用要离开路由的组件守卫beforeRouteLeave
* 调用局前置守卫∶ beforeEach
* 在重用的组件里调用 beforeRouteUpdate
* 调用路由独享守卫 beforeEnter。
* 解析异步路由组件。
* 在将要进入的路由组件中调用 beforeRouteEnter
* 调用全局解析守卫 beforeResolve
* 导航被确认。
* 调用全局后置钩子的 afterEach 钩子。
* 触发DOM更新（mounted）。
* 执行beforeRouteEnter 守卫中传给 next 的回调函数
### 触发钩子的完整顺序
路由导航、keep-alive、和组件生命周期钩子结合起来的，触发顺序，假设是从a组件离开，第一次进入b组件∶
* beforeRouteLeave：路由组件的组件离开路由前钩子，可取消路由离开。
* beforeEach：路由全局前置守卫，可用于登录验证、全局路由loading等。
* beforeEnter：路由独享守卫
* beforeRouteEnter：路由组件的组件进入路由前钩子。
* beforeResolve：路由全局解析守卫
* afterEach：路由全局后置钩子
* beforeCreate：组件生命周期，不能访问tAis。
* created;组件生命周期，可以访问tAis，不能访问dom。
* beforeMount：组件生命周期
* deactivated：离开缓存组件a，或者触发a的beforeDestroy和destroyed组件销毁钩子。
* mounted：访问/操作dom。
* activated：进入缓存组件，进入a的嵌套子组件（如果有的话）。
* 执行beforeRouteEnter回调函数next。


## 路由懒加载
是一种优化技术，它允许你只在路由被访问时才加载对应的组件，而不是在应用程序启动时一次性加载所有组件。这可以显著减少初始加载时间和网络带宽消耗，特别是对于大型应用来说，提高了用户体验。以下是实现路由懒加载的方式：
```js
// 在路由配置中，使用动态导入语法
const routes = [
  {
    path: '/some/path',
    component: () => import('./components/SomeComponent.vue')
  }
]
// 使用函数式组件
const SomeComponent = () => import('./components/SomeComponent.vue')
const routes = [
  {
    path: '/some/path',
    component: SomeComponent
  }
]
const router = new VueRouter({ routes })
export default router
```

## 路由页面缓存
通过 `<keep-alive>` 组件来实现。`<keep-alive> `可以缓存不活动的组件实例，而不是销毁它们，使得组件在再次访问时能快速恢复状态，提高用户体验
1、使用 `<keep-alive>` 包裹 `<router-view>`,在主应用模板，vue 项目在 App.vue 文件中
```js
<template>
  <div id="app">
    <nav>
      <!-- 导航链接 -->
    </nav>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
```
2、控制组件缓存 在路由配置中，为需要缓存的组件添加 `meta` 属性，并设置 `keepAlive` 为 `true`
```js
const routes = [
  {
    path: '/home',
    component: Home,
    meta: {
      keepAlive: true // 设置为 true 表示需要缓存
    }
  },
  {
    path: '/about',
    component: About,
    meta: {
      keepAlive: false // 设置为 false 表示不需要缓存
    }
  }
]
```
3、动态控制缓存 有时可能需要根据条件动态决定是否缓存某个组件。可以在全局守卫中动态设置 `meta.keepAlive`
```js
router.beforeEach((to, from, next) => {
  // 根据某些条件动态设置 keepAlive
  if (to.name === 'SomePage' && someCondition) {
    to.meta.keepAlive = true
  } else {
    to.meta.keepAlive = false
  }
  next()
})
```
