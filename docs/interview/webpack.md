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