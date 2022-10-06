import { promises as fsPromises, readFileSync, writeFileSync } from "fs";

class Contenedora {
  constructor(nombre) {
    this.nombre = nombre;
    this.datos = [];
  }

  async save(object) {
    try {
      const archivo = await fsPromises.readFile(this.nombre, "utf-8");
      this.datos = [...JSON.parse(archivo)];
      object.id = Number(await this.datos[this.datos.length - 1].id) + 1;
      this.datos.push(object);
      writeFileSync(this.nombre, JSON.stringify(this.datos, null, 2));
      return object.id;
    } catch (err) {
      object.id = 1;

      writeFileSync(this.nombre, JSON.stringify([object], null, 2));
      return object;
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
      console.log(
        `se acualizo el id:${this.busqueda.id} ::${this.busqueda.title}`
      );
      console.log(this.datos);
      writeFileSync(this.nombre, JSON.stringify(this.datos, null, 2));

      return this.busqueda;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
  async getById(id) {
    try {
      const archivo = await fsPromises.readFile(this.nombre, "utf-8");
      this.datos = [...JSON.parse(archivo)];
      console.log(this.datos);
      this.busqueda = this.datos.find((object) => {
        if (object.id == id) {
          return object;
        }
      });
      console.log(this.busqueda === undefined ? null : this.busqueda);

      return this.busqueda === undefined ? null : this.busqueda[id];
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  idValidRandom(datos, key) {
    try {
      let i = Math.ceil(Math.random() * key);
      console.log("i=" + i);

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
      console.log(err);
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

      console.log(this.Random);
      return this.Random;
    } catch (err) {
      console.log("El archivo esta vacio");
      throw new Error(err);
    }
  }

  getAll() {
    let content = readFileSync(this.nombre, "utf8");
    this.dataTxt = [...JSON.parse(content)];
    return this.dataTxt;
    console.log(this.dataTxt);
  } // end  getAll

  async deleteById(id) {
    try {
      const archivo = await fsPromises.readFile(this.nombre, "utf-8");
      this.datos = [...JSON.parse(archivo)];
      let sinEliminar = this.datos.filter((object) => {
        if (id !== object.id) {
          return object;
        }
      });

      let eliminado = this.datos.filter((object) => {
        if (id == object.id) {
          return object;
        }
      });

      if (eliminado === undefined) {
        console.log("No existe es id");
      } else {
        //await fs.promises.writeFile(this.nombre,JSON.stringify(eliminado,null,2))
        writeFileSync(this.nombre, JSON.stringify(sinEliminar, null, 2));
        console.log(
          `Eliminando...  id:${eliminado[0].id}::${eliminado[0].nombre}`
        );
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
      console.log("Elementos Eliminados");
    } catch (err) {
      console.error(err);
      return err;
    }
  } //end deleteAll
}

export default Contenedora;
