## 单元测试中的 TDD、BDD、DDD
### TDD (Test-Driven Development)
测试驱动开发。TDD 的核心思想是先编写测试用例，然后编写代码实现测试用例，最后优化代码。TDD 的流程如下：

1. 编写一个失败的测试用例，描述你想要实现的功能。
2. 编写代码实现测试用例，使其通过。
3. 优化代码，使其更简洁、更高效。

### BDD (Behavior-Driven Development)
行为驱动开发。BDD 的核心思想是通过编写可读性强的测试用例，描述系统的行为。BDD 的流程如下：

1. 编写一个描述系统行为的测试用例，使用自然语言描述系统的行为。
2. 编写代码实现测试用例，使其通过。
3. 优化代码，使其更简洁、更高效。

### DDD (Domain-Driven Design)
领域驱动设计。DDD 的核心思想是通过领域模型来描述系统的业务逻辑。DDD 的流程如下：

1. 分析业务需求，确定系统的领域模型。
2. 编写领域模型，描述系统的业务逻辑。
3. 编写代码实现领域模型，使其通过。

## 如何做好前端监控方案？
### 意义
前端监控的意义在于实时监控前端应用的状态，及时发现并解决问题，提高用户体验。通过前端监控，可以及时发现页面加载缓慢、接口请求失败、用户行为异常等问题，从而及时修复这些问题，提高应用的稳定性和用户体验。

### 监控内容
前端监控主要包括 用户行为、程序异常、运行性能这三方面的内容。
1. 用户行为 - 用户在网站或App上浏览了哪些模块，热点区域有哪些，用户画像等数据
2. 程序异常 - 系统运行过程中JS脚本报错、资源（图片、CSS等）加载异常信息
3. 运行性能 - 侧重系统的性能指标，比如页面的白屏时间、秒开率，载入时长等

### 监控的形式
主要分为两类：主动监控 和 被动监控。
1. 被动监控 - 基于真实用户场景，通常经过页面埋点、数据上报、统计分析和生成报警等环节。
2. 主动监控 - 基于仿真模拟环境，通过主动嗅探页面的运行状态达到实时监测的目的。

### 总体方案设计
一般监控系统，都是经过页面埋点，数据上报，后台存储，汇总统计，报警展示，优化整改等几个环节，每个环节都可以采用不同的方案来迎合业务的需求。
- 页面埋点 - 设定好在哪些地方上报统计的数据，比如用户点击某个按钮时，上报相应的数据标识，又或者在页面初始化的过程中
- 数据上报 - 将前端采集的到数据信息，发送给监控统计的后台接口
- 数据存储 - 监控数据存储的地方，根据数据量的大小选择不同的方案，如关系型数据库MySQL、Hadoop等
- 汇总统计 - 上报的监控数据，有很多无效的，需要清洗加工，按需统计汇总，方便展示
- 报警展示 - 一般需要搭建一个管理平台，设置监控指标的阈值参数，当触发时，通知给开发
- 优化整改 - 监控的最终目的让系统运行更优，根据监控结果制定系统的下一步优化方案

## 怎么做代码重构？
代码重构是在不改变软件外部行为的前提下，改善其内部结构的过程。这通常是为了提高代码质量、可读性和可维护性。下面是一些常用的代码重构技巧和步骤：
1. 提取方法：将重复的代码提取到一个单独的方法中，以提高代码的复用性和可读性。
2. 简化条件表达式：将复杂的条件表达式简化，以提高代码的可读性。
3. 提取变量：将复杂的表达式提取到一个变量中，以提高代码的可读性。
4. 修改变量名：修改变量名，以更好地反映变量的用途和含义。
5. 重构文档和注释：更新文档和注释，以反映代码的当前状态和用途。
6. 优化代码结构：优化代码结构，以提高代码的可读性和可维护性。
7. 代码审查：进行代码审查，以发现潜在的问题和改进机会。
8. 测试：在重构过程中，确保对代码进行充分的测试，以确保重构不会引入新的问题。

