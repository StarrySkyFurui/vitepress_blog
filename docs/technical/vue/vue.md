## Vue 的响应式原理

Vue 的响应式基于数据劫持结合发布订阅模式。Vue 在初始化时遍历 data 选项中的所有属性，并使用 Object.defineProperty来监听数据的访问和修改。当数据发生变化时，Vue 会通知相关依赖进行更新，从而实现视图的自动更新。这一过程涉及到了Dep、Watcher等核心机制。

## Vue 的组件生命周期
   
* Vue2 包含created（创建阶段） mounted（挂载阶段）, updated（更新阶段）, beforeDestroy（销毁阶段）等生命周期钩子。
* Vue3 对生命周期进行了调整，移除了部分生命周期钩子，如beforeCreate和destroyed，并引入了新的onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted等。
  
| Vue2 | Vue3 |
| :----  | :---- |
| beforeCreate | 使用 setup() |
| created | 	使用 setup() |
| beforeMount | onBeforeMount |
| mounted | onMounted |
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated |
| beforeDestroy | onBeforeUnmount |
| destroyed | onUnmounted |

Vue 实例有⼀个完整的⽣命周期，也就是从开始创建、初始化数据、编译模版、挂载Dom -> 渲染、更新 -> 渲染、卸载 等⼀系列过程，称这是Vue的⽣命周期。 

1. beforeCreate（创建前） ：数据观测和初始化事件还未开始，此时 data 的响应式追踪、event/watcher 都还没有被设置，也就是说不能访问到data、computed、watch、methods上的方法和数据。 
2. created（创建后） ：实例创建完成，实例上配置的 options 包括 data、computed、watch、methods 等都配置完成，但是此时渲染得节点还未挂载到 DOM，所以不能访问到 `$el` 属性。 
3. beforeMount（挂载前） ：在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置：编译模板，把data里面的数据和模板生成html。此时还没有挂载html到页面上。 
4. mounted（挂载后） ：在el被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html 页面中。此过程中进行ajax交互。 
5. beforeUpdate（更新前） ：响应式数据更新时调用，此时虽然响应式数据更新了，但是对应的真实 DOM 还没有被渲染。 
6. updated（更新后）：在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。此时 DOM 已经根据响应式数据的变化更新了。调用时，组件 DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。 
7. beforeDestroy（销毁前） ：实例销毁之前调用。这一步，实例仍然完全可用，`this` 仍能获取到实例。
8. destroyed（销毁后） ：实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务端渲染期间不被调用。 


## v-if / v-show 的区别
`v-if` 和 `v-show` 是两个用于控制元素显示与隐藏的指令，但它们的工作方式和性能特点有所不同。
#### v-if
`v-if` 是一个“真正”的条件渲染，因为它会确保在切换过程中，条件块内的事件监听器和子组件适当地被销毁和重建。
`v-if` 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
* 工作方式：
    * 当 `v-if` 的表达式返回 `true` 时，对应的元素会被渲染到 `DOM` 中。
    * 当 `v-if` 的表达式返回 `false` 时，对应的元素会从 `DOM` 中被移除。

* 性能特点：
    * 由于涉及 `DOM` 的添加和删除，`v-if` 会有较高的开销。
    * 适用于不经常切换条件的场景。

#### v-show
`v-show` 简单地基于 `CSS` 进行切换。无论初始条件是什么，元素总是会被渲染，并且只是简单地基于 `CSS` 进行切换。
* 工作方式：
    * 无论 `v-show` 的表达式是 `true` 还是 `false`，对应的元素都会存在于 `DOM` 中。
    * 通过改变元素的 `CSS display` 属性来控制元素的显示与隐藏。

* 性能特点：
    * 由于不涉及 `DOM` 的添加和删除，`v-show` 有更高的性能。
    * 适用于频繁切换显示/隐藏状态的场景。
#### 总结
* 如果你有非常频繁地切换，并且元素的初始渲染开销较大，那么 `v-show` 是更好的选择。
* 如果在初始渲染时条件很少改变，或者条件改变时元素的开销较小，那么 `v-if` 更合适。

## v-for 中的 key
在 `Vue.js` 中，`v-for` 指令用于渲染一个列表的数据。当使用 `v-for` 来遍历数组或对象时，`Vue` 会基于数据的变化来更新 `DOM`。为了提高性能，`Vue `提供了一个 `key` 属性，用于跟踪每个节点的身份，从而重用和重新排序现有元素。

#### key 的作用
* 性能优化
    * 避免不必要的重新渲染：使用 `key` 可以帮助 `Vue` 识别哪些元素是稳定的，哪些元素发生了变化，从而避免不必要的重新渲染。
    * 提高列表渲染性能：当列表数据发生变化时，`Vue` 会根据 `key` 来判断哪些元素需要被创建、更新或销毁，从而提高渲染效率。

