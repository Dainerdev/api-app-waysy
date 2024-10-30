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

const addUser = async (req, res) => {

    try {
        console.log(req.body);

        const connection = await getConnection();
        
        res.json("addUser")
    } catch(error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getUsers,
    addUser
};