## 清理项目源码中没有被应用的代码
清理项目源码中未使用的代码可以提高代码质量，减少构建时间，并且有助于维护。以下是针对 JavaScript、TypeScript 和 CSS 的具体步骤：
### 准备阶段
1. 备份代码库
2. 创建分支
3. 设置测试环境
### 清理方法
1. 安装 ESLint 和相关插件
- ESLint 是一个流行的 JavaScript 代码检查工具，可以帮助我们找出代码中的潜在问题，并按照一定的规则进行代码格式化。
- 安装 ESLint：`npm install eslint --save-dev`
- 安装 ESLint 插件：`npm install eslint-plugin-unused-imports --save-dev`
2. 配置 ESLint
- 在项目根目录下创建一个 `.eslintrc.js` 文件，并添加以下配置：
```javascript
module.exports = {
  plugins: ["unused-imports"],
  rules: {
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": "warn",
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
};
```
3. 删除未使用的导入和变量
- 根据 ESLint 的报告，手动删除未使用的导入和变量，或者使用 ESLint 插件自动修复。
4. 运行测试
- 运行测试用例，以确保代码重构没有引入新的问题。
5. Tree shaking
- 如果使用 Webpack 或 Rollup 等打包工具，可以使用 Tree shaking 功能来删除未使用的代码。

### 验证和合并
1. 验证代码
- 确保代码重构没有引入新的问题，并且功能正常工作。
2. 合并分支
- 将代码重构分支合并到主分支，并提交代码。

## 图片优化
加载速度是用户体验的关键因素之一，而大尺寸的图片会增加网页加载时间，导致用户等待时间过长，从而影响用户的满意度和留存率。通过优化图片，我们可以显著减少页面加载时间，提供更快速流畅的使用体验。

图片优化是提升用户体验、提高网站性能、减少流量消耗和增加搜索引擎曝光度的关键因素。为了提供更出色的用户体验，同时也提升网站的性能。总结了一下通用的图片优化首手段。

### 选择合适的图片格式
以下是对常用的图片格式jpg、png和webp进行深度对比的表格：

| 特点 | JPG | PNG | WebP | 
| :---- | :----  | :---- | :---- |
| 压缩算法 | 有损压缩 | 无损压缩 | 有损压缩 |
| 透明度 | 不支持透明度 | 支持透明度 | 支持透明度 |
| 图片质量 | 可调整质量 | 不可调整质量 | 可调整质量 |
| 文件大小 | 相对较小 | 相对较大 | 相对较小 |
| 浏览器支持 | 支持在所有主流浏览器上显示 | 支持在所有主流浏览器上显示 | 部分浏览器支持 |
| 动画支持 | 不支持动画 | 不支持动画 | 支持动画 |
| 兼容性 | 兼容性较好 | 兼容性较好 | 兼容性较差 |

请注意，这个表格只是对这些格式的一般特征进行了总结，并不代表所有情况。实际情况可能因图像内容、压缩设置和浏览器支持等因素而有所不同。因此，在选择图像格式时，您应根据具体要求和应用场景进行评估和选择。

### 图片压缩
主要介绍 webpack 对图片进行压缩，可以使用以下步骤：

安装依赖：首先，确保你已经在项目中安装了webpack和相关的loader。可以使用以下命令安装所需的loader：
```bash
npm install --save-dev file-loader image-webpack-loader
```
配置Webpack：在Webpack的配置文件中进行相关配置。以下是一个简单的示例：
```js
const path = require('path');

module.exports = {
  entry: 'src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  }
};
```
上述配置中，我们使用file-loader将图片复制到输出目录，并使用image-webpack-loader对图片进行压缩和优化。

运行Webpack：现在，当你运行Webpack时，它将自动使用image-webpack-loader对匹配到的图片进行压缩和优化。压缩后的图片将被复制到输出目录中。

### 雪碧图
Web图片优化的雪碧图（CSS Sprites）是一种将多个小图片合并为一个大图片的技术。通过将多个小图片合并成一张大图片，可以减少浏览器发送的请求次数，从而提高页面加载速度。

雪碧图的原理是通过CSS的background-image和background-position属性，将所需的小图片显示在指定的位置上。这样，只需加载一张大图，就可以显示多个小图片，减少了网络请求的数量，提高了页面加载速度。

听上去好像很麻烦， 实际上可以使用 webpack 插件 webpack-spritesmith 完成自动化处理雪碧图合成，我们在使用过程中正常使用即可。

以下是使用webpack-spritesmith插件来自动处理雪碧图的步骤：

安装插件：使用npm或yarn安装webpack-spritesmith插件。
```bash
npm install webpack-spritesmith --save-dev
```
配置Webpack：在Webpack配置文件中，引入webpack-spritesmith插件，并配置相应的选项。
```js
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
  // ...其他配置

  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'path/to/sprites'), // 需要合并的小图片所在的目录
        glob: '*.png' // 小图片的文件名格式
      },
      target: {
        image: path.resolve(__dirname, 'path/to/output/sprite.png'), // 生成的雪碧图的路径和文件名
        css: path.resolve(__dirname, 'path/to/output/sprite.css') // 生成的CSS样式表的路径和文件名
      },
      apiOptions: {
        cssImageRef: 'path/to/output/sprite.png' // CSS样式表中引用雪碧图的路径
      }
    })
  ]
}
```
使用雪碧图：在HTML中，使用生成的CSS样式类来显示相应的小图片。Webpack会自动处理雪碧图的合并和CSS样式的生成。例如：
然后，你可以按照以下方法在CSS中引用雪碧图：

