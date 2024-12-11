import { CustomResourceOptions ,ComponentResource} from "@pulumi/pulumi";
import { FMDockerImageRepo } from "./ecrrepository";

//DSL (our domain specific language so that developers cannot touch bucket code)
type FMBackendArgs ={
  Name: string,
  Product: string
}

export class FMBackend extends ComponentResource {
  constructor(args: FMBackendArgs, opts?: CustomResourceOptions) {

      const resourceName = `${args.Product}-${args.Name}`;
      super("pkg:index:FMBackend", resourceName, {}, opts);

    
      //grab our image repo
      new FMDockerImageRepo({
        Name: args.Name,
        Product: args.Product
      },{
        parent: this
      })
  }
}

