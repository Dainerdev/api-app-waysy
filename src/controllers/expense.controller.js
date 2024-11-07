import { getConnection } from "../database/database";

// Get function
const getExpenses = async (req, res) => {
    
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, usuario_id, DATE_FORMAT(fecha_recepcion, '%d-%m-%Y'), nombre_gasto, valor_gasto, categoria_id, descripcion FROM gastos");
        console.log(result);
        res.json(result);
    } catch(error) {
        res.status(500);
        res.send(error.message);
    }  
};

// Get BY ID function
const getExpenseById = async (req, res) => {

    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, usuario_id, DATE_FORMAT(fecha_recepcion, '%d-%m-%Y'), nombre_gasto, valor_gasto, categoria_id FROM gastos WHERE id = ?", id);
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
        const result = await connection.query("SELECT MAX(id) AS max_id FROM gastos");

        if (result.length > 0 && result[0].max_id !== null) {
            res.json({ max_id: result[0].max_id });   
        } else {
            res.json({ max_id: 1 }); 
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get Actual Expenses function
const getActualExpenses = async (req, res) => {

    const { id } = req.params;

    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT SUM(valor_gasto) AS saldo_actual FROM gastos WHERE usuario_id = ?", [id]);

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get BY NAME function
const getExpensesByName = async (req, res) => {
    try {
        const { nombre_gasto } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%M-%Y') AS fecha_recepcion, nombre_gasto, valor_gasto, categoria_id FROM gastos WHERE nombre_gasto = ?", [nombre_gasto]);
        res.json(result[0]);
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send(error.message);
    }
};

// Get BY DATE function
const getExpensesByDate = async (req, res) => {
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

        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%M-%Y') AS fecha_recepcion, nombre_gasto, valor_gasto, categoria_id FROM gastos WHERE DATE(fecha_recepcion) = ?", [formattedDate]);
        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get BY Value function
const getExpensesByValue = async (req, res) => {
    try {
        const { valor_gasto } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%M-%Y') AS fecha_recepcion, nombre_gasto, valor_gasto, categoria_id FROM gastos WHERE valor_gasto = ?", [valor_gasto]);
        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get BY Source function
const getExpensesByCategory = async (req, res) => {
    try {
        const { categoria_id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%M-%Y') AS fecha_recepcion, nombre_gasto, valor_gasto, categoria_id FROM gastos WHERE categoria_id = ?", [categoria_id]);
        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// POST function
const addExpenses = async (req, res) => {

    try {
        const { usuario_id, nombre_gasto, valor_gasto, categoria_id, descripcion } = req.body;

        if ( usuario_id === undefined || nombre_gasto === undefined || valor_gasto === undefined ||
            categoria_id === undefined || descripcion === undefined ) {
            
            res.status(400).json({message: "Bad Request. Please fill all fields."});
        }

        const expense = { usuario_id, nombre_gasto, valor_gasto, categoria_id, descripcion };
            
        const connection = await getConnection();
        await connection.query("INSERT INTO gastos SET ?", expense);        
        res.json({ message: "Expense added." });
    } catch(error) {
        res.status(500);
        res.send(error.message);
    }
};

// UPTDATE function
const updateExpense = async (req, res) => {

    try {

        const { id } = req.params;

        const {  nombre_gasto, valor_gasto, categoria_id, descripcion } = req.body;

        if ( nombre_gasto === undefined || valor_gasto === undefined ||
            categoria_id === undefined || descripcion === undefined ) {
            
            res.status(400).json({message: "Bad Request. Please fill all fields."});     
        }

        const gasto = { nombre_gasto, valor_gasto, categoria_id, descripcion };
        console.log(gasto);
        
        const connection = await getConnection();
        await connection.query("UPDATE gastos SET ? WHERE id = ?", [gasto, id]);
        res.json({ message: "Expense updated." });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// DELETE function
const deleteExpense = async (req, res) => {

    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM gastos WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getExpenses,
    getExpenseById,
    getMaxId,
    getActualExpenses,
    getExpensesByName,
    getExpensesByDate,
    getExpensesByValue,
    getExpensesByCategory,
    addExpenses,
    updateExpense,
    deleteExpense
};