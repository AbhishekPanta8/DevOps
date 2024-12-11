import { CustomResourceOptions ,ComponentResource} from "@pulumi/pulumi";

import {FMBucket} from "../resources/bucket";

//DSL (our domain specific language so that developers cannot touch bucket code)
type FMFrontendArgs ={
  Name: string,
  Product: string
}
//every front-end will have these 2 buckets.
export class FMFrontend extends ComponentResource {
  constructor(args: FMFrontendArgs, opts?: CustomResourceOptions) {

      const resourceName = `${args.Product}-${args.Name}`;
      super("pkg:index:FMFrontend", resourceName, {}, opts);

      //we don't need stack cause we are already standardizing stack in FMBucket
      // const stack = getStack();

      // Type                                     Name                   Plan
      // +   pulumi:pulumi:Stack                      service-directory-dev  create
      // +   └─ pkg:index:FMFrontend                  dev-ops-example        create
      // +      └─ pkg:index:FMBucket                 dev-ops-example        create
      // +         ├─ aws:s3:Bucket                   example                create
      // +         └─ aws:s3:BucketPublicAccessBlock  example                create
     
      new FMBucket({
        Name: args.Name,
        Product: args.Product,
        Public: false,
      },{
        //FMBucket will be parented by FMFrontendArgs however,every thing in FMBucket should have its own source of resources.
        parent: this
      });

      // new FMBucket({
      //   Name: `${args.Name}-replica`,
      //   Product: args.Product,
      //   Public: false
      // },{
      //   parent: this
      // });
  }
}

