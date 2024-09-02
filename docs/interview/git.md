## git merge 和 rebase 的区别
git merge 和 git rebase 都是 git 中用于合并分支的命令，但在合并方式、提交历史记录的处理以及冲突解决方面存在显著差异。以下是它们之间的主要区别：
### 合并方式
* merge
将两个分支的代码合并成一个新的提交，这个新的提交有两个父提交，分别代表被合并的两个分支的最新提交。这种合并方式会创建一个新的提交，包含了被合并分支的所有更改，从而将两个不同分支中的代码变更合并到一起。

* rebase
是将当前分支的提交移动到另一个分支的最新提交之后，相当于重新应用一遍当前分支的所有提交。这种合并方式会使得提交历史变得更加线性，因为提交会被“重放”在新的基础分支上。在执行 rebase 命令之后，当前分支的提交历史会变为基于另一个分支的最新提交。

### 提交历史记录
* merge
会保留每个分支的提交历史记录，并且会创建一个新的合并提交，这个提交会清晰地显示出哪些更改来自哪个分支。因此，merge 的合并方式更加保守，它会保留所有的历史信息。
* rebase
会改写当前分支的提交历史，将当前分支的提交“移动”到目标分支的最新提交之后，并创建一个新的提交历史记录。这使得提交历史看起来更加线性，但也可能使得分支之间的关系变得不那么清晰。

### 冲突解决
* merge
当使用 merge 命令合并分支时，如果存在冲突，Git 会自动创建一个合并提交，其中包含两个分支的所有更改。此时，需要手动解决冲突，并将解决后的更改添加到暂存区，然后提交合并结果。
* rebase
rebase 命令在合并时，会逐个将当前分支的提交应用到目标分支上。如果在某个提交上遇到冲突，Git 会停止 rebase 操作，并提示解决冲突。解决冲突后，需要使用 git add 命令将更改添加到暂存区，并使用 git rebase --continue 命令继续 rebase 操作。这意味着 rebase 操作会在每个提交上进行冲突解决，而不是在整个分支上进行。

### 使用场景
* merge
merge 命令适用于需要保留分支历史记录的场景，或者当两个分支的历史相对独立且合并后不需要特别整理提交历史时。例如合并来自不同开发人员的代码。
* rebase
rebase 命令适用于需要保持提交历史线性，避免不必要的合并提交的场景，例如在开发过程中频繁地合并和更新代码。

### 撤销操作
* merge
可以使用 git reset 命令撤销 merge 操作，但需要谨慎使用，因为它会删除合并提交。
* rebase
可以使用 git rebase --abort 命令撤销 rebase 操作，它会将当前分支恢复到 rebase 操作开始之前的状态。


## 解决冲突后无法 push 
在解决完成冲突后 push 时又提示拒绝，用 -f 或者 --force 参数强制推送，发现就推送成功了。
### 无法 push 的原因
在解决冲突后，Git 检测到当前分支与远程仓库中的分支有差异。当 Git 试图将本地分支推送到远程仓库时，会检查本地分支和远程分支的提交历史是否一致。如果本地分支的提交历史与远程分支的提交历史不一致，Git 会拒绝推送，因为这可能会导致远程仓库中的数据被覆盖。
### 解决方法
* 强制推送
生产过程中碰到过一次，rebase后强制push，同一分支的其他同学pull代码时出错，强行覆盖也不行。所以除非有充分的强制推送理由，其他情况下，不建议使用git push --force

使用 -f 或者 --force 参数强制推送，这会覆盖远程分支上的所有提交，但需要谨慎使用，因为它可能会导致远程仓库中的数据丢失。

这里将推荐 --force-with-lease 参数，让我们可以更安全地进行强制推送，Git 的 1.8.5 版本开始提供了这个参数，旨在解决 git push --force 命令造成的安全问题。

## git fetch 和 git pull 的区别
git fetch 和 git pull 都是 Git 中用于获取远程仓库数据的命令，但它们在用法和功能上存在一些差异。以下是它们的主要区别：
### 用法
* git fetch
git fetch 命令用于从远程仓库获取最新的代码，但不会自动合并到本地分支。它会将远程仓库的更改下载到本地，但不会修改本地的工作目录。用户需要手动合并这些更改到本地分支。
* git pull
git pull 命令是 git fetch 和 git merge 的组合，它会从远程仓库获取最新的代码，并自动将其合并到本地分支。如果本地分支与远程分支存在冲突，需要手动解决冲突。

