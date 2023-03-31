#!/usr/bin/env node
const shell = require("shelljs");
const fs = require("fs");

type optionsType = {
  outputDir: string;
  targetDir: string;
  branch: string;
};

const remoteDir = (repo: string, options: optionsType): void => {
  const { outputDir, targetDir, branch = "master" } = options;
  if (!shell.which("git")) {
    shell.echo("未安装git,命令无效");
    shell.exit(1);
  }
  if (!targetDir || !repo) {
    shell.echo("缺少参数");
    shell.exit(1);
  }
  if (!outputDir && fs.existsSync(targetDir)) {
    shell.echo(`当前路径下已存在该目录`);
    shell.exit(1);
  }
  if (outputDir && fs.existsSync(outputDir)) {
    shell.echo(`当前路径下已存在该目录`);
    shell.exit(1);
  }

  const tempdir = shell.tempdir();
  const basePath = process.cwd();
  shell.cd(tempdir);
  // 删除缓存的目录和.git
  if (fs.existsSync(".git")) {
    shell.rm("-rf", ".git");
  }
  if (fs.existsSync(targetDir)) {
    shell.rm("-rf", targetDir);
  }
  // 创建临时仓库,设置稀疏检出
  shell.exec("git init");
  shell.exec(`git remote add origin ${repo}`);
  shell.exec(`git config core.sparsecheckout true`);
  shell.exec(`echo ${targetDir} >> .git/info/sparse-checkout`);
  shell.exec(`git pull origin ${branch}`);

  // 判断是否成功
  if (fs.existsSync(targetDir)) {
    if (outputDir) {
      shell.mv(targetDir, outputDir);
      shell.mv(outputDir, basePath);
    } else {
      shell.mv(targetDir, basePath);
    }
    shell.echo(`文件拉取成功～`);
    shell.exit(1);
  } else {
    shell.echo("文件拉取失败,检查仓库目录和分支是否有效～");
  }
};

module.exports = remoteDir;
export {};
