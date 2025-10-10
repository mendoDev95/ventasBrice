#  Ventas Brice

[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-000000?logo=express)](https://expressjs.com/)
[![pnpm](https://img.shields.io/badge/pnpm-8+-F69220?logo=pnpm)](https://pnpm.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Coming_Soon-47A248?logo=mongodb)](https://mongodb.com/)

**Ventas Brice** es una moderna plataforma de e-commerce especializada en la venta de pullovers de alta calidad. Desarrollada con las últimas tecnologías web, ofrece una experiencia de compra excepcional con interfaz intuitiva y funcionalidades avanzadas.

## Características Principales

### **Sistema de Compras**

- ✅ Carrito de compras persistente con localStorage
- ✅ Gestión avanzada de cantidades y productos
- ✅ Cálculo automático de totales y subtotales
- ✅ Validaciones robustas de datos

### **Búsqueda y Filtrado Avanzado**

- ✅ Filtros por categoría, precio y disponibilidad
- ✅ Búsqueda en tiempo real por nombre y descripción
- ✅ Sistema de ordenamiento múltiple
- ✅ Interfaz de filtros responsive

### **Experiencia de Usuario**

- ✅ Diseño moderno y completamente responsive
- ✅ Modal de vista rápida de productos
- ✅ Loading skeletons durante la carga
- ✅ Sistema de notificaciones Toast
- ✅ Animaciones y transiciones suaves

### **Arquitectura Técnica**

- ✅ Componentes React modulares y reutilizables
- ✅ Gestión de estado con Context API y hooks personalizados
- ✅ Estilos CSS modulares y variables personalizadas
- ✅ Estructura de proyecto escalable y mantenible

## Stack Tecnológico

### **Frontend**

- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de build y desarrollo rápido
- **Context API** - Gestión de estado global
- **Hooks Personalizados** - Lógica reutilizable
- **CSS Modules** - Estilos componentizados

### **Backend**

- **Node.js** - Entorno de ejecución JavaScript
- **Express.js** - Framework web minimalista
- **REST API** - Arquitectura de API
- **CORS**

### **Herramientas y Utilidades**

- **pnpm** - Gestor de paquetes rápido y eficiente
- **Git & GitHub** - Control de versiones y colaboración
- **LocalStorage** - Persistencia local de datos
- **ESLint** - Linting y calidad de código

### **Prerrequisitos para su intalación**

- Node.js 18 o superior
- pnpm 8 o superior
- Git

## Estructura del Proyecto

```
ventas-brice/
├── backend/
│   ├── server.js              # Servidor Express principal
│   ├── package.json           # Dependencias del backend
│   └── (futuros: models/, routes/, middleware/)
├── frontend/
│   ├── src/
│   │   ├── components/        # Componentes React reutilizables
│   │   │   ├── Cart.jsx       # Componente del carrito
│   │   │   ├── Header.jsx     # Header de la aplicación
│   │   │   ├── FilterSidebar.jsx # Panel de filtros
│   │   │   ├── QuickViewModal.jsx # Modal de vista rápida
│   │   │   ├── Toast.jsx      # Sistema de notificaciones
│   │   │   └── ProductSkeleton.jsx # Loading skeletons
│   │   ├── hooks/             # Hooks personalizados
│   │   │   ├── useCart.js     # Gestión del carrito
│   │   │   ├── useFilters.js  # Lógica de filtrado
│   │   │   └── useToast.js    # Sistema de notificaciones
│   │   ├── context/           # Context providers
│   │   │   ├── CartContext.js # Context del carrito
│   │   │   └── CartProvider.jsx # Provider del carrito
│   │   ├── styles/            # Estilos organizados
│   │   │   ├── index.css      # Estilos globales
│   │   │   ├── utils/         # Utilidades de estilos
│   │   │   ├── layouts/       # Estilos de layout
│   │   │   └── components/    # Estilos por componente
│   │   ├── App.jsx            # Componente principal
│   │   └── main.jsx           # Punto de entrada
│   └── package.json           # Dependencias del frontend
└── README.md                  # Documentación del proyecto
```

## Próximas Implementaciones

### **En Desarrollo**

- Integración con base de datos MongoDB
- Sistema de autenticación de usuarios
- Páginas individuales de productos
- Sistema de pasarela de pagos

### **Planificado**

- Dashboard de administración
- Sistema de reseñas y calificaciones
- Integración con redes sociales
- Modo oscuro
- Internacionalización (i18n)

## 🤝 Contribución

### **Las contribuciones son bienvenidas. Para contribuir al proyecto:**

- Haz fork del repositorio
- Crea una rama para tu feature (git checkout -b feature/AmazingFeature)
- Commit tus cambios (git commit -m 'Add some AmazingFeature')
- Push a la rama (git push origin feature/AmazingFeature)
- Abre un Pull Request

**Autor:**

- Cesar Rafael Ravelo Hernández
- **GitHub:**
mendoDev95
- **Email:**
[[mendoDev95@gmail.com]]

**Licencia:** Este proyecto es de código abierto y está disponible bajo la MIT License.

<div align="center">
¿Te gusta el proyecto? ¡Dale una ⭐️!

Desarrollado con ❤️ para **Belita**
</div>