* 状态保持
    * 使用 `key` 可以确保每个元素都有一个唯一的标识，这样在数据变化时，`Vue` 能够准确地找到对应的元素并更新其状态。

> 当遍历数组时，`key` 应该绑定到数组中的每个元素的唯一标识符上。

#### key 的注意事项
* 必须唯一：`key` 的值必须是唯一的，否则 `Vue` 无法确定是更新还是重新渲染元素。
* 避免使用索引作为 `key`：使用索引作为 `key` 可能会导致性能问题，因为索引是动态的，可能会导致重新渲染整个列表。
* 避免使用动态生成的元素作为 `key`：动态生成的元素没有唯一的标识，可能会导致性能问题。

#### 总结
在 `Vue` 的 `v-for` 指令中使用 `key` 是一个重要的性能优化手段。通过为每个元素提供一个唯一的 `key`，`Vue` 能够更高效地更新和重用 `DOM` 元素，从而提高应用程序的响应速度和性能。在使用 `key` 时，应尽量避免使用不稳定的值，如数组的索引，而是使用元素的唯一标识符或稳定的属性组合。

#### 运用场景

* 当需要进行数值计算,并且依赖于其它数据时，应该使用 `computed`，因为可以利用 `computed` 的缓存特性，避免每次获取值时都要重新计算。
* 当需要在数据变化时执行异步或开销较大的操作时，应该使用 `watch`，使用 `watch` 选项允许执行异步操作 ( 访问一个 API )，限制执行该操作的频率，并在得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

## Vue 中父子组件间通信
   
* Props: 父组件通过 props 向下传递数据给子组件。子组件不能修改传入的 props。是最常见的单向数据流方式。
```vue
<!-- 父组件 -->
<template>
  <div>
    <child-component :message="parentMessage"></child-component>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  data() {
    return {
      parentMessage: 'Hello from parent!'
    }
  }
}
</script>
```
```vue
子组件
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>
```

* Custom Events (自定义事件): 子组件通过 $emit 触发事件，父组件监听该事件处理数据，并在触发时执行相应的方法，实现子向父的通信。
```vue
<!-- 子组件 -->
<template>
  <button @click="notifyParent">Notify Parent</button>
</template>

<script>
export default {
  methods: {
    notifyParent() {
      this.$emit('childEvent', 'Hello from child!');
    }
  }
}
</script>
```
```vue
<!-- 父组件 -->
<template>
  <div>
    <child-component @childEvent="handleChildEvent"></child-component>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  methods: {
    handleChildEvent(message) {
      console.log(message); // 输出 "Hello from child!"
    }
  }
}
</script>

```

* Refs: 尽管不推荐频繁使用 refs 进行父子组件间的通信，但在某些情况下，如需要直接访问子组件的 DOM 元素或子组件实例时，可以使用 refs。
```vue
<!-- 父组件 -->
<template>
  <div>
    <child-component ref="childRef"></child-component>
    <button @click="focusOnChild">Focus on Child</button>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  methods: {
    focusOnChild() {
      this.$refs.childRef.focus(); // 假设子组件有一个 focus 方法
    }
  }
}
</script>
```
```vue
<!-- 子组件 -->
<template>
  <input ref="inputRef">
</template>

<script>
export default {
  methods: {
    focus() {
      this.$refs.inputRef.focus();
    }
  }
}
</script>
```
  
* Provide/Inject: 在开发高阶插件/组件库时，祖先组件向下提供变量，子孙组件可以注入使用，不论组件层次有多深，该依赖都始终可用，实现跨级传递。

```vue
<!-- 组件组件 -->
<template>
  <div>
    <grandchild-component></grandchild-component>
  </div>
</template>

<script>
import GrandchildComponent from './GrandchildComponent.vue';

export default {
  components: {
    GrandchildComponent
  },
  provide() {
    return {
      theme: 'dark'
    }
  }
}
</script>
```
```vue
<!-- 子孙组件 -->
<template>
  <div>{{ theme }}</div>
</template>

<script>
export default {
  inject: ['theme'],
  mounted() {
    console.log(this.theme); // 输出 "
  }
}
</script>
```

* Vuex: 使用全局状态管理，适用于多个组件共享状态的情况。

## keep-alive 组件缓存
在 `Vue` 中，`<keep-alive>`  是一个内置的抽象组件，它允许你把不活跃的组件实例保存在内存中，而不是销毁它们。当组件在 `<keep-alive>`  内被切换，它的激活和停用状态会被 `Vue` 相应地触发。当组件在 `<keep-alive>`  内时，它的所有子组件也都会被缓存。

