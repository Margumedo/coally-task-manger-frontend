# Task Manager Frontend

¡Bienvenido al **Task Manager Frontend**!  
Este proyecto es una aplicación **React + Vite + TypeScript** que consume un backend con autenticación JWT y permite **gestionar tareas** (crear, editar, eliminar, filtrar) y un **flujo de registro/login**.

---
## ✨ **Características Principales**

1. **Autenticación con JWT**  
   - Registro de usuarios (manejo de email duplicado y email inválido).  
   - Inicio de sesión con token.  

2. **CRUD de Tareas**  
   - Crear nueva tarea con título (obligatorio) y descripción (opcional).  
   - Editar tarea: cambiar título, descripción, estado (pendiente/completada).  
   - Eliminar tarea con **confirmación** SweetAlert.  
   - Filtro de tareas (todas, completadas, pendientes).  

3. **Modo Oscuro/Claro**  
   - Toggle con íconos (luna/sol) que persiste la preferencia en `localStorage`.  
   - SweetAlert con estilo claro u oscuro, según tu preferencia.  

4. **SweetAlert2** para mensajes y alertas  
   - “Bienvenido al Task Manager” al iniciar sesión,  
   - “Registro Exitoso” o alertas de error en caso de email duplicado, etc.  

5. **Responsive**  
   - Diseño responsivo para desktop y móvil con Tailwind.  

---
## ⚙️ **Requisitos**

- **Node.js** >= 20 
- **npm** o **yarn**  
- Conexión a un **backend** que provea endpoints como `/auth/register`, `/auth/login`, `/tasks`, etc.

---
## 🚀 **Instalación y Uso (Local)**

1. **Clona** el repositorio:  
   ```bash
   git clone https://github.com/<tu-user>/<tu-repo>.git
   cd <tu-repo>

2. **Instala** las dependencias:  
    ```
    npm install
    # o
    yarn install

3. **Configura** las variables de entorno:
 
   3.1. Crea un archivo .env en la raíz con:

   ```
   VITE_API_URL=https://tu-backend-en-render.com/api

4. Inicia en modo desarrollo:

    ```
    npm run dev
    # o
    yarn dev
    ```

    La app estará disponible en http://localhost:5173 (o el puerto que muestre la terminal).

5. Build para producción:

    ```
    npm run build
    # o
    yarn build
    ```
    Esto generará la carpeta dist/ con los archivos estáticos.
---

## 🌐 Despliegue en Producción

El proyecto está desplegado en Vercel:

URL de Producción: https://coally-task-manger-frontend.vercel.app/

---

📝 Rutas Principales

- `/login:` Página de inicio de sesión.
- `/register:` Crear cuenta (validación de email, dulicado).
- `/:` Lista de tareas (CRUD): Crear, editar, eliminar, filtrar.
- `/create:` Crear nueva tarea.
- `/update/:id:` Editar tarea existente.
- `/*:` Página de “NotFound”.
---
### 🎨 Modo Oscuro y SweetAlert

  Se usa ToggleDarkMode para cambiar la clase dark en <html>.
  SweetAlert se personaliza con fondo oscuro/claro y colores adaptados según isDark.
  
```json
{
  Swal.fire({
    "icon": 'warning',
    "title": '¿Estás seguro?',
    "text": 'Esta acción no se puede deshacer.',
    "showCancelButton": true,
    "confirmButtonText": 'Sí, eliminar',
    "cancelButtonText": 'Cancelar',
    "background": isDark ? '#1f2937' : '#fff',
    "color": isDark ? '#f3f4f6' : '#4b5563',
  });
}
```

---
## 🛠 Tecnologías Utilizadas

    React + Vite + TypeScript
    Tailwind CSS (modo oscuro con darkMode: 'class')
    React Router para rutas SPA
    SweetAlert2 para alertas
    Axios para llamadas HTTP
    Context API para manejo de estado (AuthContext, TaskContext)

## 💡 Contribuciones

1. Haz un fork del repositorio.
2. Crea tu rama (git checkout -b feature/nueva-funcionalidad).
3. Haz commit de tus cambios (git commit -m 'Agrega nueva funcionalidad').
4. Sube tus cambios (git push origin feature/nueva-funcionalidad).
5. Abre un Pull Request para que se revise.

---
👏 Contacto

Cualquier duda o sugerencia, contáctame en:

    Email: margumedo.sm@gmail.com
    GitHub: https://github.com/margumedo
---
### ❤️ ¡Gracias por usar Task Manager Frontend!

<div align='center'>
--- 💻 Power by  🚀 Maicol Argumedo 🧑🏻‍💻 ---
</div>