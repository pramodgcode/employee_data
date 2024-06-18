// Task1: initiate app and run server at 3000
const express = require('express');
const app = new express();
const morgan = require('morgan');
app.use(morgan('dev'));
require('dotenv').config();
const bodyParser = require('body-parser');

app.use(bodyParser.json());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const path = require('path');
app.use(express.static(path.join(__dirname + '/dist/FrontEnd')));
// Task2: create mongoDB connection 
require("./db/mongo_db")


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below
const Employeee = require('./models/employee');







//TODO: get data from db  using api '/api/employeelist'
app.get('/employees', async (req, res) => {
  Employeee.find()
    .then(employees => res.json(employees))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    });
});



//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  Employeee.findById(employeeId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    });
});



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/employee-create', (req, res) => {
  console.log(req, "==")

  const { name, location, position, salary } = req.body;
  // Create a new User instance
  const newEmployee = new Employeee({ name, location, position, salary });

  // Save the user to the database
  newEmployee.save()
    .then(empoyeeUser => {
      // Respond with the saved user object
      res.json(empoyeeUser);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    });
});





//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/employees/:id', (req, res) => {
  const employeeId = req.params.id;

  Employeee.findByIdAndDelete(employeeId)
    .then(deletedUser => {
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    });
});




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  const { name, location, position, salary } = req.body;

  Employeee.findByIdAndUpdate(employeeId, { name, location, position, salary }, { new: true })
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    });
});


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



