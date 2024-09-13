## mode 的作用
mode 属性用来指定当前的构建环境是：development、production 或者是 none。设置 mode 可以使用 webpack 内置的函数，默认值为 production。
### 作用
mode 属性的主要作用是：根据当前的构建环境，启用 webpack 内置在该环境下推荐的优化。
1. development
* 主要优化了增量构建速度和开发体验。
* process.env.NODE_ENV 的值设为 development。
* 启用热替换模块（Hot Module Replacement）。
* 启用开发工具（如调试源码的 source map）以更好地进行调试。
2. production
* 一些处理优化，以提升应用在生产环境的性能。
* process.env.NODE_ENV 的值设为 production。
* 启用代码压缩（例如 TerserPlugin）。
* 删除 dead code（通过 Tree Shaking）。
* 作用域提升等各种性能优化措施。
3. none
* mode 设置为 none 则不启用任何默认优化选项，process.env.NODE_ENV 也不会被设置，默认为 production。

## webpack-dev-server
webpack-dev-server 是一个开发服务器，它提供了一个快速开发的环境，并且配合Webpack使用。它的作用主要有以下几个方面：

### 自动编译和打包
webpack-dev-server 可以监听源文件的变化，当文件发生改动时，它会自动重新编译和打包，保证开发过程中始终使用最新的代码。

### 热模块替换（Hot Module Replacement）
webpack-dev-server 支持热模块替换，即在开发过程中，当某个模块发生变化时，只会重新编译该模块，而不是整个应用，然后将变更的模块替换到浏览器中，从而实现实时更新，无需手动刷新页面。

### 代理和反向代理
webpack-dev-server 可以配置代理，用于解决前端开发中跨域请求的问题。可以将某些请求转发到其他服务器，或者改变请求的路径。

### 路由处理
webpack-dev-server 也支持将所有请求重定向到特定的 HTML 文件，用于前端单页应用的路由处理，可以通过配置实现 SPA（Single Page Application）的路由。

### 静态文件服务
webpack-dev-server 可以将打包后的文件提供给浏览器访问，可以通过配置指定静态文件的路径，并且通过指定的端口提供服务。

总结来说，webpack-dev-server 提供了一个方便的开发环境，可以实时编译和打包代码，并且支持热模块替换，代理和反向代理，路由处理等功能，提高了开发效率和开发体验。

### webpack-dev-server并不适用于线上环境的原因

#### 性能问题
webpack-dev-server是一个开发服务器，它将编译后的文件保存在内存中，并提供给浏览器访问。这种方式在开发阶段可以提供快速的编译和热模块替换，但在线上环境中，内存中保存的文件无法持久化，每次启动服务器都需要重新编译和打包，这会影响性能，并且占用服务器资源。

#### 安全问题
webpack-dev-server并不进行代码压缩和混淆，源代码是以明文形式传输给浏览器的。这将使得攻击者可以很容易地获取到项目的源代码，从而可能导致安全漏洞。

#### 缺少文件输出
webpack-dev-server并没有生成最终的打包文件，它只是将打包后的文件保存在内存中，提供给浏览器访问。这样就无法进行资源的版本管理和持久化存储，无法做到长期的缓存和优化。

## webpack 打包时 hash 码是如何生成的
Webpack 在打包过程中生成 hash 码主要用于缓存和版本管理。主要有三种类型的 hash 码：

* hash：是和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改。这意味着任何一个文件的改动都会影响到整体的 hash 值。
* chunkhash：与 webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash 值。例如，如果你的配置生成了多个 chunk（例如使用了 code splitting），每个 chunk 的更新只会影响到它自身的 chunkhash。
* contenthash：根据文件内容来定义 hash，内容不变，则 contenthash 不变。这在使用诸如 CSS 提取到单独文件的插件时特别有用，因此只有当文件的内容实际改变时，浏览器才会重新下载文件。

### 生成方式：

* hash 和 chunkhash 主要是通过某种 hash 算法（默认 MD5）来对文件名或者 chunk 数据进行编码。
* contenthash 是通过构建时的 webpack 插件（如 mini-css-extract-plugin）来处理的，它会对文件内容进行 hash。
* Hash 码的生成可以被 webpack 配置的 hashFunction，hashDigest，hashDigestLength 等选项影响。例如，你可以选择不同的算法如 SHA256 或者 MD5，以及可以决定 hash 值的长度。

在 webpack 的配置文件中，可以通过如下方式设定 hash:
```js
output: {
  filename: '[name].[chunkhash].js',
  path: __dirname + '/dist'
}
```
这会将输出的文件名设置为入口名称加上基于每个 chunk 内容的 hash。在使用 webpack-dev-server 或者 webpack --watch 时，不会生成实际的文件，所以这些 hash 值是在内存中计算并关联的。

## Tree Shaking
Tree shaking 是指通过静态代码分析，识别和移除未被使用的代码（被称为"dead code"）的一种 JavaScript 代码的技术。它依赖于 ES6 的模块系统，即 import 和 export。

