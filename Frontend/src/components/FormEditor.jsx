import React, { useState } from "react";
import Categorize from "./Categorize";
import Cloze from "./Cloze";
import Comprehension from "./Comprehension";

export default function FormEditor({ onSave }) {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (type) => {
    let newQuestion;
    if (type === "categorize") {
      newQuestion = { type, data: { title: "", categories: [], items: [] } };
    } else if (type === "cloze") {
      newQuestion = { type, data: { text: "", blanks: [] } };
    } else if (type === "comprehension") {
      newQuestion = { type, data: { passage: "", questions: [] } };
    }
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index, updatedData) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].data = updatedData;
    setQuestions(updatedQuestions);
  };

  const saveForm = () => {
    onSave(questions);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Form Editor</h2>
      <div>
        <button onClick={() => addQuestion("categorize")}>Add Categorize</button>
        <button onClick={() => addQuestion("cloze")}>Add Cloze</button>
        <button onClick={() => addQuestion("comprehension")}>Add Comprehension</button>
      </div>

      {questions.map((q, i) => (
        <div key={i} style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          {q.type === "categorize" && (
            <Categorize data={q.data} onChange={(data) => updateQuestion(i, data)} />
          )}
          {q.type === "cloze" && (
            <Cloze data={q.data} onChange={(data) => updateQuestion(i, data)} />
          )}
          {q.type === "comprehension" && (
            <Comprehension data={q.data} onChange={(data) => updateQuestion(i, data)} />
          )}
        </div>
      ))}

      <button onClick={saveForm} style={{ marginTop: "20px" }}>
        Save Form
      </button>
    </div>
  );
}
