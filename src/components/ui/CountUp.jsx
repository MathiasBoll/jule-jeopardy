import { useEffect, useState } from "react";

// Animeret tæller - tæller op fra start til slut med animation
const CountUp = ({ end, start = 0, duration = 1500, delay = 0 }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime;
    let animationFrame;
    let timer;

    // Starter animationen
    const startAnimation = () => {
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);

        // Ease out cubic funktion for blød landing
        const easeOut = 1 - Math.pow(1 - percentage, 3);

        // Beregner nuværende værdi
        const currentVal = Math.round(start + (end - start) * easeOut);
        setCount(currentVal);

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end); // Sikrer vi lander præcis på målværdien
        }
      };

      animationFrame = requestAnimationFrame(animate);
    };

    // Starter med forsinkelse hvis angivet
    if (delay > 0) {
      timer = setTimeout(startAnimation, delay * 1000);
    } else {
      startAnimation();
    }

    // Rydder op ved unmount
    return () => {
      clearTimeout(timer);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, start, duration, delay]);

  return <>{count.toLocaleString()}</>;
};

export default CountUp;
