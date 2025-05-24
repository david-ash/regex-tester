import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#f5f5f5", // subtle background for contrast
      }}
    >
      <div className="card z-depth-3" style={{ padding: "2rem", maxWidth: "600px", width: "100%" }}>
        <h2 className="center-align" style={{ marginBottom: "0.5rem" }}>
          Welcome to Regex Helper
        </h2>
        <p className="center-align grey-text text-darken-1" style={{ marginBottom: "2rem" }}>
          Test and learn Regular Expressions easily with our interactive tools.
        </p>

        <div className="row" style={{ marginBottom: 0 }}>
          <div className="col s12 m6" style={{ marginBottom: "1rem" }}>
            <button
              className="btn waves-effect waves-light blue lighten-1"
              style={{ width: "100%", fontSize: "1.2rem" }}
              onClick={() => navigate("/tester")}
            >
              Regex Tester
            </button>
          </div>
          <div className="col s12 m6">
            <button
              className="btn waves-effect waves-light green lighten-1"
              style={{ width: "100%", fontSize: "1.2rem" }}
              onClick={() => navigate("/learn")}
            >
              Learn Regex
            </button>
          </div>
        </div>

        <p className="center-align grey-text" style={{ marginTop: "2rem", fontSize: "0.9rem" }}>
          Made with React and Materialize CSS
        </p>
      </div>
    </div>
  );
}
