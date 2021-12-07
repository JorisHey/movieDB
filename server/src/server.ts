import express from "express";
import {Request, Response} from "express"
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";
import {config as configDotenv} from 'dotenv'

configDotenv()
//express initialization
const app = express();
//PORT
const PORT = 5000;

app.get("/", (_req: Request, res: Response) => {
    res.send("Hello World");
});

//graphql playground setup code
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

//localhost setup
app.listen(PORT, () => {
  console.log("Graphql server now up at port 5000")
});