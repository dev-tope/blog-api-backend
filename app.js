import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import { userRouter } from "./routes/userRoute.js";
import { authRouter } from "./routes/authRoute.js";

const app = express();
dotenv.config()

const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes

app.use('/login', authRouter);
app.use('/user', userRouter);


app.use(errorHandler)
//listening
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}...`);
})