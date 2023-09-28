import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

const DB_URL = 'mongodb+srv://rugvedwagh02:rugved76@clusternew.xrsceyc.mongodb.net/?retryWrites=true&w=majority'
const PORT = 5001;

mongoose.connect(
    DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
        console.log('Connected to the database...')
    })
}).catch((e) => {
    console.log('Failed to connect to the database...')
});