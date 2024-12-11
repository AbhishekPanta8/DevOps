import { getStack, CustomResourceOptions ,ComponentResource} from "@pulumi/pulumi";
import {s3} from "@pulumi/aws";

//DSL (our domain specific language so that developers cannot touch bucket code)
type FMBucketArgs ={
    Name: string,
    Product: string,
    Public?: boolean
}


export class FMBucket extends ComponentResource {
    constructor(args: FMBucketArgs, opts?: CustomResourceOptions) {

        const resourceName = `${args.Product}-${args.Name}`;
        super("pkg:index:FMBucket", resourceName, {}, opts);

        //it will bring the stack you are in (standardization of stack)
        const stack = getStack()

        const bucketName = `${resourceName}-${stack}`;

        let bucketArgs: s3.BucketArgs ={
            acl: "private",
            bucket: bucketName,
            tags: {
                Name: bucketName,
                Environment: stack,
            },
        }

        //if the bucket is public, then acl to public-read and website form: https://www.pulumi.com/registry/packages/aws/api-docs/s3/bucket/#static-website-hosting
        if(args.Public){
            bucketArgs.acl = "public-read",
            bucketArgs.website  =  {
                indexDocument: "index.html",
                errorDocument: "error.html",
                routingRules: `[{
                    "Condition": {
                        "KeyPrefixEquals": "docs/"
                    },
                    "Redirect": {
                        "ReplaceKeyPrefixWith": "documents/"
                    }
                }]
                `,
            }
        }

        //buckete creation with acl set to private.
        const bucket = new s3.Bucket(args.Name, bucketArgs,{
            parent: this
        });

        if(!args.Public){
            new s3.BucketPublicAccessBlock(args.Name, {
                bucket: bucket.id,
                blockPublicAcls: true,
                blockPublicPolicy: true,
                ignorePublicAcls: true,
                restrictPublicBuckets: true,
            },{
                parent: this
            });
        }
    }
}
