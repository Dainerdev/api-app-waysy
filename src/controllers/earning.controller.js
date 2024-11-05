import { getConnection } from "../database/database";

// Get function
const getEarnings = async (req, res) => {
    
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, usuario_id, DATE_FORMAT(fecha_recepcion, '%d-%m-%Y'), nombre_ingreso, valor_ingreso, fuente_id, descripcion FROM ingresos");
        console.log(result);
        res.json(result);
    } catch(error) {
        res.status(500);
        res.send(error.message);
    }  
};

// Get BY ID function
const getEarningById = async (req, res) => {

    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, usuario_id, DATE_FORMAT(fecha_recepcion, '%d-%m-%Y'), nombre_ingreso, valor_ingreso, fuente_id FROM ingresos WHERE id = ?", id);
        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// POST function
const addEarning = async (req, res) => {

    try {
        const { usuario_id, nombre_ingreso, valor_ingreso, fuente_id, descripcion } = req.body;

        if ( usuario_id === undefined || nombre_ingreso === undefined || valor_ingreso === undefined ||
            fuente_id === undefined || descripcion === undefined ) {
            
            res.status(400).json({message: "Bad Request. Please fill all fields."});
        }

        const earning = { usuario_id, nombre_ingreso, valor_ingreso, fuente_id, descripcion };
            
        const connection = await getConnection();
        await connection.query("INSERT INTO ingresos SET ?", earning);        
        res.json({ message: "Earning added." });
    } catch(error) {
        res.status(500);
        res.send(error.message);
    }
};

// UPTDATE function
const updateEarning = async (req, res) => {

    try {

        const { id } = req.params;

        const {  nombre_ingreso, valor_ingreso, fuente_id, descripcion } = req.body;

        if ( nombre_ingreso === undefined || valor_ingreso === undefined ||
            fuente_id === undefined || descripcion === undefined ) {
            
            res.status(400).json({message: "Bad Request. Please fill all fields."});     
        }

        const earing = { nombre_ingreso, valor_ingreso, fuente_id, descripcion };
        console.log(earing);
        
        const connection = await getConnection();
        await connection.query("UPDATE ingresos SET ? WHERE id = ?", [earing, id]);
        res.json({ message: "Earning updated." });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// DELETE function
const deleteEarning = async (req, res) => {

    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM ingresos WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getEarnings,
    getEarningById,
    addEarning,
    updateEarning,
    deleteEarning
};