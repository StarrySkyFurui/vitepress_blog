## HTML 相关
## CSS 相关
## 1. 实现一个上中下三行布局，顶部和底部最小高度是 100px，中间自适应
```html
<div class="container">
  <div class="header">Header</div>
  <div class="main">Main</div>
  <div class="footer">Footer</div>
</div>
```
```css
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header,
.footer {
  min-height: 100px;
  background-color: #ccc;
}

.main {
  flex: 1;
  background-color: #f0f0f0;
}
```
## 2. 不定宽高元素水平垂直居中
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## JavaScript 相关
## TypeScript 相关
## Vue 相关
## Webpack 相关
## Vite 相关
## Node 相关
## Git 相关
## HTTP 相关
## 浏览器相关
## 微前端相关
## 前端工程化
## 部署相关
## 性能优化
## 安全相关
## 项目相关
## 算法
## 其它
### 1. 通知用户版本更新刷新页面

在每次打包生产代码时，在 public 目录下生成一个 version.json 版本信息文件，页面跳转时请求服务器端的 version.json 中的版本号和浏览器本地缓存的版本号进行对比，从而监控版本迭代更新，实现页面自动更新，获取新的 index.html 文件（前提是服务器端对 index.html 和 version.json 不缓存）。

1. 首先应该禁止浏览器缓存 index.html 和 version.json
```conf
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

## 面试技巧
