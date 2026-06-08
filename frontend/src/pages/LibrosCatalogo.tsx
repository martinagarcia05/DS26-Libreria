import LibroCard from '../components/LibroCard';
import type { LibroCardProps } from '../types/libroCardProps';
import '../assets/styles/LibrosDestacados.css';

 interface LibrosProps {
   libros: LibroCardProps[];
 }

function Libros({ libros = [] }: LibrosProps) {
console.log('catalogo', libros);
  if (libros.length === 0) {
    return <p>No hay libros para mostrar.</p>;
  }

  return (
    <section className="libros">
      <div className="container">
        <h2 className="titulo">Nuestros libros</h2>
        <div className="grid-libros">
          {libros.map(libro => (
            <LibroCard
              key={libro.id}
              id={libro.id}
              titulo={libro.titulo}
              autor={libro.autor}
              precio={libro.precio}
              imagen={libro.imagen}
              disponible={libro.disponible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Libros;
