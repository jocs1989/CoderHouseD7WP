import {Server as HttpServer} from 'http';
import   {Server as IOServer}    from 'socket.io';
import  Productos from './routes/api/productos/productos.js'
import express from 'express';

const app = express();
//Seccion de use
app.use(express.json());

app.use('/productos/',Productos );
//proteccion de datos
app.get('*' ,(req,res)=>{
  console.log(req.method)
  res.status(400).json({ error :`-2,descripcion:  ruta ${req.url} método ${req.method}  no implementada` });
})
app.post('*' ,(req,res)=>{
  console.log(req.method)
  res.status(400).json({ error :`-2,descripcion:  ruta ${req.url} método ${req.method}  no implementada` });
})
app.put('*' ,(req,res)=>{
  console.log(req.method)
  res.status(400).json({ error :`-2,descripcion:  ruta ${req.url} método ${req.method}  no implementada` });
})
app.delete('*' ,(req,res)=>{
  console.log(req.method)
  res.status(400).json({ error :`-2,descripcion:  ruta ${req.url} método ${req.method}  no implementada` });
})





//seccion inicio websokect
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT =process.env.PORT||8080
const listener = httpServer.listen(PORT, function () {
  try {
    //integrantes.deleteAll()
    console.log("Your app is listening http://localhost:8080 ");
  } catch (err) {
    console.error(err);
  }
});