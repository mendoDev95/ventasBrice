const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Datos de ejemplo para pullovers
const products = [
  {
    id: 1,
    name: "Pullover Classic Negro",
    price: 29.99,
    description: "Pullover clásico de algodón 100% premium",
    sizes: ["S", "M", "L", "XL"],
    colors: ["negro", "azul marino", "gris"],
    category: "clasico",
    image: "",
    inStock: true
  },
  {
    id: 2,
    name: "Pullover Premium Gris",
    price: 39.99,
    description: "Pullover premium de lana merino ultra suave",
    sizes: ["M", "L", "XL"],
    colors: ["gris", "beige", "burgundy"],
    category: "premium", 
    image: "",
    inStock: true
  },
  {
    id: 3,
    name: "Pullover Sport Azul",
    price: 34.99,
    description: "Pullover deportivo ideal para actividades casuales",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["azul", "rojo", "verde"],
    category: "deportivo",
    image: "",
    inStock: true
  }
];

// Rutas
app.get('/', (req, res) => {
  res.json({ 
    message: '¡Bienvenido a la API de Pullovers!',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      productById: '/api/products/:id'
    }
  });
});

// Obtener todos los productos
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Obtener producto por ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  
  res.json(product);
});

// Ruta para categorías
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json(categories);
});

// Manejo de errores
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(` Servidor backend corriendo en http://localhost:${PORT}`);
  console.log(` Endpoint de productos: http://localhost:${PORT}/api/products`);
});