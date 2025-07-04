import express from "express";
import dotenv from "dotenv";
// import { errorHandler } from "./middlewares";
import cors from "cors";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use(/, router)

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});