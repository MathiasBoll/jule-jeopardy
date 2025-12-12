import CountUp from "react-countup";

const AnimatedCount = ({ end = 0, delay = 0, duration = 1, ...props }) => {
  return (
    <CountUp
      end={Number(end)}
      delay={Number(delay)}
      duration={Number(duration)}
      {...props}
    />
  );
};

export default AnimatedCount;
