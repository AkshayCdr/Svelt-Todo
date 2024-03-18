import express from "express";
import taskRouter from "./routes/tasks.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/task", taskRouter);

app.listen("3000", () => console.log("listetinng"));
