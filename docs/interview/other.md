## 通知用户版本更新刷新页面

在每次打包生产代码时，在 public 目录下生成一个 version.json 版本信息文件，页面跳转时请求服务器端的 version.json 中的版本号和浏览器本地缓存的版本号进行对比，从而监控版本迭代更新，实现页面自动更新，获取新的 index.html 文件（前提是服务器端对 index.html 和 version.json 不缓存）。

1. 首先应该禁止浏览器缓存 index.html 和 version.json
```nginx
location /index.html {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
    add_header Pragma "no-cache";
    add_header Expires 0;
}
location /version.json {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
    add_header Pragma "no-cache";
    add_header Expires 0;
}
```
2. 编写 Vite 插件实现打包时自动生成版本信息
新建文件 src/plugins/versionUpdatePlugin.ts
```ts
// src/plugins/versionUpdatePlugin.ts
import fs from "node:fs";
import path from "node:path";

import type { ResolvedConfig } from "vite";

function writeVersion(versionFile: string, content: string) {
  // 写入文件
  fs.writeFile(versionFile, content, (err) => {
    if (err) throw err;
  });
}

export default (version: string | number) => {
  let config: ResolvedConfig;
  return {
    name: "version-update",
    configResolved(resolvedConfig: ResolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig;
    },
    buildStart() {
      // 生成版本信息文件路径
      const file = config.publicDir + path.sep + "version.json";
      // 这里使用编译时间作为版本信息
      const content = JSON.stringify({ version });
      if (fs.existsSync(config.publicDir)) {
        writeVersion(file, content);
      } else {
        fs.mkdir(config.publicDir, (err) => {
          if (err) throw err;
          writeVersion(file, content);
        });
      }
    },
  };
};
```
3. 在 vite.config.ts 中使用插件
对于使用 TypeScript 的开发者来说，请确保在 env.d.ts 或 vite-env.d.ts 文件中添加类型声明，以获得类型检查以及代码提示。
```ts
// vite-env.d.ts
declare const __APP_VERSION__: string
```
配置 vite.config.js
```ts
import versionUpdatePlugin from "./src/plugins/versionUpdatePlugin";

export default defineConfig(({ mode }) => {
    ...
    const now = new Date().getTime();
    return {
        ...
        define: {
        __APP_VERSION__: now,
        },
        plugins: [
        vue(),
        versionUpdatePlugin({
            version: now,
        }),
        ],
        ...
    };
});
```
4. 路由跳转时，实时检测版本
检测到新版本自动刷新页面，应该使用前置守卫，在跳转失败报错前检测，跳转失败不会触发后置守卫
```ts
// router/index.ts
import { Modal } from "ant-design-vue";
...
// 这里在路由全局前置守卫中检查版本
router.beforeEach(async () => {
  console.log("路由守卫");
  await versionCheck();
});

// 版本监控
const versionCheck = async () => {
  // if (import.meta.env.MODE === "development") return;
  // const response = await axios.get("version.json");
  const responseVersion = 1721114748501;
  // __APP_VERSION__  获取环境变量设置的值，判断是否与生成的版本信息一致
  console.log("__APP_VERSION__", __APP_VERSION__);
  if (__APP_VERSION__ !== responseVersion) {
    Modal.confirm({
      title: "版本更新提示",
      content: "检测到新版本，更新之后将能体验到更多好用的功能，是否现在更新？",
      onOk() {
        window.location.reload();
      },
      onCancel() {},
    });
  }
};
...
```

