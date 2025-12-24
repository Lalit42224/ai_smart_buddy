import { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");

  const handleSummary = async () => {
    if (!notes.trim()) {
      alert("Please enter notes first!");
      return;
    }

    const response = await fetch("http://localhost:5000/api/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes }),
    });

    const data = await response.json();
    setOutput(data.summary);
  };

  const handleQuestions = () => {
    if (!notes.trim()) {
      alert("Please enter notes first!");
      return;
    }
    console.log("QUESTION NOTES:", notes);
  };

  return (
    <div className="container">
      <h1 className="title">AI Study Buddy</h1>
      <p className="subtitle">
        Upload or paste your notes and get instant summary & questions
      </p>

      <textarea
        className="notes-box"
        rows="10"
        placeholder="Paste your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>

      <div className="btn-group">
        <button className="btn primary" onClick={handleSummary}>
          Generate Summary
        </button>
        <button className="btn secondary" onClick={handleQuestions}>
          Generate Question
        </button>
      </div>

      {output && (
        <div className="output-box">
          <h3>Summary</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}

export default App;
