

import React, { useState } from "react";

import {db} from "../firebase.js";
import {collection,addDoc,serverTimestamp} from "firebase/firestore";


function Comchallengform(){

    const [inpdata,setinpdata]= useState({
        title:"",
        description:"",
        skills:"",
        difficulty:"Easy",

    })

    function handleinp(e){
setinpdata({
    ...inpdata,
    [e.target.name] : e.target.value

})
    }


    async function handlesubmit(e){
        e.preventDefault();
        try{
            await addDoc(collection(db,"allchallenges"),{
...inpdata,
skills: inpdata.skills.split(",").map((skill)=>skill.trim()),
createAt: serverTimestamp(),

            })

            alert("Posted challenge")
            setinpdata({
                title:"",
                description:"",
                skills:"",
                difficulty:""
            })
        }
        catch(err){
console.error("Error in your inputs",err)
alert("Corect your all filleds")
        }
    }

    

    return (

        <>
        <form onSubmit={handlesubmit}>

<h2>Post a New Challenge</h2>

<input type="text" name="title" placeholder="Challenge title" value={inpdata.title} onChange={handleinp}  required />

<textarea name="description" placeholder="Challenge description" value={inpdata.description} onChange={handleinp} required rows={4}/>

<input type="text" name="skills" placeholder="Skills by comma" value={inpdata.skills} onChange={handleinp} required />

<select name="difficulty" value={inpdata.difficulty} onChange={handleinp}>
    <option value="Easy">Easy</option>
    <option value="Medium">Medium</option>
    <option value="Hard">Hard</option>

</select>

<button type="submit">Post Challenge</button>
        </form>


        </>
    )
}

export default Comchallengform