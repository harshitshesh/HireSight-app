
import React from "react"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Companydash from "./components/Companydashboard"
import Candidatedash from "./Candidatedashboard"

function App() {

  
  return (
    <>
     
     <Router>
<Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/comdashboard" element={<Companydash/>}/>
  <Route path="/candashboard" element={<Candidatedash/>}/>

</Routes>

     </Router>
    
      
    </>
  )
}

export default App
