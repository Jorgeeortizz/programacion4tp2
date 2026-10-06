import express from "express";
import { db } from "./db.js";
import {body, param, validationResult} from "express-validator";

const router = express.Router();




const validarId = [
    param("id")
    .isInt({min:1})
    .toInt(),
];



const validarMaterias = [
    body("materia").isString().isLength({ max: 50 })
]

const verificacionValidaciones = (req, res, next) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        return res.status(400).json({success: false, message:"validacion invalida ", errores: validacion.array(),});
    
    }

    next();
};

router.get("/", async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM materias');
    res.json({ success: true, data: rows});
});

router.get("/:id", validarId, verificacionValidaciones, async (req, res) => {
    const id = Number(req.params.id);
    const [rows] = await db.execute("SELECT * FROM materias WHERE id=?", [id]);


    if (rows.length === 0) {
        return res.status(404).json({ success: false, message: "Materia no encontrada." });
    }


    res.json({ success: true, data: rows[0] });
});

router.post("/", validarMaterias, verificacionValidaciones, async (req, res) => {
    const { materia } = req.body;
    const [result] = await db.execute(
        "INSERT INTO materias (materia) VALUES (?)", [materia]
    );


    res.status(201).json({success: true, data: { id: result.insertId, materia },
    });
});


router.put("/:id", validarId, validarMaterias, verificacionValidaciones, async (req, res) => {
    const id = Number(req.params.id);
    const { materia } = req.body;


    await db.execute(
        "UPDATE materias SET materia=? WHERE id=?", [materia, id]
    );

    res.json({success:true, data: { materia },});
});


router.delete("/:id", validarId, verificacionValidaciones, async (req, res) => {
    const id = Number(req.params.id);


    await db.execute('DELETE FROM materias WHERE id=?', [id]);

    res.json({ success: true, data: id});
});

export default router;