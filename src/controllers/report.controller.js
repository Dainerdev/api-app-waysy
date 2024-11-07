import { getConnection } from "../database/database";

const getReport = async (req, res) => {

    try {

        const { id, fecha_inicial, fecha_final } = req.params;

        const convertirFecha = (fecha) => {
            const [day, monthAbbr, year] = fecha.split(' ');
            const monthMap = {
                'Ene': '01', 'Feb': '02', 'Mar': '03', 'Abr': '04', 'May': '05',
                'Jun': '06', 'Jul': '07', 'Ago': '08', 'Sep': '09', 'Oct': '10',
                'Nov': '11', 'Dic': '12'
            };
            const month = monthMap[monthAbbr];
            if (!month) {
                throw new Error('Mes no válido en la fecha proporcionada.');
            }
            return `${year}-${month}-${day.padStart(2, '0')}`;
        };

        // Convertir las fechas inicial y final
        const fechaInicialConvertida = convertirFecha(fecha_inicial);
        const fechaFinalConvertida = convertirFecha(fecha_final);

        const connection = await getConnection();
        const [earning] = await connection.query(`

            SELECT COALESCE(SUM(valor_ingreso), 0) AS totalIngresos FROM ingresos WHERE DATE(fecha_recepcion) BETWEEN ? AND ? AND usuario_id = ?
            `, [fechaInicialConvertida, fechaFinalConvertida, id]);

        const [expense] = await connection.query(`
            
            SELECT COALESCE(SUM(valor_gasto), 0) AS totalGastos FROM gastos WHERE DATE(fecha_recepcion) BETWEEN ? AND ? AND usuario_id = ?
            `, [fechaInicialConvertida, fechaFinalConvertida, id]);

        const totalIngresos = earning.totalIngresos;
        const totalGastos = expense.totalGastos;
        const saldo = totalIngresos - totalGastos;

        res.json({totalIngresos,
                totalGastos,
                saldo});
    } catch (error) {
        res.status(500).send(error.message);        
    }
};

export const methods = {
    getReport
};