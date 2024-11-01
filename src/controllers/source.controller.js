import { getConnection } from "../database/database";

// GET function
const getSources = async (req, res) => {

    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%m-%Y'), nombre_fuente, descripcion, icono FROM fuentes");
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

// Get BY ID function
const getSourceById = async (req, res) => {

    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%m-%Y'), nombre_fuente, descripcion FROM fuentes WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// POST function
const addSource = async (req, res) => {

    try {
        const { nombre_fuente, 
            descripcion, icono } = req.body;

        if (nombre_fuente === undefined || descripcion === undefined) {
            
            res.status(400).json({message: "Bad Request. Please fill all fields."});     
        }

        const source = { nombre_fuente, descripcion, icono };
        console.log(source)
        
        const connection = await getConnection();
        await connection.query("INSERT INTO fuentes SET ?", source);
        res.json({ message: "Source added." });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// UPTDATE function
const updateSource = async (req, res) => {

    try {

        const { id } = req.params;

        const { nombre_fuente, 
            descripcion, icono } = req.body;

        if (nombre_fuente === undefined || descripcion === undefined) {
            
            res.status(400).json({message: "Bad Request. Please fill all fields."});     
        }

        const source = { id, nombre_fuente, descripcion, icono };
        console.log(source)
        
        const connection = await getConnection();
        await connection.query("UPDATE fuentes SET ? WHERE id = ?", [source, id]);
        res.json({ message: "Source updated." });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// DELETE function
const deleteSource = async (req, res) => {

    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM fuentes WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getSources,
    getSourceById,
    addSource,
    updateSource,
    deleteSource
}