import { promises as fsPromises, readFileSync, writeFileSync } from "fs";

class Contenedora {
  constructor(nombre) {
    this.nombre = nombre;
    this.datos = [];
  }

  async save(object) {
    try {
      
      
     
      writeFileSync(this.nombre, JSON.stringify(object, null, 2));
      
      return object;
    } catch (err) {
      
      writeFileSync(this.nombre, JSON.stringify([], null, 2));
      return [];
    }
  }
  async saveAdd(datos) {
    try {
      
      
      writeFileSync(this.nombre, JSON.stringify(datos, null, 2));
      
    } catch (err) {
      
      writeFileSync(this.nombre, JSON.stringify([], null, 2));
      
    }
  }
  async updateById(producto) {
    try {
      const archivo = await fsPromises.readFile(this.nombre, "utf-8");
      this.datos = [...JSON.parse(archivo)];
      this.busqueda = this.datos.find((object) => {
        if (object.id == producto.id) {
          object.id = Number(producto.id);
          object.timestamp = Date.now();
          object.nombre = producto.nombre;
          object.descripcion = producto.descripcion;
          object.codigo = producto.codigo;
          object.url = producto.url;
          object.precio = Number(producto.precio);
          object.stock = Number(producto.stock);

          return object;
        }
      });

      writeFileSync(this.nombre, JSON.stringify(this.datos, null, 2));

      return this.busqueda;
    } catch (err) {
      throw new Error(err);
    }
  }
  async getById(id) {
    try {
      const archivo = await fsPromises.readFile(this.nombre, "utf-8");
      this.datos = [...JSON.parse(archivo)];
      this.busqueda = this.datos.find((object) => {
        if (Number(object.id) === id) {
          return object;
        }
      });
      return this.busqueda === undefined ? null : this.busqueda;
    } catch (err) {
      throw new Error(err);
    }
  }

  idValidRandom(datos, key) {
    try {
      let i = Math.ceil(Math.random() * key);

      let valid = datos.filter((object) => {
        if (object.id === i) {
          return object;
        }
      });

      if (valid === undefined) {
        return this.idValidRandom(datos, key);
      } else {
        return valid;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async getByIdRandom() {
    try {
      const archivo = await fsPromises.readFile(this.nombre, "utf-8");
      this.datos = [...JSON.parse(archivo)];
      let key = this.datos[0].id;
      this.datos.find((object) => {
        if (key <= object.id) {
          key = object.id;
        }
      });
      this.Random = this.idValidRandom(this.datos, key);
      return this.Random;
    } catch (err) {
      throw new Error(err);
    }
  }

  getAll() {
    try {
    let content = readFileSync(this.nombre, "utf8");
    this.dataTxt = [...JSON.parse(content)];
    return this.dataTxt;
  } catch (err) {
    return []
    //console.log(err)
  }
  } // end  getAll

  async deleteById(id) {
    try {
      const archivo = await fsPromises.readFile(this.nombre, "utf-8");
      this.datos = [...JSON.parse(archivo)];
      
      let sinEliminar = this.datos.filter((object) => {
        if (Number(id) !== Number(object.id)) {
          return object;
        }
      });

      let eliminado = this.datos.find((object) => {
        if (Number(id) === Number(object.id)) {
          return object;
        }
      });
      console.log('Que hay en eliminado',eliminado)
      
      if (eliminado === undefined) {
        throw new Error('No existe el dato');
      } else {       
        writeFileSync(this.nombre, JSON.stringify(sinEliminar, null, 2));
        return eliminado[0];
      }
    } catch (err) {
      throw new Error(err);
      //console.log(err)
    }
  } //end deleteById

  deleteAll() {
    try {
      writeFileSync(this.nombre, "[]", null, 2);
    } catch (err) {
      return err;
    }
  } //end deleteAll
}

export default Contenedora;
