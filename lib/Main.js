const inquirer = require("inquirer");
const employee = require("../controllers/empController.js");
const role = require("../controllers/roleController.js");
const department = require("../controllers/deptController.js");
const figlet = require("figlet");

const mainPage = () => {
	inquirer
		.prompt([
			{
				type: "list",
				name: "action",
				message: "What would you like to do?",
				choices: [
					"Add Employee",
					"Update Employee Role",
					"Add Role",
					"Add Department",
					"View All Employees",
					"View All Roles",
					"View All Departments",
					"Quit",
				],
			},
		])
		.then(async ({ action }) => {
			switch (action) {
				case "Add Employee":
					await employee.createEmployee();
					break;
				case "Update Employee Role":
					await employee.updateRole();
					break;
				case "Add Role":
					await role.createRole();
					break;
				case "Add Department":
					await department.createDepartment();

					break;
				case "View All Employees":
					await employee.viewAll();
					break;
				case "View All Roles":
					await role.viewAll();
					break;
				case "View All Departments":
					await department.viewAll();
					break;
				case "Quit":
         console.log("Goodbye!");
          process.exit(0);
					
			}
      await mainPage();
		});
};

const init = async () => {
  figlet('Employee Database', function(err, data) { //prettytext.jpeg
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
  });
  setTimeout(() => {
  mainPage();}, 1000);
};

module.exports = { mainPage, init };
