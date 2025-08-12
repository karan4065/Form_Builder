import React, { useState } from "react";

const Categorize = ({ question, categories = [], items = [], onAnswerChange }) => {
  const [answers, setAnswers] = useState({});

  const handleDrop = (category, item) => {
    const updatedAnswers = { ...answers, [item]: category };
    setAnswers(updatedAnswers);
    if (onAnswerChange) onAnswerChange(updatedAnswers);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">{question || "Categorize the items"}</h2>
      <div className="flex gap-6">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="border p-3 rounded-lg w-40 min-h-[150px] bg-gray-50"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(cat, e.dataTransfer.getData("item"))}
          >
            <h3 className="font-medium mb-2">{cat}</h3>
            {Object.keys(answers)
              .filter((item) => answers[item] === cat)
              .map((item, idx) => (
                <div key={idx} className="bg-blue-100 p-1 rounded mb-1">
                  {item}
                </div>
              ))}
          </div>
        ))}

        {/* Items to drag */}
        <div className="border p-3 rounded-lg w-40 min-h-[150px] bg-gray-50">
          <h3 className="font-medium mb-2">Items</h3>
          {items
            .filter((item) => !answers[item])
            .map((item, idx) => (
              <div
                key={idx}
                className="bg-green-100 p-1 rounded mb-1 cursor-move"
                draggable
                onDragStart={(e) => e.dataTransfer.setData("item", item)}
              >
                {item}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Categorize;