CSS方式：
```css
div {
    background: url(path/to/output/sprite.png) no-repeat;
}

.icon-facebook {
    /* 设置小图标在雪碧图中的位置和大小 */
    width: 32px;
    height: 32px;
    background-position: 0 0; /* 该小图标在雪碧图中的位置 */
}

.icon-twitter {
    width: 32px;
    height: 32px;
    background-position: -32px 0; /* 该小图标在雪碧图中的位置 */
}

.icon-instagram {
    width: 32px;
    height: 32px;
    background-position: -64px 0; /* 该小图标在雪碧图中的位置 */
}
```
在HTML中，你可以像下面这样使用对应的CSS类来显示相应的小图标：
```html
<div class="icon icon-facebook"></div>
<div class="icon icon-twitter"></div>
<div class="icon icon-instagram"></div>
```
这样，Webpack会根据配置自动处理雪碧图，并生成对应的雪碧图和CSS样式表。CSS中的background属性会引用生成的雪碧图，并通过background-position来指定显示的小图标在雪碧图中的位置。

确保在CSS中指定了每个小图标在雪碧图中的位置和大小，以便正确显示。

使用Webpack自动处理雪碧图可以简化开发流程，并且可以根据需要自定义配置。webpack-spritesmith是一个常用的Webpack插件，可以帮助自动处理雪碧图。

### 图标类型资源推荐使用 iconfont
如果你有很多图标类型的图片资源，并且想使用iconfont来处理这些资源，可以按照以下步骤进行处理：

#### 1. 获取图标资源
可以从iconfont网站或其他图标库中选择和下载符合需求的图标。这个没有啥好说的， 直接推荐: https://www.iconfont.cn/

#### 2. 生成字体文件
将这些图标转换成字体文件。你可以使用iconfont提供的在线转换工具，将图标文件上传并生成字体文件（包括.ttf、.eot、.woff和.svg格式）。

#### 3. 引入字体文件
将生成的字体文件下载到本地，并在你的项目中引入。通常，你需要在CSS文件中通过@font-face规则引入字体文件，并为字体定义一个唯一的名称。

#### 4. 使用图标
一旦字体文件引入成功，你可以在CSS中通过设置content属性来使用图标。每个图标都会有一个对应的Unicode代码，你可以在iconfont 提供的网站或字体文件中找到对应图标的Unicode代码，并通过设置content属性的值为该Unicode代码来使用图标。

以下是一个简单的示例，以帮助你更好地理解：
```css
@font-face {
    font-family: 'iconfont';
    src: url('path/to/iconfont.eot'); /* 引入字体文件 */
    /* 其他格式的字体文件 */
}

.icon {
    font-family: 'iconfont'; /* 使用定义的字体名称 */
    font-size: 16px; /* 图标大小 */
    line-height: 1; /* 图标行高 */
}

.icon-facebook::before {
    content: '\e001'; /* 使用Unicode代码表示想要显示的图标 */
}

.icon-twitter::before {
    content: '\e002'; /* 使用Unicode代码表示想要显示的图标 */
}

.icon-instagram::before {
    content: '\e003'; /* 使用Unicode代码表示想要显示的图标 */
}
```
在上述示例中，我们首先通过@font-face引入了字体文件，并为字体定义了一个名称iconfont。然后，我们使用该名称作为font-family属性的值，以便在.icon 类中使用该字体。最后，我们通过在::before伪元素中设置content属性为图标的Unicode代码，来显示相应的图标。

在HTML中，你可以像下面这样使用对应的CSS类来显示相应的图标：
```html
<span class="icon icon-facebook"></span>
<span class="icon icon-twitter"></span>
<span class="icon icon-instagram"></span>
```
通过上述步骤，你可以使用iconfont来处理你的图标资源，并在项目中方便地使用它们。确保在CSS中设置了图标的字体大小和行高，以便正确显示图标。

### 使用 base64 格式
实际开发过程中， 为何会考虑 base64 ？

使用Base64图片的优势有以下几点：

