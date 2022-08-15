import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos]=useState([]);
  const [todo,setTodo]=useState("");
  const [todoEdit,setTodoEdit]=useState(null);
  const [editText,setEditText]=useState("");

  useEffect(()=>{
    const temp=localStorage.getItem("todos");
    const loadedTodos=JSON.parse(temp);
    if(loadedTodos){
      setTodos(loadedTodos);
    }
  },[])

  useEffect(()=>{
    const temp=JSON.stringify(todos);
    localStorage.setItem("todos",temp);
  },[todos])
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    const newTodo={
      id:new Date().getTime(),
      text:todo,
      completed:false
    } 
    setTodos([...todos].concat(newTodo))
    setTodo("")

  }
  function deleteTodo(id){
    const updatedTodos=[...todos].filter((todo)=>todo.id!==id);
    setTodos(updatedTodos);
  }
  function toggleComplete(id){
    const updatedTodos=[...todos].map((todo)=>{
      if(todo.id===id){
        todo.completed=!todo.completed;
      }
      return todo;
    })
    setTodos(updatedTodos);
  }
  function editTodo(id){
    const updatedTodos=[...todos].map((todo)=>{
      if(todo.id===id){
        todo.text=editText;
      }
      return todo;
    })
    setTodos(updatedTodos);
    setTodoEdit(null);
    setEditText("");
  }
  return (
    <div className="App">
      <h1>React Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e)=>setTodo(e.target.value)} value={todo}/>
        <button type='submit'>Add Todo</button>
      </form>
      {todos.map((todo)=><div key={todo.id}>

         {todoEdit===todo.id ?
          (<input type="text" onChange={(e)=>setEditText(e.target.value)} value={editText}/>)
          :
          (<div>{todo.text}</div>)
          }
        
        
      <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
      <input type='checkbox' onChange={()=>toggleComplete(todo.id)}/>
      {todoEdit===todo.id ? (<button onClick={()=>editTodo(todo.id)}>Submit Edits</button>)
       : (<button onClick={()=>setTodoEdit(todo.id)}>Edit</button>)}

      
      </div>)}
    </div>
  );
}

export default App;
