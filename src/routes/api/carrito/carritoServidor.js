import  Carrito from "../carrito/carrito.js";
import  { Router } from'express';
import   express  from'express';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router(); 
const carrito = new Carrito();
const datosAgregados={};



//GET '/api/productos' -> devuelve todos los productos.
router.use(express.json());

router.post("/",async (req, res) => {

  try {
          
          const id =req.body.id;
          const cantidad=req.body.cantidad;
         
        const valores = await carrito.setAddCarAsync(id,cantidad)

    res.status(200).json(valores); 
    

    //res.status(200).render('partials/producto',{articulo: await articulos.save(producto)})

  } catch (err) {
    console.error( err);
    res.status(400).json({error: err.toString()});
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const respuesta = await carrito.setDellCarById(Number(req.params.id))
    res.status(200).json(respuesta);
  } catch (err) {
    console.error( err);
    res.status(400).json({ error: "datos incorrectos" });
  }
});



//GET '/api/productos/:id' -> devuelve un producto según su id.
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
   
    //let result = await articulos.getById(id);
    if (result === null) {
      throw new Error("No Existe el producto");
    } else {

      res.status(200).json({articulo: await result})
    }
  } catch (err) {
    console.error( err);
    res.status(400).json({error: err.toString()});
  }
  //
});




//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put("/:id", async (req, res) => {
  try {
    const producto = req.body;
    producto.id = req.params.id;    
    res.status(200).json(await articulos.updateById(producto));
  } catch (err) {
    console.error( err);
    res.status(400).send({ error: "datos incorrectos" });
  }
});


export default router;
