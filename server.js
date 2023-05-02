const express = require('express')
const app = express();
const PORT = 3001
const routes = require('./routes')

const sequelize = require('./Config/connection.js')

const {Employee, Role, Department} = require('./Model')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//FORCE TRUE IS BAD, DROPS DATABASE EVERYTIME CONNECTION IS MADE
sequelize.sync({force: false}).then(()=>{
  app.listen(PORT, () => {console.log(`Server running on ${PORT}`)});
})