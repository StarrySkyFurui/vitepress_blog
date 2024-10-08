## 微前端的理解

## 微前端架构一般是如何做 JavaScript 隔离?
在微前端架构中，JavaScript 隔离是核心之一，用以确保各个子应用间代码运行时不互相干扰、变量不冲突，以及能够安全地卸载应用。为了实现这一目标，主要采用以下几种方法：

1. 使用沙箱技术：
iframe：最直接的隔离方式是将子应用运行在iframe中。这种方式提供了良好的隔离性，因为iframe内部有自己独立的执行环境，包括 JavaScript 运行环境和 DOM 环境。但iframe的使用可能会导致性能问题，且父子通信复杂。
JavaScript Sandboxing：通过创建一个独立的 JavaScript 执行环境，比如使用 Web Workers，或者更高级的沙箱库（如 Google 的 Caja），以在主页环境隔离执行 JavaScript 代码。
2. 命名空间和模块化：
命名空间：通过命名空间（Namespace）封装每个子应用的代码，确保全局变量和函数不会与其他应用冲突。
模块化：利用 ES Modules 或 CommonJS 等模块化标准，使代码封装在模块中运行，通过 import/export 管理依赖，减少全局变量的使用，从而实现隔离。
3. 状态管理隔离：
虽然主要关注 JavaScript 代码的隔离，但在单页应用中，子应用间状态管理（如使用 Redux、Vuex 等状态管理库）也可能导致隔离问题。可以为每个子应用创建独立的状态树，只通过明确定义的接口来共享必要的状态信息。
4. 使用微前端框架或库：
模块联邦（Module Federation）：Webpack 的模块联邦功能允许不同的前端应用共享 JavaScript 模块，同时保持应用间的隔离。它可以动态地加载另一个应用导出的模块，而不需要将它们打包进单个文件里。
专门的微前端框架：如 Single-SPA、Qiankun 等，这些框架提供了一套完整的解决方案，用于管理微前端应用的加载、卸载以及相互隔离，部分内部采用了类似沙箱的技术实现隔离。
5. 服务端渲染（SSR）隔离：
通过服务端渲染各个微前端应用，再将渲染好的静态 HTML 集成到主应用中。这样，每个子应用的 JavaScript 在客户端激活（Hydration）之前是隔离的。SSR 可以减少初次加载时间，同时具备部分隔离性，尤其是在初次加载阶段。
实施 JavaScript 隔离时，需要根据具体项目需求、技术栈和团队的熟练度来选取合适的隔离策略，以确保子应用之间的高度独立性和可维护性。

###  Qiankun 是如何做 JS 隔离的

Qiankun 是一个基于 Single-SPA 的微前端实现库，它提供了比较完善的 JS 隔离能力，确保微前端应用间的独立运行，避免了全局变量污染、样式冲突等问题。Qiankun 实现 JS 隔离的主要机制包括：

1. JS 沙箱
Qiankun 使用 JS 沙箱技术为每个子应用创建一个独立的运行环境。沙箱有以下两种类型：

快照沙箱（Snapshot Sandbox）：在子应用启动时，快照并记录当前全局环境的状态，然后在子应用卸载时，恢复全局环境到启动前的状态。这种方式不会对全局对象进行真正的隔离，而是通过记录和恢复的方式避免全局环境被污染。

Proxy 沙箱：通过 Proxy 对象创建一个全新的全局对象代理，子应用的所有全局变量修改操作都将在这个代理对象上进行，从而不会影响到真实的全局对象。这种方式提供了更为彻底的隔离效果，是 Qiankun 中推荐的沙箱隔离方式。

2. 动态执行 JS 代码
Qiankun 通过动态执行 JS 代码的方式加载子应用，避免了脚本直接在全局环境下执行可能导致的变量污染。具体来说，它可以动态获取子应用的 JS 资源，然后在沙箱环境中运行这些代码，确保代码执行的全局变量不会泄露到主应用的全局环境中。

3. 生命周期隔离
Qiankun 给每个子应用定义了一套生命周期钩子，如 bootstrap、mount、unmount 等，确保在应用加载、激活和卸载的过程中正确管理和隔离资源。通过在 unmount 生命周期钩子中正确清理子应用创建的全局监听器、定时器等，进一步保证了不同子应用间的独立性和隔离性。

4. 样式隔离
虽然主要针对 JS 隔离，Qiankun 也提供了样式隔离机制，通过动态添加和移除样式标签，保证子应用样式的独立性，避免不同子应用间的样式冲突。

通过以上机制，Qiankun 能够有效实现微前端架构中子应用的 JS 隔离，加强了应用间的独立性和安全性，使得不同子应用可以无缝集成在一起，同时又能够保持各自的运行环境独立不受影响。

