import { sqlConnect, sql } from "../utils/sql.js";

export const getHelloWorld = (req, res) => {
	res.send('Hello World');
}

export const getItems = async (req, res) => {
	const pool = await sqlConnect();
	const result = await pool.request().query('SELECT * FROM Users');

	console.log(result.recordset);
	res.json(result.recordset);
}
