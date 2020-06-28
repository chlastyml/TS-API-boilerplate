import express from "express";
import {
  Server,
  Path,
  GET,
  PathParam,
  Accept,
  QueryParam,
} from "typescript-rest";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";

import * as swaggerDocument from "../docs/v1/swagger.json";

interface Person {
  /** Name of the person */
  name: string;
}

@Accept("text/plain")
@Path("mypath")
export class MyService {
  /**
   * This description will be used to describe the get operation of path '/mypath' on the generated swagger
   * @param test And this will describe the parameter test of this same operation
   */
  @GET
  @Path("secondpath")
  test2(@QueryParam("testParam") test?: string): Person {
    console.log("test", typeof test, test);
    return { name: "OK" };
  }
}

@Path("/hello")
export class HelloService {
  @Path(":name")
  @GET
  sayHello(@PathParam("name") name: string): string {
    return "Hello " + name;
  }
}

// Create a new express app instance
const app: express.Application = express();

Server.buildServices(app);
app.use(morgan('tiny'))

app.get("/", function (req, res) {
  res.send("Hello World!");
});

console.log("swaggerDocument", swaggerDocument);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, function () {
  console.log("App is listening on port 3000!");
});
