import { Router } from "express";
import ProductsModel from "../dao/models/products.js"

const router = Router()

//Tomar productos
router.get("/",async(req,res)=>{
    const {limit} = req.query
    if(limit){
        let results = await ProductsModel.find().limit(limit)
        res.json({title: "Productos seleccionados", productos: results})
    }else{
        let results = await ProductsModel.find()
        if(results.length === 0){
            res.json({message:"No hay productos", data : results})
        }else{
            res.json({title: "Todos los productos" , productos : results})
        }
    }
})
//Tomar producto por id
router.get("/:pid",async(req,res)=>{
    const {pid} = req.params
    let producto = await ProductsModel.findById(pid)
    return res.json({message: "Producto seleccionado", producto : producto})
})
//Modificar un producto
router.put("/:pid",async(req,res)=>{
        const {pid} = req.params
        const {title,description,code,price,stock,category,thumbnail} = req.body
        if(!title || !description || !code || !price || !stock || !category || !thumbnail){
            return res.status(500).json({message : "Faltan datos"})
        }else{
            const producto = {
             title : title,
             description: description,
             code : code,
             price : +price,
             status : true,
             stock : +stock,
             category : category,
             thumbnail : thumbnail
            }
            let result = await ProductsModel.findByIdAndUpdate(pid,producto)
            return res.json({message : "Producto modificado correctamente", data : result})
        }
})
//Borrar un producto
router.delete("/:pid",async(req,res)=>{
    const {pid} = req.params
    let result = await ProductsModel.findByIdAndDelete(pid)
    if(result === null){
        return res.status(404).json({message: "Producto no encontrado"})
    }else{
        return res.json({message: "Producto eliminado", data: result})
    }
})
//Agregar un producto
router.post("/agregarProducto",async(req,res)=>{ 
    const {title,description,code,price,stock,category,thumbnail} = req.body
    if(!title || !description || !code || !price || !stock || !category || !thumbnail){
        return res.status(500).json({message : "Faltan datos"})
    }else{
        const productoNuevo = {
            title : title,
            description : description,
            code : code,
            price : +price,
            status : true,
            stock : +stock,
            category : category,
            thumbnail : thumbnail
        }
        let result = await ProductsModel.insertMany([productoNuevo])
        return res.status(201).json({message: "Producto agregado exitosamente", data : result})
    }
})


export default router;