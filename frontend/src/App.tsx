import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Libros from './pages/LibrosCatalogo';
import Login from './pages/Login';
import LibroNuevo from './pages/LibroNuevo';
import { Routes, Route } from 'react-router-dom';
import { BusquedaProvider } from './context/BusquedaContext'; 
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  
  return (
    <AuthProvider>
    <BusquedaProvider>    
      <Layout>
        <Routes>
          <Route element={<PrivateRoute rol="ADMIN" />}></Route>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Libros />} />
          <Route path="/login" element={<Login />} />
          <Route path="/libros/nuevo" element={<LibroNuevo />} />
        </Routes>
      </Layout>
    </BusquedaProvider>
    </AuthProvider>
  );
}

export default App;
