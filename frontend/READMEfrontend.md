# Resumen de las clases

## Clase 09 1/6 React: Layout, Routing, Estructura y Librerías

### Estructura
```
frontend/
├── src/             ← Nuestro código fuente
|    ├── assets/                  ← Imágenes, íconos y recursos estáticos procesables por Vite
|    ├── components/              ← Componentes funcionales y reutilizables de React
|    │   ├── Layout/                ← Componentes estructurales
|    │   ├── Home.tsx               ← Componente principal de la vista de inicio
|    │   ├── LibroCard.tsx          ← Componente que representa la tarjeta de un libro individual
|    │   └── LibrosCatalogo.tsx     ← Componente que renderiza la lista de libros
|    ├── styles/                  ← Hojas de estilo separadas por componente
|    ├── App.css                  ← Estilos globales de la aplicación y layout base
|    ├── App.tsx                  ← Componente principal
|    ├── index.css                ← Estilos de reseteo base (body, variables globales)
|    └── main.tsx                 ← Punto de entrada que inyecta la App en el index.html
├── public/                ← Archivos estáticos
├── .gitignore             ← Archivos y carpetas que Git no debe subir
├── eslint.config.js       ← Reglas de linter para mantener la calidad del código
├── index.html             ← Index HTML donde se inyecta la App React
├── node_modules/          ← Dependencias instaladas (¡No se sube a GitHub!)
├── package-lock.json      ← Historial exacto de versiones de las dependencias
├── package.json           ← Dependencias y scripts del proyecto
├── tsconfig.app.json      ← Configuración de TypeScript específica para la app
├── tsconfig.json          ← Configuración base de TypeScript
├── tsconfig.node.json     ← Configuración de TypeScript específica para Vite
├── vite.config.ts         ← Configuración del empaquetador Vite
└── READMEfrontend.md      ← Resumen y cambios agregados por rama
```

### Routing (Layout): componente que envuelve toda la aplicación
El Layout sirve principalmente para tres cosas:

1. Evitar repetir código: En lugar de importar y colocar el `<Header />` y el `<Footer />` en la vista de Home, y luego hacer lo mismo en LibrosCatalogo, y otra vez en el detalle de un libro... el Layout centraliza esto. Escribís la estructura una sola vez.

2. Persistencia (No recargar partes de la página): Esto es vital en las Single Page Applications (SPA) de React. Al navegar entre páginas, el Layout no se desmonta. Si el usuario abre el menú de navegación, tiene algo en el carrito de compras del Header, o hay una animación reproduciéndose, al cambiar de página solo se actualiza el "medio" (el contenido). El Header y el Footer quedan intactos sin perder su estado.

3. Mantenimiento centralizado: Si el día de mañana querés agregar un Sidebar u otro componente a toda la aplicación, lo agregás en el Layout y automáticamente aparece en todas las rutas que estén envueltas por él.

### Estado Local (`useState`) en LibroCard

En React, los componentes necesitan tener "memoria" para recordar cosas que cambian tras la interacción del usuario. Para lograr esto, utilizamos el *hook* `useState`. 
En el componente `LibroCard`, implementamos un estado muy sencillo para manejar si un libro está disponible en la tienda o si acaba de ser alquilado. Así es como funciona paso a paso:

- **1. Inicialización del estado:**
  ```tsx
  const [disponibilidad, setDisponibilidad] = useState<boolean>(disponible);

useState devuelve un arreglo con dos elementos clave:

-> disponibilidad: variable de estado actual. Su valor inicial es el que recibimos desde afuera a través de la prop disponible.
-> setDisponibilidad: función que va a actualizar ese valor en el futuro.

2. **La interacción (El evento onClick):**
    ``` tsx
    <button onClick={() => setDisponibilidad(!disponibilidad)}>
    ```

Cuando el usuario hace clic en el botón, ejecutamos la función actualizadora.

3. **Renderizado Condicional (La vista reacciona):**
En React, cada vez que un estado cambia, el componente se vuelve a renderizar automáticamente para reflejar la nueva información. La etiqueta sobre la imagen cambia entre `<p className="false">Alquilado</p>` y `<p className="true">Disponible</p>`.

### Integración de Librerías de UI: React Bootstrap

Para no tener que reinventar la rueda y escribir CSS desde cero para cada botón o tarjeta, en el ecosistema de React solemos apoyarnos en librerías de componentes. En esta clase, implementamos **React Bootstrap**.

#### 1. Instalación

```bash
npm install react-bootstrap bootstrap
```

#### 2. Uso en LibroCard
Luego de encontrar el componente que queremos agregar a nuestra aplicación en https://react-bootstrap.netlify.app. Por ejemplo la card:

```jsx
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;
```

Realizamos la importación:
``` tsx
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
```
Luego agregamos el resto del código con que querramos mostrar.