使用 `<keep-alive>`  可以提高性能，特别是当组件包含复杂的 `DOM` 结构或大量的计算属性时。因为组件的重新渲染和重建 `DOM` 可以是一个昂贵的操作，所以通过缓存组件实例，我们可以避免这些开销。

#### keep-alive 的参数(include,exclude)

* include(包含): 名称匹配的组件会被缓存-->include的值为组件的name。
* exclude(排除): 任何名称匹配的组件都不会被缓存。
* max - 数量 决定最多可以缓存多少组件。

#### 基本用法
使用 `<keep-alive>`  作为包裹元素，直接包裹需要缓存的组件：
```vue
<keep-alive>
  <component :is="view"></component>
</keep-alive>
```
在上面的例子中，view 是一个动态组件，它的值会改变，但 `<keep-alive>`  会确保切换组件时，之前不活跃的组件实例不会被销毁，而是被缓存起来。

#### 与 `<router-view>` 结合使用
在 Vue Router 中，`<router-view>`  组件用于渲染当前路由对应的组件。如果你想缓存某些路由组件，你可以将 `<keep-alive>`  包裹 `<router-view>` ：
```vue
<keep-alive>
  <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
```
在这个例子中，`<router-view>`  的渲染取决于 `$route.meta.keepAlive` 的值。你可以在路由配置中设置这个值来决定哪些路由需要被缓存：
```js
const routes = [
  {
    path: '/foo',
    component: Foo,
    meta: { keepAlive: true }
  },
  {
    path: '/bar',
    component: Bar,
    meta: { keepAlive: false }
  }
]
```
通过这种方式，你可以根据需要缓存的路由组件，来决定哪些组件会被缓存。

#### 生命周期钩子
当组件在 `<keep-alive>`  中时，它有两个特有的生命周期钩子：activated 和 deactivated。
> 只有组件被keep-alive包裹时，这两个生命周期函数才会被调用，如果作为正常组件使用，是不会被调用的
* activated：当组件被激活时调用，例如从路由的缓存中恢复时。
* deactivated：当组件被停用时调用，例如切换路由离开组件时。
  
```js
export default {
  activated() {
    // 组件被激活时执行的代码
  },
  deactivated() {
    // 组件被停用时执行的代码
  }
}
```

#### 注意事项
* 使用 `exclude` 排除之后，就算被包裹在 `keep-alive` 中，这两个钩子函数依然不会被调用！在服务端渲染时，此钩子函数也不会被调用。
* `<keep-alive>`  包裹动态组件时，会缓存不活跃的组件实例，而不是销毁它们。这可能会导致内存占用增加，特别是在移动端设备上。因此，应该谨慎使用，并只在必要时缓存组件。
* 默认情况下，`<keep-alive>`  会缓存所有包裹的组件实例。如果只想缓存某些组件，可以配合 `v-if` 或者路由的 `meta` 字段进行条件渲染。
* 使用 `<keep-alive>`  时，如果组件中有异步操作（如 API 请求），应确保在组件停用时清理这些操作，避免潜在的内存泄漏或状态不一致问题。

通过合理地使用 `<keep-alive>` ，你可以优化 `Vue` 应用的性能，提高用户体验。

## $nextTick 原理及作用
`$nextTick` 是一个实例方法，用于在 `DOM` 更新循环结束之后执行延迟回调。在修改数据之后立即使用它，然后等待 `DOM` 更新。它返回一个 `Promise` 对象，因此你可以在异步函数中方便地使用它。

#### 原理
`Vue.js` 的响应式系统在其内部使用异步队列来更新 `DOM`。当数据发生变化时，`Vue` 并不会立即执行 `DOM` 更新，而是将更新任务推入一个队列中，等待下一个事件循环（tick）进行批量处理。这样做的好处是可以提高性能，避免不必要的计算和 `DOM` 操作。

`$nextTick` 的原理是：它会将回调函数放入微任务队列（或宏任务队列，取决于 Vue 的版本和配置），并在当前执行栈完成后执行这些回调。这时，`Vue` 已经完成了 `DOM` 更新，因此你可以安全地在回调中访问和操作最新的 `DOM` 状态。

## Vue 的 slot 的理解和使用场景
`Vue` 中的`slot`（插槽）是一种用于分发内容的机制，它允许在组件模板中定义可插入的内容区域，并在使用组件时，通过插槽将具体的内容传递给这些区域。`slot`使得组件模板更加灵活和可复用。

关于`slot`的使用场景，主要包括以下几个方面：

多个页面使用同一组件但需要展示不同内容：当多个页面或组件需要使用同一个组件模板，但展示的内容有所差异时，可以使用`slot`来实现。通过在子组件模板中定义插槽，父组件可以根据需要插入不同的内容。

组件需要根据父组件的属性或状态动态展示内容：当组件需要根据父组件的某些属性或状态来展示不同的内容时，可以使用具名插槽。具名插槽允许在子组件模板中定义多个插槽，每个插槽对应不同的内容区域，父组件可以根据需要选择性地插入内容到对应的插槽中。

