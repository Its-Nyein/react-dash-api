import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const data = await prisma.product.findMany({
      orderBy: { id: "desc" },
      take: 20,
    });
    res.json(data);
  } catch (e) {
    res.status(500).json({ msg: e });
  }
});

router.post("/products", async (req, res) => {
  const { name, category, price, stock, sales } = req.body;

  if (!name || !category) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const product = await prisma.product.create({
    data: {
      name,
      category,
      price: parseFloat(price),
      stock: parseInt(stock),
      sales: parseInt(sales),
    },
  });

  const data = await prisma.product.findMany({
    where: {
      id: Number(product.id),
    },
  });

  res.json(data);
});

router.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category, price, stock, sales } = req.body;

  try {
    const data = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        category,
        price: parseFloat(price),
        stock: parseInt(stock),
        sales: parseInt(sales),
      },
    });

    res.status(200).json(data);
  } catch (e) {
    res
      .status(500)
      .json({ msg: "Error on updating product", error: e.message });
  }
});

router.delete("/products/:id", async (req, res) => {
  const id = req.params.id;

  await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });

  res.sendStatus(204);
});

router.get("/products/search", async (req, res) => {
  const { q } = req.query;

  const data = await prisma.product.findMany({
    where: {
      name: {
        contains: q,
      },
    },
    take: 20,
  });

  res.json(data);
});

export default router;
