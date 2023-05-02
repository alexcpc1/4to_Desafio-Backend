import express from "express";
// import { productRouter } from "./routes/products.routes.js";
// import { cartRouter } from "./routes/carts.routes.js";
import {Server} from "socket.io";
import handlebars from "express-handlebars";
import { viewsRouter } from "./routes/views.routes.js";
import { __dirname } from "./utils.js";
import path from "path";

// configuracion del servidor http
const app = express();
const port = 8080;

//midlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));

//servidor http
const httpServer = app.listen(port,()=>console.log(`Server listening on port ${port}`));

//servidor de websocket
const socketServer = new Server(httpServer);

//configuracion del motor de plantillas
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//routes
// app.use("/api/products", productRouter);
// app.use("/api/carts", cartRouter);
app.use(viewsRouter);

let messages = [];
socketServer.on("connection",(socket)=>{
    console.log(`nuevo socket cliente conectado ${socket.id}`);
    //emitir el mensaje al socket actual
    socket.emit("chatMessages",messages);

    socket.on("message",(data)=>{
        messages.push({socketId:socket.id, message:data});
        //emitir el mensaje a todos los clientes conectados
        socketServer.emit("chatMessages",messages);
    });
});