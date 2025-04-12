import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  async function handlelogin(e) {
    e.preventDefault();
    try {
      let credential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = credential.user.uid;

      const userref = doc(db, "users", uid);
      const userdata = await getDoc(userref);

      if (userdata.exists()) {
        const userrole = userdata.data().role;
        if (userrole === "comp") {
          navigate("/comdashboard");
        } else {
          navigate("/candashboard");
        }
      }
    } catch (err) {
      alert("Something went wrong in the form", err);
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handlelogin} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>

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

        <button type="submit" style={styles.button}>Login</button>

      
        <div style={styles.registerContainer}>
          <span style={{color:"white"}}>New user?</span> 
          <Link to="/signup" style={styles.registerLink}>Register</Link>
        </div>
      </form>
    </div>
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
  button: {
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: "#fff",
    border: "2px solid #00ffff",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  registerContainer: {
    marginTop: "15px", 
    textAlign: "center",
  },
  registerLink: {
    color: "#00ffff",  
    textDecoration: "none",  
    fontWeight: "bold", 
    marginLeft: "5px",
  }
};

export default Login;
