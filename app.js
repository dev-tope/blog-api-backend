import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config()

const PORT = process.env.PORT


//listening
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}...`);
})