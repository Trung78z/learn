import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["info"] });

async function checkConnection() {
  try {
    await prisma.$connect();
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}
checkConnection();
export default prisma;
