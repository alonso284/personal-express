import { sqlConnect, sql } from "../utils/sql.js";

export const login  = async (req, res) => {
	let isValid = false;
	const pool = await sqlConnect();
	const result = await pool.request()
		.input('username', sql.NVarChar, req.body.username)
		.query('SELECT * FROM Users WHERE Username = @username');

	if (result.recordset.length > 0) {
		if (result.recordset[0].Password === req.body.password) {
			isValid = true;
		}
	}

	res.status(200).json({ operation: isValid });
}
