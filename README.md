# 🏎️ F1 Pilots App

Aplicación web creada con React para gestionar pilotos de Fórmula 1. Permite visualizar, agregar, editar y eliminar pilotos, utilizando una API MockAPI como backend.

## 🚀 Tecnologías utilizadas

- **React**
- **Tailwind CSS**
- **React Router DOM**
- **Axios**
- **React Toastify**
- **MockAPI.io** (para simular una API REST)

## 📦 Estructura principal

- `src/pages/`
  - `PilotoList.jsx`: lista de todos los pilotos.
  - `PilotoDetail.jsx`: vista detallada de un piloto.
  - `PilotoCreate.jsx`: formulario para agregar un nuevo piloto.
  - `PilotoEdit.jsx`: formulario para editar un piloto existente.
- `src/context/CharacterContext.jsx`: contiene la lógica global para obtener y administrar los pilotos.

## 🔧 Funcionalidades

- Ver listado de pilotos.
- Ver detalle individual de cada piloto.
- Agregar un nuevo piloto (con validaciones).
- Evitar duplicados por nombre.
- Editar pilotos existentes.
- Eliminar pilotos.
- Soporte para imágenes a través de URL.
- Traducción automática de nacionalidades.
- Notificaciones de éxito y error con `react-toastify`.

## 🧪 Validaciones implementadas

- Todos los campos son obligatorios para agregar un piloto.
- No se puede agregar un piloto con un nombre ya existente (insensible a mayúsculas).
- Se muestra un mensaje toast ante errores o acciones exitosas.

## 🛠️ Cómo correr el proyecto

1. Cloná el repositorio:

```bash
git clone https://github.com/gabrielgomez20132/formula1.git

