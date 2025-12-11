// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";

const CountUp = ({ end, start = 0, duration = 1500, delay = 0 }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime;
    let animationFrame;
    let timer;

    const startAnimation = () => {
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);

        // Ease out cubic function for smooth landing
        const easeOut = 1 - Math.pow(1 - percentage, 3);

        // Calculate current value
        const currentVal = Math.round(start + (end - start) * easeOut);
        setCount(currentVal);

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end); // Ensure we land exactly on the target
        }
      };

      animationFrame = requestAnimationFrame(animate);
    };

    if (delay > 0) {
      timer = setTimeout(startAnimation, delay * 1000);
    } else {
      startAnimation();
    }

    return () => {
      clearTimeout(timer);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, start, duration, delay]);

  return <>{count.toLocaleString()}</>;
};

export default CountUp;
