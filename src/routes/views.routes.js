import { Router } from "express";

const router = Router();

const Products = [
    {
      "title": "Cereal",
      "description": "Cereal Infantil Nestum Frutilla - 250GR",
      "price": 6000,
      "thumbnail": "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20386774-qf9cW0sV-medium.png",
      "code": "1012",
      "stock": 100,
      "category": "Abarrotes",
      "id": 1
    },
    {
      "title": "Chorizo",
      "description": "Chorizo Parrillero - 20 Und",
      "price": 4000,
      "thumbnail": "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20050239-Oy6zFS-p-medium.jpg",
      "code": "1016",
      "stock": 30,
      "status": true,
      "category": "Fiambreria",
      "id": 2
    },
    {
      "title": "Risotto",
      "description": "Risotto de Champiñones 40Gr",
      "price": 3000,
      "thumbnail": "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20548165-LhlJB88C-medium.jpg",
      "code": "1010",
      "stock": 40,
      "category": "Abarrotes",
      "id": 3
    },
    {
        "title": "Pasta",
        "description": "pasta larga 200Gr",
        "price": 1000,
        "thumbnail": "https://7483c243aa9da28f329c-903e05bc00667eb97d832a11f670edad.ssl.cf1.rackcdn.com/20548165-LhlJB88C-medium.jpg",
        "code": "1033",
        "stock": 10,
        "category": "Abarrotes",
        "id": 4
    }
];

router.get("/",(req,res)=>{
    const addProduct = {Products}
    res.render("home", addProduct);
});

export {router as viewsRouter};