import express from "express";
import sessionConfig from "./config/session.js";

import authRoutes from "./routes/authRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";

const app = express();

app.use(express.json());
app.use(sessionConfig);

app.use("/auth", authRoutes);
app.use("/data", dataRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
