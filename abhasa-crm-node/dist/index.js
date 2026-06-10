"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = require("./src/lib/prisma");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});
const mainRouters_1 = __importDefault(require("./router/mainRouters"));
const masterRouters_1 = __importDefault(require("./router/masterRouters"));
app.use("/", mainRouters_1.default);
app.use("/", masterRouters_1.default);
prisma_1.prisma
    .$connect()
    .then(() => {
    console.log("Database connected to Supabase ✓");
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
});
process.on("SIGINT", async () => {
    await prisma_1.prisma.$disconnect();
    await prisma_1.pool.end();
    process.exit(0);
});
exports.default = app;
