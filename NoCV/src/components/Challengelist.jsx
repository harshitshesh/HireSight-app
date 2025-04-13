import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Challengelist() {
  let [challengesdata, setchallenges] = useState([]);
  let navigate = useNavigate()

  useEffect(() => {
    async function fetchchallenge() {
      try {
        let fetchchallenge = await getDocs(collection(db, "allchallenges"));
        let datachallenge = fetchchallenge.docs.map((challenge) => ({
          id: challenge.id,
          ...challenge.data(),
        }));
        setchallenges(datachallenge);
      } catch (err) {
        console.error("Error in fetch data", err);
      }
    }

    fetchchallenge();
  }, []);

  function handlesubmitsolution(id){
    navigate(`/submition/${id}`)
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Challenges</h2>

      <div style={styles.grid}>
        {challengesdata.map((challenge) => (
          <div key={challenge.id} style={styles.card}>
            <h3 style={styles.title}>{challenge.title}</h3>
            <p style={styles.text}>{challenge.description}</p>
            <p style={styles.text}>
              <strong>Skills:</strong> {challenge.skills.join(", ")}
            </p>
            <p style={styles.difficulty}>
              <strong>Difficulty:</strong> {challenge.difficulty}
            </p>
            
            <button style={styles.button} onClick={()=> handlesubmitsolution(challenge.id)}>Submit Solution</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#121212",
    minHeight: "100vh",
    padding: "40px 20px",
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "32px",
    color: "#00ffff",
    fontFamily: "'Orbitron', sans-serif",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid #00ffff55",
    boxShadow: "0 0 10px #00ffff55",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  title: {
    fontSize: "22px",
    marginBottom: "10px",
    color: "#00ffff",
  },
  text: {
    fontSize: "16px",
    marginBottom: "8px",
    color:"black"
  },
  difficulty: {
    fontWeight: "bold",
    color: "black",
  },
  button: {
    marginTop: "10px",
    padding: "10px 16px",
    backgroundColor: "#00ffff",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Challengelist;
