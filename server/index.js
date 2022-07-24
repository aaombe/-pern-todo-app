require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();
//middlweware 
app.use(cors());
app.use(express.json());

//PORTS - STORED IN ENVIRONMENT VARS FILE - DEFAULT GIVEN IF ENVIRONMENT VAR ISN'T PASSED
const PORT = process.env.PORT|| 4000;
//ROUTES 
//route 1: create to do 
app.post('/todos', async (req, res) =>{
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo[0]);
  }catch(err){
    console.error(err.message);
  }
});

//route 2: get all to do data 
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");//query
    res.json(allTodos.rows);
   
  } catch (err) {
    console.err(err.message);
  }
});
//get a specific to do
app.get('/todos/:id', async(req, res)=>{
  ///:id > allows url to be dynamic
  try {
    //destructure 
    const {id} = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);//query
    res.json(todo.rows[0])
  } catch (err) {
    console.err(err.message);
  }
})
//route 3: update to do 
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});
//route 4: delete to do
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try{
    const todo = await pool.query("DELETE FROM todo WHERE todo_id =$1", [id]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});
//route 5: delete all 
app.delete("/todos", async (req, res) => {
  try{
    const todo = await pool.query("DELETE FROM todo");
    res.json("All todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});
//CONNECTION
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
});