import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function productSeeder() {
  const categories = ["Accessories", "Electronics", "Fitness"];
  const data = [];

  for (let i = 0; i < 5; i++) {
    const name = faker.commerce.productName();
    const category = faker.helpers.arrayElement(categories);
    const price = faker.commerce.price(100, 500, 2);
    const stock = faker.number.int({ min: 50, max: 100 });
    const sales = faker.number.int({ min: 500, max: 1000 });

    data.push({ name, category, price, stock, sales });
  }

  console.log("Product seeding is started");
  await prisma.product.createMany({ data });
  console.log("Product seeding is Done");
}

export default productSeeder;
