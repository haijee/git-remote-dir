# git-remote-dir

从 git 远程仓库中，指定要拉取的目录，而不用拉取整个项目。

# usage1

```
const remoteDir = require("git-remote-dir")

remoteDir(repo, {
    branch: "main" // 仓库子目录 默认 master
    targetDir: "", // 仓库子目录 必须
    outputDir: "", // 输出目录 必须
});

// repo 仓库地址 必须

```

# usage2

支持命令行用法

```
remote dir repo

// repo 远程仓库地址 必须
// 步骤一：选择要拉取的分支 必须 默认main
// 步骤二：选择要拉取的目录 必须
// 步骤二：选择要导出的目录 可选 默认为拉取的目录

```

# 备注

原理是使用 node 进行操作，利用 git 稀疏检出功能实现
