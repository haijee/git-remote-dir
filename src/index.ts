#!/usr/bin/env node

const { Command } = require("commander");
const path = require("path");
const shell = require("shelljs");
const inquirer = require("inquirer");
const program = new Command();
const pkginfo = require("../package.json");
const gitDir = require("./main");
program.version(pkginfo.version, "-v, --version", "当前版本");

program
  .command("remote <repo>")
  .description("拉取仓库文件")
  .action((name: any, repo: any, branch: any = "main") => {
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
      .then((answers) => {
        const { framework } = answers;
        console.log("结果", answers);
      });
    // if (name && repo) {
    //   gitDir(name, repo, branch);
    // } else {
    // }
  });

program.parse(process.argv);
