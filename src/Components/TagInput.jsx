import React, { useState } from "react";
import { useInterviewContext } from "../Context/InterviewContext";

export default function TagInput() {
  const { value, setValue } = useInterviewContext();
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    const trimmedValue = inputValue.trim();

    if (
      (event.key === "Enter" ||
        event.key === " " ||
        event.code === "Enter" ||
        event.code === "Space") &&
      trimmedValue !== ""
    ) {
      event.preventDefault();
      if (!value.includes(trimmedValue)) {
        setValue((prevValue) => [...prevValue, trimmedValue]);
      }
      setInputValue("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setValue(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      <div className="flex w-full flex-wrap gap-2 mb-2">
        {value.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-slate-300 text-black border border-gray-300 rounded-full px-3 break-all py-1 text-base font-medium break-words"
          >
            <span>{tag}</span>
            <button
              onClick={() => handleTagRemove(tag)}
              className="ml-2 text-black hover:bg-gray-600 hover:px-1 hover:py-1 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="placeholder-black outline-none bg-slate-300 rounded-lg px-3 py-3 text-base font-semibold"
        placeholder="Type and press Enter or Space to add tags"
      />
    </>
  );
}