* 减少HTTP请求数量：通常情况下，每个网页都需要加载多张图片，因此会发送多个HTTP请求来获取这些图片文件。使用Base64图片可以将图片数据嵌入到CSS或HTML文件中，减少了对服务器的请求次数，从而提高网页加载速度。

* 减少图片文件的大小 ：Base64是一种编码方式，可以将二进制数据转换成文本字符串。通过使用Base64，可以将图片文件转换成文本字符串，并将其嵌入到CSS或HTML文件中。相比于直接引用图片文件，Base64编码的字符串通常会更小，因此可以减少图片文件的大小，从而减少了网页的总体积，加快了网页加载速度。

* 简化部署和维护：将图片数据嵌入到CSS或HTML文件中，可以减少文件的数量和复杂性，使得部署和维护变得更加简单和方便。此外，也不需要处理图片文件的路径和引用相关的问题。

* 实现一些特殊效果：通过Base64图片，可以实现一些特殊的效果，例如页面背景渐变、图标的使用等。这样可以避免使用额外的图片文件，简化了开发过程。

上面虽然说饿了挺多有点， 但是劣势也是很明显：

* 增加了文本文件的体积：因为Base64编码将二进制数据转换成文本字符串，所以会增加CSS或HTML文件的体积。在图片较大或数量较多时，这可能会导致文件变得庞大，从而导致网页加载速度变慢。

* 缓存问题：由于Base64图片被嵌入到了CSS或HTML文件中，如果图片内容有更新，那么整个文件都需要重新加载，而无法使用缓存。相比于独立的图片文件，Base64图片对缓存的利用效率较低。

> 使用Base64图片在一些特定的场景下可以提供一些优势，但也需要权衡其带来的一些缺点。在实际开发中，可以根据具体的需求和情况，选择是否使用Base64图片。 所以建议复用性很强, 变更率较低， 且 小于 10KB 的图片文件， 可以考虑 base64

如何使用？ 有要介绍一下 webpack 插件了： `url-loader` 或 `file-loader`

要使用Webpack将图片自动转换为Base64编码，您需要执行以下步骤：

安装依赖：首先，确保您已经安装了url-loader或file-loader，它们是Webpack的两个常用的加载器。
```bash
npm install url-loader --save-dev
```
配置Webpack：在Webpack的配置文件中，添加对图片文件的处理规则。您可以在module.rules数组中添加一个新的规则，以匹配图片文件的后缀。
```js
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 设置图片大小的阈值，小于该值的图片会被转为Base64
              outputPath: 'images', // 输出路径
              publicPath: 'images', // 资源路径
            },
          },
        ],
      },
    ],
  },
  // ...
};
```
在上面的示例中，配置了一个处理png、jpeg、jpg和gif格式图片的规则。使用url-loader加载器，并设置了一些选项，例如limit限制了图片大小的阈值，小于该值的图片将会被转换为Base64编码。

在代码中引用图片：在您的代码中，可以像引用普通图片一样引用图片文件，Webpack会根据配置自动将其转换为Base64编码。
```js
import imgSrc from './path/to/image.png';

const imgElement = document.createElement('img');
imgElement.src = imgSrc;
document.body.appendChild(imgElement);
```

构建项目：最后，使用Webpack构建项目，它会根据配置自动将符合规则的图片文件转换为Base64编码，并将其嵌入到生成的输出文件中。
npx webpack
这样，Webpack就会自动将图片转换为Base64编码，并将其嵌入到生成的输出文件中。请注意，在使用Base64图片时，需要权衡文件大小和性能，适度使用Base64编码，避免过大的文件导致网页加载变慢。

### 使用 CDN 加载图片
CND 加载图片优势非常明显：

* 加速网页加载速度：CDN通过将图片资源分布在全球的多个节点上，使用户能从离自己最近的节点获取资源，从而大大减少了网络延迟和加载时间。这可以提高网页的加载速度和用户体验。
* 减轻服务器负载：CDN充当了一个缓冲层，当用户请求图片资源时，CDN会将图片资源从源服务器获取并缓存在节点中，下次再有用户请求同一资源时，CDN会直接从节点返回，减少了对源服务器的请求，分担了服务器的负载。
* 提高并发性能：CDN节点分布在不同地区，用户请求图片资源时可以从离他们最近的节点获取，这可以减少网络拥塞和并发请求，提高了并发性能。
* 节省带宽成本：CDN的节点之间会自动选择最优路径，有效利用了带宽资源，减少了数据传输的成本，尤其在大量图片资源请求时，能够带来显著的成本节省。
* 提供高可用性：CDN通过分布式存储和负载均衡技术，提供了高可用性和容错能力。即使某个节点或源服务器发生故障，CDN会自动切换到其他可用节点，确保用户能够正常访问图片资源。

