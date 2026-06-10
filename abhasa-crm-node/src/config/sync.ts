process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import dotenv from "dotenv";
import sequelize from "./database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected to Supabase ✓");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

export default app;