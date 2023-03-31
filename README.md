# git-remote-dir

从 git 远程仓库中，指定要拉取的目录，而不用拉取整个项目。

# usage1

```
const remoteDir = require("git-remote-dir")

remoteDir(name, repo, branch);
// name 仓库子目录 必须
// repo 仓库地址 必须
// branch 仓库子目录 默认 master

```

# usage2

支持命令行

```
remote dir repo

// repo 远程仓库地址 必须

// 步骤一： 选择要拉取的分支 main
// 步骤二：选择要拉取的目录 src

```

# 备注

原理是使用 node 操作，利用 git 稀疏检出实现