### 功能
* git fetch
git fetch 命令只是获取远程仓库的更改，不会自动合并到本地分支。它只是更新了本地仓库中的远程分支，用户需要手动合并这些更改到本地分支。
* git pull
git pull 命令会自动从远程仓库获取最新的代码，并自动将其合并到本地分支。它简化了获取和合并远程更改的过程，但需要注意解决可能出现的冲突。

### 使用场景
* git fetch
git fetch 命令适用于需要查看远程仓库的最新更改，但不希望立即合并到本地分支的场景。例如，用户可以查看远程仓库的最新提交，并决定是否需要合并这些更改。
* git pull
git pull 命令适用于需要立即获取远程仓库的最新更改并合并到本地分支的场景。例如，用户可能需要立即更新本地代码，以便使用远程仓库中的最新功能或修复。

## git 仓库迁移
### 1.克隆（git clone）+ 推送(git push)
* 在仓库 B 中创建新的仓库

* 在本地克隆原始仓库 A
使用 git clone 命令将原始仓库克隆到本地。
```bash
git clone --mirror <仓库 A URL>
cd <仓库 A 目录>
```
使用 --mirror 选项克隆仓库会保留所有分支、标签和提交历史。

* 修改新的远程仓库地址为仓库 B
```bash
git remote set-url --push origin <仓库 B URL>
```

* 推送到仓库 B
```bash
git push --mirror
```

### 2. 使用 git bundle
* 在仓库 A 中创建 bundle 文件：
```bash
git bundle create repoA.bundle --all
```
* 将 repoA.bundle 文件传输到仓库 B 所在位置。

* 在仓库 B 中克隆：
```bash
git clone repoA.bundle <仓库 B 目录>
```
这两种方法都会保留所有分支、标签和提交历史。选择哪种方法取决于你的具体需求和迁移环境。

### 注意：
* 使用 --mirror 或 --all 选项在 git clone 或 git bundle 中时，会将所有的分支和标签复制到目标仓库。
* 在执行之前，请确保仓库 B 是空的或者是一个你可以覆盖的目标仓库，因为这些操作会覆盖目标仓库的内容。
* 如果仓库 A 中包含子模块，你可能需要额外处理子模块的迁移。

## Husky 和 lint-staged 的区别
Husky 和 lint-staged 都是与 Git 钩子 (hooks) 配合使用的 Node.js 库，但它们的用途和工作方式有所不同：
### Husky：
* Husky 是一个 Git 钩子管理器，它允许你触发自定义脚本在 git 事件发生时运行，如 pre-commit, pre-push, post-merge 等。
* 主要目的是自动化你的版本控制工作流程，例如在提交 (commit) 前运行代码检查、格式化代码或执行测试，以确保代码库的质量和一致性。
### lint-staged：
* lint-staged 是一个运行在 Husky 钩子之上的工具，它专门用于对暂存区 (staged) 文件的检查。
* 当你运行 git commit 并且 Husky 触发 pre-commit 钩子时，lint-staged 会检查你即将提交的代码（即 git add 后的文件列表），并运行你配置好的检查脚本，如代码格式化程序、linter 或其他工具。
* 目的是确保在提交之前，只有没有检查错误的代码会被提交。

简而言之，Husky 是一个可以触发多种钩子事件的工具，而 lint-staged 是一种专门用于检查 Git 暂存区文件的工具。它们通常是配合使用的，因为 lint-staged 需要通过 Husky 来触发钩子。在你初始化项目并配置 CI/CD 流程时，通常会同时用到它们。

### 搭配 eslint 在 前端项目中使用
* 1. 安装 husky 和 lint-staged：
```bash
npm install husky lint-staged eslint --save-dev
```
* 2. 配置 husky：
在 package.json 中，你可以使用 husky 字段来配置 git hooks。但是，从 Husky 5 开始，推荐使用 npx husky-init 命令来自动设置。运行：
```bash
npx husky-init && npm install
```
这将自动在 .husky 目录下创建 git hooks，并在 package.json 中添加一些配置。
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
}
```
* 3. 配置 lint-staged
在 package.json 中添加 lint-staged 配置。这通常位于 husky 配置的同一级别。
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
            "eslint --fix",
            "git add"
        ]
    },
}
```
这个配置告诉 lint-staged 在 pre-commit hook 触发时，对暂存区中的 .js、.jsx、.ts、.tsx 文件运行 eslint --fix 命令，并自动将这些更改添加到暂存区。
* 4. 测试配置
在提交更改时，Husky 将触发 pre-commit hook，lint-staged 将运行 ESLint 对暂存区的文件进行检查和可能的修复，并将更改重新添加到暂存区。

