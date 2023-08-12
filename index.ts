import express from "express"
import router from "./routes"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
