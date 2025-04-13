import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";  

function Signup() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("cand");
  const navigate = useNavigate();

  async function handlesignup(e) {
    e.preventDefault();
    try {
      let credential = await createUserWithEmailAndPassword(auth, email, password);
     
   
    
      await setDoc(doc(db, "users", credential.user.uid), {
        email,
       
        role,
      });

  
      if (role === "comp") {
        navigate("/comdashboard");
      } else {
        navigate("/candashboard");
      }
    } catch (err) {
     
        alert("Something went wrong, please try again later.");
     
    }
  }

  return (
    <>
      <div style={styles.container}>
        <form onSubmit={handlesignup} style={styles.form}>
          <h2 style={styles.heading}>Signup</h2>

          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setemail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setpassword(e.target.value)}
            style={styles.input}
          />

          <select
            onChange={(e) => setrole(e.target.value)}
            style={styles.select}
          >
            <option value="cand">Candidate</option>
            <option value="comp">Company</option>
          </select>

          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </div>
    </>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#121212",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "#1e1e1e",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "300px",
  },
  heading: {
    color: "#ffffff",
    textAlign: "center",
    marginBottom: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    backgroundColor: "#fff",
    color: "#121212",
    boxShadow: "0 2px 8px rgba(0, 255, 255, 0.2)",
    transition: "all 0.3s ease",
  },
  button: {
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: "#fff",
    border: "2px solid #00ffff",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  }
};

export default Signup;
