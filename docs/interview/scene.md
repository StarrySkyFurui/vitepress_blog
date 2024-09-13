## 限制批量请求失败时只弹出一个 toast
为了确保在批量请求失败时只弹出一个 Toast 提示，可以通过以下步骤实现：

1. 维护一个全局的标志位：用于控制 Toast 是否显示。
2. 在批量请求开始之前设置标志位：确保批量请求开始时标志位被正确设置。
3. 在批量请求结束之后重置标志位：无论批量请求成功还是失败，都需要重置标志位。
4. 在请求失败时检查标志位：如果标志位允许，则显示 Toast。

```js
// 引入 Toast 组件
import { Toast } from 'vant';

let isToastShown = false;

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    // 成功逻辑
    return response;
  },
  error => {
    if (!isToastShown) {
      Toast('请求失败，请稍后重试');
      isToastShown = true;
    }
    return Promise.reject(error);
  }
);

// 发送请求
function sendRequest(url, data) {
  return axiosInstance.post(url, data)
    .then(response => {
      // 处理成功情况
      return response.data;
    })
    .catch(error => {
      // 处理错误情况
      return Promise.reject(error);
    });
}

// 批量请求示例
async function batchRequests(urls, data) {
  try {
    isToastShown = false; // 开始批量请求前重置标志位
    await Promise.all(urls.map(url => sendRequest(url, data)));
  } catch (error) {
    isToastShown = true; // 设置标志位，确保只显示一次 Toast
    console.error('Batch request failed:', error);
  } finally {
    isToastShown = false; // 无论成功还是失败，批量请求结束后重置标志位
  }
}
```
## 如何减少项目里的 if-else
1. 提前return，让正常流程走主干
2. 使用短路运算，如 &&、||
3. 使用排非策略：!、!!
4. 使用三元运算符
5. 使用 switch-case
6. 定义相关函数拆分逻辑，简化代码

## 如何实现前端埋点

## 微前端架构是什么？

## Qiankun 是怎么做代码隔离的？

