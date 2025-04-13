import React, { useState } from "react";
import { db } from "../firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Comchallengform() {
  const [inpdata, setinpdata] = useState({
    title: "",
    description: "",
    skills: "",
    difficulty: "Easy",
  });

  function handleinp(e) {
    setinpdata({
      ...inpdata,
      [e.target.name]: e.target.value,
    });
  }

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      await addDoc(collection(db, "allchallenges"), {
        ...inpdata,
        skills: inpdata.skills.split(",").map((skill) => skill.trim()),
        createAt: serverTimestamp(),
      });

      alert("Posted challenge");
      setinpdata({
        title: "",
        description: "",
        skills: "",
        difficulty: "Easy",
      });
    } catch (err) {
      console.error("Error in your inputs", err);
      alert("Correct all fields");
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handlesubmit} style={styles.form}>
        <h2 style={styles.heading}> Post a New Challenge For Employee</h2>

        <input
          type="text"
          name="title"
          placeholder="Challenge Title"
          value={inpdata.title}
          onChange={handleinp}
          required
          style={styles.input}
        />

        <textarea
          name="description"
          placeholder="Challenge Description"
          value={inpdata.description}
          onChange={handleinp}
          rows={4}
          required
          style={styles.textarea}
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={inpdata.skills}
          onChange={handleinp}
          required
          style={styles.input}
        />

        <select
          name="difficulty"
          value={inpdata.difficulty}
          onChange={handleinp}
          style={styles.select}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <button type="submit" style={styles.button}>Post Challenge</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f0f0f",
    padding: "40px",
    fontFamily: "'Poppins', sans-serif",
    color: "#ffffff",
  },
  form: {
    backgroundColor: "#1e1e1e",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 0 15px #00ffffaa",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "500px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    color: "#00ffff",
    fontFamily: "'Orbitron', sans-serif",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #00ffff55",
    backgroundColor: "#2c2c2c",
    color: "#fff",
    fontSize: "16px",
    outline: "none",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #00ffff55",
    backgroundColor: "#2c2c2c",
    color: "#fff",
    fontSize: "16px",
    resize: "vertical",
    outline: "none",
  },
  select: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #00ffff55",
    backgroundColor: "#2c2c2c",
    color: "#fff",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: "#00ffff",
    color: "#121212",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease",
  },
};

export default Comchallengform;
