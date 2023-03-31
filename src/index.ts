#!/usr/bin/env node

const { Command } = require("commander");
const path = require("path");
const shell = require("shelljs");
const inquirer = require("inquirer");
const program = new Command();
const pkginfo = require("../package.json");
const remoteDir = require("./main");

program.version(pkginfo.version, "-v, --version", "当前版本");

program
  .command("dir <repo>")
  .description("拉取仓库文件")
  .action((repo: any) => {
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
          name: "targetDir",
          message: "选择要拉取的目录（仓库子目录）",
          default: "",
        },
        {
          type: "input",
          name: "outputDir",
          message: "选择要导出的目录（默认拉取的目录）",
          default: "",
        },
      ])
      .then((answers: any) => {
        const { branch, targetDir, outputDir } = answers;
        remoteDir(repo, { branch, targetDir, outputDir });
      });
  });

program.parse(process.argv);
