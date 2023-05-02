"use client";

import { useState } from "react";

type Props = {
  onToggle: (fbcollection: string) => void;
};

function ToggleButton({ onToggle }: Props) {
  const [selected, setSelected] = useState("postedQuestions");

  const handleToggle = (fbcollection: string) => {
    setSelected(fbcollection);
    onToggle(fbcollection);
    console.log(fbcollection)
  };

  return (
    <div className="flex justify-end my-4">
      <button
        className={`px-4 py-2 rounded-l-lg ${
          selected === "postedQuestions"
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-600"
        }`}
        onClick={() => handleToggle("postedQuestions")}
      >
        Posted Questions
      </button>
      <button
        className={`px-4 py-2 rounded-r-lg ${
          selected === "questions"
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-600"
        }`}
        onClick={() => handleToggle("questions")}
      >
        Posted Answers
      </button>
    </div>
  );
}

export default ToggleButton;
