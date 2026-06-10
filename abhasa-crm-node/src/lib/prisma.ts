import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from ".prisma/client";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

// Cast to PrismaClient so all model delegates (prisma.psychologist etc) are typed correctly
const prisma = new PrismaClient({ adapter }) as unknown as PrismaClient;

export { prisma, pool };