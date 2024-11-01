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

// Get BY ID function
const getUserById = async (req, res) => {

    try {
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
        const { id_usuario, tipo_identificacion, contrasena, repetir_contrasena, 
            pregunta_recuperacion, respuesta_recuperacion, primer_nombre, segundo_nombre, 
            primer_apellido, segundo_apellido, genero, email, telefono, foto, rol, pais, 
            ciudad } = req.body;

        if (id_usuario === undefined || tipo_identificacion === undefined || contrasena === undefined || repetir_contrasena === undefined ||
            pregunta_recuperacion === undefined || respuesta_recuperacion === undefined || primer_nombre === undefined || segundo_nombre === undefined ||
            primer_apellido === undefined || segundo_apellido === undefined || genero === undefined || email === undefined || telefono === undefined ||
            foto === undefined || rol === undefined || pais === undefined || ciudad === undefined) {
            
            res.status(400).json({message: "Bad Request. Please fill all fields."});
        }

        const usuario = { id_usuario, tipo_identificacion, contrasena, repetir_contrasena, 
            pregunta_recuperacion, respuesta_recuperacion, primer_nombre, segundo_nombre, 
            primer_apellido, segundo_apellido, genero, email, telefono, foto, rol, pais, 
            ciudad };
            
        const connection = await getConnection();
        await connection.query("INSERT INTO usuarios SET ?", usuario);        
        res.json({ message: "User added." });
    } catch(error) {
        res.status(500);
        res.send(error.message);
    }
};

// DELETE function
const deleteUser = async (req, res) => {

    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM usuarios WHERE id_usuario = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


export const methods = {
    getUsers,
    getUserById,
    addUser,
    deleteUser
};