父组件需要在多个位置插入子组件的内容：有时候，父组件需要在子组件的多个位置插入内容，这时可以使用多个插槽来实现。通过在子组件模板中定义多个插槽，父组件可以在需要的位置插入对应的内容。

### 示例代码
`Vue3` 中插槽的示例：
#### 默认插槽
默认插槽是最基本的插槽类型，当在父组件中没有指定插槽的名字时，内容会被渲染到默认插槽中
```vue
<!-- 子组件 -->
<template>
  <div>
    <slot></slot>
  </div>
</template>

```
#### 具名插槽
具名插槽允许你在子组件中定义多个插槽，并在父组件中通过 slot 属性的值来指定内容应该渲染到哪个插槽。
```vue
<!-- 子组件 -->
<template>
  <div>
    <header>
      <slot name="header"></slot> <!-- 具名插槽：header -->
    </header>
    <main>
      <slot></slot> <!-- 默认插槽 -->
    </main>
    <footer>
      <slot name="footer"></slot> <!-- 具名插槽：footer -->
    </footer>
  </div>
</template>
```
#### 作用域插槽
作用域插槽允许你将数据从子组件传递到父组件的插槽内容中。在子组件的插槽标签上，你可以使用 v-slot 指令来接收传递的数据。
```vue
<!-- 子组件 -->
<template>
  <div>
    <slot name="item" v-for="item in items" :item="item">
      <!-- 插槽的默认内容 -->
      <p>{{ item.text }}</p>
    </slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { text: 'Item 1' },
        { text: 'Item 2' },
        { text: 'Item 3' }
      ]
    }
  }
}
</script>

```

```vue
<!-- 父组件 -->
<template>
  <ChildComponent>
    <!-- 具名插槽 header -->
    <template v-slot:header>
      <h1>这是头部内容</h1>
    </template>
    <!-- 默认插槽 -->
    <p>这是默认插槽的内容</p>
    <template v-slot:footer>
      <p>这是底部内容</p>
    </template>
    <!-- 作用域插槽 item -->
    <template v-slot:item="{ item }">
      <!-- 使用作用域插槽接收的数据 -->
      <h2>{{ item.text }}</h2>
    </template>
  </ChildComponent>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  }
}
</script>
```
在上面的作用域插槽示例中，子组件通过 `v-for` 遍历 `items` 数组，并为每个 `item` 创建了一个具名插槽 `item`。父组件通过 `v-slot:item="{ item }"` 来定义这个具名插槽，并接收子组件传递的 `item` 对象。然后父组件就可以根据这个 `item` 对象来渲染不同的内容。


## computed 和 watch 的区别
在 Vue.js 中，computed 和 watch 是两种用于响应式地观察和更新数据的方法，但它们在使用场景、触发时机和性能优化等方面存在明显的区别。

### computed（计算属性）
computed 是基于依赖进行缓存的计算属性。只有当其依赖的响应式数据发生变化时，才会重新计算并返回结果。如果依赖数据没有发生变化，则直接返回缓存的结果，不会执行计算过程。这使得 computed 属性非常适合用于处理复杂逻辑或开销较大的计算。

特点：
* 基于依赖缓存：只有当依赖的数据发生变化时，才会重新计算。
* 声明式：以声明的方式定义依赖和计算逻辑。
* 更适合复杂逻辑：适合处理需要多个数据共同参与计算的场景。

#### 示例代码：

```Vue
<template>
  <div>
    <p>原始价格：{{ price }}</p>
    <p>折扣：{{ discount }}</p>
    <p>计算后的价格：{{ discountedPrice }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: 100,
      discount: 0.8
    };
  },
  computed: {
    discountedPrice() {
      return this.price * this.discount;
    }
  }
};
</script>
```
在上面的示例中，discountedPrice 是一个计算属性，它依赖于 price 和 discount。只有当这两个数据之一发生变化时，discountedPrice 才会重新计算。

### watch（侦听器）
watch 用于观察和响应 Vue 实例上的数据变化。当需要在数据变化时执行异步操作或开销较大的操作时，可以使用 watch。watch 是一个对象，其键是要观察的表达式（字符串形式），值是一个回调函数。当表达式的值发生变化时，回调函数会被调用。

特点：

响应式观察：当观察的数据发生变化时，执行回调函数。

适合异步或开销较大操作：可以在数据变化时执行异步请求或复杂的逻辑处理。

显式定义观察逻辑：需要显式地定义要观察的数据和回调函数。

#### 示例代码：

