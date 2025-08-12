import React, { useState } from "react";

const Comprehension = ({ passage = "", questions = [], onAnswerChange }) => {
  const [answers, setAnswers] = useState({});

  const handleChange = (qIndex, value) => {
    const updatedAnswers = { ...answers, [qIndex]: value };
    setAnswers(updatedAnswers);
    if (onAnswerChange) onAnswerChange(updatedAnswers);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Reading Comprehension</h2>
      <div className="bg-gray-100 p-3 rounded mb-4 whitespace-pre-wrap">{passage}</div>
      {questions.map((q, i) => (
        <div key={i} className="mb-4">
          <p className="font-medium">{q}</p>
          <textarea
            className="border rounded p-2 w-full"
            value={answers[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default Comprehension;
