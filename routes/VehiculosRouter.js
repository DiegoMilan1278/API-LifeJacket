const bodyParser = require("body-parser")
// const { response } = require("express")
const express = require ("express")
const {MongoClient, ObjectId} = require("mongodb")
const response = require('../network/response')
const uri = "mongodb+srv://LifeJacket:lifejacket123@cluster0.yrvnibf.mongodb.net/?retryWrites=true&w=majority"
app = express()

const router = express.Router()



// Create InsertOne

router.post("/", async(req, res) => {
    const body = req.body
    const client = new MongoClient(uri)
    try{
        await client.connect()
        const result = await client.db("LifeJacket").collection("Vehiculos").insertOne(body)
        res.status(201).json({
            message: "Vehiculo creado exitosamente",
            result

        })
    }finally{
        await client.close()
    }
})


// Create InsertMany

router.post("/Varios", async(req, res) => {
    const body = req.body
    const client = new MongoClient(uri)
    try{
        await client.connect()
        const result = await client.db("LifeJacket").collection("Vehiculos").insertMany(body)
        res.status(201).json({
            message: "Vehiculos creados exitosamente",
            result

        })
    }finally{
        await client.close()
    }
})

// CRUD (READ)
// MongoDB: find() HTTP: GET

// Vehiculo
router.get("/", async(req, res) => {
    const client = new MongoClient(uri)
    try{
        await client.connect()
        const result = await client.db("LifeJacket").collection("Vehiculos").find({}).limit(5).toArray()
        // res.send(result)
        if(result){
            response.success(req, res, "Vehiculos encontrados", 200)
        }else{
            response.error(req, res, 'Vehiculos no encontrados', 404)
        }
    }finally{
        await client.close()
    }
})




// FindOne() HTTP: GET
router.get("/:id", async (req, res) =>{
    const id = req.params.id
    const client = new MongoClient(uri)
    try{
        await client.connect()
        const result = await client.db("LifeJacket").collection("Vehiculos").findOne({_id: new ObjectId(id)})
        // res.status(200).json(result)
        if(result){
            response.success(req, res, "Vehiculo encontrado", 200)
        }else{
            response.error(req, res, 'Vehiculo no encontrado', 404)
        }
    }finally{
        await client.close()
    }
})

//UPDATE  
// updateOne() HTTP:

router.put("/:id", async(req, res) =>{
    const id = req.params.id
    const body = req.body
    const client = new MongoClient(uri)
    try{
        await client.connect()
        const result = await client.db("LifeJacket").collection("Vehiculos")
        .updateOne({_id: new ObjectId(id)}, {$set: body})
        res.json({
            message: "update Vehiculo",
            data: body

        })
    }finally{
        await client.close()
    }
})

router.patch("/:id", async(req, res) =>{
    const id = req.params.id
    const body = req.body
    const client = new MongoClient(uri)
    try{
        await client.connect()
        const result = await client.db("LifeJacket").collection("Vehiculos")
        .updateOne({_id: new ObjectId(id)}, {$set: body})
        res.json({
            message: "update Vehiculo",
            data: body
        })
    }finally{
        await client.close()
    }
})

//UPSERT
router.patch("/:id/upsert", async(req, res) =>{
    const id = req.params.id
    const body = req.body
    const client = new MongoClient(uri)
    try{
        await client.connect()
        const result = await client.db("LifeJacket").collection("Vehiculos")
        .updateOne({_id: new ObjectId(id)}, {$set: body}, {upsert: true})
        res.json({
            message: "update Vehiculo",
            data: body

        })
    }finally{
        await client.close()
    }
})

// updateMany() HTTP: PATCH

router.patch("/", async(req, res) =>{
    const id = req.params.id
    const body = req.body
    const client = new MongoClient(uri)
    try{
        await client.connect()
        const result = await client.db("LifeJacket").collection("Vehiculos")
        .updateMany( {$set: body})
        res.json({
            message: "update Vehiculo",
            data: body
        })
    }finally{
        await client.close()
    }
})


//UPSERT
router.patch("/upsert", async(req, res) =>{
    const id = req.params.id
    const body = req.body
    const client = new MongoClient(uri)
    try{
        await client.connect()
        const result = await client.db("LifeJacket").collection("Vehiculos")
        .updateMany( {$set: body}, {upsert: true})
        res.json({
            message: "update Vehiculo",
            data: body
        })
    }finally{
        await client.close()
    }
})


// DELETE
// DeleteOne() HTTP: DELETE
router.delete('/:id', async(req, res)=>{
    const id = req.params.id
    const client = new MongoClient(uri)
    try{
        await client.connect()
        const result = await client.db('LifeJacket').collection('Vehiculos').deleteOne({_id: new ObjectId(id)})
        res.status(200).json({
            message: 'Vehiculo Eliminado',
            result
        })
    }finally{
        await client.close()
    }
})

// DeleteMany() HTTP: DELETE
router.delete('/', async(req, res)=>{
    const client = new MongoClient(uri)
    try{
        await client.connect()
        const result = await client.db('LifeJacket').collection('Vehiculos').deleteMany()
        res.status(200).json({
            message: 'Vehiculos Eliminados',
            result
        })
    }finally{
        await client.close()
    }
})

module.exports = router