总之，使用CDN加载图片可以提高网页加载速度、降低服务器负载、提高并发性能、节省带宽成本，并提供高可用性，从而改善用户体验和网站性能。

### 图片懒加载
图片懒加载是一种在网站或应用中延迟加载图片的技术。它的主要目的是减少页面的初始加载时间，并提高用户的浏览体验。

#### 原理
图片懒加载的原理是只在用户需要时加载图片，而不是在页面初始加载时全部加载。这通常通过将图片的真实地址存储在自定义属性（例如data-src）中，而不是在src 属性中。然后，在图片进入浏览器视图时，通过JavaScript动态将data-src的值赋给src属性，触发图片的加载。

#### 优势
图片懒加载可以显著减少初始页面的加载时间，特别是当页面中有大量图片时。它使页面加载变得更快，提高了用户的浏览体验。此外，懒加载还可以节省带宽和减轻服务器负载，因为只有当图片进入视图时才会加载。

#### 实现方法
图片懒加载可以通过纯JavaScript实现，也可以使用现成的JavaScript库，如LazyLoad.js、Intersection Observer API等 。这些库提供了方便的API和配置选项，可以自定义懒加载的行为和效果。

#### 最佳实践
在使用图片懒加载时，可以考虑一些最佳实践。例如，设置一个占位符或加载中的动画，以提供更好的用户体验。另外，确保在不支持JavaScript的情况下仍然可用，并为可访问性提供替代文本（alt属性）。此外，对于移动设备，可以考虑使用响应式图片来适应不同的屏幕分辨率。

#### 实现举例

图片懒加载可以延迟图片的加载，只有当图片即将进入视口范围时才进行加载。这可以大大减轻页面的加载时间，并降低带宽消耗，提高了用户的体验。以下是一些常见的实现方法：

1. Intersection Observer API
Intersection Observer API 是一种用于异步检查文档中元素与视口叠加程度的API。可以将其用于检测图片是否已经进入视口，并根据需要进行相应的处理。
```js
let observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      const lazyImage = entry.target;
      lazyImage.src = lazyImage.dataset.src;
      observer.unobserve(lazyImage);
    }
  });
});

const lazyImages = [...document.querySelectorAll(".lazy")];
lazyImages.forEach(function(image) {
  observer.observe(image);
});
```

2. 自定义监听器
或者，可以通过自定义监听器来实现懒加载。其中，应该避免在滚动事件处理程序中频繁进行图片加载，因为这可能会影响性能。相反，使用自定义监听器只会在滚动停止时进行图片加载。
```js
function lazyLoad() {
  const images = document.querySelectorAll(".lazy");
  const scrollTop = window.pageYOffset;
  images.forEach((img) => {
    if (img.offsetTop < window.innerHeight + scrollTop) {
      img.src = img.dataset.src;
      img.classList.remove("lazy");
    }
  });
}

let lazyLoadThrottleTimeout;
document.addEventListener("scroll", function() {
  if (lazyLoadThrottleTimeout) {
    clearTimeout(lazyLoadThrottleTimeout);
  }
  lazyLoadThrottleTimeout = setTimeout(lazyLoad, 20);
});
```
在这个例子中，我们使用了 setTimeout() 函数来延迟图片的加载，以避免在滚动事件的频繁触发中对性能的影响。

无论使用哪种方法，都需要为需要懒加载的图片设置占位符，并将未加载的图片路径保存在 data 属性中，以便在需要时进行加载。这些占位符可以是简单的 div 或样式类，用于预留图片的空间，避免页面布局的混乱。
```html
<!-- 占位符示例 -->
<div class="lazy-placeholder" style="background-color: #ddd;height: 500px;"></div>

<!-- 图片示例 -->
<img class="lazy" data-src="path/to/image.jpg" alt="预览图" />
```

### 图片预加载
图片预加载是一种在网站或应用中提前加载图片资源的技术。它的主要目的是在用户实际需要加载图片之前，将其提前下载到浏览器缓存中。

图片预加载通常是在页面加载过程中或在特定事件触发前异步加载图片资源。 通过使用 JavaScript，可以在网页DOM元素中创建一个新的Image对象，并将要预加载的图片的URL赋值给该对象的src属性。 浏览器在加载过程中会提前下载这些图片，并将其缓存起来，以备将来使用。

