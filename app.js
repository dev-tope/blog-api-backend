import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import { userRouter } from "./routes/userRoute.js";
import { authRouter } from "./routes/authRoute.js";
import { postRouter } from "./routes/postRoutes.js";
import { commentRouter } from "./routes/commentRoute.js";

const app = express();
dotenv.config()

const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes

app.use('/login', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter)



app.use(errorHandler)
//listening
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}...`);
})