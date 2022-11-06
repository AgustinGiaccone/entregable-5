const express = require('express')
const Contenedor = require('./Contenedor.js')
const app = express()
const port = process.env.PORT || 8070
const routerProductos = express.Router()
const axios = require ('axios')

routerProductos.use(express.urlencoded({extended:true}))
routerProductos.use(express.json())

const itemRouter = express.Router({mergeParams: true})
const vehiculos = new Contenedor('productos.txt')
const notFound = { error: "Producto no encontrado" };

app.set('views', __dirname+ '/views')
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/api', routerProductos)
routerProductos.use('/:userId',itemRouter)

app.use(express.urlencoded({extended:true}))

const servidor = app.listen(port, () => {
    console.log(`servidor en el http://localhost:${port}`)
})

app.get('/', async (req, res) => {
    const automovil = await vehiculos.getAll()
    res.render('inicio-formulario.ejs', {automovil})
})

app.get('/productos', async (req, res) => {
    const automovil = await vehiculos.getAll()
    res.render('inicio-historial.ejs', {automovil})
})

app.post('/productos', async (req, res) => {
    const {body}= req
    const nuevoVehiculo = axios.post('http://localhost:8070/api/productos',body)
    res.redirect('/')
})

itemRouter.get('/:id', async(req,res)=>{
    const id = parseInt(req.params.id);
    const automovil = await vehiculos.getById(id);
    console.log('el id buscado es', id)
    !automovil && res.status(404).json(notFound);
    res.status(200).json(automovil);
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