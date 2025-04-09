# Rick and Morty Character Explorer

## Descripción
Esta aplicación permite buscar personajes de la serie Rick and Morty consumiendo la API pública `https://rickandmortyapi.com/`. Los usuarios pueden filtrar los personajes por nombre, ajustar la cantidad de resultados mostrados y agregar personajes a su lista de favoritos.

## Tecnologías utilizadas
- **React.js**: Framework principal para la interfaz de usuario.
- **React Context API**: Para la gestión global del estado de la aplicación.
- **Fetch API**: Para realizar peticiones HTTP a la API.
- **React Toastify**: Para mostrar notificaciones emergentes.
- **LocalStorage**: Para persistir la lista de personajes favoritos.
- **Tailwind CSS**: Para el diseño y estilos de la interfaz.

## Estructura del Proyecto
```
/src
  /context
    CharacterContext.js  # Manejo del estado global
  /components
    CharacterList.js     # Renderiza la lista de personajes y barra de búsqueda
  App.js                 # Componente principal
  index.js               # Punto de entrada de la aplicación
```

## Características Principales
### 1. **Carga Inicial de Personajes**
Cuando se inicia la aplicación, se cargan los primeros 20 personajes de la API sin mostrar ninguna notificación emergente. Esta mejora evita mostrar mensajes innecesarios al usuario.

### 2. **Búsqueda de Personajes**
- El usuario puede escribir el nombre de un personaje en el campo de búsqueda.
- Al presionar el botón "Enviar", se realiza una nueva consulta a la API filtrando por el nombre ingresado.
- Si la búsqueda es exitosa, se muestra una notificación de éxito con `toast.success()`.
- Si no se encuentran resultados, se muestra un mensaje de error con `toast.error()`.

### 3. **Selección de Cantidad de Personajes**
- El usuario puede ajustar la cantidad de personajes visibles con un `input number`.
- El valor debe ser mayor a 0 para evitar errores.

### 4. **Agregar a Favoritos**
- Cada personaje tiene un botón "+ Favoritos".
- Si el personaje ya está en la lista de favoritos, se muestra una notificación de error.
- Si es nuevo, se agrega a la lista y se almacena en `localStorage`.

## Instalación y Ejecución
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/usuario/repo.git
   cd repo
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Ejecutar la aplicación:
   ```sh
   npm start
   ```


## URL Netlify
https://appsearchrickandmorty.netlify.app/