```Vue
<template>
  <div>
    <input v-model="searchText" placeholder="搜索...">
    <ul>
      <li v-for="item in searchResults" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      searchResults: []
    };
  },
  watch: {
    searchText(newVal, oldVal) {
      // 模拟异步搜索操作
      setTimeout(() => {
        // 根据新的搜索文本更新搜索结果
        this.searchResults = this.performSearch(newVal);
      }, 500);
    }
  },
  methods: {
    performSearch(text) {
      // 这里可以添加实际的搜索逻辑，返回搜索结果
      return [{ id: 1, name: '结果1' }, { id: 2, name: '结果2' }];
    }
  }
};
</script>
```
在上面的示例中，我们使用了 watch 来观察 searchText 的变化。当用户在输入框中输入文本时，searchText 的值会发生变化，从而触发 watch 中的回调函数。在回调函数中，我们模拟了一个异步搜索操作，并在搜索完成后更新 searchResults。

### 总结
* computed 适用于基于依赖进行缓存的计算，适用于处理复杂逻辑或开销较大的计算。当依赖数据发生变化时，会重新计算并返回结果；如果依赖数据没有变化，则直接返回缓存的结果。
* watch 适用于观察和响应数据变化，适用于在数据变化时执行异步操作或开销较大的操作。需要显式地定义要观察的数据和回调函数。

## assets 和 static的区别

#### 相同点
`assets` 和 `static` 两个都是存放静态资源文件。项目中所需要的资源文件图片，字体图标，样式文件等都可以放在这两个文件下。
#### 区别
`assets` 中存放的静态资源文件在项目打包时，也就是运行 `npm run build` 时会将 `assets` 中放置的静态资源文件进行打包上传，所谓打包简单点可以理解为压缩体积，代码格式化。而压缩后的静态资源文件最终也都会放置在 `static` 文件中跟着 `index.html` 一同上传至服务器。`static` 中放置的静态资源文件就不会要走打包压缩格式化等流程，而是直接进入打包好的目录，直接上传至服务器。因为避免了压缩直接进行上传，在打包时会提高一定的效率，但是 `static` 中的资源文件由于没有进行压缩等操作，所以文件的体积也就相对于 `assets` 中打包后的文件提交较大点。在服务器中就会占据更大的空间。
#### 总结
将项目中 `template`需要的样式文件、js文件等都可以放置在 `assets` 中，走打包这一流程。减少体积。而项目中引入的第三方的资源文件如 `iconfont.css` 等文件可以放置在 `static` 中，因为这类第三方文件已经经过处理，不再需要处理，直接上传。

## Vue3 的新特性
1. Composition API
* Composition API 是 Vue3 引入的一组新的 API，它允许用户更加灵活地组织和重用代码逻辑。通过使用 setup 函数和 ref、reactive 等响应式函数，用户可以更加直观地管理组件的状态和行为。允许你将组件的逻辑拆分成多个函数，每个函数负责处理一个特定的功能，使得代码更加模块化和可维护性更高。
* Composition API 还提供了更好的类型推断和错误提示，使得开发更加轻松。
  
2. 更好的 TypeScript 支持
* Vue3 在内部实现上更加贴近 TypeScript，提供了更好的类型检查和代码提示功能。

3. 更好的性能
* Vue3 使用了 Proxy 替代了 Vue2 中的 Object.defineProperty，这使得数据劫持的性能得到了显著提升。

4. 更好的 Tree-Shaking 支持
* Vue3 引入了 Tree-Shaking 特性，使得打包后的代码体积更小，并且只包含用户实际使用的组件和功能。

5. 更好的代码组织
* Vue3 引入了新的文件组织方式，使得代码更加模块化和可维护性更高。

6. 更好的组件选项
* Vue3 引入了新的组件选项，如 emits、expose 等，使得组件的定义和用法更加清晰和简洁。

7. 更好的全局 API
* Vue3 引入了新的全局 API，如 provide/inject、createApp 等，使得开发全局功能和插件更加方便和高效。

8. 更好的插件系统
* Vue3 引入了新的插件系统，使得插件的编写和注册更加方便和灵活。
  

## vue2 与 vue3 的区别

### 1. 双向数据绑定原理
* Vue2 使用 Object.defineProperty 实现响应式，而 Vue3 采用了 ES6 的 Proxy 来替换原本的响应式实现，这带来了更精确的变更检测和更好的性能。
* Proxy 可以直接监听对象和数组的变化，而无需像 Vue2 那样通过额外的工具函数来处理数组。
  
### 2. API 变化
* Vue2 使用选项式API，如data(), methods, computed, watch等。
* Vue3 引入了组合式API，使用setup()函数，允许更模块化和可复用的代码结构，ref和reactive用于创建响应式数据。

### 3. 生命周期钩子
* Vue2 包含created, mounted, updated, beforeDestroy等生命周期钩子。
* Vue3 对生命周期进行了调整，移除了部分生命周期钩子，如beforeCreate和destroyed，并引入了新的onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted等。
  
