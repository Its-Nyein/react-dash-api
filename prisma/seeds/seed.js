import { PrismaClient } from "@prisma/client";
import productSeeder from "./ProductSeeder.js";

const prisma = new PrismaClient();

async function Seed() {
  try {
    await productSeeder();
  } catch (e) {
    console.log(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

Seed();
