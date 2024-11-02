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
        const result = await connection.query("SELECT id, primer_nombre, primer_apellido FROM usuarios WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get Type Id enum function
const getTypeId = async (req, res) => {

    try {
        const connection = await getConnection();
        const result = await connection.query("SHOW COLUMNS FROM usuarios LIKE 'tipo_identificacion'");

        if (result.length > 0) {
            const enumValues = result[0].Type;

            const values = enumValues
                .match(/'([^']+)'/g) 
                .map(value => value.replace(/'/g, ''));
            
            res.json(values);
        } else {
            res.status(404).send('Column not found');
        }

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get Gender enum function
const getGender = async (req, res) => {

    try {
        const connection = await getConnection();
        const result = await connection.query("SHOW COLUMNS FROM usuarios LIKE 'genero'");

        if (result.length > 0) {
            const enumValues = result[0].Type;

            const values = enumValues
                .match(/'([^']+)'/g) 
                .map(value => value.replace(/'/g, ''));
            
            res.json(values);
        } else {
            res.status(404).send('Column not found');
        }

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get Role enum function
const getRole = async (req, res) => {

    try {
        const connection = await getConnection();
        const result = await connection.query("SHOW COLUMNS FROM usuarios LIKE 'rol'");

        if (result.length > 0) {
            const enumValues = result[0].Type;

            const values = enumValues
                .match(/'([^']+)'/g) 
                .map(value => value.replace(/'/g, ''));
            
            res.json(values);
        } else {
            res.status(404).send('Column not found');
        }

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// POST function
const addUser = async (req, res) => {

    try {
        const { id, tipo_identificacion, contrasena, repetir_contrasena, 
            pregunta_recuperacion, respuesta_recuperacion, primer_nombre, segundo_nombre, 
            primer_apellido, segundo_apellido, genero, email, telefono, foto, rol, pais, 
            ciudad } = req.body;

        if (id === undefined || tipo_identificacion === undefined || contrasena === undefined || repetir_contrasena === undefined ||
            pregunta_recuperacion === undefined || respuesta_recuperacion === undefined || primer_nombre === undefined || segundo_nombre === undefined ||
            primer_apellido === undefined || segundo_apellido === undefined || genero === undefined || email === undefined || telefono === undefined ||
            foto === undefined || rol === undefined || pais === undefined || ciudad === undefined) {
            
            res.status(400).json({message: "Bad Request. Please fill all fields."});
        }

        const usuario = { id, tipo_identificacion, contrasena, repetir_contrasena, 
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

// Login Validation
const login = async (req, res) => {
    const { email, contrasena } = req.body;

    try {
        const connection = await getConnection();
        const result = await  connection.query("SELECT * FROM usuarios WHERE email = ? AND contrasena = ?", [email, contrasena]);

        if (result.length > 0) {
            res.json({ success: true, message: "Successful login." });
        } else {
            res.json({ success: false, message: "Incorrect credentials." });
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// UPDATE function
const updateUser = async (req, res) => {

    try {

        const { id } = req.params;

        const { tipo_identificacion, contrasena, repetir_contrasena, 
            pregunta_recuperacion, respuesta_recuperacion, primer_nombre, segundo_nombre, 
            primer_apellido, segundo_apellido, genero, email, telefono, foto, rol, pais, 
            ciudad } = req.body;

        if (id === undefined || tipo_identificacion === undefined || contrasena === undefined || repetir_contrasena === undefined ||
            pregunta_recuperacion === undefined || respuesta_recuperacion === undefined || primer_nombre === undefined || segundo_nombre === undefined ||
            primer_apellido === undefined || segundo_apellido === undefined || genero === undefined || email === undefined || telefono === undefined ||
            foto === undefined || rol === undefined || pais === undefined || ciudad === undefined) {
                
            res.status(400).json({message: "Bad Request. Please fill all fields."});
        }

        const user = { id, tipo_identificacion, contrasena, repetir_contrasena, 
            pregunta_recuperacion, respuesta_recuperacion, primer_nombre, segundo_nombre, 
            primer_apellido, segundo_apellido, genero, email, telefono, foto, rol, pais, 
            ciudad };

        const connection = await getConnection();
        await connection.query("UPDATE usuarios SET ? WHERE id = ?", [user, id]);
        res.json({ message: "User updated." });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// DELETE function
const deleteUser = async (req, res) => {

    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM usuarios WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


export const methods = {
    getUsers,
    getUserById,
    getTypeId,
    getGender,
    getRole,
    addUser,
    login,
    updateUser,
    deleteUser
};