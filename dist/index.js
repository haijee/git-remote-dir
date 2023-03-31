#!/usr/bin/env node
var Command = require("commander").Command;
var path = require("path");
var shell = require("shelljs");
var inquirer = require("inquirer");
var program = new Command();
var pkginfo = require("../package.json");
var gitDir = require("./main");
program.version(pkginfo.version, "-v, --version", "当前版本");
program
    .command("remote <repo>")
    .description("拉取仓库文件")
    .action(function (name, repo, branch) {
    if (branch === void 0) { branch = "main"; }
    // <name>
    if (!repo) {
        console.log("请输入完成拉取文件名和仓库地址");
    }
    inquirer
        .prompt([
        {
            type: "input",
            name: "branch",
            message: "选择要拉取的分支",
            default: "main",
        },
        {
            type: "input",
            name: "name",
            message: "选择要拉取的目录",
            default: "main",
        },
    ])
        .then(function (answers) {
        var framework = answers.framework;
        console.log("结果", answers);
    });
    // if (name && repo) {
    //   gitDir(name, repo, branch);
    // } else {
    // }
});
program.parse(process.argv);
