import express from "express";
import * as libroService from "./services/libro.services";
import * as autoresService from "./services/autor.services";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería — ¡hola desde un container! 🐳" });
});

app.get("/libros", (req, res) => {
// controller todavia ene le index: traduce el string del query a boolean
  const { disponible } = req.query;
  const filtro = disponible === undefined ? undefined : disponible === "true";
  // ya no resuelve index, resuelve el service:
  res.json(libroService.findAll(filtro));
});

app.get("/autores", (_req, res) => {
  res.json(autoresService.findAll());
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});