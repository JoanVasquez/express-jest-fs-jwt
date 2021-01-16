import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import acronymRoutes from "./routes/acronymRoutes";
import jwtGeneratorRoute from "./routes/jwtGeneratorRoute";
import Error from "./models/Error";

const app: Application = express();
app.use(cors());
app.use(bodyParser.json());
app.set("port", process.env.PORT || 8080);

app.use("/api", acronymRoutes);
app.use("/api/token", jwtGeneratorRoute);
app.use("*", (req: Request, res: Response) => {
  const error: Error = {
    message: "Route no found",
    status: 404,
  };
  res.status(error.status).send(error);
});

app.listen(app.get("port"), () => {
  console.log(`Listening on port: ${app.get("port")}`);
});
