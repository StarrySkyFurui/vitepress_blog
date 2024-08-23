Node 是一个开源的、跨平台的、基于事件驱动的、轻量级的服务器端 JavaScript 运行环境，提供了一种简单的方式来运行 JavaScript 代码。

## 版本管理（nvm）
如果需要安装多个版本的 `Node.js`，可以使用版本管理工具 `nvm（Node Version Manager）`。以下是安装和使用 `nvm` 的基本步骤：
1. 安装 `nvm`
   根据操作系统不同，安装 `nvm` 的步骤会有所不同。通常，你可以从 `nvm 的 GitHub` 仓库下载对应系统的安装脚本并执行。

2. 使用 `nvm` 安装 `Node.js` 版本
   安装完 `nvm` 后，你可以使用以下命令安装特定版本的`Node.js`：
```bash
nvm install <version> //将<version>替换为你想要安装的 Node.js 版本号
```
安装完成后，你可以使用以下命令来验证是否成功安装了该版本：
```bash
node -v // 输出`Node.js`的版本号
```

3. 切换`Node.js`版本

```bash
nvm use <version> // 将<version>替换为你想要使用的版本号
```

4. 查看已安装的 `Node.js` 版本：

```bash
nvm ls
```
这条命令将列出所有通过nvm安装的`Node.js`版本。

## 包管理器（npm、pnpm、yarn）
npm 是 `Node.js` 默认的包管理器，用于安装和管理 `Node.js` 的包和依赖。`pnpm` 和 `yarn` 是 `npm` 的替代品，提供了更快的安装速度和更高效的磁盘空间利用
1. npm
```bash
// 查看版本
npm -v
// 安装名为<package-name>的npm包
npm install <package-name>
// 更新名为<package-name>的npm包
npm update <package-name>
// 卸载名为<package-name>的npm包
npm uninstall <package-name>
// 列出所有已安装的npm包
npm list
```

2. pnpm

`pnpm` 的安装和使用与 `npm` 类似，但通常速度更快。可以通过 `npm` 或直接从 `pnpm` 的官网下载安装 `pnpm`。
```bash
npm install -g pnpm
```
安装完成后，你可以使用以下命令来验证是否成功安装了 pnpm：
```bash
pnpm -v // 输出pnpm的版本号
```

3. yarn
   
`yarn` 也是一个流行的包管理器，提供了与 `npm` 相似的功能。安装 `yarn` 通常需要先安装 `Node.js`，然后使用 `npm` 进行全局安装：
```bash
npm install -g yarn
```
安装完成后，你可以使用以下命令来验证是否成功安装了 yarn：
```bash
yarn -v // 输出yarn的版本号
```
安装完成后，你可以使用yarn命令来安装包和管理依赖。

## 注意事项
* 安装多个版本的 `Node.js` 时，确保使用 `nvm` 等工具进行版本管理，以避免版本冲突。
* 在使用包管理器（如 `npm、pnpm、yarn` ）时，注意检查依赖的版本和兼容性，以确保项目的稳定运行。
* 定期检查并更新你的 `Node.js` 版本和包管理器，以获取最新的功能和安全修复。

## npx 和 npm 的用途及区别
### npm 的用途
- 依赖管理：npm 主要用于安装、更新、删除和管理项目依赖的Node.js包。它维护了一个巨大的公共仓库（npm registry），其中包含成千上万的开源包。
- 版本控制：npm 支持包的版本控制，允许你指定项目中每个依赖包的版本。
- 脚本执行：npm 允许你在package.json文件中定义脚本，并使用npm run <script-name>命令来执行这些脚本。

### npx 的用途
- 执行包中的命令：npx 允许你直接运行npm包中的命令，而无需先全局安装这个包。这对于临时使用工具或命令特别有用。
- 避免全局安装：通过npx，你可以避免将工具全局安装到你的系统中，这有助于保持系统的整洁，并防止版本冲突。
- 临时依赖：当你只需要一个包来执行一个任务时，npx 是非常方便的。任务完成后，它会自动清理，不会留下任何痕迹。

### npm 和 npx 的区别
- 核心功能：npm 主要用于包的管理，包括安装、更新、删除等。而npx 主要用于执行包中的命令，而无需全局安装这些包。
- 安装和清理：使用npm安装包时，包会被添加到项目的node_modules文件夹中，并且（如果指定了-g选项）可能全局安装。而npx执行的包不会添加到你的项目中，执行完毕后通常会清理相关文件。
- 版本选择：npm 允许你通过package.json文件指定项目的依赖版本。而npx 在执行命令时，会根据npm注册表中的最新版本（或你指定的版本）来运行包。
- 用途：npm 是Node.js项目的核心依赖管理工具，而npx 更像是一个便利工具，用于快速执行临时任务或脚本。