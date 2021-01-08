import React,{useState,useEffect} from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

const App = () => {

  const [inputText,setInputText] = useState("");
  const [todos,setTodos] = useState([]);
  const [status,setStatus] = useState("all");
  const [filteredTodos,setFilteredTodos] = useState([]);

  useEffect(() =>{
    getLocalTodos();
  },[]);

  useEffect(() =>{
    filterHandler();
    saveLocalTodos();
    // eslint-disable-next-line
  },[todos,status]);

  const filterHandler = () =>{
    switch(status){
      case 'completed': setFilteredTodos(todos.filter(todo => todo.completed === true));
      break;
      case 'uncompleted': setFilteredTodos(todos.filter(todo => todo.completed === false));
      break;
      default:setFilteredTodos(todos);
      break;
    };
  };

  // Save to Local Storage
  const saveLocalTodos = () =>{
      localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalTodos = () =>{
    if(localStorage.getItem('todos')===null){
      localStorage.setItem('todos', JSON.stringify([]));
    }
    else{
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form 
       setInputText={setInputText} 
       inputText={inputText} 
       setTodos={setTodos} 
       todos={todos}
       setStatus={setStatus}
      />
      <TodoList 
       todos={todos} 
       setTodos={setTodos}
       filteredTodos={filteredTodos} 
      />
    </div>
  );
};

export default App;
