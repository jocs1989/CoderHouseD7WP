import Carritos from "./carritos.js";
import Contenedora from "../productos/contenedora.js";
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class Carrito {                               constructor() {
  this.productos = 0;
  this.contenedor = {};
  this.total = 0;
  this.articulos = new Contenedora(__dirname+"/../productos/articulos.txt");
  this.carritos = new Carritos(__dirname+"/carrito.txt");
}
async setNewCar(id, cantidad) {
  try {
    
    const object = await this.articulos.getById(id);
    const precio = Number(object.precio);
    const stock = Number(object.stock);

    console.log(cantidad)

    if (Number(object.stock) >= cantidad) {

      this.total = this.total + cantidad * precio;
      object.stock = stock - cantidad;
      await this.articulos.updateById(object);
      object.cantidad = cantidad;
      if (this.contenedor[object.id] === undefined) {
        this.contenedor[Number(object.id)] = object;
      } else {

        let cantidadVieja = object.cantidad;
        object.cantidad=cantidadVieja+cantidad
        this.contenedor[Number(object.id)].cantidad = cantidadVieja + cantidad;
        this.contenedor[Number(object.id)] =object
      }
      
      this.productos++;
      console.log(this.contenedor);

      return await this.carritos.save(this.contenedor);
    } else {
      console.log("lo sentimos no hay stock");
    }
  } catch (err) {
    console.log(err);
  }
}

async setAddProductCar(idCarrito,idArticulo, cantidad) {
  try {
    const todoProductos= await this.carritos.getAll();
    const object = await this.articulos.getById(idArticulo);    
    const precio = Number(object.precio);    
    const stock = Number(object.stock);
    const carritoViejo=await this.getAllCar(idCarrito);
   
    if (Number(object.stock) >= cantidad) {
      this.total = this.total + cantidad * precio;
      object.stock = stock - cantidad;
      await this.articulos.updateById(object);      
      object.cantidad = cantidad;
      if (this.contenedor[object.id] === undefined) {
        this.contenedor[Number(object.id)] = object;
        carritoViejo[Number(object.id)] = object;
      } else {

        let cantidadVieja = object.cantidad;
        object.cantidad=cantidadVieja+cantidad;
        this.contenedor[Number(object.id)].cantidad = cantidadVieja + cantidad;
        this.contenedor[Number(object.id)] =object;
        carritoViejo[Number(object.id)].cantidad = cantidadVieja + cantidad;
        carritoViejo[Number(object.id)] =object;
      }      
      this.productos++;
      this.contenedor.id=idCarrito      
      
      const resultado=todoProductos.filter(object=>{
        if(object.id===idCarrito){
          return carritoViejo
        }else {
          return object
        }
      })
      await this.carritos.save(resultado);      
      return this.contenedor
    } else {
      console.log("lo sentimos no hay stock");
    }
  } catch (err) {
    console.log(err);
  }
}


setDellCar() {
  delete this.carrito;
  this.productos = 0;
  this.contenedor = {};
  this.total = 0;
}
async setDellCarById(id) {
  const elementoEliminado=await this.carritos.deleteById(id);
  for (let i in elementoEliminado){
    if(i!=='id'){
      let articuloViejo=await this.articulos.getById(i)
      let stockviejo=articuloViejo.stock+elementoEliminado[i].cantidad
      articuloViejo.stock=stockviejo
      await this.articulos.updateById(articuloViejo)
    }
    

  }
  delete this.contenedor[id];
  console.log(elementoEliminado);
}

async getAllCar(id) {
      const datos=await this.carritos.getById(id);

return datos;
}
getProductosTotal() {
  return this.productos;
}
getPrecioTotal() {
  return this.total;
}
}

export default Carrito;