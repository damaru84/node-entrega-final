console.log("Programa iniciado")

import productsRouter from './src/routes/products.routes.js';
import loginRoute from "./src/routes/auth.routes.js"
import express from "express";
import cors from "cors";
import 'dotenv/config';

const app = express();

app.use(cors({

  origin: (origin, callback) => {

    if (!origin || origin === `http://localhost:${PORT}`) {

      callback(null, true);

    } else {

      callback(new Error("No permitido por CORS"));

    }

  },

  methods: ["GET", "POST", "PUT", "DELETE"],

  allowedHeaders: ["Content-Type", "Authorization"]

}));

app.use(express.json());

app.use((req, res, next) => {

  console.log(`Datos recibidos: ${req.method} ${req.url}`);
  next();
})

app.use("/auth", loginRoute)
//app.use(authentication);

app.get("/ping", (req, res) => {
  res.send("/pong").status(200)
})

app.get("/HTML", (req, res) => {
  res.send('<h1> Hola desde Express </h1>').status(200)
})

app.get("/JSON", (req, res) => {
  res.send({
    productos: [
      { nombre: "agua", precio: 1000 },
      { nombre: "yerba", precio: 2500 },
      { nombre: "azucar", precio: 1300 },
      { nombre: "tomate", precio: 3500 },      
      { nombre: "cafe", precio: 1100 },
      { nombre: "arroz", precio: 500 }
    ]
  }).status(200)
})

app.get('/items', (req, res) => {
  const category = req.query.category;
  const price = req.query.price;
  res.send(`Categoría: ${category}, Precio: ${price}`);
});


app.get('/item/:id', (req, res) => {
  const itemId = req.params.id;
  res.send(`Devolviendo el ítem con ID: ${itemId}`);
});

/*

app.get('/items/search', (req, res) =>{
  const {name} = req.query;

  if(!name){
    return res.status(400).json({error: "El nombre es requerido"});

  }
  const productsFiltered = productsRouter.filter((item) =>
    item.name.toLowerCase().includes(name.toLowerCase())
  )
  if (productsFiltered.length == 0){
    return res.status(404).json({error: "No se encontraron productos"})
  }
  res.json(productsFiltered);
})
*/
//app.use(authentication, productsRouter);

app.use("/api", productsRouter);

app.use(function (req, res, next) {
  res.status(404)
  res.send("ruta no encontrada")
});
/*
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})*/
const PORT = process.env.PORT || 3000;

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  })
}

export default app;