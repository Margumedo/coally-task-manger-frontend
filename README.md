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

- **Node.js** >= 14  
- **npm** o **yarn**  
- Conexión a un **backend** que provea endpoints como `/auth/register`, `/auth/login`, `/tasks`, etc.

---
## 🚀 **Instalación y Uso (Local)**

1. **Clona** el repositorio:  
   ```bash
   git clone https://github.com/<tu-user>/<tu-repo>.git
   cd <tu-repo>
