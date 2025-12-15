// Truncates text to a specified number of words
export const TruncatedText = ({ text, wordCount = 3 }) => {
  if (!text) return null;

  const words = text.split(" ");
  if (words.length <= wordCount) return <span>{text}</span>;

  return <span>{words.slice(0, wordCount).join(" ")}...</span>;
};

export default TruncatedText;
