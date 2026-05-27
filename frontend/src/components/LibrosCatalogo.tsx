import LibroCard from './LibroCard';
import type { LibroCardProps } from './LibroCard';
import '../styles/LibrosDestacados.css';
import imgPrincipito from '../assets/principito.jpg';
import imgFarenheit from '../assets/farenheit.jpg';
import imgPatrones from '../assets/patronesDeDisenio.png';


const libros: LibroCardProps[] = [
  {
    id: 1,
    titulo: 'El principito',
    autor: 'Antoine de Saint-Exupéry',
    precio: 4500,
    imagen: imgPrincipito,
    disponible: true
  },
  {
    id: 2,
    titulo: 'Patrones de diseño',
    autor: 'Alexander Shvets',
    precio: 8500,
    imagen: imgPatrones,
    disponible: true
  },
  {
    id: 3,
    titulo: 'Farenheit 451',
    autor: 'Ray Bradbury',
    precio: 5200,
    imagen: imgFarenheit,
    disponible: false
  },
  {
    id: 4,
    titulo: 'React para Principiantes',
    autor: 'John Doe',
    precio: 3600,
    imagen: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400',
    disponible: true
  }
];

function Libros() {
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
