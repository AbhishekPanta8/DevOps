import { CustomResourceOptions ,ComponentResource, getStack} from "@pulumi/pulumi";
import {ecr} from "@pulumi/aws";

//DSL (our domain specific language so that developers cannot touch bucket code)
type FMDockerImageRepoArgs ={
  Name: string;
  Product: string;
}

export class FMDockerImageRepo extends ComponentResource {
  constructor(args: FMDockerImageRepoArgs, opts?: CustomResourceOptions) {

      const resourceName = `${args.Product}-${args.Name}`;
      super("pkg:index:FMDockerImageRepo", resourceName, {}, opts);


      new ecr.Repository(args.Name, {
        name: resourceName,
        imageTagMutability: "MUTABLE",
        imageScanningConfiguration: {
            scanOnPush: false,
        },
    },{
      parent: this
    });
    
  }
}

