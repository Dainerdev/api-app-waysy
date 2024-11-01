import { getConnection } from "../database/database";

// GET function
const getCategories = async (req, res) => {

    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM categorias");
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

export const methods = {
    getCategories
}