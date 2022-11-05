const Contenedor = require("./Contenedor.js")

let contenedor= new Contenedor("productos.txt")

let producto1 ={
    title:"Toyota Hilux",
    price:7000000,
    thumbnail:"https://i.postimg.cc/4xy9LZ43/toyota2013.jpg"

}
let producto2 ={
    title:"Chevrolet S10",
    price:8000000,
    thumbnail:"https://i.postimg.cc/bJ1Z4w2Q/chevrolet-s10.jpg"

}
let producto3 ={
    title:"Volkswagen Amarok",
    price:10000000,
    thumbnail:"https://i.postimg.cc/jd6ST12r/amarokv6.jpg"

}
metodos=async()=>{
    console.log( await contenedor.save(producto1))
    console.log( await contenedor.save(producto2))
    console.log( await contenedor.save(producto3))
    console.log(await contenedor.getAll())
    console.log(await contenedor.getById(90))
    // await contenedor.deleteById(2)
    // await contenedor.deleteAll()
}
metodos()

