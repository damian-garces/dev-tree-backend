import express from "express"
import 'dotenv/config';
import router from "./router"
import { connectDB } from "./config/db"
import cors from 'cors'
import { corsOptions } from "./config/cors";

const app = express()

connectDB()

// CORS
app.use(cors(corsOptions))

/// read json body
app.use(express.json())

app.use("/", router)

export default app