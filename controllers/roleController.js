//const {Role} = require('../Model');
const connection = require('../Config/connection');
const inquirer = require('inquirer');
const {faker} = require('@faker-js/faker');

const createRole = async () => {
	try {
    const deptQuery = `SELECT name, id FROM department;`;
    const deptResult = await connection.query(deptQuery);
    const deptChoices = deptResult[0].map(({name, id}) => [name, id]);
    const deptNames = deptChoices.map((row) => row[0]);
    const deptIdList = deptChoices.map((row) => row[1]);
		await inquirer
			.prompt([
				{
					type: "input",
					name: "roleName",
					message: "What is the name of the role?",
				},
        {
					type: "number",
					name: "roleMoney",
					message: "What is the salary of the role?",
				},
        {
					type: "list",
					name: "roleDept",
					message: "What what department does the role belong to?",
          choices: deptNames,
				}, 
        
			])
			.then(async ({ roleName, roleMoney, roleDept }) => {
				
        const choiceIndex = deptNames.indexOf(roleDept);
				const deptId = deptIdList[choiceIndex];



				const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;
				await connection.query(query, [roleName, roleMoney, deptId]);
				console.log(`role ${roleName} created and added to ${roleDept}`);
			})
	} catch (err) {
		throw err;
	}
};
const viewAll = async () => {
	try {
		const roleQuery = `SELECT title, salary, id, department_id FROM role;`;
    const roleResult = await connection.query(roleQuery);
    const roles = roleResult[0].map(({title, id, salary, department_id}) => [title, id,salary, department_id]);
		
		console.table(['Title', 'Id', 'Salary', 'department_id'], roles);
	} catch (err) {
		throw err;
	}
};

module.exports = {createRole, viewAll};