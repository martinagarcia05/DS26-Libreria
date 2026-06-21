import LibroCard from '../components/LibroCard';
import type { LibroCardProps } from '../types/libroCardProps';
import '../assets/styles/LibrosDestacados.css';
import { useState, useEffect } from 'react';
import { Spinner, Alert } from 'react-bootstrap';


function Libros() {

  const [libros, setLibros]   = useState<LibroCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch('/libros.json');
        if (!res.ok) throw new Error('Error al cargar los libros');
        setLibros(await res.json());
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    cargar();
  });

  if (loading) return <Spinner animation="border" />;
  if (error)   return <Alert variant="danger">{error}</Alert>;

  return (
    
    <div className="grid-libros">
      {libros.map(libro => <LibroCard key={libro.id} {...libro} />)}
    </div>

  );
}

export default Libros;
