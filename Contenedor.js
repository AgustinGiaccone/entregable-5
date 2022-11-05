const fs= require('fs');

class Contenedor{
    constructor(archivo){
        this.archivo=archivo;

    }


    save=async(producto)=>{
    try {
        //generar el archivo
        if(fs.existsSync(this.archivo)){
          let productos= await this.getAll();
          if( productos.length>0){
            let lastiId=productos[productos.length-1].id+1
          let newProduct={
            id: lastiId ,
            ...producto
        }
          productos.push(newProduct);
            await fs.promises.writeFile(this.archivo,JSON.stringify(productos,null,2))
            return lastiId;
        }else{
            let lastiId=1
            let newProduct={
              id: lastiId,
            ...producto
            }
            productos.push(newProduct);
            await fs.promises.writeFile(this.archivo,JSON.stringify(productos,null,2))
            return lastiId;
        }
        }else{
        //generamos un producto con id 1 ya que es la creacion del archivo
        let newProduct={
        id:1,
        title: producto.title,
        price: producto.price,
        thumbnail: producto.thumbnail
        //... producto utilizamos el spread operator para copiar la informacion dentro del nuevo producto
        }
        await fs.promises.writeFile(this.archivo,JSON.stringify([newProduct],null,2));
        return 1;
        }
        } catch (error) {
        console.log(error)
      }
  }
    getAll=async()=>{
      try {
          if(fs.existsSync(this.archivo)){
          let info= await fs.promises.readFile(this.archivo, 'utf8');
          let result= JSON.parse(info);
          return result;
          }else{
            return "No se encontro el archivo"
          }
      } catch (error) {
          console.log(error)
      }
    }

    getById = async(id)=>{
      try {
        let elementos = await this.getAll()
        const elemento = elementos.filter(elemento => elemento.id == id)
        if (elemento.length != 0){
          return elemento
        }else {
          return `No se encontro el vehiculo con el id ${id}`
        }
    } catch (error) {
        console.log(error)
    }
    }

    deleteAll = async ()=>{
      try {
        fs.unlinkSync(this.archivo)
        await fs.promises.writeFile(this.archivo,JSON.stringify([]))
      } catch (error) {
        console.log(error)
      }
    }

    exists(archivo) {
      try {
          if (!fs.existsSync(archivo)) {
              throw new Error("El archivo no existe");
          } else {
              return true;
          }
      } catch (error) {
          console.log(error);
      }
  }

  async readFile(archivo) {
    try {
        const data = await fs.readFileSync(archivo);
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
}

async writeFile(archivo, contenido) {
  try {
      await fs.writeFileSync(archivo, JSON.stringify(contenido, null, 4));
  } catch (error) {
      console.log(error);
  }
}

  deleteById = async (id)=>{
    try {
        if (this.exists(this.archivo)) {
            const productos = await this.readFile(this.archivo);
            if (productos.some(producto => producto.id === id)) {
                const productos = await this.readFile(this.archivo);
                const datos = productos.filter(producto => producto.id !== id);
                this.writeFile(this.archivo, datos);
                console.log(`vehiculo con el id ${id} eliminado`);
            } else {
                console.log(`No se encontro el vehiculo con el id ${id}`);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

deleteById = async (id)=>{
  try {
      if (this.exists(this.archivo)) {
          const productos = await this.readFile(this.archivo);
          if (productos.some(producto => producto.id === id)) {
              const productos = await this.readFile(this.archivo);
              const datos = productos.filter(producto => producto.id !== id);
              this.writeFile(this.archivo, datos);
              console.log(`vehiculo con el id ${id} eliminado`);
          } else {
              console.log(`No se encontro el vehiculo con el id ${id}`);
          }
      }
  } catch (error) {
      console.log(error);
  }
}

editById = async (paramId,title,price,thumbnail)=>{
  let ids = {};
  try {
      if (this.exists(this.archivo)) {
          const productos = await this.readFile(this.archivo);
          if (productos.some(producto => producto.id === paramId)) {
              const productos = await this.readFile(this.archivo);
              const productoParaEditar = productos.filter(producto => producto.id == paramId);
              productos.map((item, index) => {ids[item.id] = index})
              productos[ids[paramId]].title = title
              productos[ids[paramId]].price = price
              productos[ids[paramId]].thumbnail = thumbnail
              this.writeFile(this.archivo, productos)
          } else {
              console.log(`No se encontro el vehiculo con el id ${paramId}`);
          }
      }
  } catch (error) {
      console.log(error);
  }
}
}

module.exports = Contenedor