import React, { useState } from "react";

const Cloze = ({ question = "", blanks = [], onAnswerChange }) => {
  const [answers, setAnswers] = useState(Array(blanks.length).fill(""));

  const handleChange = (value, index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
    if (onAnswerChange) onAnswerChange(updatedAnswers);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Fill in the blanks</h2>
      <p className="mb-4">{question}</p>
      {blanks.map((blank, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Blank ${i + 1}`}
          value={answers[i]}
          onChange={(e) => handleChange(e.target.value, i)}
          className="border rounded p-2 w-full mb-2"
        />
      ))}
    </div>
  );
};

export default Cloze;
