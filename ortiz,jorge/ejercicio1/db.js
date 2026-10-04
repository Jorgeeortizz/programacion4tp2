import mysql from "mysql2/promise";
export let db;

export async function conectarDB (){
    
db = await mysql.createConnection({
  host: process.env.DB_HOST, // Dominio (url) de db
  user: process.env.DB_USER, // Usuario
  password: process.env.DB_PASS, // Contraseña
  database: process.env.DB_NAME, // Esquema
});}