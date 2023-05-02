//const {Employee} = require('../Model');
const inquirer = require('inquirer');
const connection = require('../Config/connection');
const { faker } = require("@faker-js/faker");

const createEmployee = async () => {
	try {
		const listQuery = `SELECT first_name, last_name FROM employee;`;
		const listResult = await connection.query(listQuery);
		const list = listResult[0].map((row) => [row.first_name, row.last_name]);
		const roleQuery = `SELECT id, title FROM role;`;
		const roleResult = await connection.query(roleQuery);
		
		//console.log(roleResult[0]);
		const roleList = roleResult[0].map((row) => [row.title, row.id]); // map out the role names and ids from query as an array of arrays
		//console.log(roleList);
		const roleNames = roleList.map((row) => row[0]);// array of role names, name and ID share index in their respective arrays
		//console.log(roleNames) 
		const roleIds = roleList.map((row) => row[1]); // array of role ids
		
		await inquirer
			.prompt([
				{
					type: "input",
					name: "employFirst",
					message: "What is the Employees first name?",
				},
				{
					type: "input",
					name: "employLast",
					message: "What is the Employees last name?",
				},
				{
					type: "list",
					name: "employRole",
					message: "What is the employees role?",
					choices: roleNames,
				},
				{
					type: "list",
					name: "employMan",
					message: "Who is the Employees manager?",
					choices: ["none", ...list[0]],
					default: "null",
				},
			])
			.then(async ({ employFirst, employLast, employRole, employMan }) => {
				const firstName = employFirst;
				const lastName = employLast;
				
				const choiceIndex = roleNames.indexOf(employRole);
				const roleId = roleIds[choiceIndex];

        let manager;
				if (employMan === "none") {
					 manager = null;
				} else {
					manager = employMan;
				}

				const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
				await connection.query(query, [firstName, lastName, roleId, manager]);
				console.log(`Employee ${firstName} ${lastName} added to database`);
			});
	} catch (err) {
		throw err;
	}
};
const viewAll = async () => {
	try {
		const empQuery = `SELECT first_name, last_name, role_id, manager_id, id FROM employee;`;
    const empResult = await connection.query(empQuery);
    const employees = empResult[0].map(({ first_name, last_name, id, role_id, manager_id}) => [first_name, last_name, id, role_id, manager_id]);
		
		console.table(['First Name', 'Last Name', 'Id', 'Role Id', 'Manager Id'], employees);
	} catch (err) {
		throw err;
	}
};
const updateRole = async () => {
	try {
		const empQuery = `SELECT first_name, last_name, id FROM employee;`;
    const empResult = await connection.query(empQuery);
    const employees = empResult[0].map(({ first_name, last_name, id}) => [first_name, last_name, id]);
		const employeeNames= employees.map((row) => row[0] + " " + row[1]);
		const employeeIds = employees.map((row) => row[2]);

		const roleQuery = `SELECT id, title FROM role;`;
		const roleResult = await connection.query(roleQuery);
		
		
		const roleList = roleResult[0].map((row) => [row.title, row.id]); 
		const roleNames = roleList.map((row) => row[0]);
		const roleIds = roleList.map((row) => row[1])
		
		await inquirer.prompt([
			{
				type: 'list',
				name: 'employee',
				message: 'Which employees role would you like to update?',
				choices: employeeNames
			},
			{
				type: 'list',
				name: 'role',
				message: 'Which role would you like to give them?',
				choices: roleNames
			},




		]).then(async ({employee, role}) => {
			const employIndex = employeeNames.indexOf(employee);
			const employeeId = employeeIds[employIndex];
			const roleIndex = roleNames.indexOf(role);
			const roleId = roleIds[roleIndex];
			const query = `UPDATE employee SET role_id = ? WHERE id = ?;`;
			await connection.query(query, [roleId, employeeId]);
			console.log(`Employee ${employee}'s role updated to ${role}`);
		})
	} catch (err) {
		throw err;
	}
};



module.exports = { createEmployee, viewAll ,updateRole};
