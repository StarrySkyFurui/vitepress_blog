## Vite 如何按需加载
* `Vite` 默认情况下会按需（又称懒加载）加载模块，特别是对于 `JavaScript` 模块。当用户首次访问一个页面时，`Vite` 只会加载该页面所依赖的代码，而不是一次性加载整个应用程序。这种行为是通过动态导入 `import()` 来实现的。然而，对于 `CSS`，`Vite` 通常会将所有 `CSS` 一次性打包进主 `bundle`，除非你特别配置。
  
## Vite 如何处理静态资源
1. 自动导入与转换
图片和字体：`Vite` 支持自动导入和转换图片、字体等静态资源。当你在 `JavaScript` 或 `CSS` 中使用 `import` 语句导入这些资源时，`Vite` 会自动处理它们，生成合适的 `URL` 或 `Base64` 编码。
```js
import imgUrl from './img.png';
document.getElementById('img').src = imgUrl;
```
在开发环境，`Vite` 会提供快速的本地服务；而在生产环境中，它会根据配置进行优化，比如图片压缩和资源指纹。

2. 静态资源目录
`public` 目录：`Vite` 提供了一个名为 `public` 的目录，放置在这个目录下的文件不会经过任何编译步骤，直接映射到构建输出的根目录下。这对于存放不需要经过 `Webpack` 或 `Vite` 处理的静态资源非常有用，如 `.html, .css, .png, .jpg` 等。
3. 资源版本控制
资源指纹：`Vite` 支持资源指纹（也称为哈希命名），在生产环境中，为了缓存管理和避免旧资源被浏览器缓存，`Vite` 会自动为静态资源添加哈希值到文件名中，确保每次资源变动时 `URL` 都会改变。
4. 静态资源优化
压缩和分割：`Vite` 在构建时会对静态资源进行压缩，减少文件大小，同时支持将大文件分割成小块，以提高加载速度。
5. 配置
配置文件：可以通过 `vite.config.js` 配置文件进一步定制静态资源的处理方式，比如指定别名、调整加载器选项、增加额外的插件等。

## 开发环境和生产环境下的区别
### 开发环境（Development）
* 快速启动<br/>
    `Vite` 利用 `ES` 模块的原生能力，通过 `HTTP` 服务器提供服务，实现了近乎即时的热重载（HMR，Hot Module Replacement）。这意味着更改代码后几乎可以立即看到效果，极大地提升了开发效率。
* 按需编译<br/>
    在开发过程中，`Vite` 只编译你正在查看或修改的模块，而不是整个项目，这使得开发服务器响应迅速。
* 源码调试<br/>
    `Vite` 提供源码级别的调试，因为它直接服务于未打包的源代码，使得调试更加直观。
* 代理设置<br/>
    可以方便地配置代理以解决跨域问题，便于开发时对接后端 API。
* 自动导入 CSS 和静态资源处理<br/>
    `Vite` 自动处理 `CSS` 预处理器和静态资源的导入，无需额外配置即可实时查看样式变化。

### 生产环境（Production）
* 构建优化<br/>
    在生产环境下，`Vite` 会执行完整的构建过程，包括代码的压缩、模块的合并、静态资源的优化（如图片压缩、资源指纹）、CSS提取等，以减小文件体积和提高加载速度。
* 静态资源处理<br/>
    所有静态资源会根据配置进行处理，例如添加资源指纹，以支持缓存策略和防止缓存问题。
* Tree Shaking<br/>
    `Vite` 利用 `Rollup` 作为其构建工具，默认开启 `Tree Shaking`，移除未使用的代码，进一步减小最终包的大小。
* 静态文件服务器<br/>
    生产构建后的应用需要部署到静态文件服务器上，`Vite` 不再提供开发时的热更新服务，而是作为一个静态资源服务器提供服务。
* 环境变量替换<br/>
    `Vite` 支持环境变量的注入，可以通过 `.env` 文件区分开发和生产环境的配置，例如 API地址等。