## 实现网页进度条
使用 nprogress  + Vue-Router 实现全局进度条
```javascript
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

## Cookie 构成部分
主要包括以下几个部分：
1. 名称（Name）：Cookie的名称是用于标识Cookie的唯一字符串。这个名称在创建Cookie时指定，并在后续的请求中用于识别特定的Cookie。

2. 值（Value）：Cookie的值是与其名称相关联的数据。它可以是任何类型的数据，例如字符串、数字或布尔值。值可以在创建Cookie时设置，并在后续的请求中使用。

3. 域（Domain）：Cookie的域是指可以访问该Cookie的域名。它可以是完整的域名（例如example.com）或子域名（例如subdomain.example.com）。只有与Cookie的域匹配的网站才能访问该Cookie。

4. 路径（Path）：Cookie的路径是指可以访问该Cookie的URL路径。它可以是完整的路径（例如/example）或目录路径（例如/）。只有与Cookie的路径匹配的URL才能访问该Cookie。

5. 过期时间（Expires/Max-Age）：Cookie的过期时间是指Cookie的有效期。它可以是一个具体的日期和时间（Expires），也可以是一个相对的时间间隔（Max-Age）。一旦Cookie过期，浏览器将不再发送该Cookie。如果不设置过期时间，则Cookie可能仅存储在内存中，并在浏览器关闭时失效。

6. 安全标志（Secure）：安全标志是一个布尔值，用于指示浏览器只在通过加密协议（如HTTPS）发送请求时才发送该Cookie。这可以确保Cookie的安全性。

7. HttpOnly标志（HttpOnly）：HttpOnly标志也是一个布尔值，用于指示浏览器只在通过HTTP请求时发送该Cookie。这可以防止恶意脚本通过JavaScript访问Cookie，提高Cookie的安全性。

## 设计大型前端应用的过程
1. 需求分析：首先，需要明确前端应用的需求，包括功能、性能、用户体验等方面。这一阶段需要与产品经理、设计师和后端开发人员进行沟通，确保对需求的理解一致。

2. 技术选型：根据需求分析的结果，选择合适的前端技术栈。这包括选择合适的框架、库、工具等。需要考虑技术成熟度、社区支持、团队熟悉程度等因素。

3. 架构设计：根据需求和技术选型，设计前端应用的架构。这包括模块化、组件化、状态管理等。需要考虑代码的可维护性、可扩展性、可测试性等方面。

4. 开发与测试：根据架构设计，进行前端应用的开发。在开发过程中，需要编写单元测试、集成测试和端到端测试，以确保代码的质量和功能的正确性。

5. 部署与监控：将前端应用部署到生产环境，并进行监控和优化。需要关注应用的性能、稳定性、安全性等方面，及时解决可能出现的问题。


## 好的协作工具和团队协作流程
### 协作工具
1. 代码管理工具：Git
2. 项目管理工具：Xmind 
3. 设计协作工具：Figma
4. 在线绘图工具：ProcessOn
### 团队协作流程
1. 明确项目目标和需求
* 在项目开始前，与团队成员共同明确项目目标和需求，确保大家对项目有统一的认识。

2. 制定项目计划和时间表
* 使用项目管理工具制定详细的项目计划和时间表，明确每个阶段的任务和负责人。

3. 分配任务和跟踪进度
* 根据项目计划分配任务给团队成员，并使用项目管理工具跟踪任务进度和完成情况。

4. 定期召开团队会议
* 定期召开团队会议，分享项目进展、解决问题、讨论需求和进行知识分享。

5. 进行代码审查和测试
* 在代码提交前进行代码审查，确保代码质量；在开发过程中进行单元测试、集成测试等，确保软件质量。

6. 持续集成和部署
* 使用持续集成和部署工具自动化构建、测试和部署流程，提高开发效率和质量。

7. 收集反馈并迭代优化
* 在项目过程中收集用户反馈和团队成员的建议，不断迭代优化产品功能和用户体验。


## 修改第三方 npm 包
使用 patch-package 补丁包
### 1. 安装 patch-package

首先，需要在项目中安装 patch-package 和 postinstall 脚本。
```bash
npm install -D patch-package postinstall-postinstall
```
> postinstall-postinstall 是一个 npm 钩子，它会在每次 npm install 或 yarn install 后自动运行 patch-package。这不是必需的，但它可以使补丁的应用自动化。

### 2. 修改第三方包并生成补丁文件
在项目中修改第三方包的代码后，需要运行 patch-package 命令来生成补丁文件。你需要指定要为其创建补丁的包名（你可以从 package.json 中的 dependencies 或 devDependencies 部分找到它）。可以使用以下命令生成补丁文件：
```bash
npx patch-package 包名
```
**这条命令会在你的项目根目录下创建一个名为 patches/<包名>+<版本号>.patch 的文件，其中包含了你的修改。**

### 3. 提交补丁文件
将生成的补丁文件提交到 git 中，以便其他人可以应用它。

### 4. 自动化补丁应用
如果你安装了 postinstall-postinstall，那么每次运行 npm install 或 yarn install 时，patch-package 都会自动应用这些补丁。如果没有安装，你可以在 package.json 的 scripts 部分添加一个脚本来手动应用补丁：
```json
"scripts": {
  "postinstall": "patch-package"
}
```
然后，你可以通过运行 npm run postinstall 或简单地 npm install（如果安装了 postinstall-postinstall）来应用补丁。

## 限制用户单设备登录
是指同一个用户账号在同一时间只能在一个设备上登录，从而防止账号被滥用或未经授权的访问。
实现方式：
### 服务端
1. Token 管理
* 分配唯一Token：每次用户在应用上登录时，服务端应为该用户分配一个新的、唯一的Token。这个Token可以作为用户会话的唯一标识符。
* Token存储：服务端需要将这个Token与用户的账号信息关联起来并存储，以便在后续的请求中进行验证。
* Token有效性检查：在每次接收到用户的请求时，服务端都应检查该请求中携带的Token是否有效，包括是否过期、是否被撤销以及是否与当前登录的用户账号匹配。
  
2. 设备管理
* 收集设备信息：在登录时，服务端可以收集一些设备信息（如设备的IP地址、设备ID、操作系统等），作为用户设备的唯一标识，并将其存储在数据库中。
* 设备标识管理：将设备标识与用户的Token或账号信息关联起来，以便追踪用户登录的设备。

3. 登录状态管理
* 记录登录状态：当用户在一个设备上登录时，服务端应记录该设备的登录状态，并标记为“活跃”。
* 检测重复登录：当用户尝试在另一个设备上登录时，服务端应检查该用户是否已经在其他设备上处于活跃状态。如果是，则执行相应的下线操作（如强制前一个设备下线）。

### 客户端
1. Token管理
* 存储Token：客户端在接收到服务端分配的Token后，应将其安全地存储在本地（如使用SharedPreferences、Keychain等）。
* 携带Token：在后续的请求中，客户端应将Token作为请求的一部分发送给服务端，以便进行身份验证和会话管理。

2. 监听登录状态变化
* API请求响应：客户端应监听API请求的响应，特别是与登录状态相关的响应。如果响应中包含特定的错误码（如“账号已在其他设备登录”），则执行相应的下线操作。
* 推送通知：服务端可以使用推送服务（如FCM、APNs等）向客户端发送通知，告知用户账号已在其他设备登录。客户端在接收到这类通知后，应执行下线操作。

3. 用户反馈
* 提示信息：在检测到账号已在其他设备登录时，客户端应向用户显示友好的提示信息，说明情况并引导用户重新登录。
* 跳转登录页面：在提示用户后，客户端应自动跳转到登录页面，以便用户重新输入账号和密码进行登录。

### 安全性考虑
1. Token安全性
* HTTPS：确保所有与Token相关的请求都通过HTTPS进行，以防止Token在传输过程中被截获。
* Token有效期：设置合理的Token有效期，并在过期后要求用户重新登录。这有助于减少Token泄露的风险。

2. 设备信息保护
* 最小化收集：仅收集必要的设备信息以进行登录状态管理，避免收集过多的敏感信息。
* 加密存储：如果需要将设备信息存储在服务端，应使用加密技术来保护这些信息的安全。

3. 异常处理
* 错误码定义：定义清晰的错误码来标识各种登录状态异常，以便客户端能够准确地识别和处理这些情况。
* 日志记录：在服务端记录登录相关的日志信息，以便在出现问题时进行故障排查和追踪。

## 前端避免明文传输
在前端开发中，避免明文传输敏感信息是非常重要的。以下是一些常见的方法来避免明文传输：

### 1. 使用HTTPS
HTTPS（HTTP Secure）是一种通过SSL/TLS协议加密的HTTP协议。它可以在客户端和服务器之间建立一个安全的连接，确保数据传输过程中的安全性。使用HTTPS可以防止中间人攻击和数据窃取。

### 2. 使用加密算法
在前端对敏感信息进行加密，然后再发送给服务器。常用的加密算法包括AES、RSA等，将敏感数据进行加密后再发送到服务器。这样即使数据在传输过程中被截获，也无法直接获取其内容。

### 3. 使用Token
Token是一种身份验证机制，可以在客户端和服务器之间传递身份信息。Token通常由服务器生成，并包含用户的身份信息。客户端在每次请求时，都需要将Token发送给服务器进行身份验证，以确保请求的合法性。Token通常使用HTTPS进行传输，以确保其安全性。

### 4. 请求头加密处理
在发送请求时，可以将请求头中的一些关键信息进行加密处理，然后再发送到服务器。服务器需要在接收到请求后对请求头进行解密，以获取其中的信息。

### 5. 使用Base64编码
Base64是一种将二进制数据转换为ASCII字符串的编码方式。它可以用于将敏感信息转换为可打印的字符，从而避免明文传输。但是，Base64编码并不是一种加密算法，它只是将数据转换为另一种格式，并不能提供真正的安全性。

## 在划词选择的文本上添加右键菜单
在前端开发中，如果你想在划词选择的文本上添加右键菜单，可以使用以下步骤：

### 1. 监听右键事件
首先，你需要监听文本元素的右键事件。这可以通过为文本元素添加 `contextmenu` 事件监听器来实现。例如，如果你有一个 `div` 元素包含选中的文本，你可以这样监听右键事件：
```js
document.querySelector('div').addEventListener('contextmenu', function(event) {
  event.preventDefault(); // 阻止默认的右键菜单
  // 在这里添加你的自定义菜单逻辑
  // 在此处显示自定义右键菜单
  showCustomMenu(event);
});
```

### 2. 显示自定义菜单
在 `contextmenu` 事件监听器中，可以使用 `showCustomMenu()` 方法来显示自定义菜单。例如：
```js
function showCustomMenu(event) {
  const customMenu = document.createElement("div");
  customMenu.style.position = "absolute";
  customMenu.style.left = event.clientX + "px";
  customMenu.style.top = event.clientY + "px";

  // 添加菜单选项
  const menuItem1 = document.createElement("div");
  menuItem1.textContent = "复制";
  menuItem1.addEventListener("click", function () {
    // 处理复制操作
    copySelectedText();
  });
  customMenu.appendChild(menuItem1);

  // 可以添加更多的菜单选项

  document.body.appendChild(customMenu);
}
```

### 3. 处理菜单项的点击事件
在自定义菜单中，你可以添加多个菜单项，并为每个菜单项添加点击事件监听器。例如，你可以添加一个“复制”菜单项，并在用户点击该菜单项时执行复制操作。例如：
```js
function copySelectedText() {
  const selectedText = window.getSelection().toString();
  // 将选中的文本复制到剪贴板
  navigator.clipboard.writeText(selectedText);
}
```
在上述代码中，我们使用 `window.getSelection().toString()` 方法获取选中的文本，并使用 `navigator.clipboard.writeText()` 方法将其复制到剪贴板。

### 4. 隐藏右键菜单
当用户点击自定义菜单项时隐藏自定义菜单。这可以通过在菜单项的点击事件监听器中移除自定义菜单元素来实现。例如：
```js
function hideCustomMenu() {
  const customMenu = document.querySelector("div");
  if (customMenu) {
    document.body.removeChild(customMenu);
  }
}
```
在上述代码中，我们使用 `document.querySelector("div")` 方法获取自定义菜单元素，并使用 `document.body.removeChild()` 方法将其从文档中移除。

## 如何标准化处理线上用户反馈的问题？
1. 确定问题范围：首先需要确定用户反馈的问题是否是普遍存在的，还是个例问题。如果是普遍存在的，那么需要进一步确定问题的范围，比如是哪个页面、哪个功能模块的问题。
2. 收集问题信息：收集用户反馈的问题信息，包括问题描述、用户操作步骤、截图等。这些信息将有助于问题的定位和解决。
3. 问题分类：根据问题的性质和影响范围，将问题分类。比如是前端问题、后端问题、网络问题等。
4. 优先级评估：根据问题的严重程度和影响范围，评估问题的优先级。优先处理严重程度高、影响范围广的问题。
5. 建立问题跟踪：为每个问题建立跟踪记录，记录问题的状态、处理进度等。这样可以确保问题的处理过程透明，便于跟踪和沟通。
6. 分配责任人：根据问题的性质和影响范围，分配责任人。责任人需要负责问题的解决，并确保问题的及时处理。
7. 问题修复与验证：开发团队内各责任人均修复并自行验证完成后，QA 团队验证修复后的功能是否正常工作。
8. 线上部署及反馈：修复完成后，进行线上部署，并收集用户反馈，验证问题是否得到解决。
9. 问题总结：问题解决后，需要对问题的原因进行分析，总结经验教训，避免类似问题再次发生。

## 前端应用国际化
前端应用实现国际化（i18n）主要是为了支持多语言环境，提高用户体验。这里有几种常用的方案：

### 1. 使用国际化库
这是最常用的方法之一，可以通过引用第三方库来管理不同语言环境的资源文件。比如：
* React：可以使用react-intl或react-i18next。
* Vue：可以使用vue-i18n。
* Angular：可以使用@ngx-translate/core。
这些库允许你将文本资源分开管理，并根据用户的语言偏好动态加载相应的资源。

### 2. 浏览器 API
利用浏览器内置的国际化 API，如Intl对象，来格式化日期、时间、货币等。

### 3. 自建国际化框架：根据项目的具体需求，自定义国际化实现。这通常包括：

* 创建资源文件：为每种语言创建一个资源文件，用于存储翻译字符串。
* 语言选择功能：允许用户选择偏好的语言。
* 加载对应资源文件：根据用户的语言偏好，动态加载对应的资源文件并在界面上显示相应的文本。

### 4. 服务端支持：有些情况下，前端应用可能需要服务端的支持来实现国际化，如动态提供不同语言的数据内容。

### 5. URL 路由
在 URL 中包含语言参数，来确定显示哪种语言的内容。例如，`/en/about` 显示英文版“关于”页面，而 `/zh/about `显示中文版。

### 6. 浏览器语言检测
通过检测浏览器的 `navigator.language` 属性来自动选择最合适的语言版本。

在实际应用中，根据项目的大小、复杂度以及特定需求，可以选择一种或多种方案结合使用，以达到最佳的国际化效果。

## 请求失败会弹出一个 toast , 如何保证批量请求失败， 只弹出一个 toast
要确保批量请求失败时只弹出一个 toast，可以通过以下几种方式实现：

### 设置全局标志位
定义一个全局变量（如 isToastShown）来表示是否已经弹出过 toast。在请求失败的处理逻辑中，首先检查该标志位。如果尚未弹出 toast，则进行弹出操作，并设置标志位为 true；如果标志位已经为 true，则直接忽略后续的弹出操作。
### 使用防抖或节流函数
防抖（debounce）或节流（throttle）函数可以限制某个函数在一定时间内的执行次数。将弹出 toast 的操作封装在防抖或节流函数中，确保在短时间内的多个请求失败时，不会频繁弹出 toast。
### 集中处理错误
将所有请求的错误集中处理，而不是在每个请求的 catch 块中直接弹出 toast。例如，把所有请求的 Promise 添加到一个数组中，然后使用 Promise.all() 或其他类似方法来统一处理这些 Promise 的结果。如果所有请求都失败了，再弹出一个 toast。

以下是使用全局标志位和集中处理错误的示例代码：
```js
let isToastShown = false; // 全局标志位

