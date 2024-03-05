import { PrismaClient } from "@prisma/client";

const nodeEnv = process.env.NODE_ENV;

export const prisma = new PrismaClient({
  log: nodeEnv && nodeEnv === "test" ? [] : ["query"]
});