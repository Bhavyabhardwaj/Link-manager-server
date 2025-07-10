import express from "express";
import dotenv from "dotenv";
// import { errorHandler } from "./middlewares";
import cors from "cors";
import router from "./routes";
import { swaggerDocs, swaggerDocsSetup } from "./docs/swagger";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use("/", router);
app.get("/", (req, res) => {
    res.status(200).json({
        message : "Server is up and running."
    });
});
app.use('/api-docs', swaggerDocs, swaggerDocsSetup);

// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});