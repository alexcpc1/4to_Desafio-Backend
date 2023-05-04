import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js";

const productManager = new ProductManager("products.json");

const router = Router();

const Products = [
    { title: "Cereal", description: "Cereal Infantil Nestum Frutilla - 250GR", price: 6000, thumbnail: "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20386774-qf9cW0sV-medium.png", code: "1012", stock: 100, category:  "Abarrotes", id: 1},
    { title: "Chorizo", description: "Chorizo Parrillero - 20 Und", price: 4000, thumbnail: "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20050239-Oy6zFS-p-medium.jpg", code: "1016", stock: 30, status: true, category: "Fiambreria", id: 2},
    { title: "Risotto", description: "Risotto de Champiñones 40Gr", price: 3000, thumbnail: "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20548165-LhlJB88C-medium.jpg", code: "1010", stock: 40, category:  "Abarrotes", id: 3},
    {title: "Pasta", description: "pasta larga 200Gr", price: 1000, thumbnail: "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20548165-LhlJB88C-medium.jpg", code: "1033", stock: 10, status: true, category: "Abarrotes", id: 4}
];

router.get("/",(req,res)=>{
    const addProduct = {Products}
    res.render("home", addProduct);
});

// http//:localhost:8080/api/products/?limit=2
router.get("/", async(req,res)=>{
    try {
        const products = await productManager.getProducts();
        const limit = req.query.limit;
        if(limit){
            let productsLimit = [];  
            for (let i = 0; i < limit; i++){
                productsLimit.push(products[i]);  
            }
            res.json({status:"success", data: productsLimit});
        }else{
            res.json({status:"success", data: products});
        }
    } catch (error) {
        res.status(400).json({status:"error", message:error.message});
    }
});

// http:localhost:8080/api/products/id=3
router.get("/:pid",async(req,res)=>{
    try {
        const id = req.params.pid;
        const product = await productManager.getProductById(id);
        if(product){
            res.json({status:"success", data:product});
            } else {
            res.status(400).json({status:"error", message:"El producto no existe"});
            }
    } catch(error){
        res.status(400).json({status:"error", message:error.message});
    }
    });

// para agregar el producto
router.post("/:realtimeproducts",async(req,res)=>{
    try {
        const {title, description, code, price, thumbnail, status, stock, category} = req.body;
        if(!title || !description || !code || !price || !status || !stock || !category){
        return res.status(400).json({status:"error", message:"Los campos no son validos"})
        }
        const newProduct = req.body;
        const productSaved = await productManager.addProduct(newProduct);
        res.send("realtimeproducts");
    } catch (error) {
        res.status(400).json({status:"error", message:error.message});
    }
});

router.put("/:pid", async(req,res)=>{
    try {
        const id = req.params.pid;
        const updateProduct = req.body;
        const productIndex = await productManager.updateProduct(id, updateProduct);
            return (productIndex);
    } catch(error){
        res.status(400).json({status:"error", message:"No se puede actualizar el producto"}); 
    }
});

router.delete("/:pid",async(req,res)=>{
    try {
        const id = req.params.pid;
        const productDelete = await productManager.deleteProduct(id);
            return (productDelete);
    } catch(error){
        res.status(400).send({status:"error", message:"No se puedo eliminar el producto"});
    }
});

export {router as viewsRouter};