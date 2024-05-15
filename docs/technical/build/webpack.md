### 基本概念及配置
- `Entry` 【工程的入口文件配置】
- `Output` 【打包的输出的文件配置】
- `Mode` 【区分开发环境和生成环境】
- `Loaders` 【文件转换，用于将各种类型的文件转换为 webpack 能够处理的有效模块】
    1. js或ts文件编译：`babel-loader`
    2. css样式处理：`css-loader`、`sass-loader`、`less-loader` 等
    3. `img` 或 `html` 文件：`file-loader`、`url-loader`、`html-loader`
- `Plugins` 【扩展功能，用于解决 Loaders 无法实现的特殊需求】
- `Optimization` 【策略配置，根据需要自定义优化构建打包的策略配置】

### Loaders 与 Plugins 的区别
`webpack` 在整个编译周期中会触发很多不同的事件，`plugin` 可以监听这些事件，并且可以调用 `webpack` 的 API 对输出资源进行处理。
`loader` 一般只能对源文件代码进行转换，而 `plugin` 可以做得更多。
`plugin` 在整个编译周期中都可以被调用，只要监听事件。
> 当链式调用多个 `loader` 的时候，会以相反的顺序执行。取决于数组写法格式，从右向左或者从下向上执行。

### 打包流程
1. 读取 `webpack` 的配置参数；
2. 启动 `webpack`，创建 `Compiler` 对象并开始解析项目；
3. 从入口文件（entry）开始解析，并找到其导入的依赖模块，递归遍历分析，形成依赖关系树；
4. 对不同文件类型的依赖模块文件使用对应的 `Loader` 进行编译，最终转为Javascript文件；
5. 整个过程中 `webpack` 会通过发布订阅模式，向外抛出一些hooks，而 webpack 的插件即可通过监听这些关键的事件节点，执行插件任务进而达到干预输出结果的目的。
> 最终 `Webpack` 打包出来的 `bundle` 文件是一个执行函数。

## 打包优化点
- 减少模块体积
  1. `Tree Shaking`: 确保你的ES6模块使用了静态导入，以便 `Webpack` 可以执行树摇操作，移除未使用的代码。
  2. 代码分割: 使用 `import()` 或 `splitChunks` 插件进行动态导入和代码拆分，将代码分割成按需加载的 `chunks` 。
  3. 压缩: 在生产环境中启用 `terser-webpack-plugin` 进行JavaScript压缩，减小文件大小。
- 提升构建速度
  1. 多核编译: 利用`thread-loader`与 `HappyPack` 或`webpack-parallel-uglify-plugin` 等插件，实现多进程并行编译。
  2. 持久化缓存: 使用 `cache-loader` 和 `hard-source-webpack-plugin` 来缓存编译结果，加速二次构建。
  3. 增量构建: 确保 `Webpack` 配置支持热更新(Hot Module Replacement, HMR)，减少全量构建需求。
- 优化资源处理
  1. 图片与字体: 使用 `url-loader` 和 `file-loader`，并设置适当的文件大小限制，将小资源转为 `Base64` 内联，减少 `HTTP` 请求。
     1. CSS与样式: 利用 `mini-css-extract-plugin` 提取 `CSS` 到单独文件，启用`css-loader` 的模块化特性，并使用 postcss-loader 配合 `Autoprefixer`自动添加浏览器前缀。
  2. 懒加载: 对非首屏依赖的资源采用懒加载策略，如图片和部分JS模块。
- 性能监控
  1. 分析工具: 使用 `webpack-bundle-analyzer` 可视化打包结果，识别体积大的模块。
  2. `Source Map`: 生产环境下使用 `source-map` 或 `cheap-module-source-map` 保持调试信息，但注意这会增加构建产物的大小。
- 配置优化
  1. `externals`: 将不经常变动的大型库（如React, Vue）通过 `CDN` 引入，并在`Webpack` 配置中声明为 `external`，避免打入 `bundle`。
  2. `resolve.alias`: 为常用模块设置别名，缩短解析路径，加快编译速度。
  3. `Mode`: 确保在生产环境中使用 `mode: 'production'`，`Webpack` 会自动应用一系列优化。
- 持续集成优化
  1. CI/CD集成: 在持续集成流程中集成 `Webpack` 构建，确保每次提交都能得到优化的输出。
  2. 构建报告: 生成详细的构建报告，监控每次构建的性能变化。
