#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shell = require("shelljs");
var path = require("path");
var fs = require("fs");
var giturl = "https://github.com/haijee/haijee.git";
var gitDir = function (dirName, gitUrl, branch) {
    if (dirName === void 0) { dirName = "demo"; }
    if (gitUrl === void 0) { gitUrl = giturl; }
    if (branch === void 0) { branch = "master"; }
    if (!shell.which("git")) {
        shell.echo("未安装git,命令无效 ~");
        shell.exit(1);
    }
    if (fs.existsSync(dirName)) {
        shell.echo("\u5F53\u524D\u76EE\u5F55\u4E0B\u5DF2\u5B58\u5728:".concat(dirName, " ~"));
        shell.exit(1);
    }
    var basePath = process.cwd();
    var basename = path.basename(dirName);
    var tempdir = shell.tempdir();
    shell.cd(tempdir);
    shell.exec("git init");
    shell.exec("git remote add origin ".concat(gitUrl, " "));
    shell.exec("git config core.sparsecheckout true");
    shell.exec("echo ".concat(dirName, " >> .git/info/sparse-checkout"));
    shell.exec("git pull origin ".concat(branch));
    // 删除git信息
    var gitDirInfo = path.join(basename, "/.git");
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