## Vite 如何处理 CSS 预处理器
* `Vite` 支持直接处理 `CSS预处理器`，如 `Sass (SCSS), Less 和 Stylus`。以下是使用 `Vite` 配置和处理 `CSS预处理器` 的步骤：
1. 安装依赖
首先，需要安装对应的预处理器加载器和预处理器库。例如，如果你选择 `SCSS` 作为预处理器，你需要安装 `@vitejs/plugin-vue` 和 `sass` 或 `node-sass`
```bash
npm install --save-dev @vitejs/plugin-vue sass
```
2. 配置 Vite
在项目根目录下的 `vite.config.js` 文件中，需要配置 `Vite` 来处理 `SCSS` 文件。通常添加一个插件来处理 `SCSS` 文件的转换：
```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import preprocess from 'svelte-preprocess';

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // 如果需要配置额外的选项，比如引入自定义文件路径
        additionalData: `@import "path/to/your/global/scss/_variables.scss";`,
      },
    },
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.d.ts', '.svelte', '.scss'],
  },
});
```
3. 在 `Vue` 组件中直接使用 `SCSS` 或者在独立的 `SCSS` 文件中编写，在组件中导入
```vue
<template>
  <!-- ... -->
</template>
<script></script>
<style lang="scss">
// 你的 SCSS 代码
</style>

// 或者以下写法
<template>
  <!-- ... -->
</template>
<script></script>
<style src="@/styles/your-style.scss" lang="scss"></style>
```
4. 编译与热更新
* 启动 `Vite` 开发服务器，`Vite` 就会处理 `SCSS` 文件，并将其转换为普通的 `CSS`，并提供热更新，并供浏览器使用
> 如果使用的是 `Less` 或 `Stylus`，只需将配置文件中的 `scss` 替换为相应的预处理器名称，并安装对应的预处理器库即可。

## Vite 如何处理 TypeScript
* Vite 默认支持 `TypeScript`，你可以在项目中使用 `TypeScript` 编写代码。在配置文件中，你可以设置 `tsconfig.json` 文件来配置 `TypeScript` 编译选项。

## Vite 中如何优化构建性能
1. 分析构建产物
使用 `vite build --report` 或者配置` build.report` 为 `true`，生成构建报告。这有助于识别体积较大的模块，进而进行针对性优化。
2. 压缩静态资源
确保 `build.minify `设置为 `true`（默认开启），`Vite` 会自动压缩 `JavaScript` 和 `CSS`。
3. 拆分 chunk
利用代码拆分`（code splitting）`功能，通过动态导入` (import() 表达式)` 来按需加载代码，避免将所有代码打包到一个大文件中。
配置 `build.rollupOptions.output.manualChunks`，手动指定模块的拆分规则，以进一步优化 `chunk` 分割。
4. 树摇（Tree Shaking）
`Vite` 使用 `Rollup` 作为构建工具，默认支持 `Tree Shaking`。确保你的代码和依赖库支持这一特性，避免导入不需要的模块。
5. CSS 优化
使用 `CSS` 模块化，避免全局样式冲突，同时 `Vite` 支持 `CSS Tree Shaking`。
配置 `build.cssCodeSplit` 为 `true`（默认开启），将 `CSS` 提取到单独的文件中，以便并行加载。
6. 静态资源处理
确保图片和其他静态资源被正确优化，比如使用 `vite-imagetools` 插件自动压缩图片。
合理配置 `build.assetsDir`，指定静态资源输出目录，便于管理和 CDN部署。
7. 环境变量与条件编译
使用环境变量控制生产环境和开发环境的特定逻辑，避免不必要的代码进入生产环境。
利用 `vite.config.js` 中的条件配置，根据环境调整构建策略。

## Vite 的热更新机制

1. 快速启动与原生 ES 模块支持
`Vite` 利用浏览器对原生 ES 模块的支持，直接从开发服务器加载模块。这使得 `Vite` 能够启动服务并提供快速的模块更新，为热更新打下基础。
2. WebSocket 通讯
`Vite` 通过开发服务器和浏览器之间建立的 `WebSocket` 连接，实现实时通讯。当开发服务器监测到文件系统中有文件变化时，它会通过 `WebSocket` 向浏览器推送更新通知。
3. 模块热替换
接收到更新通知后，`Vite` 的客户端逻辑会决定如何处理这些变化。对于可以热替换的模块（如组件或样式更改），它会直接在运行时替换这些模块的内容，而无需刷新页面。
对于状态管理，`Vite` 会尽量保持应用状态，只更新受影响的部分，从而保持用户界面的连续性。
4. 自动导入处理
`Vite` 在开发环境中对自动导入（如 CSS、图片等）的处理也非常高效，这些资源的更新同样可以通过 `HMR` 实现即时反馈，无需手动刷新页面。
5. 错误处理与友好提示
如果热更新过程中遇到错误，`Vite` 会提供友好的错误提示，并在必要时建议刷新页面。这有助于开发者快速定位并解决问题。
6. 框架集成
`Vite` 与 `Vue`、`React` 等前端框架深度集成，充分利用框架的 `HMR API`，确保框架组件和状态的热替换更加平滑。
7. 无缝过渡至生产构建
虽然热更新主要针对开发环境，`Vite` 的设计确保了从开发到生产的无缝过渡。在生产构建时，它会自动关闭 `HMR` 相关功能，转而进行优化的静态资源打包。