### 原理：
Tree Shaking 的基本原理是：通过静态分析，找出代码中未使用的部分并删除它们。它只关注代码的执行路径，而不是变量声明和函数调用。因此，它不会删除未使用的全局变量或函数，因为这些变量和函数可能在其他模块中被引用。

### webpack 如何做 Tree Shaking
Webpack通过 Tree Shaking技术实现了JavaScript代码的优化和精简。Tree shaking是指通过静态代码分析，识别和移除未被使用的代码（被称为"dead code"），从而减小最终打包后的文件大小。

* 代码标记：在代码中使用ES6模块化语法（如import和export）来明确指定模块的依赖关系。

* 代码解析：Webpack会解析整个代码，并构建一个依赖图谱，记录模块之间的依赖关系。

* 标记未使用代码：在构建依赖图谱的过程中，Webpack会标记那些未被使用的模块，以及这些模块中的未被使用的函数、类、变量等。

* 无副作用标记：Webpack还会检查模块的副作用（例如对全局变量的修改、网络请求等），并将没有副作用的代码视为可安全移除的。

* 未使用代码移除：在代码打包阶段，Webpack会根据标记的未使用代码信息，从最终的打包结果中移除这些未被使用的代码。

通过 Tree Shaking，Webpack可以减小打包后的文件大小，提高应用的加载速度和性能。但要注意的是， Tree Shaking只对ES6模块化的代码有效，对于CommonJS模块化的代码则无法进行优化。另外，有些代码可能由于复杂的依赖关系无法被正确地标记为未使用，这就需要开发者自己进行配置或使用其他工具进行优化。

### webpack 处理 Tree Shaking 配置

1. 在webpack.config.js文件中，将mode设置为production，这会启用Webpack的优化功能，包括 Tree Shaking。
```js
module.exports = {
  mode: 'production',
  // 其他配置...
};
```
2. 确保你的代码使用了ES6模块化语法（使用import和export），以便Webpack能够正确地进行静态代码分析。

3. 确保你的代码库中没有副作用。Webpack会假设没有副作用的代码可以安全地移除。如果你的代码确实有副作用，可以在webpack配置文件中的optimization选项中设置sideEffects为false 来告诉Webpack可以安全地进行 Tree Shaking。
```js
module.exports = {
  mode: 'production',
  optimization: {
    sideEffects: false,
  },
  // 其他配置...
};
```

### 副作用
副作用是指代码执行过程中对全局变量或网络请求等产生的影响。在ES6模块化中，如果一个模块有副作用，则该模块不会被Tree Shaking优化掉。因此，在编写模块化的代码时，应该尽量避免产生副作用，以减少不必要的代码被打包到最终的bundle文件中。

以下是一些常见的副作用示例：

* 修改全局变量或外部状态：函数修改了全局变量或外部状态，例如修改了一个共享的数组、对象或文件等。

* 发送网络请求：函数通过网络发送了一个HTTP请求，这会触发网络交互并产生副作用。

* 修改函数参数：函数修改了传入的参数值，这会影响函数外部的变量。

* 控制台打印：函数在执行过程中使用了console.log()或其他打印语句，这会在控制台中产生可观察到的输出。

* 异步操作：函数中包含了异步操作，例如定时器、Promise或通过回调函数实现的异步操作。

### 申明代码是有副作用
1. 在配置文件中指定副作用

在Webpack配置文件中，可以使用sideEffects选项来指定哪些文件或模块具有副作用，不允许清理。sideEffects接受一个正则表达式、一个文件名或一个数组。例如：
```js
module.exports = {
  //...
  optimization: {
    usedExports: true
  },
  mode: 'production',
  sideEffects: ["./src/some-module.js"]
};
```
在上面的例子中，sideEffects数组中的 `./src/some-module.js` 文件将会被标记为具有副作用，不会被清理。

> 为了使sideEffects选项生效，你需要在配置文件中启用optimization.usedExports选项，并将mode设置为production。

2. package.json 中配置 sideEffects 属性

可以在package.json文件中使用sideEffects字段来申明哪些文件或模块具有副作用，不允许被清理。

如果将sideEffects设置为布尔值false，表示所有导入的文件都被认为没有副作用，可以被tree shaking清理。这在大多数情况下是默认的行为。
```js
{
  "name": "my-package",
  "version": "1.0.0",
  "sideEffects": false
}
```
如果设置为布尔值true，表示所有导入的文件都被认为有副作用，不会被tree shaking清理。
```js
{
  "name": "my-package",
  "version": "1.0.0",
  "sideEffects": true
}
```
如果将sideEffects设置为一个数组，数组中的每个元素可以是一个字符串或一个正则表达式，表示具有副作用的文件或模块。
```js
{
  "name": "my-package",
  "version": "1.0.0",
  "sideEffects": [
    "./src/some-module.js",
    "/\.css$/"
  ]
}
```
在上述示例中，./src/some-module.js文件和所有以.css结尾的文件都被认为有副作用，不会被tree shaking清理。