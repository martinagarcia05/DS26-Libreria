import { prisma } from "../src/config/prisma";

const libros = [
  { titulo: "El principito", autor: "Antoine de Saint-Exupéry",
    precio: 4500, imagen: "https://...", disponible: true },
  // ... los 10 de C15, COPIADOS DEL SERVICE, y SIN id
];
const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  // ... Gabriel García Márquez y Ernesto Sabato
];
async function main() {
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
}
main();
