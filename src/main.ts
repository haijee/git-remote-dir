#!/usr/bin/env node

const shell = require("shelljs");
const path = require("path");
const fs = require("fs");
const giturl = "https://github.com/haijee/haijee.git";

const gitDir = (dirName = "demo", gitUrl = giturl, branch = "master") => {
  if (!shell.which("git")) {
    shell.echo("未安装git,命令无效 ~");
    shell.exit(1);
  }
  if (fs.existsSync(dirName)) {
    shell.echo(`当前目录下已存在:${dirName} ~`);
    shell.exit(1);
  }
  const basePath = process.cwd();
  const basename = path.basename(dirName);
  const tempdir = shell.tempdir();
  shell.cd(tempdir);
  shell.exec("git init");
  shell.exec(`git remote add origin ${gitUrl} `);
  shell.exec(`git config core.sparsecheckout true`);
  shell.exec(`echo ${dirName} >> .git/info/sparse-checkout`);
  shell.exec(`git pull origin ${branch}`);

  // 删除git信息
  const gitDirInfo = path.join(basename, "/.git");
  shell.rm("-rf", gitDirInfo);
  shell.mv(dirName, basePath);

  // 删除临时文件目录
  //   shell.cd("..");
  //   shell.rm("-rf", tempdir);
  //   shell.exit(1);
  shell.echo("拉取成功～");
  shell.exit(1);
};

module.exports = gitDir;
export {};
