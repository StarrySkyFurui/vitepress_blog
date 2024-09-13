## ts 常用的特性

## tsconfig.json 中的配置项
tsconfig.json是 TypeScript 项目的配置文件，它指定了用于编译该项目的根文件及编译器选项。以下是一些重要的配置项和它们的作用：
### compilerOptions
这部分包含了一系列用来告诉 TypeScript 编译器如何编译代码的标志。

* target: 设置编译后的 JavaScript 目标版本，比如"ES5"、"ES6"等。

* module: 指定生成的代码所使用的模块系统，如"CommonJS"、"AMD"、"System"、"UMD"、"ES6"、"ES2015"等。

* lib: 指定编译过程中需要包含的库文件的列表，如["dom", "es6"]等。

* outDir: 指定输出目录，编译后的文件将放在这个目录下。

* outFile: 将所有文件输出到一个文件中，仅在module为"system"或"amd"时有效。

* rootDir: 指定输入文件的根目录，用于控制输出目录结构。

* allowJs: 允许编译.js文件，让 TypeScript 和 JavaScript 代码可以共存。

* checkJs: 允许在.js文件中报告错误。

* jsx: 在.tsx文件中支持 JSX，例如："react"、"preserve"等。

* declaration: 生成相应的.d.ts文件。

* sourceMap: 生成相应的.map文件，用于调试。

* strict: 启用所有严格类型检查选项。

* noImplicitAny: 不允许具有隐式any类型的表达式和声明。

* strictNullChecks: 在严格的null检查模式下，null和undefined值不包含在任何类型里，只允许用作它们各自的类型使用。

* esModuleInterop: 通过为所有导入创建命名空间对象，实现 CommonJS 和 ES 模块之间的互操作性。

### files、include和exclude
这三个配置项控制 TypeScript 编译器应该编译哪些文件：

* files: 指定一个确切的文件列表，只有这些文件会被编译。
* include: 指定一个匹配模式列表，编译器会编译匹配上的文件。
* exclude: 指定一个匹配模式列表以排除某些文件。


示例tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5", // 编译目标 ECMAScript 版本
    "module": "commonjs", // 模块系统
    "strict": true, // 启用严格类型检查
    "esModuleInterop": true, // 允许 CommonJS 和 ES 模块之间的互操作性
    "outDir": "./dist", // 输出目录
    "sourceMap": true, // 生成源映射文件
    "allowJs": true, // 允许编译 JavaScript 文件
    "skipLibCheck": true // 跳过声明文件的类型检查
  },
  "include": ["src/**/*"], // 指定需要编译的文件
  "exclude": ["node_modules", "**/*.spec.ts"] // 排除测试文件和 node_modules 目录
}
```
这只是tsconfig.json中常用配置项的概览。根据项目的不同需求，可能会有更多的配置项需要了解和调整。通过适当配置tsconfig.json文件，可以有效控制 TypeScript 项目的编译过程。