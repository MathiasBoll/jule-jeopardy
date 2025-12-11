import "./Snowfall.css";

const SnowflakeSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="snowflake-svg">
    <path
      d="M12 0L12 24M0 12L24 12M3.5 3.5L20.5 20.5M20.5 3.5L3.5 20.5M12 4L10 6L12 8L14 6L12 4M12 16L10 18L12 20L14 18L12 16M4 12L6 10L8 12L6 14L4 12M16 12L18 10L20 12L18 14L16 12"
      stroke="white"
      strokeWidth="1"
      fill="none"
    />
  </svg>
);

const Snowfall = () => {
  return (
    <div className="snowfall-container">
      {Array.from({ length: 40 }, (_, i) => (
        <div key={i} className={`snowflake snowflake-${i % 10}`}>
          <SnowflakeSVG />
        </div>
      ))}
    </div>
  );
};

export default Snowfall;
