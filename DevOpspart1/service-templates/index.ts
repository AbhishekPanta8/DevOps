//@ts-nocheck
//this program helps us to read build.json file
import Yargs from "yargs";
import { readFileSync, writeFileSync} from "fs";
import {configure,render} from "nunjucks";

type BUildJSONDockerfile ={
  InstallCommands: string,
  PreInstallCommands: string[],
  PostInstallCommands: string[]
}

type BUildJSON = {
  Dockerfile: BUildJSONDockerfile;
  ServiceName: string;
  ServiceType: string;
}

function main(){
  // var argv = Yargs(process.argv.slice(2)).argv;
  
  // const buildPath = argv["config"] as any;
  const buildPath = "./build.json";
  const configuration = readFileSync(buildPath,{encoding: "utf-8"});
  // console.log(configuration);

  const configurationData = JSON.parse(configuration) as BUildJSON;

  //non jucks template
  //generates a docerfile
  configure("templates",{autoescape: true});
  // const dockerfile = render("Dockerfile",{
  //   ServiceName: configurationData.ServiceName,
  //   ServiceType: configurationData.ServiceType  
  // })
  const dockerfile = render("Dockerfile",configurationData);
  const circleci = render("circleci.yml",configurationData);
  const npmrc = render(".npmrc",configurationData)
 
  writeFileSync("Dockerfile", dockerfile);
  writeFileSync("circleci.yml",circleci);
  writeFileSync(".npmrc",npmrc);
}

main()