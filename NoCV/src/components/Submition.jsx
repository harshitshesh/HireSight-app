import React, { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Submition() {
  const [code, setcode] = useState("");
  const [language, setlanguage] = useState("JavaScript");
  const { id } = useParams();
  const navigate = useNavigate()
  const [feedbackreq, setfeedback] = useState(false);

  function handlecode(e) {
    setcode(e.target.value);
  }

  function handlefeedback(e) {
    setfeedback(e.target.checked);
  }

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      await addDoc(collection(db, "submissions"), {
        id,
        code,
        language,
        feedbackreq,
        userid: auth.currentUser?.uid,
        createdAt: serverTimestamp(),
      });
      alert("Submitted Successfully!");
      navigate("/candashboard")
      setcode("");
      setfeedback(false);
    } catch (err) {
        console.error(err)
      alert("Error in submission");
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Submit Your Solution</h2>

        <form onSubmit={handlesubmit} style={styles.form}>
          <div style={styles.selectWrapper}>
            <label style={styles.label}>Select Language:</label>
            <select
              style={styles.select}
              value={language}
              onChange={(e) => setlanguage(e.target.value)}
            >
              <option>JavaScript</option>
              <option>Python</option>
              <option>Java</option>
              <option>C++</option>
              <option>Go</option>
              <option>TypeScript</option>
            </select>
          </div>

          <textarea
            value={code}
            onChange={handlecode}
            placeholder="// Write your code here..."
            required
            rows={20}
            style={styles.editor}
          ></textarea>

          <div style={styles.checkboxWrapper}>
            <label style={styles.label}>
              <input
                type="checkbox"
                checked={feedbackreq}
                onChange={handlefeedback}
              />{" "}
              Request Feedback
            </label>
          </div>

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    backgroundColor: "#121212",
    minHeight: "100vh",
    padding: "40px 10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    color: "#fff",
    fontFamily: "'Fira Code', monospace",
  },
  container: {
    width: "100%",
    maxWidth: "900px",
    backgroundColor: "#1e1e1e",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 0 20px #00ffff66",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#00ffff",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  selectWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "#2c2c2c",
    color: "#fff",
    border: "1px solid #00ffff44",
  },
  label: {
    marginBottom: "5px",
    fontSize: "16px",
    color: "#ccc",
  },
  editor: {
    width: "100%",
    minHeight: "300px",
    backgroundColor: "#2c2c2c",
    color: "#00ffcc",
    border: "1px solid #00ffff33",
    borderRadius: "8px",
    padding: "15px",
    fontSize: "15px",
    fontFamily: "'Fira Code', monospace",
    outline: "none",
    resize: "vertical",
  },
  checkboxWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#00ffff",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    alignSelf: "flex-start",
  },
};

export default Submition;
