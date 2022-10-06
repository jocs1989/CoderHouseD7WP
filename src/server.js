import Carrito from "./routes/api/carrito/carritoServidor.js";
import Filtro from "./filtro.js";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import Productos from "./routes/api/productos/productos.js";
import express from "express";

const app = express();
//Seccion de use
app.use(express.json());
app.use("/api/productos/", Productos);
app.use("/api/carrito/", Carrito);
app.use("*", Filtro);


//seccion inicio websokect
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const PORT = process.env.PORT || 8080;
const listener = httpServer.listen(PORT, function () {
  try {
    //integrantes.deleteAll()
    console.log("Your app is listening http://localhost:8080 ");
  } catch (err) {
    console.error(err);
  }
});
