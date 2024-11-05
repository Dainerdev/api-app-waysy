import { getConnection } from "../database/database";

// GET function
const getCategories = async (req, res) => {

    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%m-%Y'), nombre_categoria, descripcion, icono FROM categorias");
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

// Get BY ID function
const getCategoryById = async (req, res) => {

    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%m-%Y'), nombre_categoria, descripcion FROM categorias WHERE id = ?", id);
        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// POST function
const addCategory = async (req, res) => {

    try {
        const { nombre_categoria, 
            descripcion, icono } = req.body;

        if (nombre_categoria === undefined || descripcion === undefined) {
            
            res.status(400).json({message: "Bad Request. Please fill all fields."});     
        }

        const category = { nombre_categoria, descripcion, icono };
        console.log(category)
        
        const connection = await getConnection();
        await connection.query("INSERT INTO categorias SET ?", category);
        res.json({ message: "Category added." });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// UPTDATE function
const updateCategory = async (req, res) => {

    try {

        const { id } = req.params;

        const { nombre_categoria, 
            descripcion, icono } = req.body;

        if (nombre_categoria === undefined || descripcion === undefined) {
            
            res.status(400).json({message: "Bad Request. Please fill all fields."});     
        }

        const category = { id, nombre_categoria, descripcion, icono };
        console.log(category)
        
        const connection = await getConnection();
        await connection.query("UPDATE categorias SET ? WHERE id = ?", [category, id]);
        res.json({ message: "Category updated." });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// DELETE function
const deleteCategory = async (req, res) => {

    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM categorias WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


export const methods = {
    getCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory
}