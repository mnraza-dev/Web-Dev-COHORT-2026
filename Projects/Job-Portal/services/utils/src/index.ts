import express from "express";
import routes from "./routes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use("/api/utils", routes);

app.listen(PORT, () => {
    console.log(`Utils service is running on port http://localhost:${PORT}`);
})