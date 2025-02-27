import { sqlConnect, sql } from "../utils/sql.js";

export const getHelloWorld = (req, res) => {
	res.send('Hello World');
}

// REQUEST
export const getItems = async (req, res) => {
	const pool = await sqlConnect();
	const result = await pool.request().query('SELECT * FROM Users');

	console.log(result.recordset);
	res.json(result.recordset);
}

export const getItem = async (req, res) => {
	const pool = await sqlConnect();
	const result = await pool.request()
		.input('id', sql.Int, req.params.id)
		.query('SELECT * FROM Users WHERE Id = @id');

	console.log(result.recordset);
	res.json(result.recordset);
}

// CREATE
export const postItem = async (req, res) => {
	const pool = await sqlConnect();
	const result = await pool.request()
		.input('name', sql.NVarChar, req.body.name)
		.input('username', sql.NVarChar, req.body.username)
		.input('password', sql.NVarChar, req.body.password)
		.query('INSERT INTO Users (Name, Username, Password) VALUES (@name, @username, @password)');

	console.log(result);
	res.json(result);
}

// DELETE
export const deleteItem = async (req, res) => {
	const pool = await sqlConnect();
	const result = await pool.request()
		.input('id', sql.Int, req.params.id)
		.query('DELETE FROM Users WHERE Id = @id');

	console.log(result);
	res.json(result);
}

// UPDATE
export const putItem = async (req, res) => {
	const pool = await sqlConnect();
	const result = await pool.request()
		.input('id', sql.Int, req.params.id)
		.input('name', sql.NVarChar, req.body.name)
		.input('username', sql.NVarChar, req.body.username)
		.input('password', sql.NVarChar, req.body.password)
		.query('UPDATE Users SET Name = @name, Username = @username, Password = @password WHERE Id = @id');

	console.log(result);
	res.json(result);
}
