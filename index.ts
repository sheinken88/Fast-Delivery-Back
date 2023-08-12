import express from "express"
import router from "./routes"
import cookieParser from "cookie-parser";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