| Vue2 | Vue3 |
| :----  | :---- |
| beforeCreate | 使用 setup() |
| created | 	使用 setup() |
| beforeMount | onBeforeMount |
| mounted | onMounted |
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated |
| beforeDestroy | onBeforeUnmount |
| destroyed | onUnmounted |

Vue 实例有⼀个完整的⽣命周期，也就是从开始创建、初始化数据、编译模版、挂载Dom -> 渲染、更新 -> 渲染、卸载 等⼀系列过程，称这是Vue的⽣命周期。 
1、beforeCreate（创建前） ：数据观测和初始化事件还未开始，此时 data 的响应式追踪、event/watcher 都还没有被设置，也就是说不能访问到data、computed、watch、methods上的方法和数据。 
2、created（创建后） ：实例创建完成，实例上配置的 options 包括 data、computed、watch、methods 等都配置完成，但是此时渲染得节点还未挂载到 DOM，所以不能访问到 `$el` 属性。 
3、beforeMount（挂载前） ：在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置：编译模板，把data里面的数据和模板生成html。此时还没有挂载html到页面上。 
4、mounted（挂载后） ：在el被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html 页面中。此过程中进行ajax交互。 
5、beforeUpdate（更新前） ：响应式数据更新时调用，此时虽然响应式数据更新了，但是对应的真实 DOM 还没有被渲染。 
6、updated（更新后）：在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。此时 DOM 已经根据响应式数据的变化更新了。调用时，组件 DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。 
7、beforeDestroy（销毁前） ：实例销毁之前调用。这一步，实例仍然完全可用，`this` 仍能获取到实例。
8、destroyed（销毁后） ：实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务端渲染期间不被调用。 

### 4. 模板语法
* Vue2 的模板语法基本保持不变，但v-if和v-for的优先级有所不同。
* Vue3 支持在模板中使用 `<script setup>` 标签，允许更简洁的模板语法。
  
### 5. 响应式系统
* Vue2 使用v-model指令处理表单双向绑定。
* Vue3 引入v-model的v-model:前缀，以区分不同类型的绑定，例如v-model:text，v-model:number等。
  
### 6. 新特性
* Vue3 引入了Teleport，允许将组件渲染到文档的其他位置。在处理全局元素，如弹窗、提示、加载指示器等需要脱离当前组件层次结构的情况时可以使用。
```vue
<teleport to="#target-element">
    <!-- 这里的内容会被渲染到指定的#target-element位置 -->
</teleport>
```
* Vue3 支持在 `<style>` 标签中使用CSS变量。
```vue
<template>
  <div :class="['container', { dynamicColor: useDynamicColor }]">
    <button @click="toggleColor">Toggle Color</button>
    <p class="text">Hello, World!</p>
  </div>
</template>
<script>
import { ref } from 'vue';
export default {
  setup() {
    const useDynamicColor = ref(false);
    const toggleColor = () => {
      useDynamicColor.value = !useDynamicColor.value;
    };
    return {
      useDynamicColor,
      toggleColor,
    };
  },
};
</script>
<style scoped>
.container {
  /* 定义CSS变量 */
  --primary-color: #3f51b5;
}
.text {
  /* 使用CSS变量 */
  color: var(--primary-color);
}
.dynamicColor .text {
  /* 当动态类存在时，覆盖CSS变量 */
  --primary-color: var(--dynamic-color);
}
/* 在JavaScript中动态改变CSS变量 */
:root {
  --dynamic-color: {{ useDynamicColor ? '#f44336' : '#3f51b5' }};
}
</style>
```
* `Vue3` 允许有多个根节点，通过`Fragment`组件实现。
  
### 7. 性能优化
* Vue3 由于Proxy的使用，响应式系统的性能有所提升。
* Vue3 更小的体积和更快的初始渲染速度。

### 8. 兼容性
* `Vue2` 需要 `ES5` 环境，不支持原生 `async/await`。
* `Vue3` 支持原生 `async/await`，但需要现代浏览器或 `Babel` 转译。

### 9. 组件通信
* `Vue2` 支持通过 `props`和`events`进行组件通信。
* `Vue3` 支持通过 `emits` 和 `provide/inject` 进行组件通信。

## Options API与 Composition API
#### `Vue2`的 Options API
`Vue2`中的Options API是围绕生命周期钩子和可配置的选项（如data, methods, computed, watch等）构建组件的一种方式。它的特点包括：

* 数据定义：在data函数中定义组件状态。
* 计算属性与侦听器：使用computed定义计算属性，使用watch监听数据变化并执行相应逻辑。
* 方法：在methods中定义可复用的功能函数。
* 生命周期钩子：通过created, mounted, updated, beforeDestroy等钩子函数管理组件的生命周期。

