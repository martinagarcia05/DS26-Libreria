import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Libros from './pages/LibrosCatalogo';
import { Routes, Route } from 'react-router-dom';
import type { LibroCardProps } from './types/libroCardProps';
import { useState } from 'react';
import LibroNuevo from './pages/LibroNuevo';
import imgPrincipito from './assets/principito.jpg';
import imgFarenheit from './assets/farenheit.jpg';
import imgPatrones from './assets/patronesDeDisenio.png';

const librosIniciales: LibroCardProps[] = [
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

function App() {
  const [libros, setLibros] = useState<LibroCardProps[]>(librosIniciales);
  const agregarLibro = (nuevo: LibroCardProps) => setLibros([...libros, nuevo]);
  
  return (
    <Layout>
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/catalogo" element={<Libros libros={libros} />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
      </Routes>
    </Layout>

  );
}

export default App;