function makeRequests() {
  const requests = [fetchPost(), fetchComments()]; // 多个请求的 Promise

  Promise.all(requests)
  .then(() => {
      // 所有请求成功的处理逻辑
    })
  .catch(errors => {
      if (!isToastShown) { // 检查标志位
        notify(errors[0]); // 弹出 toast
        isToastShown = true; // 设置标志位为 true
      }
    });
}

function fetchJSON(url, input) {
  return fetch(url, input)
  .then(res => {
      if (res.ok) {
        return res.json();
      }
      const err = new HttpError(res);
      if (!isToastShown) { // 检查标志位
        notify(err); // 弹出 toast
        is toastShown = true; // 设置标志位为 true
      }
      throw err;
    });
}
```
在上述代码中，定义了一个全局变量 isToastShown 来标记是否已经弹出过 toast。在 fetchJSON 函数中，当请求失败时，如果 isToastShown 为 false，则弹出 toast 并设置其为 true。在 makeRequests 函数中，使用 Promise.all 来处理多个请求。如果所有请求都失败（即 errors 数组有内容），并且 isToastShown 为 false，则弹出 toast 并设置标志位。

这样，无论有多少个请求失败，都只会弹出一个 toast。当有新的批量请求时，记得在请求开始前将 isToastShown 重置为 false。

## 判断页签是否为活跃状态
判断页面页签（Tab）是否为活跃状态，可以通过监听 visibilitychange 事件来实现。这个事件是由 document 对象触发的，可以用来判断页面是否对用户可见。当用户切换到其他标签页、最小化浏览器窗口、或是锁屏时，页面就会变为不可见状态。如果页面对用户可见，那么页面就处于活跃状态。

使用 document.visibilityState 属性可以检查页面的当前可视状态，这个属性有以下可能的值：

* "visible"：页面至少部分可见。在桌面端，这通常意味着页面是当前激活的标签页。
* "hidden"：页面对用户不可见。
* "prerender" 和 "unloaded"：这两个值用于特殊情况，通常较少用到。

### 示例代码
下面的代码演示了如何使用 visibilitychange 事件和 document.visibilityState 来判断页面是否为活跃状态：
```js
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    console.log("页面现在是活跃状态。");
  } else {
    console.log("页面现在不是活跃状态。");
  }
});
```
每当用户切换到该页签或从该页签切换走时，会触发 visibilitychange 事件。通过检查 document.visibilityState 的值，你可以判断页面是变为活跃状态还是变为非活跃状态。

这个功能可以用于多种场合，比如：

* 停止或开始运行页面上的动画。
* 控制媒体播放（比如自动暂停视频播放）。
* 调整页面或应用的资源消耗（对于非活跃页签减少资源使用）。
* 发送用户行为统计数据，以记录用户实际查看页面的时间。
这种方法的优点是兼容性好，现代浏览器都支持 visibilitychange 事件，可以用于构建响应用户行为的 web 应用。
