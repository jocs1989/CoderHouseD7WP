import  Contenedora from "./contenedora.js";
import  { Router } from'express';
import   express  from'express';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router(); 
const articulos = new Contenedora(__dirname+'/articulos.txt');
const datosAgregados={};


//GET '/api/productos' -> devuelve todos los productos.
router.use(express.json());
router.get("/", async (req, res) => {
  try {
    const respuesta = await articulos.getAll();
    res.status(200).json(respuesta);
    //res.status(200).render('partials/productos',{artuculos: respuesta});
  } catch (err) {
    console.error( err);
    res.status(400).json({error: err.toString()});
  }
  
});

//GET '/api/productos/:id' -> devuelve un producto según su id.
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
   
    let result = await articulos.getById(id);
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



router.post("/", async (req, res) => {

  try {
    const title=req.body.title;
    const price=req.body.price;
    const thumbnail=req.body.thumbnail;

    const producto = {title,price,thumbnail} ; 
    console.log(producto)  
    const valores = await articulos.save(producto)
   
     
      //res.status(200).send( /productos)
    res.status(200).json(valores);
   
    

    //res.status(200).render('partials/producto',{articulo: await articulos.save(producto)})

  } catch (err) {
    console.error( err);
    res.status(400).json({error: err.toString()});
  }
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

//DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete("/:id", async (req, res) => {
  try {
    res.status(200).json(await articulos.deleteById(req.params.id));
  } catch (err) {
    console.error( err);
    res.status(400).json({ error: "datos incorrectos" });
  }
});

export default router;
