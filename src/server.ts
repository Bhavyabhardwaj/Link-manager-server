import express from "express";
import dotenv from "dotenv";
// import { errorHandler } from "./middlewares";
import cors from "cors";
import router from "./routes";
import { swaggerDocs, swaggerDocsSetup } from "./docs/swagger";
import passport from "passport";
import cookieSession from "cookie-session";

const app = express();
dotenv.config();
import './config/passport';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.use(cookieSession({
  name: 'github-auth-session',
  keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session());
app.use("/", router);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running."
  });
});
app.use('/api-docs', swaggerDocs, swaggerDocsSetup);

// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});