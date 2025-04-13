
import React from "react"
import { Routes,Route } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Companydash from "./components/Companydashboard"
import Candidatedash from "./components/Candidatedashboard"
import Submition from "./components/Submition"


function App() {

  
  return (
    <>
     
     
<Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/comdashboard" element={<Companydash/>}/>
  <Route path="/candashboard" element={<Candidatedash/>}/>
  <Route path="/submition/:id" element={<Submition/>}/>


</Routes>

    
    
      
    </>
  )
}

export default App