## 网站整体换肤
自定义主题 自己项目中使用的是 vue3 + vite + antdv + less，步骤如下：
antdv 的官网对于主题的切换是有说明的：[定制主题](https://3x.antdv.com/docs/vue/customize-theme-cn)

官网虽然没有提供 vite 方式修改主题的说明，但是举了vue cli ，webpack的例子，其实我们也能知道了，在 vite 中是差不多的，都是通过 less 中的modifyVars进行修改。试试
```js
css: {
  preprocessorOptions: {
    less: {
      modifyVars: {
        'primary-color': '#1DA57A',
        'link-color': '#1DA57A',
        'border-radius-base': '2px',
      },
      javascriptEnabled: true
    }
  }
}
```
想要实现动态切换主题，这里我使用一个vite插件：[vite-plugin-theme-preprocessor](https://github.com/GitOfZGT/vite-plugin-theme-preprocessor/blob/master/README.zh.md)
> 一个vite v2.0+插件，用于实现多个 less、sass 变量文件编译出多主题的 css，使得基于less、sass以及css modules的主题样式在线动态切换变得很简单。
根据仓库中的说明，我们需要先安装插件：
```bash
yarn add @zougt/vite-plugin-theme-preprocessor -D
yarn add path --save
```
> path是用来解析路径的，这在我们项目中很多地方都会用得到，同样。这里也需要。

然后我们需要在 vite.config.ts 中使用这个插件。
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import themePreprocessorPlugin from "@zougt/vite-plugin-theme-preprocessor";
...
export default defineConfig({
  plugins: [
    vue(),
    themePreprocessorPlugin({
      less: {
        // 各个主题文件的位置
        multipleScopeVars: [
          {
            scopeName: "theme-default",
            path: path.resolve("src/theme/default.less"), // 自定义主题样式文件路径 
          },
          {
            scopeName: "theme-dark",
            path: path.resolve("src/theme/dark.less"), // 自定义主题样式文件路径 
          },
        ],
      },
    }),
  ],
  // 开启less支持
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
  ...
})
```
上面，我们定义了两个主题分别是：theme-default与 theme-dark 以及对应主题文件的位置。

我们切换主题就靠主题文件了。

接下来我们需要创建这两个主题文件，并分别引入ant的样式文件，注意是less格式。
```less
// src/theme/default.less
@import "ant-design-vue/lib/style/themes/default.less";
// 上面引入了 antdv 核心样式文件，我们可以对其进行修改，覆盖原来的达到我们的目的。
// 这里不仅能修改变量还能修改样式
// 比如我修改以下
// 全局主色 黄色
@primary-color: #ffa618; 
// 链接色 青色
@link-color: #18ffb2; 
```
```less
// src/theme/dark.less
@import "ant-design-vue/lib/style/themes/dark.less";
// 全局主色 绿色
@primary-color: #1cce42; 
// 链接色 粉红色
@link-color: #c76f98;
```
然后，我们就可以进行主题切换的逻辑了！
在需要改变动态切换主题的文件中绑定事件，并引入
```js
import { toggleTheme } from "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils.js";
// 切换主题回调
const change = (value: boolean) => {
  // 如果开关打开，就切换为绿色主题，否则默认黄色主题
  if (value) {
    toggleTheme({
      scopeName: "theme-dark",
    });
    console.log("已切换为暗黑主题");
  } else {
    toggleTheme({
      scopeName: "theme-default",
    });
    console.log("已切换为默认主题");
  }
};
```

## node内存泄漏
内存泄漏是指程序在运行过程中，由于某些原因未能释放内存，导致内存占用不断增加，最终导致系统崩溃或崩溃后无法恢复。
### 常见的原因
* 1. 全局变量、闭包
    不当地使用全局变量或闭包可能导致对象无法被垃圾回收器回收。
* 2. 事件监听器
    添加的事件监听器，如果没有被正确移除，可能会导致内存泄露。
* 3. 计时器
    如 setInterval 创建的计时器如果一直没有被清除（clearInterval），将会持续占用内存。
* 4. DOM 元素
    如果 DOM 元素被创建后，没有正确地被移除，将会导致内存泄漏。
* 5. 大对象或集合
    如果创建了一个非常大的对象或集合，不断向大数组或对象中添加数据，并且没有及时释放，将会导致内存占用持续增长。
* 6. 第三方库
    使用第三方库时，如果库内部存在内存泄漏，也会导致整个应用出现内存泄漏。

### 解决方法
* 1. 使用闭包时，确保在不再需要时释放闭包中的变量。
* 2. 移除事件监听器，确保在不需要时移除事件监听器。
* 3. 清除计时器，确保在不需要时清除计时器。
* 4. 移除 DOM 元素，确保在不需要时移除 DOM 元素。
* 5. 及时释放大对象或集合，确保在不需要时释放大对象或集合。

## 低代码的理解
低代码是
一种开发模式，它允许开发者通过图形界面和少量的代码来构建应用程序，而无需深入了解编程语言和框架。这种模式的目标是提高开发效率，降低开发成本，并使非技术用户也能参与到应用程序的开发中。

低代码平台通常提供了一套可视化工具，如拖拽式界面设计器、表单生成器等，用户可以通过这些工具来创建应用程序的界面和逻辑。同时，低代码平台还提供了一些预定义的组件和模块，用户可以通过拖拽和配置来使用它们，从而快速构建出功能丰富的应用程序。
目前国内市面上比较流行的低代码平台有：
<!-- TODO: -->

### 低代码的产生背景
随着互联网技术的飞速发展，开发的技术栈趋于成熟后，企业对软件系统的需求日益增长，而传统的软件开发模式已经无法满足快速迭代和低成本的需求。因此，低代码平台应运而生，它通过简化开发流程，降低开发难度，提高开发效率，从而满足企业对软件系统的需求。

### 低代码的原理
可以通过配置化的低成本交互方式（主流是拖拽）加上少量的一些胶水代码，去满足一类应用的需求。这里笔者以发展更加成熟的B端低代码讲述，C端也是很类似，但是因为样式、动画等定制要求要比B端的复杂许多，所以目前前端低代码相对成熟的应用是在B端。低代码实现原理其实非常简单，就是先预置丰富的原子组件，通过拖拽选择所需组件在画板上进行位置的编排。之后，进行一些组件属性的设置。最终生产出一份jsonSchema或者供开发者二次开发的“源代码”，驱动用户端的内容渲染。

### 低代码的优缺点
#### 优点
1. 提高开发效率：低代码平台可以减少开发人员编写代码的时间，从而加快开发速度。
2. 降低开发成本：低代码平台通常提供了一些预定义的组件和模块，用户可以通过拖拽和配置来使用它们，从而降低开发成本。
3. 提高开发灵活性：低代码平台允许用户根据自己的需求进行定制，从而提高开发灵活性。
4. 适合非技术用户：低代码平台提供了一套可视化工具，如拖拽式界面设计器、表单生成器等，非技术用户也可以参与到应用程序的开发中。
5. 支持跨平台：低代码平台通常支持多种开发语言和框架，用户可以根据自己的需求选择合适的开发语言和框架。
#### 缺点
1. 限制灵活性：低代码平台通常提供了一些预定义的组件和模块，用户只能使用这些组件和模块，从而限制了开发灵活性。
2. 依赖平台：低代码平台通常依赖于特定的平台，用户需要购买或订阅平台服务，从而增加了成本。
3. 学习曲线：低代码平台提供了一套可视化工具，用户需要学习如何使用这些工具，从而增加了学习成本。
4. 代码质量：低代码平台生成的代码通常不如手工编写的代码质量高，因为低代码平台无法完全理解用户的需求和意图。
### 低代码适用场景
* 海报(不需要逻辑和交互)
* H5 运营活动页、问卷调查类页面(一次性页面，不需要后期维护)
* 汇报的演示大屏(fast)
* 中后台页面(需要逻辑和交互，但不需要复杂的业务逻辑)

### 低代码的挑战
* 代码质量：低代码平台生成的代码通常不如手工编写的代码质量高，因为低代码平台无法完全理解用户的需求和意图。
* 依赖平台：低代码平台通常依赖于特定的平台，用户需要购买或订阅平台服务，从而增加了成本。
* 学习曲线：低代码平台提供了一套可视化工具，用户需要学习如何使用这些工具，从而增加了学习成本。

### 低代码的未来发展趋势
低代码一定是有发展前景的，目前在一些特定的企业oa、sass或者标准化的业务场景比如审批流等特定场景下已经取得了不错的应用。

目前最理想的状态是整个产研团队一块推动的方式。这样产品、前端、后端、测试整个流程都对低代码平台有一个统一的功能预期，产品不提非标需求，前后端不写非标代码，测试不测非标功能，这样才能更好的发挥低代码的价值。

## npm run dev 的过程
npm run dev 命令是 Node.js 开发者常用的一个命令，它用来启动一个开发服务器或执行一系列预设的开发任务。这个命令的过程可以分解为以下几步：

### 1. 查找并执行脚本
npm首先会在项目的package.json文件中查找scripts字段下的dev属性，‌并找到与之对应的脚本命令。‌这意味着，‌执行npm run dev命令时，‌需要确保处于包含package.json文件的正确目录中。‌例如，‌如果package.json文件中配置了"dev": "node server.js"，‌那么执行npm run dev将会在当前目录下启动一个Node.js服务器，‌并执行server.js文件。‌

### 2. 检查依赖
在执行脚本之前，‌npm会检查项目中是否已安装了所有必要的依赖项。‌如果依赖项不存在，‌npm会尝试自动安装package.json中列出的依赖项。‌

### 3. 执行命令
一旦依赖项安装完成或确认已存在，‌npm将执行dev属性中指定的脚本命令。‌这可以是一个脚本、‌一个可执行文件或一个自定义的命令。‌例如，‌如果配置为"dev": "webpack serve --config webpack.dev.config.js"，‌那么执行npm run dev实际上是运行了webpack serve命令，‌并使用webpack.dev.config.js作为配置文件。‌

### 4. 启动开发服务器
‌webpack-dev-server（‌或类似工具如Vite等）‌会被启动，‌开始监听指定目录下的源代码变化，‌并且根据配置文件进行实时编译打包。‌

### 5. 模块加载与热更新
开发服务器不仅提供静态资源服务，‌还可能启用热模块替换功能（‌HMR）‌，‌使得在开发过程中修改代码后无需手动刷新浏览器就能看到变更效果。‌

### 6. 环境变量配置
如果在执行脚本的过程中使用了环境变量，‌比如通过-mode=development或读取.env.development文件来设置特定的开发环境变量，‌那么这个过程也会处理这些环境相关的配置。‌

### 7. 错误处理与日志输出
在执行过程中，‌如果遇到错误，‌npm会捕获并输出错误信息，‌帮助开发者定位和解决问题。‌同时，‌开发服务器可能会输出一些日志信息，‌如编译进度、‌警告和错误等，‌帮助开发者了解项目的运行状态。‌

总结：‌npm run dev 是一个常用的命令，‌它通过读取package.json文件中的配置，‌自动执行一系列预设的开发任务，‌如启动开发服务器、‌编译代码、‌热更新等，‌从而简化了开发流程。‌

## 时间复杂度和空间复杂度的理解
时间复杂度和空间复杂度是衡量算法效率的两个重要指标，它们分别反映了算法在执行时间和内存使用上的性能表现。
### 时间复杂度
时间复杂度和空间复杂度是衡量算法效率的两个重要指标，它关注的是随着输入规模增大，算法运行时间的增长趋势。时间复杂度用大O记号 ( O ) 来表示，常见的几种时间复杂度包括：

* 常数时间复杂度 ( O(1) )：无论输入规模如何，算法的运行时间都是固定的。
* 线性时间复杂度 ( O(n) )：算法的运行时间与输入规模成正比。
* 对数时间复杂度 ( O(\log n) )：算法的运行时间随着输入规模的增加而缓慢增长。
* 平方时间复杂度 ( O(n^2) )：算法的运行时间与输入规模的平方成正比，常见于双重循环中。
* 指数时间复杂度 ( O(2^n) )：算法的运行时间以指数形式增长，常见于递归算法中，如未优化的斐波那契数列计算。
在分析时间复杂度时，我们通常关注最坏情况下的时间复杂度，因为它给出了算法在任何情况下都不会超过的上限。

### 空间复杂度
空间复杂度表示的是算法运行过程中所需内存空间与输入数据规模之间的关系。它关注的是算法在执行过程中临时占用存储空间的变化趋势。空间复杂度同样使用大O记号来表示，常见的几种空间复杂度包括：

* 常数空间复杂度 ( O(1) )：算法所需的额外空间不随输入规模变化。
* 线性空间复杂度 ( O(n) )：算法所需的额外空间与输入规模成正比。
* 对数空间复杂度 ( O(\log n) )：算法所需的额外空间以对数方式增长。
* 多项式空间复杂度 ( O(n^k) )：算法所需的额外空间与输入规模的多项式次方成正比。

## 