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

// Get max Id function
const getMaxId = async (req, res) => {

    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT MAX(id) AS max_id FROM ingresos");

        if (result.length > 0 && result[0].max_id !== null) {
            res.json({ max_id: result[0].max_id });   
        } else {
            res.json({ max_id: 1 }); 
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get Actual Earnings function
const getActualEarnings = async (req, res) => {

    const { id } = req.params;

    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT SUM(valor_ingreso) AS saldo_actual FROM ingresos WHERE usuario_id = ?", [id]);

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get BY NAME function
const getEarningByName = async (req, res) => {
    try {
        const { nombre_ingreso } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%M-%Y') AS fecha_recepcion, nombre_ingreso, valor_ingreso, fuente_id FROM ingresos WHERE nombre_ingreso = ?", [nombre_ingreso]);
        res.json(result[0]);
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send(error.message);
    }
};

// Get BY DATE function
const getEarningByDate = async (req, res) => {
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

        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%M-%Y') AS fecha_recepcion, nombre_ingreso, valor_ingreso, fuente_id FROM ingresos WHERE DATE(fecha_recepcion) = ?", [formattedDate]);
        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get BY Value function
const getEarningByValue = async (req, res) => {
    try {
        const { valor_ingreso } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%M-%Y') AS fecha_recepcion, nombre_ingreso, valor_ingreso, fuente_id FROM ingresos WHERE valor_ingreso = ?", [valor_ingreso]);
        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get BY Source function
const getEarningBySource = async (req, res) => {
    try {
        const { fuente_id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%M-%Y') AS fecha_recepcion, nombre_ingreso, valor_ingreso, fuente_id FROM ingresos WHERE fuente_id = ?", [fuente_id]);
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

        const {  nombre_ingreso, valor_ingreso, fuente_id} = req.body;

        if ( nombre_ingreso === undefined || valor_ingreso === undefined ||
            fuente_id === undefined ) {
            
            res.status(400).json({message: "Bad Request. Please fill all fields."});     
        }

        const earing = { nombre_ingreso, valor_ingreso, fuente_id };
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
    getMaxId,
    getActualEarnings,
    getEarningByName,
    getEarningByDate,
    getEarningByValue,
    getEarningBySource,
    addEarning,
    updateEarning,
    deleteEarning
};