图片预加载可以使用原生JavaScript实现，也可以使用现成的JavaScript库，如Preload.js、LazyLoad.js等。这些库提供了方便的API和配置选项，可以灵活地控制预加载的行为和效果。

实现图片预加载可以使用原生JavaScript或使用专门的JavaScript库。下面分别介绍两种方式的实现方法：

1. 使用原生JavaScript实现图片预加载：
```js
function preloadImage(url) {
  return new Promise(function(resolve, reject) {
    var img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });
}

// 调用预加载函数
preloadImage('image.jpg')
  .then(function() {
    console.log('图片加载成功');
    // 在此处可以执行加载成功后的操作，例如显示图片等
  })
  .catch(function() {
    console.error('图片加载失败');
    // 在此处可以执行加载失败后的操作，例如显示错误信息等
  });
```
在上述代码中，我们定义了一个preloadImage函数，它使用Image对象来加载图片资源。通过onload事件和onerror事件来监听图片加载完成和加载错误的情况，并使用Promise对象进行异步处理。

2. 使用JavaScript库实现图片预加载：
使用JavaScript库可以更简便地实现图片预加载，并提供更多的配置选项和功能。以下以Preload.js库为例进行说明：

首先，在HTML文件中引入Preload.js库：
```html
<script src="preload.js"></script>
```
然后，在JavaScript代码中使用Preload.js库来进行图片预加载：
```js
var preload = new createjs.LoadQueue();
preload.on("complete", handleComplete);
preload.on("error", handleError);
preload.loadFile('image.jpg');

function handleComplete() {
  console.log('图片加载成功');
  // 在此处可以执行加载成功后的操作，例如显示图片等
}

function handleError() {
  console.error('图片加载失败');
  // 在此处可以执行加载失败后的操作，例如显示错误信息等
}
```
在上述代码中，我们首先创建一个LoadQueue对象，并使用on方法来监听加载完成和加载错误的事件。然后使用loadFile方法来指定要预加载的图片资源的URL。

当图片加载完成时，handleComplete函数会被调用，我们可以在此处执行加载成功后的操作。当图片加载错误时，handleError函数会被调用，我们可以在此处执行加载失败后的操作。

以上是两种常用的实现图片预加载的方法，根据具体需求和项目情况选择合适的方式来实现图片预加载。

1. 响应式加载图片
要在不同分辨率的设备上显示不同尺寸的图片，你可以使用 `<picture>` 元素和 `<source>` 元素来实现响应式图片。以下是一个示例:
```html
<picture>
  <source media="(min-width: 1200px)" srcset="large-image.jpg">
  <source media="(min-width: 768px)" srcset="medium-image.jpg">
  <source srcset="small-image.jpg">
  <img src="fallback-image.jpg" alt="Fallback Image">
</picture>
```
在上面的示例中，`<picture>` 元素内部有多个 `<source>` 元素，每个 `<source>` 元素通过 `srcset` 属性指定了对应分辨率下的图片链接。media 属性可以用来指定在哪个分辨率下应用对应的图片。如果没有任何 `<source>` 元素匹配当前设备的分辨率，那么就会使用 `<img>` 元素的 src 属性指定的图片链接。

可以根据不同分辨率的设备，提供不同尺寸和质量的图片，以优化用户的视觉体验和页面加载性能。

有可以使用 webpack responsive-loader 来实现自动根据设备分辨率加载不同的倍图：

依赖安装:
```bash
npm install responsive-loader sharp --save-dev
```
webpack 配置示范
```js
module.exports = {
  entry: { ... },
  output: { ... },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|webp)$/i,
        use: [
          {
            loader: "responsive-loader",
            options: {
              adapter: require('responsive-loader/sharp'),
              sizes: [320, 640, 960, 1200, 1800, 2400],
              placeholder: true,
              placeholderSize: 20
            },
          },
        ],
      }
    ]
  },
}
```
在CSS中使用它(如果使用多个大小，则只使用第一个调整大小的图像)
```css
.myImage {
    background: url('myImage.jpg?size=1140');
}

@media (max-width: 480px) {
    .myImage {
        background: url('myImage.jpg?size=480');
    }
}
```
导入图片到 JS 中：
```js
import responsiveImage from 'img/myImage.jpg?sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048';
import responsiveImageWebp from 'img/myImage.jpg?sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=webp';
...
<picture>
  <source srcSet={responsiveImageWebp.srcSet} type='image/webp' sizes='(min-width: 1024px) 1024px, 100vw'/>
  <img
    src={responsiveImage.src}
    srcSet={responsiveImage.srcSet}
    width={responsiveImage.width}
    height={responsiveImage.height}
    sizes='(min-width: 1024px) 1024px, 100vw'
    loading="lazy"
  />
</picture>
...
```
### 渐进式加载图片
实现渐进式加载的主要思想是先加载一张较低分辨率的模糊图片，然后逐步加载更高分辨率的图片。

