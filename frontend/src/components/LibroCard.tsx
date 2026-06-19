import '../assets/styles/LibroCard.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import type { LibroCardProps } from '../types/libroCardProps';

interface Props extends LibroCardProps {
  onEliminar: (id: number) => void;
}

function LibroCard({ id, titulo, autor, precio, imagen, disponible, onEliminar }: Props) {
  const [disponibilidad, setDisponibilidad] = useState<boolean>(disponible);
  const navigate = useNavigate();
  return (
    <Card style={{ width: '18rem' }}>
      <div className="libro-img-div">
        <Card.Img variant="top" src={imagen} className="libro-img" />
        {!disponibilidad ? <p className="false">Alquilado</p> : <p className="true">Disponible</p>}
      </div>
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>
          <p className="autor">{autor}</p>
          <span className="precio">${precio}</span>
        </Card.Text>
        <div className="d-flex gap-2">
          <Button 
            variant="primary"
            className="cambiar-estado"
            onClick={() => setDisponibilidad(!disponibilidad)}
          >
            {disponibilidad ? 'Alquilar' : 'Devolver'}
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => navigate(`/libros/editar/${id}`)}
          >
            Editar
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => {
              if (window.confirm('¿Estás seguro de eliminar este libro?')) {
                onEliminar(id);
              }
            }}
          >
            Eliminar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LibroCard;
