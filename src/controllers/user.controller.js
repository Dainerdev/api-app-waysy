import { getConnection } from "../database/database";

// Get function
const getUsers = async (req, res) => {
    
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM usuarios");
        console.log(result);
        res.json(result);
    } catch(error) {
        res.status(500);
        res.send(error.message);
    }  
};

const getUserById = async (req, res) => {

    try {
        console.log(req.params);
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id_usuario, primer_nombre, primer_apellido FROM usuarios WHERE id_usuario = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


// POST function
const addUser = async (req, res) => {

    try {

        const connection = await getConnection();
        
        res.json("addUser")
    } catch(error) {
        res.status(500);
        res.send(error.message);
    }
};




export const methods = {
    getUsers,
    getUserById,
    addUser
};