下面是实现渐进式加载图片的一般步骤：

1. 创建一张模糊的低分辨率图片。可以使用图片处理工具将原始图片进行模糊处理，或者使用低分辨率的缩略图作为初始图片。

2. 使用`<img>`标签将低分辨率的图片设置为src属性。这将立即加载并显示这张低分辨率的图片。

3. 在加载低分辨率图片时，同时加载高分辨率的原始图片。可以将高分辨率图片的URL设置为data-src等自定义属性，或者使用JavaScript动态加载高清图片。

4. 使用JavaScript监听图片的加载事件，在高分辨率图片加载完成后，将其替换低分辨率图片的src属性，以实现渐进式加载的效果。

下面是一个示例代码，演示了如何实现渐进式加载图片：
```html
<!-- HTML -->
<img src="blur-image.jpg" data-src="high-res-image.jpg" alt="Image">

<script>
  // JavaScript
  const image = document.querySelector('img');

  // 监听高分辨率图片加载完成事件
  image.addEventListener('load', () => {
    // 替换低分辨率图片的src属性
    image.src = image.dataset.src;
  });
</script>
```
在上面的示例中，一开始会显示一张模糊的低分辨率图片，然后在高分辨率图片加载完成后，将其替换为高分辨率图片，实现了渐进式加载的效果。

渐进式加载图片可以减少用户等待时间，提供更好的用户体验。然而，需要注意的是，为了实现渐进式加载，需要额外加载高分辨率的图片，这可能会增加页面加载时间和网络带宽消耗。因此，开发者需要在性能和用户体验之间进行权衡，并根据实际情况进行选择和优化。


## 如何从 0 到 1 搭建前端基建
基建包括了 业务基建、工程基建、前端基建、后端基建等。
### 基建具备的特性
* 标准化：基建的产出通常是一套标准化的解决方案，可以应用于多个业务场景。
* 自动化：基建的产出通常是一套自动化解决方案，可以减少重复的工作量。
* 健全性：基建的产出通常是一套健全的解决方案，可以保证系统的稳定性和可靠性。
* 稳定性：基建的产出通常是一套稳定的解决方案，可以保证系统的正常运行。
* 易用性：基建的产出通常是一套易用的解决方案，可以降低开发者的使用成本。
* 易维护性：基建的产出通常是一套易维护的解决方案，可以降低开发者的维护成本。
### 业务基建
业务基建是指企业内部业务系统、业务流程、数据管理等方面，包括 业务架构、业务流程、数据模型、数据存储、数据同步、数据查询、数据报表等。
### 工程基建
工程基建是指软件开发过程中涉及到的技术、工具、流程等方面，包括 技术选型、代码规范、构建工具、CI/CD、部署流程、监控报警、日志系统、安全防护等。
### 前端基建都有什么？
前端规范（Standard）
前端文档（Document）
前端项目模板管理（Templates）
前端脚手架（CLI）
前端组件库（UI Design）
前端响应式设计 or 自适应设计
前端工具库（类 Hooks / Utils）
前端工具自动化（Tools）
接口数据聚合（BFF）
前端 SSR 推进
前端自动化构建部署（CI/CD）
全链路前端监控/数据埋点系统
前端可视化平台
前端性能优化
前端低代码平台搭建
微前端（Micro App）
### 前端基建的作用
* 业务复用
* 提升开发效率
* 规范研发流程
* 提升代码质量
* 提升团队的协作效率
### 后端基建
后端基建是指后端开发过程中涉及到的技术、工具、流程等方面，包括 技术选型、代码规范、构建工具、数据库、缓存、消息队列、分布式事务、微服务架构、服务发现、负载均衡、网关、安全认证、日志系统、监控报警、文档生成、部署流程、安全防护等。

## Husky 的作用，有哪些重要配置
Husky 是一个基于 Node 的 Git 钩子管理工具，用于在你的工作流程中强制执行 Git 钩子。Husky 允许你定义脚本，这些脚本会在不同的 Git 生命周期事件触发时自运行，比如在提交、推送或合并前。

