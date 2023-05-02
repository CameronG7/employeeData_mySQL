const connection = require("../Config/connection.js");
const { faker } = require("@faker-js/faker");
const cTable = require("console.table");
const main = require("../lib/Main.js");
const inquirer = require("inquirer");


const createDepartment = async () => {
	try {
		await inquirer
			.prompt([
				{
					type: "input",
					name: "deptName",
					message: "What is the name of the department?",
				},
			])
			.then(async ({ deptName }) => {
				const name = deptName;
				const query = `INSERT INTO department (name) VALUES (?)`;
				const result = await connection.query(query, name);
				console.log(`department ${name} created`);
			})
	} catch (err) {
		throw err;
	}
};

const viewAll = async () => {
	try {
		const deptQuery = `SELECT name, id FROM department;`;
    const deptResult = await connection.query(deptQuery);
    const departments = deptResult[0].map(({name, id}) => [name, id]);
		const table = cTable.getTable(departments);
		console.table(['Department', 'Id'], departments);
	} catch (err) {
		throw err;
	}
};
module.exports = { createDepartment, viewAll };