#### `Vue3`的 Composition API
`Vue3`引入了Composition API作为可选的编程模型，它提供了一种更灵活的方式来组织和复用逻辑。主要特点如下：

* 组合逻辑：使用setup()函数作为组件的入口点，可以在其中声明组件所需的所有响应式状态、计算属性、方法等，无需关注生命周期钩子的顺序。
* 更清晰的状态管理：通过ref和reactive等函数创建响应式数据，使得状态管理更加直观。
* 重用逻辑：可以轻松地将逻辑封装到可复用的函数或Composition Functions中，提高代码的模块化和可维护性。
* 更好的类型推断：得益于更结构化的代码，TypeScript的支持更加自然，提高了开发效率。

## setup 函数及 setup 语法糖

`setup()` 函数是 `vue3` 中专门为组件提供的新属性。它为我们使用 `vue3` 的 `Composition API` 新特性提供了统一的入口, setup 函数会在 `beforeCreate` 、`created` 之前执行, `vue3` 中取消了这两个钩子，统一用· 代替, 该函数相当于一个生命周期函数，`vue` 中过去的 `data`、`methods`、`watch`等全部都写在`setup()`函数中

`setup()` 接收两个参数 `props` 和 `context`。它里面不能使用 `this`，而是通过 `context` 对象来代替当前执行上下文绑定的对象，context 对象有四个属性：`attrs`、`slots`、`emit`、`expose`
里面通过 `ref` 和 `reactive` 代替以前的 `data` 语法，`return` 出去的内容，可以在模板直接使用，包括变量和方法。
```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    // 使用 ref 创建一个响应式引用
    const count = ref(0);

    // 定义一个方法来增加 count 的值
    const increment = () => {
      count.value++;
    };

    // 返回响应式状态和方法，使它们可以在模板中使用
    return {
      count,
      increment
    };
  }
};
</script>
```
`Vue3` 也提供了对 `setup` 的语法糖支持，它使得我们可以在组件的 `<script setup>` 标签中直接编写 `setup` 函数的逻辑，而不需要显式地写出 `setup` 函数。这种语法糖让代码更加简洁和直观。
```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
<script setup>
import { ref } from 'vue';
// 使用 ref 创建响应式引用
const count = ref(0);
// 定义增加 count 的方法
const increment = () => {
  count.value++;
};
</script>
```

## reactive 和 ref 的区别
在 `Vue3` 的 `Composition API` 中，`reactive` 和 `ref` 都是用于创建响应式数据的工具，但它们之间存在一些重要的区别：

#### 1. 返回值类型
* `ref` 主要用于包裹基本类型值（如数字、字符串、布尔值等），将其包装成一个对象，这样就可以使基本类型值也具有响应式。访问时需要通过.value来获取或设置值。
```js
   const count = ref(0);
   console.log(count.value); // 访问值
   count.value++; // 修改值
```
* `reactive` 用于处理对象或数组等复杂类型。它直接返回一个响应式代理对象，该对象可以直接访问其属性，而不需要像 `ref` 那样通过 `.value` 访问。
```js
const state = reactive({ count: 0 });
console.log(state.count); // 访问值
state.count++; // 修改值
```

#### 2. 响应性
`ref` 和 `reactive` 都创建响应式数据，当这些数据发生变化时，与之相关的组件或计算属性会重新渲染或重新计算。

#### 3. 使用场景
* 当你需要对基本类型数据进行响应式处理时，通常使用 `ref`。
* 当你需要对复杂类型数据（如对象、数组等）进行响应式处理时，通常使用 `reactive`。
  
#### 4. 性能
`ref` 创建的响应式对象，在访问属性时，会自动进行解包操作，不需要手动添加 `.value`。而 `reactive` 创建的响应式对象，在访问属性时，需要手动添加 `.value`。

#### 5. 兼容性
* `ref` 创建的响应式对象，在 `Vue2` 和 `Vue3` 中都可以使用。
* `reactive` 创建的响应式对象，在 `Vue3` 中可以使用，在 `Vue2` 中需要使用 `Vue.observable()` 进行兼容。

#### 6. 嵌套响应性：
* 使用 `reactive` 创建的对象时，其嵌套的对象也会自动变为响应式的。
* `ref` 创建的响应式对象，如果嵌套的对象本身不是响应式的，那么嵌套的对象不会变为响应式的。

