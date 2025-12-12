
'use client';

import { useEffect, useState } from 'react';
import '../../app/snow.css';

const Snowfall = () => {
  const [isDecember, setIsDecember] = useState(false);
  const [snowflakes, setSnowflakes] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const today = new Date();
    if (today.getMonth() === 11) { // 11 is December (0-indexed)
      setIsDecember(true);
    }
  }, []);

  useEffect(() => {
    if (isDecember) {
      const generateSnowflakes = () => {
        return Array.from({ length: 150 }).map((_, i) => {
          const size = Math.random() * 4 + 1; // size between 1px and 5px
          const left = Math.random() * 100; // random horizontal start position
          const animationDuration = Math.random() * 10 + 5; // duration between 5s and 15s
          const animationDelay = Math.random() * 10; // random start delay

          const style: React.CSSProperties = {
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}vw`,
            animationDuration: `${animationDuration}s`,
            animationDelay: `${animationDelay}s`,
          };

          return <div key={i} className="snowflake" style={style}></div>;
        });
      };
      setSnowflakes(generateSnowflakes());
    }
  }, [isDecember]);

  if (!isDecember) {
    return null;
  }

  return <div className="snowfall">{snowflakes}</div>;
};

export default Snowfall;
