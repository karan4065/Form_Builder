import React from "react";
import Categorize from "./QuestionTypes/Categorize";
import Cloze from "./QuestionTypes/Cloze";
import Comprehension from "./QuestionTypes/Comprehension";

export default function PreviewForm({ formData }) {
  if (!formData || formData.length === 0) {
    return <p>No form data available to preview.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Form Preview</h2>
      {formData.map((q, i) => (
        <div key={i} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd" }}>
          {q.type === "categorize" && <Categorize data={q.data} readOnly />}
          {q.type === "cloze" && <Cloze data={q.data} readOnly />}
          {q.type === "comprehension" && <Comprehension data={q.data} readOnly />}
        </div>
      ))}
    </div>
  );
}
