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

// Get max Id function
const getMaxId = async (req, res) => {

    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT MAX(id) AS max_id FROM categorias");

        if (result.length > 0 && result[0].max_id !== null) {
            res.json({ max_id: result[0].max_id });   
        } else {
            res.json({ max_id: 1 }); 
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get BY NAME function
const getCategoryByName = async (req, res) => {
    try {
        const { nombre_categoria } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%M-%Y') AS fecha_recepcion, nombre_categoria, descripcion FROM categorias WHERE nombre_categoria = ?", [nombre_categoria]);
        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get BY DATE function
const getCategoryByDate = async (req, res) => {
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

        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%M-%Y') AS fecha_recepcion, nombre_categoria, descripcion FROM categorias WHERE DATE(fecha_recepcion) = ?", [formattedDate]);
        res.json(result[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get BY DESCRIPTION function
const getCategoryByDescription = async (req, res) => {
    try {
        const { descripcion } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, DATE_FORMAT(fecha_recepcion, '%d-%M-%Y') AS fecha_recepcion, nombre_categoria, descripcion FROM categorias WHERE descripcion LIKE ?", [`%${descripcion}%`]);
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
    getMaxId,
    getCategoryByName,
    getCategoryByDate,
    getCategoryByDescription,
    addCategory,
    updateCategory,
    deleteCategory
}