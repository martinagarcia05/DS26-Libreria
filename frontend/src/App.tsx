import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Libros from './pages/LibrosCatalogo';
import { Routes, Route } from 'react-router-dom';

// const librosIniciales: LibroCardProps[] = [
//   {
//     id: 1,
//     titulo: 'El principito',
//     autor: 'Antoine de Saint-Exupéry',
//     precio: 4500,
//     imagen: imgPrincipito,
//     disponible: true
//   },
//   {
//     id: 2,
//     titulo: 'Patrones de diseño',
//     autor: 'Alexander Shvets',
//     precio: 8500,
//     imagen: imgPatrones,
//     disponible: true
//   },
//   {
//     id: 3,
//     titulo: 'Farenheit 451',
//     autor: 'Ray Bradbury',
//     precio: 5200,
//     imagen: imgFarenheit,
//     disponible: false
//   },
//   {
//     id: 4,
//     titulo: 'React para Principiantes',
//     autor: 'John Doe',
//     precio: 3600,
//     imagen: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400',
//     disponible: true
//   }
// ];

function App() {
  // const [libros, setLibros] = useState<LibroCardProps[]>(librosIniciales);
  // const agregarLibro = (nuevo: LibroCardProps) => setLibros([...libros, nuevo]);
  // const eliminarLibro = (id: number) => setLibros(libros.filter(l => l.id !== id)); 
  // const editarLibro = (id: number, actualizado: LibroCardProps) => setLibros(libros.map(l => l.id === id ? actualizado : l));  
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" 
          element={<Libros />}
        />
      </Routes>
    </Layout>

  );
}

export default App;
