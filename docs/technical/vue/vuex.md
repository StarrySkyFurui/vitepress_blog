`Vuex` 是 `Vue` 的一个状态管理库，它提供了一种集中式的方式来管理应用程序的状态。`Vuex` 可以帮助我们更好地组织和管理应用程序的状态，使得状态的传递和修改更加方便和可预测。

## 安装
使用 `npm` 安装 `Vuex`：
```bash
npm install vuex --save
```

## 核心概念
* State: 单一数据源，存放应用的所有状态。
* Getter: 计算属性，用于从 `Store` 的 `State` 中派生出一些状态。
* Mutation: 更改 `State` 的唯一途径，必须是同步函数。
* Action: 提交 `Mutation` ，可以包含任意异步操作。 

关系上，`Actions` 通过 commit 调用 `Mutations` 来改变 `State` ，`Getters` 则依赖于 `State` 计算得出新值，组件通过 `mapState、mapGetters、mapActions` 等辅助函数与 `Store` 交互。

## State

在 `Vuex` 中，`State` 表示应用程序的状态，它是一个对象，包含了应用中的全部数据。我们可以通过 `this.$store.state.` 属性名来访问 `State` 中的数据。但是，我们不能直接修改 `State` 中的状态，而是需要通过提交 `mutation` 来修改状态。

## Getter
`Getter` 是 `Vuex` 中的计算属性，它可以从State中派生出一些状态。我们可以通过 `this.$store.getters.getterName` 来访问 `Getter`。但是，`Getter` 不能直接修改 `State` 中的状态，而是需要通过提交 `mutation` 来修改状态。

## Mutation
`Mutation` 是 `Vuex` 中的更改状态的唯一方法。我们可以通过 `this.$store.commit('mutationName', payload)` 来提交 `Mutation`。`payload`是一个可选参数，用于传递给 `Mutation` 函数的参数。

## Action
`Action` 是 `Vuex` 中的异步操作，它可以通过 `commit` 提交 `Mutation` 来改变 `State`。我们可以通过 `this.$store.dispatch('actionName', payload)` 来提交 `Action`。`payload` 是一个可选参数，用于传递给 `Action` 函数的参数。

## 模块化管理

在 `Vuex` 中，我们可以通过模块（Module）来实现状态管理的模块化。每个模块拥有自己的 `State、Mutation、Action和Getter`，甚至可以嵌套子模块。通过将状态分割到不同的模块中，我们可以使代码更加清晰和易于维护。在创建 `Vuex` 实例时，我们可以通过 `modules` 选项来注册多个模块，并通过 `namespaced` 属性来控制模块是否具有独立的命名空间。如果设置了 `namespaced: true`，则模块内部的 `State、Mutation、Action 和Getter` 都会具有独立的命名空间，从而避免命名冲突的问题。

## 示例代码
在项目中创建一个 `store` 目录，并在其中创建一个 `index.js `文件来定义你的 `store。`
```js
// store/index.js
import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  },
  getters: {
    getCount: state => state.count
  }
})
```
在 `main.js` 中注册 `Vuex Store`
```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

const app = createApp(App)
app.use(store)
app.mount('#app')
```
在组件中使用 `Vuex` 状态和改变状态
```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

export default {
  setup() {
    const store = useStore()
    // 获取状态
    const count = computed(() => store.getters.getCount)
    // 调用 action 改变状态
    const increment = () => {
      store.dispatch('increment')
    }
    // 可选：如果你需要在组件挂载时执行某些操作，可以使用 onMounted 钩子
    onMounted(() => {
      console.log('Component mounted.')
    })
    return {
      count,
      increment
    }
  }
}
</script>
```