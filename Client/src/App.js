import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import About from "./Pages/About";
import AddEdit from "./Pages/AddEdit";
import View from "./Pages/View";



function App() {
  return (
    <BrowserRouter>
    <div className='App'>
    <ToastContainer position= "top-center"/>
      <Routes>
      <Route exact path="/" Component={About}/>
      <Route path="/addContact" Component={AddEdit}/>
      <Route path="/update/:id" Component={AddEdit}/>
      <Route path="/view/:id" Component={View}/>
      </Routes>
      
      
    </div>
    </BrowserRouter>
    
  );
}

export default App;
