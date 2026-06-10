"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.prisma = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require(".prisma/client");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
exports.pool = pool;
const adapter = new adapter_pg_1.PrismaPg(pool);
// Cast to PrismaClient so all model delegates (prisma.psychologist etc) are typed correctly
const prisma = new client_1.PrismaClient({ adapter });
exports.prisma = prisma;
