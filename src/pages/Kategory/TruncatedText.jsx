import React from "react";

/*
  TruncatedText
  ----------------
  En lille UI-komponent der forkorter tekst,
  så kun et bestemt antal ord vises.

  Props:
  - text (string): teksten der skal vises
  - wordCount (number): hvor mange ord der må vises (default = 3)
*/
export const TruncatedText = ({ text, wordCount = 3 }) => {
  // Splitter teksten op i individuelle ord
  const words = text.split(" ");

  /*
    Hvis antallet af ord er mindre end eller lig med wordCount:
      → vis hele teksten
    Ellers:
      → vis kun de første X ord og tilføj "..."
  */
  const displayText =
    words.length <= wordCount
      ? text
      : words.slice(0, wordCount).join(" ") + "...";

  // Returnerer den forkortede tekst
  return <p>{displayText}</p>;
};
