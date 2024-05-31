## 路由模式
* 哈希模式（mode: hash）
    * 使用 ` # `符号来改变URL，如 `http://example.com/#/home` 这种模式不需要服务器配置。
    * 通过监听 `hashchange` 事件来响应路由变化。
* History 模式（mode: history）
    * 使用 `/` 符号来改变URL，如 `http://example.com/home` 这种模式需要服务器配置处理直接的 URL 请求。
    * 通过 `HTML5` 的 `history.pushState()` 和 `history.replaceState()` 方法来改变 URL，并通过监听 `popstate` 事件来响应路由变化。
## 路由守卫
* 全局守卫：
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
* 路由独享守卫 （beforeEnter） 【仅对特定路由生效】
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
* 组件内守卫：
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
* 路由路径：
    * 静态路径：/home
    * 动态路径：/user/:id
* 路由参数：
    * 动态路径参数：/user/:id
    * 查询参数：/user?id=1
    * 路由路径和参数的组合：/user/:id/profile
* 路由名称：
    * 给路由配置一个名称，可以通过 this.$route.name 访问

## 动态路由
* 定义动态路由：
    * 动态路径参数：/user/:id
    * 查询参数：/user?id=1
    * 路由路径和参数的组合：/user/:id/profile
* 访问动态路由：
    * 通过 this.$route.params.id 访问动态路径参数
    * 通过 this.$route.query.id 访问查询参数
    * 通过 this.$route.params.id 和 this.$route.query.id 访问动态路径参数和查询参数

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
3、动态控制缓存 有时可能需要根据条件动态决定是否缓存某个组件。可以在全局守卫中动态设置 meta.keepAlive
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
