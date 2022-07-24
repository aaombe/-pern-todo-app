import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";


const url = "http://localhost:8080/todos";
const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const deleteTodo = async (id)=>{
    try {
      const deleteTodo= await fetch(`${url}/${id}`, {
        method:"DELETE"
      });
      if (!deleteTodo.ok) throw Error('Did not receive espected data.');
      console.log(deleteTodo)
      //setfilter to update content after delete on site 
      setTodos(todos.filter(todo => todo.todo_id !== id))
    } catch (err) {
      console.log(err.message);
    }
  }
  const getTodos = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw Error('Did not receive espected data.');
      const jsonData = await response.json();//parse data
      //set items to list items
      setTodos(jsonData);
    } catch (err) {
      console.Error(err.message)
    }finally{
      setIsLoading(false);//track loading 
    }
  }
  useEffect(() => {
    setTimeout(() =>{
        (async () => await getTodos())();
      }, 500)
  }, []);
  // const todoList = [
  //   {todo_id: 1.0, description: "First Item on the todo list"},
  //   {todo_id: 3.0, description: "Second Item on the todo list"}
  // ];


  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo = {todo}/>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick = {()=> 
                    deleteTodo(todo.todo_id)
                  }>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  )
}
export default ListTodo;