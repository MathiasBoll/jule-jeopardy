import React from "react";

export const TruncatedText = ({ text, wordCount = 3 }) => {
  const words = text.split(" ");
  const displayText =
    words.length <= wordCount
      ? text
      : words.slice(0, wordCount).join(" ") + "...";
  return <p>{displayText}</p>;
};
