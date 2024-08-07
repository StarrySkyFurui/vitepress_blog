## 常用命令
- 初始化仓库
初始化一个 Git 仓库，将创建一个 .git 目录，后续的操作记录都会记录在这个文件夹里，相当于 Git 的数据库，这个文件夹是隐藏的。
```bash
git init
```
- 添加远程仓库
将本地仓库与远程仓库关联起来，关联之后，就可以将本地的提交历史推送到远程仓库，也可以将远程仓库的提交历史拉取到本地仓库，完成与他人的协同工作。
```bash
git remote add origin https://www.github.com
```
- 查看远程仓库
查看当前关联的远程仓库，返回的 URL 就是远程仓库的地址。
```bash
git remote -v
```
- 删除远程仓库
删除关联的远程仓库，如果需要重新关联远程仓库，可以再次执行 git remote add origin 命令。
```bash
git remote remove origin
```
- 添加文件到暂存区
将已修改或未跟踪的文件添加到暂存区，暂存区是 Git 仓库中的一个临时区域，用来存放需要提交的文件。
```bash
//  添加当前所有修改文件
git add . 
// 添加指定文件
git add 文件名 
```
- 提交暂存区文件到本地仓库
```bash
git commit -m "本次提交的类型: 说明"
```
- 查看提交日志
```bash
git log
```
- 查看文件状态
显示当前工作目录和暂存区的状态，即当前工作目录中哪些文件被修改了，哪些文件没有被跟踪。
```bash
git status
```
- 查看工作区和暂存区的不同之处
```bash
git diff
```
- 撤销文件修改
```bash
git reset HEAD 文件名
```
- 将远程仓库的代码拉取到本地仓库
```bash
git pull 
```
- 推送本地仓库到远程仓库
```bash
git push origin 本地分支名:远程分支名
// 如果本地分支名与远程分支名相同，可简写为
git push origin
```
- 合并分支，将其它分支的内容合并到当前分支
```bash
git merge 待合并分支名
```
- 创建新的分支
```bash
git checkout -b 新分支名
```
- 切换分支
```bash
git checkout 分支名
```
- 删除分支
```bash
git branch -d 分支名
```
- 查看分支
```bash
git branch
```
- 查看远程分支
```bash
git branch -r
```
- 查看所有分支
```bash
git branch -a
```
- 删除远程分支
```bash
git push origin --delete 远程分支名
```


## 代码更新流程
- 新建分支/使用自己的分支
```bash
// 新建分支
git checkout -b 新分支名
// 使用已存在分支
git checkout 已存在分支名 
// 删除本地分支
git branch -D 待删除分支名 
```
- 编辑代码,保存并将修改提交到本地分支
```bash
// 保存目录下所有修改文件
git add . 
// 撤销所有add的文件
git reset HEAD . 
// 提交修改到所在分支
git commit -m "本次提交的类型: 说明" 
```
- 将最新代码拉取到本地主分支
```bash
// 切换到主分支
git checkout master 
// 拉取最新代码
git pull --rebase 
```
- 将修改后的分支合并到本地主分支
```bash
// 切换分支
git checkout 新代码所在分支名 
// 将master中的代码合并到所在分支
git rebase master 
```
- 推送本地分支到远程分支
```bash
// 将本地分支推送到同名的远程分支，若远程不存在则新建
git push origin 所在分支名 
```
- 合并远程分支到远程 master
    登陆 `gitlab` 网站，打开刚提交的远程分支
    点击 `merge`，确认提交到的目标
    等待管理员检查代码并确认合并
## 同步产品代码
> 合并时一定要注意有没有修改配置文件

- 添加上游仓库(只执行一次即可) 
```bash
// git remote add 仓库名 仓库地址 
git remote add upstream https://www.github.com
```
- 查看当前仓库信息
```bash
git remote -v
```
- 获取代码
```bash
git fetch upstream
```
- 切换至本地master
```bash
git checkout master
```
- 合并代码 
```bash
git merge upstream/master
```
- 依次解决冲突，然后按照代码更新流程进行更新 (不要用rebase 直接merge即可)

## 常用查看
```bash
// 查看本地所有分支
git branch 
// 查看暂存区代码
git status 
```

## 代码回退
需要回滚提交的代码的场景常常是如下三个：

- 提交代码到错误Git分支；
- 提交的代码不需要上线了，而同一分支有需要上线的代码；
- 提交了不需要提交的代码。
解决办法：使用Git回滚命令reset。
> reset 命令有如下三个使用方式，请先切换到相应分支后，然后根据自己的情况选择合适的方式
```bash
// 回退到上个版本
git reset --hard HEAD^  

// 回退到前n次提交之前，若n=3，则可以回退到3次提交之前
git reset --hard HEAD~n

// 回滚到指定commit的sha码【推荐】
// 查看commit sha码
git log 
// 回退到指定commit的sha码
git reset --hard commit_sha 

// hard 是强制执行的意思，执行上述某条命令后，再执行如下命令，强推到远程仓库：
git push origin HEAD --force
```
## 合并 commit
```bash
// 合并最近两次commit
git rebase -i HEAD~2
// 合并最近三次commit
git rebase -i HEAD~3
```

## 撤销 commit
```bash
// 撤销最近一次commit
git reset --soft HEAD~1
// 撤销最近两次commit
git reset --soft HEAD~2
// 撤销最近三次commit
git reset --soft HEAD~3
```
    
## 撤销 push
```bash
// 撤销最近一次push
git push origin HEAD --force
// 撤销最近两次push
git push origin HEAD~1 --force
// 撤销最近三次push
git push origin HEAD~2 --force
```

<!-- ## 版本管理 -->

<!-- ## 分支管理 -->

<!-- ## 问题备忘
- 为什么用rebase而不用merge?
    * 虽然merge更加的简单，但是merge会造成合并路线的混乱、不够简洁。rebase可以让线路保持单一，更方便查看。其实是项目要求所致
- 为什么要将最新代码拉取到本地？
    * 保证代码的统一，而且git要求这么做，如果你push的代码的基础不是最新版本，git就会拒绝你的提交请求。
- 我在rebase过程中出现了冲突如何解决？
    * 查看冲突并解决冲突（一般都是两人修改了同一处代码）
    * add . 添加修改后的文件(无需commit)
    * git rebase --continue 继续执行rebase
- 为什么不直接把本地分支推送到远程master?
    * 在gitlab中远程master默认受保护，拒绝进行跨分支提交。
- 从远程分支合并到远程master的时候有必要检查目标么？
    * 很有必要，不然合并到了其他master会有人骂你。(*^▽^*) -->