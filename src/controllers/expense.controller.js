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
    addExpenses,
    updateExpense,
    deleteExpense
};