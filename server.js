const express = require('express')
const Contenedor = require('./Contenedor.js')
const app = express()
const port = process.env.PORT || 8080
const routerProductos = express.Router()
routerProductos.use(express.urlencoded({extended:true}))
routerProductos.use(express.json())
const itemRouter = express.Router({mergeParams: true})
const vehiculos = new Contenedor('productos.txt')
const notFound = { error: "Producto no encontrado" };

app.use('/api', routerProductos)

routerProductos.use('/:userId',itemRouter)

app.use(express.static(__dirname +'/public'))

app.use(express.urlencoded({extended:true}))

const servidor = app.listen(port, () => {
    console.log(`servidor en el http://localhost:${port}`)
})

routerProductos.get('/productos', async (req, res) => {
    const automovil = await vehiculos.getAll()
    res.send(automovil)
})

itemRouter.get('/:id', async(req,res)=>{
    const id = parseInt(req.params.id);
    const producto = await vehiculos.getById(id);
    console.log('el id buscado es', id)
    !producto && res.status(404).json(notFound);
    res.status(200).json(producto);
})

routerProductos.post('/productos',async(req,res)=>{
    const {body}= req
    console.log(body)
    const nuevoVehiculo = await vehiculos.save(body)
    const automovil = await vehiculos.getAll()
    res.send(automovil)
})

itemRouter.delete('/:id', async(req,res)=>{
    const id = parseInt(req.params.id);
    const producto = await vehiculos.deleteById(id);
    console.log('Se elimino el vehiculo con el id', id)
    const automovil = await vehiculos.getAll()
    res.send(automovil)
})

itemRouter.put('/:id', async(req,res)=>{
    const id = parseInt(req.params.id);
    const title = req.body.title
    const precio = req.body.price
    const thumbnail = req.body.thumbnail
    const producto = await vehiculos.editById(id,title,price,thumbnail);
    const automovil = await vehiculos.getAll()
    res.send(automovil)
    
})

servidor.on('error', error => console.log(`error ${error}`))