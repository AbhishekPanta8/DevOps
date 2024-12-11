import {FMFrontend} from "./services/frontend";
import {FMBackend} from "./services/backend";

function main(){
  new FMBackend({
    Name: "example-backend",
    Product: "dev-ops"
  })
  new FMFrontend({
    Name: "example",
    Product: "dev-ops"
  })
}
main()