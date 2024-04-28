## 代码提交规范
- feat: 新特性
- fix: 缺陷修复
- docs: 文档变更
- style: 代码风格
- refactor: 除新特性和缺陷修复的其他代码变动
- perf: 优化
- test: 测试
- build: 构建工具或外部依赖
- ci: 持续集成
- chore: 其他文件变更
- revert: 重置提交
  
## 代码更新流程
- 新建分支/使用自己的分支
```
git checkout -b 新分支名 新建分支
git checkout 已存在分支名 使用已存在分支
git checkout -d 待删除分支名 删除指定分支
```
- 编辑代码,保存并将修改提交到本地分支
```
git add . 保存目录下所有修改文件
git reset HEAD . 撤销所有add的文件
git commit -m "fix:bug[bug编号] 修改介绍" 提交修改到所在分支
```
- 将最新代码拉取到本地主分支
```
git checkout master 切换到主分支
git pull --rebase 拉取最新代码
```
- 将修改后的分支合并到本地主分支
```
git checkout 新代码所在分支名 切换分支
git rebase master 将master中的代码合并到所在分支
```
- 推送本地分支到远程分支
```
git push origin 所在分支名 将本地分支推送到同名的远程分支，若远程不存在则新建
```
- 合并远程分支到远程master
    登陆gitlab网站，打开刚提交的远程分支
    点击merge，确认提交到的目标
    等待管理员检查代码并确认合并
## 同步产品代码
> 合并时一定要注意有没有修改配置文件

- 添加上游仓库(只执行一次即可) git remote add 仓库名 仓库地址
    * 例如 git remote add upstream https://www.github.com
- 查看当前仓库信息 git remote -v
- 获取代码 git fetch upstream
- 切换至本地master git checkout master
- 合并代码 git merge upstream/master
- 依次解决冲突，然后按照代码更新流程进行更新 (不要用rebase 直接merge即可)

## 常用查看
```
git branch 查看本地所有分支
git status 查看暂存区代码
```

## 代码回退
需要回滚提交的代码的场景常常是如下三个：

- 提交代码到错误Git分支；
- 提交的代码不需要上线了，而同一分支有需要上线的代码；
- 提交了不需要提交的代码。
解决办法：使用Git回滚命令reset。
> reset 命令有如下三个使用方式，请先切换到相应分支后，然后根据自己的情况选择合适的方式
```
// 回退到上个版本
git reset --hard HEAD^  
// 回退到前n次提交之前，若n=3，则可以回退到3次提交之前
git reset --hard HEAD~n
// 回滚到指定commit的sha码【推荐】
git reset --hard commit_sha 
```
hard 是强制执行的意思，执行上述某条命令后，再执行如下命令，强推到远程仓库：

git push origin HEAD --force

<!-- ## 合并 commit -->

<!-- ## 版本管理 -->

<!-- ## 分支管理 -->

## 问题备忘
- 为什么用rebase而不用merge?
    * 虽然merge更加的简单，但是merge会造成合并路线的混乱、不够简洁。rebase可以让线路保持单一，更方便查看。其实是项目要求所致
- 为什么要将最新代码拉取到本地？
    * 保证代码的统一，而且git要求这么做，如果你push的代码的基础不是最新版本，git就会拒绝你的提交请求。
- 我在rebase过程中出现了冲突如何解决？
    * 查看冲突并解决冲突（一般都是两人修改了同一处代码）
    * add . 添加修改后的文件(无需commit)
    * git rebase --continue 继续执行rebase
- 为什么不直接把本地分支推送到远程master?

    在gitlab中远程master默认受保护，拒绝进行跨分支提交。
- 从远程分支合并到远程master的时候有必要检查目标么？
  
    很有必要，不然合并到了其他master会有人骂你。(*^▽^*)