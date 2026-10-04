import express from "express";
import { conectarDB } from "./db.js";
import routerRectangulos from "./rectangulos.js"
conectarDB()


const app = express();
const port = 3000;

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hola");
});
app.use("/rectangulos",routerRectangulos )
app.listen(port, () => {
  console.log(`el puerto ${port} esta funcionando`);
});