## 自定义指令
首先，在你的 `Vue3` 项目中创建一个 directives 文件夹（如果尚未存在），并在其中创建一个名为 hasPermission.ts 的文件。然后，编写如下代码来定义你的自定义指令：
```ts
// src/directives/hasPermission.ts
import { DirectiveBinding } from 'vue';

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    const hasPermission = checkPermission(binding.value);

    if (!hasPermission) {
      el.style.display = 'none';
      // 或者移除元素以避免占用DOM但不可见：el.parentNode?.removeChild(el);
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding<string>) {
    // 在权限改变时更新显示状态
    const hasPermission = checkPermission(binding.value);

    if (hasPermission) {
      el.style.display = ''; // 显示元素
    } else {
      el.style.display = 'none'; // 隐藏元素
    }
  },
};

function checkPermission(permissionKey: string): boolean {
  // 实现你的权限检查逻辑，比如从 Vuex store、全局变量或API获取用户权限信息
  // 假设有一个全局函数或变量可以进行权限验证
  // 示例：
  // return userPermissions.includes(permissionKey);
  return true; // 这里需要替换为实际的权限验证逻辑
}
```
接下来，在 main.ts 中导入并注册你的自定义指令：
```ts
// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import hasPermissionDirective from './directives/hasPermission';

const app = createApp(App);

app.directive('has-permission', hasPermissionDirective);

app.mount('#app');
```
然后，在需要使用自定义指令的组件中，使用 has-permission 指令即可：
```vue
<template>
  <button v-hasPermission="'edit'">编辑</button>
</template>
```
在这个例子中，checkPermission 函数需要根据你的应用程序实际情况实现，它应该能够访问到用户的权限信息并根据这些信息返回 true 或 false。这可能涉及到从 Vuex store 获取状态，或者使用其他方式来检查用户权限。


## hooks 和 mixins 的区别
hooks（钩子）和 Mixins（混入）在 Vue 中都是用于代码复用的机制，但它们之间存在显著的区别。以下是它们之间的一些主要差异：

### 1. 语法和用法：

hooks：在 `Vue3` 的 Composition API 中引入，是一种函数式编程的方式。它们允许你以函数的形式定义和复用组件的逻辑。通过将相关的逻辑和状态封装为自定义的 Hook 函数，可以提高代码的可读性和可维护性。

Mixins：在 `Vue2` 中引入，是一种对象混入机制。Mixins 允许你将可复用的逻辑封装为对象，并将其混入到多个组件中。然而，这种方式可能导致命名冲突或不可预料的行为，因为混入的对象会与组件本身的属性和方法进行合并。

### 2. 组合性和灵活性：

hooks：通过允许开发者根据逻辑功能来组合和复用代码，提供了更高的组合性和灵活性。你可以根据需要创建自定义的 Hook 函数，并在多个组件中重复使用它们。

Mixins：虽然也提供了一定的代码复用能力，但由于其基于对象的合并方式，可能导致命名冲突和难以追踪的依赖关系。

### 3. 响应式系统：

hooks：在 `Vue3` 的 Composition API 中，hooks 与新的响应式系统紧密集成。通过使用 reactive 和 ref 等函数，可以精确地控制组件的更新和依赖追踪。

Mixins：在 `Vue2` 中，响应式系统是基于对象的，而 Mixins 并没有为响应式系统提供特别的优化或改进。

### 4. 清晰性和可读性：

hooks：通过将组件的逻辑拆分为独立的函数，hooks 使得组件的逻辑更加清晰和可读。你可以很容易地查看和理解每个 Hook 函数的功能。

Mixins：由于 Mixins 是基于对象的合并，当多个 Mixins 被混入同一个组件时，可能会导致代码逻辑变得复杂和难以维护。

### 5. Vue 版本支持：

hooks：是 `Vue3` 的主要特性之一，是 Composition API 的核心组成部分。

Mixins：主要在 `Vue2` 中使用，虽然 `Vue3` 仍然支持它，但推荐使用 Composition API 和 hooks 来编写更清晰和可维护的代码。

总结来说，hooks 和 Mixins 都是 Vue 中用于代码复用的机制，但 hooks 提供了更高级的函数式编程方式，具有更高的组合性、灵活性和可读性。在 `Vue3` 中，推荐使用 Composition API 和 hooks 来编写组件逻辑。


`vue3` 引入了 `<script setup>` 语法糖，可以简化 `setup()` 函数的使用。在 `<script setup>` 内部定义的变量和方法，可以直接在模板中使用，无需通过 `setup()` 函数返回。这种语法糖让代码更加简洁和直观。

`<script setup>` 语法糖的优点包括：

* 简化代码，提高开发效率。
* 自动导入 `vue` 相关模块，无需手动引入。
* 自动处理 `props` 和 `context`，无需手动处理。

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// 使用 ref 创建响应式引用
const count = ref(0);

// 定义一个方法来增加 count 的值
const increment = () => {
  count.value++;
};
</script>
```
> 请注意，要使用 `<script setup>`，你需要在构建配置中启用相应的插件或 `loader`（比如 `@vue/compiler-sfc`），并且确保你的开发环境支持 `Vue3`。
