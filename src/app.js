import express from "express";
import usuariosRouter from "./routes/usuarios.routes.js";
import indexRouter from "./routes/index.routes.js";

const app = express();
//const port = 3005;
app.use(express.json());
app.use("/api", usuariosRouter);
app.use(indexRouter);
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});
app.get("/", (req, res) => {
  res.send("Hola desde express");
});
export default app;
