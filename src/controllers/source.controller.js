import { getConnection } from "../database/database";

// GET function
const getSources = async (req, res) => {

    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%M-%Y'), nombre_fuente, descripcion, icono FROM fuentes");
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
        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%M-%Y'), nombre_fuente, descripcion FROM fuentes WHERE id = ?", id);
        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get BY NAME function
const getSourceByName = async (req, res) => {
    try {
        const { nombre_fuente } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%M-%Y') AS fecha_recepcion, nombre_fuente, descripcion FROM fuentes WHERE nombre_fuente = ?", [nombre_fuente]);
        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get BY DATE function
const getSourceByDate = async (req, res) => {
    try {
        const { fecha_recepcion } = req.params;
        const connection = await getConnection();

        const [day, monthAbbr, year] = fecha_recepcion.split(' ');
        const monthMap = {
            'Ene': '01',
            'Feb': '02',
            'Mar': '03',
            'Abr': '04',
            'May': '05',
            'Jun': '06',
            'Jul': '07',
            'Ago': '08',
            'Sep': '09',
            'Oct': '10',
            'Nov': '11',
            'Dic': '12'
        };

        const month = monthMap[monthAbbr];
        if (!month) {
            return res.status(400).json({ error: 'Mes no válido en la fecha proporcionada.' });
        }

        const formattedDate = `${year}-${month}-${day}`;

        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%M-%Y') AS fecha_recepcion, nombre_fuente, descripcion FROM fuentes WHERE DATE(fecha_recepcion) = ?", [formattedDate]);
        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get BY DESCRIPTION function
const getSourceByDescription = async (req, res) => {
    try {
        const { descripcion } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%M-%Y') AS fecha_recepcion, nombre_fuente, descripcion FROM fuentes WHERE descripcion LIKE ?", [`%${descripcion}%`]);
        res.json(result[0]);
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
    getSourceByName,
    getSourceByDate,
    getSourceByDescription,
    addSource,
    updateSource,
    deleteSource
}