### 作用
1. 保证提交质量：Husky 可以在你提交代码之前运行代码校验，确保代码符合项目规范，提高代码质量。
2. 维护代码风格：可以在提交时检查代码风格，确保代码风格一致性。
3. 自动化流程：支持在推送前执行代码部署、测试脚本，让整个开发流程自动化。
4. 预防错误：例如在允许推送到远程仓库之前检查代码中是否有遗留的更改。

### Husky 的一些重要配置
1. 安装 husky
```bash
npm install husky --save-dev
```
2. 配置化 package.json
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint", // 在提交之前运行 lint
      "pre-push": "npm run test",   // 在推送之前运行测试
      // 其他钩子...
    }
  }
}
```
### Husky 支持的钩子
* apply-patch-msg: 应用一个补丁到暂存区并生成提交信息时。
* pre-applypatch: 打补丁前。
* post-applypatch: 打补丁后。
* pre-commit: 提交前，常用于检查代码、分析代码风格等。
* prepare-commit-msg: 提交准备工作完成后，修改提交信息之前运行。
* commit-msg: 检查提交信息有效性。
* post-commit: 提交后。
* pre-rebase: 回滚操作开始前。
* post-checkout: 检出操作后（如切换分支）。
* post-merge: 合并和变基操作后。
* pre-push: 在推送之前运行的命令。可以用于运行测试或构建任务。
* prepare: 这个钩子会在首次 git commit 或 git push 前被触发，并且只运行一次。通常用于安装钩子文件到 .git/hooks 目录。

3. 自定义脚本
```json
{
  "scripts": {
    "lint": "eslint .",
    "test": "jest"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint",
      "pre-push": "npm run test"
    }
  }
}
```
4. 配置 .huskyrc 或 .huskyrc.js
可以选择创建一个 .huskyrc 文件来进一步定制 Husky 的行为。例如，你可以指定要使用的钩子目录：
```json
// .huskyrc.js
module.exports = {
  hooksDir: 'my-hooks'
};
```
5. 自定义钩子脚本
对于更复杂的逻辑，你也可以创建独立的 shell 脚本来处理钩子逻辑。这些脚本通常放在 .husky 目录下：
```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# 运行自定义的钩子脚本
npm run lint
```

## 前端视角 - 保证系统稳定性
代码质量
静态资源多备份（需要有备份）
首屏请求缓存
请求异常报警
页面崩溃监控报警
安全性保障

## 应用如何做应用灰度发布？
灰度发布是一种软件部署策略，用于逐步将新版本的软件或功能引入到生产环境中，以降低风险并及时发现潜在的问题。在灰度发布过程中，新版本或功能只会被部署给一小部分用户或流量，然后逐步增加到更多的用户或流量中。

灰度发布的核心在于通过控制不同版本的流量比例，实现新版本与旧版本并存，同时观察新版本的表现，以便及时发现问题并进行调整。

1. 基于 HTTP 头或 Cookie 的路由
通过识别用户的 HTTP 请求头（如 User-Agent）或特定的 Cookie，决定用户请求被路由到新版本还是旧版本的应用。这种方法通常需要负载均衡器或网关支持特定路由规则。

2. 使用服务网格（Service Mesh）
服务网格如 Istio 提供了复杂的流量管理能力，可以在微服务架构中实现灰度发布。通过定义路由规则，Istio 可以将特定比例或特定条件的流量导向新版本服务。

3. 功能开关（Feature Toggles）
功能开关允许开发者在代码中嵌入开关，根据配置动态激活或关闭某些功能。这样，新版本的功能可以被隐藏，直到你决定通过更改配置为特定用户群体开放。

4. DNS 路由
通过 DNS 管理，将部分用户的请求解析到部署了新版本应用的服务器上。这种方法简单，但切换和回退可能不如其他方法灵活。

5. CDN 切换
对于前端应用或静态资源，可以通过 CDN 配置，将部分用户的请求路由到包含新版本资源的 CDN 上。通过调整 CDN 的缓存规则控制版本切换。

6. A/B 测试平台
将灰度发布作为 A/B 测试的一部分，使用专门的 A/B 测试平台来控制哪些用户看到新版本。这种方法不仅可以实现灰度发布，还能搜集用户反馈和使用情况数据。

7. 容器编排和管理
在支持容器编排（如 Kubernetes）的环境中，可以通过部署新版本的 Pod 副本，并逐步增加新版本副本的数量，同时减少旧版本副本的数量实现灰度发布。

在实施灰度发布时，应该配合监控和日志记录工具，以便快速识别并解决新版本可能引入的问题。同时，在决定完全推出新版本之前，逐渐增加访问新版本的用户比例，确保在所有阶段都能够保持应用的稳定性和高性能。

## 