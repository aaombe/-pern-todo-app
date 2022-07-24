import React, { Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
//components
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";
const App = () =>{
  return (
    <Fragment>
      <img src={logo} className="App-logo" alt="logo" style={{width:"50px", height: "50px"}}/>
      <div className="container">
        <InputTodo/>
        <ListTodo/>
      </div>
    </Fragment>
  );
}

export default App;
