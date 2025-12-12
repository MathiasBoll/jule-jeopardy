// src/components/ui/AnimatedCount.jsx
// Lille wrapper-komponent omkring react-countup
// Bruges til at animere tal (fx point, score, resultater)
// Sikrer at props altid er tal og giver pæn genbrugelig API

import CountUp from "react-countup";

// Komponent der modtager:
// - end: det tal animationen skal ende på
// - delay: hvor lang tid der går før animationen starter
// - duration: hvor lang tid animationen varer
// - ...props: alle ekstra props sendes direkte videre til CountUp
const AnimatedCount = ({ end = 0, delay = 0, duration = 1, ...props }) => {
  return (
    <CountUp
      // Sikrer at værdierne altid er numbers
      // (vigtigt hvis de kommer fra state, API eller props som strings)
      end={Number(end)}
      delay={Number(delay)}
      duration={Number(duration)}

      // Spread af ekstra props
      // Fx: start, separator, prefix, suffix, easing osv.
      {...props}
    />
  );
};

// Eksporter komponenten så den kan bruges i fx scoreboard, podium, final round osv.
export default AnimatedCount;
