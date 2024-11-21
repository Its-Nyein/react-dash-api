import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import productRouter from "./routers/product.js";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", productRouter);

app.get("/hello", (req, res) => {
  res.json({ msg: "React admin dash API" });
});

const server = app.listen(3000, () => {
  console.log("Admin dash API started at port 3000");
});

const gracefulShutdown = async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log("Yaycha API is closed!");
    process.exit(0);
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
