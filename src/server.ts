import express from "express"
import router from "./router"

const app = express()

/// read json body
app.use(express.json())

app.use("/", router)

export default app