
import React, { useEffect, useState } from "react";
import {db} from "../firebase"
import { collection, getDocs} from "firebase/firestore"

function Challengelist(){
    let [challengesdata,setchallenges] = useState([])

    useEffect(()=>{

      async  function fetchchallenge(){
      
try{
  let fetchchallenge = await getDocs(collection(db,"allchallenges"))
  let datachallenge = fetchchallenge.docs.map((challenge)=>({
    id: challenge.id,
    ...challenge.data()
  }))
  setchallenges(datachallenge)


}
catch (err){
  console.error("Error in fetch data",err)
}


      }


fetchchallenge()
    },[])


    return (

        <>
        
        <div>
<h2>Available Challenges</h2>

{
  challengesdata.map((challenge)=>(
    <div key={challenge.id}>

<h3>{challenge.title}</h3>
<p>{challenge.description}</p>
<p><strong>Skills required: {challenge.skills.join(", ")}</strong></p>
<p><strong>Difficulty level: {challenge.difficulty}</strong></p>

      </div>
  ))
}



        </div>
        
        </>
    )
}

export default Challengelist


