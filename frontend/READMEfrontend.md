## Clase 10 - React: Formularios y Validaciones

### Formularios Controlados

Un componente controlado es un input donde el valor lo guarda el estado de React, no el DOM. input "muerto": el dato lo tiene el navegador y nosotros no lo vemos.
React pasa a ser la única fuente de verdad.

Para no tener un `useState` inmanejable por cada campo del formulario, agrupamos todos los valores en un único objeto de estado.


### Validación Declarativa con Zod

Zod es una librería para describir la forma de los datos (un schema) y validarlos contra ella. Conviene utilizar esta herramienta porque mantenés las reglas en un solo lugar y la función `z.infer` te da el tipo de TypeScript gratis sin escribir el código dos veces.

```typescript
import { z } from 'zod';

// Definición de las reglas de validación
export const libroSchema = z.object({
  titulo: z.string().trim().min(1, 'El título es obligatorio'),
  autor: z.string().trim().min(1, 'El autor es obligatorio'),
  precio: z.coerce.number().positive('El precio debe ser mayor a 0'),
  disponible: z.boolean()
});

// Generación automática del tipo de TypeScript
export type LibroValidado = z.infer<typeof libroSchema>;

```

### React Hook Form + Zod

React Hook Form es una librería que se encarga del trabajo repetitivo de un formulario: el estado, el submit y los errores. Nos saca de encima la necesidad de crear un `useState` por campo, evita armar un `handleChange` manual y gestiona automáticamente el objeto de errores.

#### 1. Instalación

```bash
npm install react-hook-form @hookform/resolvers zod

```

#### 2. Configuración de useForm

Utilizamos el hook pasándole nuestro schema de Zod a través de la función `zodResolver`.

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Inicialización de RHF
const { register, handleSubmit, formState: { errors } } = useForm<LibroValidado>({
  resolver: zodResolver(libroSchema)
});

```

#### 3. Conexión con los Inputs

Reemplazamos el `value` y `onChange` manuales por la función `register`, la cual inyecta todas las propiedades necesarias en nuestros componentes de React Bootstrap.

```tsx
<Form.Group className="mb-3">
  <Form.Label>Título</Form.Label>
  <Form.Control
    {...register('titulo')}
    isInvalid={!!errors.titulo} 
  />
  <Form.Control.Feedback type="invalid">
    {errors.titulo?.message}
  </Form.Control.Feedback>
</Form.Group>

```

### Redirección Automática con useNavigate

`useNavigate` es una herramienta de React Router que funciona como el "primo" del componente `<Link>`. En vez de que el usuario tenga que hacer clic explícitamente en un enlace, nos permite redirigir al usuario desde el código (por ejemplo, hacia el catálogo después de completar el alta de un libro exitosamente).

```tsx
import { useNavigate } from 'react-router-dom';

function LibroNuevo() {
  const navigate = useNavigate();

  const onSubmit = (data: LibroValidado) => {
    agregarLibro(data);
    navigate('/catalogo'); // Redirige al listado sin recargar la página
  };

  // ... render del formulario
}

```
---
### En App.tsx:

`onAgregar` es un callback (una función que se pasa como prop) para que el componente hijo (LibroNuevo) pueda comunicarse hacia arriba con el padre (App).

El flujo es:
1. App.tsx tiene el estado libros y define agregarLibro, eliminarLibro y agregarLibro:
```tsx
  const [libros, setLibros] = useState<LibroCardProps[]>(librosIniciales);
  const agregarLibro = (nuevo: LibroCardProps) => setLibros([...libros, nuevo]);
  const eliminarLibro = (id: number) => setLibros(libros.filter(l => l.id !== id)); 
  const editarLibro = (id: number, actualizado: LibroCardProps) => setLibros(libros.map(l => l.id === id ? actualizado : l));  
```
2. App.tsx le pasa esa función como prop onAgregar a LibroNuevo:
```tsx
  <LibroNuevo onAgregar={agregarLibro} />
```
quedaría:
```tsx
<Route path="/libros/nuevo" 
  element={<LibroNuevo onAgregar={agregarLibro} />} //cuando se ejecute onAgregar en LibroNuevo -> agregarLibro en App
/>
<Route path="/libros/editar/:id" 
  element={<LibroEditar onEditar={editarLibro} libros={libros} />} //cuando se ejecute onEditar en LibroEditar -> editarLibro en App
/>
<Route path="/catalogo" 
  element={<Libros libros={libros} onEliminar={eliminarLibro} />} //cuando se ejecute onEliminar en Libros -> eliminarLibro en App
/>
```
3. LibroNuevo (el formulario) no tiene acceso directo al estado libros. Cuando el usuario completa el formulario y hace submit, llama a onAgregar(...) con los datos del nuevo libro:

```tsx
const onSubmit = (data: LibroValidado) => {
  onAgregar({ id: Date.now(), ...data, ... });
  navigate('/catalogo');
};
```

4. Eso ejecuta agregarLibro en App, que actualiza el estado con setLibros([...libros, nuevo]).

¿Por qué es necesario? Porque en React los datos fluyen unidireccionalmente (de padre a hijo via props). Si LibroNuevo modificara el estado directamente, rompería ese flujo. onAgregar es el mecanismo para que el hijo "avise" al padre: "che, tengo un libro nuevo, actualizá el estado".

*componente ejecuta funcion onAlgo definida -> en app se llama a la funcion definida entre {} en el router: <Route path="/rutaComponente" element={< Componente onAlgo={funcionApp} />} (la que en realidad realiza ese algo)*